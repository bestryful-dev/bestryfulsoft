export type FrameStatus = 'idle' | 'loading' | 'loaded' | 'failed';

export interface PreloadConfig {
  concurrencyLimit: number;
  forwardBuffer: number;
  backwardBuffer: number;
  maxCachedFrames: number;
  enableAdaptiveNetwork: boolean;
}

export interface EngineStats {
  totalFrames: number;
  loadedCount: number;
  failedCount: number;
  inFlightCount: number;
  currentFrame: number; // 1-195
  targetFrame: number; // 1-195
  nearestAvailableFrame: number | null;
  scrollProgress: number; // 0.0 - 1.0
  fps: number;
  estimatedMemoryMB: number;
  effectiveConnectionType: string;
  saveData: boolean;
  hasCustomAssets: boolean;
  fitMode: 'cover' | 'contain';
  isPlaying: boolean;
  playbackSpeed: number;
  isSimulatingSlowNetwork: boolean;
  isSimulatingMissingAssets: boolean;
}

export interface FrameEventMap {
  'frameLoaded': { index: number };
  'frameFailed': { index: number };
  'statsUpdated': EngineStats;
}
