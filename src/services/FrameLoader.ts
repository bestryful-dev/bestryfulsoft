import { TOTAL_FRAMES, FRAME_URLS } from '../utils/frameUrl';
import { FrameStatus, PreloadConfig } from '../types/engine';

export type FrameLoaderSubscriber = () => void;

interface QueuedTask {
  frame: number;
  priority: number;
}

export class FrameLoader {
  private cache = new Map<number, HTMLImageElement>();
  private statuses: FrameStatus[] = new Array(TOTAL_FRAMES + 1).fill('idle');
  private inFlight = new Set<number>();
  private failed = new Set<number>();
  private queue: QueuedTask[] = [];
  private isProcessingQueue = false;

  private currentFrame = 1;
  private scrollDirection: 1 | -1 | 0 = 1;
  private lastScrollTime = 0;

  // Configuration
  private config: PreloadConfig = {
    concurrencyLimit: 5,
    forwardBuffer: 16,
    backwardBuffer: 6,
    maxCachedFrames: 110,
    enableAdaptiveNetwork: true,
  };

  // Diagnostics & Simulation flags
  public isSimulatingSlowNetwork = false;
  public isSimulatingMissingAssets = false;

  // Subscribers for telemetry updates (throttled)
  private subscribers = new Set<FrameLoaderSubscriber>();
  private notificationPending = false;

  constructor(customConfig?: Partial<PreloadConfig>) {
    if (customConfig) {
      this.config = { ...this.config, ...customConfig };
    }
    this.detectNetworkConditions();
    // Phase A: Immediately load Frame 1 with critical priority
    this.loadFirstFrame();
  }

  /**
   * Adapts buffer and concurrency based on Network Information API if supported
   */
  private detectNetworkConditions(): void {
    if (typeof navigator === 'undefined' || !this.config.enableAdaptiveNetwork) return;

    try {
      const nav = navigator as Navigator & {
        connection?: {
          effectiveType?: string;
          saveData?: boolean;
          addEventListener?: (type: string, listener: () => void) => void;
        };
      };

      if (nav.connection) {
        const { effectiveType, saveData } = nav.connection;
        if (saveData || effectiveType === '2g' || effectiveType === 'slow-2g') {
          this.config.concurrencyLimit = 2;
          this.config.forwardBuffer = 6;
          this.config.backwardBuffer = 2;
          this.config.maxCachedFrames = 45;
        } else if (effectiveType === '3g') {
          this.config.concurrencyLimit = 3;
          this.config.forwardBuffer = 10;
          this.config.backwardBuffer = 4;
          this.config.maxCachedFrames = 75;
        }
      }
    } catch {
      // Graceful fallback for browsers without Network Information API
    }
  }

  /**
   * Eagerly loads frame 1 with high priority for Instant First Paint
   */
  private loadFirstFrame(): void {
    this.requestFrame(1, 0, true);
  }

  /**
   * Subscribe to frame loader events for telemetry UI
   */
  public subscribe(cb: FrameLoaderSubscriber): () => void {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  private notifySubscribers(): void {
    if (this.notificationPending) return;
    this.notificationPending = true;
    requestAnimationFrame(() => {
      this.notificationPending = false;
      this.subscribers.forEach((cb) => cb());
    });
  }

  /**
   * Updates current position and scroll direction, and updates preload window
   */
  public updatePosition(frame: number, direction: 1 | -1 | 0 = 1): void {
    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, frame));
    const prevFrame = this.currentFrame;
    this.currentFrame = clamped;

    if (direction !== 0) {
      this.scrollDirection = direction;
    } else if (clamped !== prevFrame) {
      this.scrollDirection = clamped >= prevFrame ? 1 : -1;
    }
    this.lastScrollTime = performance.now();

    this.schedulePreloadWindow();
    this.enforceMemoryBudget();
  }

  /**
   * Returns the exact cached image for this frame if available
   */
  public getFrameImage(frame: number): HTMLImageElement | null {
    return this.cache.get(frame) || null;
  }

  /**
   * Returns the nearest available loaded frame when desired frame is still loading.
   * Searches symmetrically or biased towards previous frames to maintain continuous motion.
   */
  public getNearestLoadedFrame(targetFrame: number): { image: HTMLImageElement; frame: number } | null {
    if (this.cache.has(targetFrame)) {
      return { image: this.cache.get(targetFrame)!, frame: targetFrame };
    }

    // Search outwards from targetFrame
    let bestDist = Infinity;
    let bestFrame: number | null = null;

    for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
      // Prioritize looking back if scrolling down (so user doesn't jump forward prematurely)
      const prev = targetFrame - delta;
      if (prev >= 1 && this.cache.has(prev)) {
        bestFrame = prev;
        break;
      }

      const next = targetFrame + delta;
      if (next <= TOTAL_FRAMES && this.cache.has(next)) {
        bestFrame = next;
        break;
      }
    }

    if (bestFrame !== null && this.cache.has(bestFrame)) {
      return { image: this.cache.get(bestFrame)!, frame: bestFrame };
    }

    return null;
  }

  /**
   * Computes the prioritized preload window around current frame
   */
  private schedulePreloadWindow(): void {
    const current = this.currentFrame;
    const isDown = this.scrollDirection >= 0;

    const fwdDist = isDown ? this.config.forwardBuffer : this.config.backwardBuffer;
    const backDist = isDown ? this.config.backwardBuffer : this.config.forwardBuffer;

    const tasks: QueuedTask[] = [];

    // Immediate target frame has highest priority (priority 0)
    if (!this.cache.has(current) && !this.failed.has(current) && !this.inFlight.has(current)) {
      tasks.push({ frame: current, priority: 0 });
    }

    // Directional forward frames
    const step = isDown ? 1 : -1;
    for (let i = 1; i <= fwdDist; i++) {
      const f = current + i * step;
      if (f >= 1 && f <= TOTAL_FRAMES && !this.cache.has(f) && !this.failed.has(f) && !this.inFlight.has(f)) {
        tasks.push({ frame: f, priority: i }); // priority 1, 2, 3...
      }
    }

    // Opposite backward frames
    const oppStep = -step;
    for (let j = 1; j <= backDist; j++) {
      const f = current + j * oppStep;
      if (f >= 1 && f <= TOTAL_FRAMES && !this.cache.has(f) && !this.failed.has(f) && !this.inFlight.has(f)) {
        tasks.push({ frame: f, priority: fwdDist + j });
      }
    }

    // Replace queue with new prioritized tasks (preserving unstarted unique tasks if still useful)
    this.queue = tasks.sort((a, b) => a.priority - b.priority);
    this.processQueue();
  }

  /**
   * Processes the loading queue respecting concurrency limit
   */
  private processQueue(): void {
    if (this.isProcessingQueue) return;
    this.isProcessingQueue = true;

    while (this.inFlight.size < this.config.concurrencyLimit && this.queue.length > 0) {
      const next = this.queue.shift();
      if (!next) break;

      const { frame } = next;
      if (this.cache.has(frame) || this.inFlight.has(frame) || this.failed.has(frame)) {
        continue;
      }

      this.requestFrame(frame, next.priority);
    }

    this.isProcessingQueue = false;
  }

  /**
   * Loads a single image frame with error handling and optional latency simulation
   */
  private requestFrame(frame: number, priority: number, isCritical = false): void {
    if (this.cache.has(frame) || this.inFlight.has(frame) || this.failed.has(frame)) {
      return;
    }

    this.inFlight.add(frame);
    this.statuses[frame] = 'loading';
    this.notifySubscribers();

    const url = FRAME_URLS[frame - 1];
    const img = new Image();

    if (isCritical) {
      img.fetchPriority = 'high';
    }

    const onComplete = (success: boolean) => {
      this.inFlight.delete(frame);

      if (success) {
        this.cache.set(frame, img);
        this.statuses[frame] = 'loaded';
      } else {
        this.failed.add(frame);
        this.statuses[frame] = 'failed';
      }

      this.notifySubscribers();
      // Continue processing remaining queue
      this.processQueue();
    };

    img.onload = async () => {
      if (this.isSimulatingMissingAssets && frame > 1) {
        // Test simulation
        onComplete(false);
        return;
      }

      try {
        // Fast asynchronous decoding in background before painting to prevent jank
        if (typeof img.decode === 'function') {
          await img.decode();
        }
      } catch {
        // decoding error or unneeded in some environments, still usable
      }

      if (this.isSimulatingSlowNetwork) {
        setTimeout(() => onComplete(true), 350);
      } else {
        onComplete(true);
      }
    };

    img.onerror = () => {
      if (this.isSimulatingSlowNetwork) {
        setTimeout(() => onComplete(false), 200);
      } else {
        onComplete(false);
      }
    };

    // Trigger network request
    img.src = url;
  }

  /**
   * Enforces sliding memory budget to prevent browser memory bloat on mobile
   */
  private enforceMemoryBudget(): void {
    if (this.cache.size <= this.config.maxCachedFrames) return;

    // Identify frames farthest from current position to evict
    const current = this.currentFrame;
    const candidates: Array<{ frame: number; dist: number }> = [];

    this.cache.forEach((_, f) => {
      // Never evict frame 1 (the initial paint anchor) or frames immediately adjacent
      if (f !== 1 && Math.abs(f - current) > 15) {
        candidates.push({ frame: f, dist: Math.abs(f - current) });
      }
    });

    candidates.sort((a, b) => b.dist - a.dist);

    const toRemoveCount = this.cache.size - this.config.maxCachedFrames;
    for (let i = 0; i < Math.min(toRemoveCount, candidates.length); i++) {
      const f = candidates[i].frame;
      const img = this.cache.get(f);
      if (img) {
        // Clear src to allow browser garbage collection
        img.src = '';
      }
      this.cache.delete(f);
      this.statuses[f] = 'idle';
    }
  }

  /**
   * Diagnostics & State queries
   */
  public getStatus(frame: number): FrameStatus {
    return this.statuses[frame] || 'idle';
  }

  public getAllStatuses(): FrameStatus[] {
    return [...this.statuses.slice(1)];
  }

  public getCacheSize(): number {
    return this.cache.size;
  }

  public getInFlightCount(): number {
    return this.inFlight.size;
  }

  public getFailedCount(): number {
    return this.failed.size;
  }

  public hasAnyLoadedFrames(): boolean {
    return this.cache.size > 0;
  }

  public purgeCache(): void {
    this.cache.forEach((img) => {
      img.src = '';
    });
    this.cache.clear();
    this.failed.clear();
    this.statuses.fill('idle');
    this.queue = [];
    this.notifySubscribers();
    // Re-request initial anchor
    this.loadFirstFrame();
    this.schedulePreloadWindow();
  }

  public setConcurrency(val: number): void {
    this.config.concurrencyLimit = Math.max(1, Math.min(12, val));
    this.processQueue();
  }

  public getConfig(): PreloadConfig {
    return { ...this.config };
  }
}
