import { Zap, Layers, RefreshCw, Cpu, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { TOTAL_FRAMES } from '../utils/frameUrl';

interface TechnicalSpecsProps {
  onJumpToScrub: () => void;
  onOpenDiagnostics: () => void;
}

export function TechnicalSpecs({ onJumpToScrub, onOpenDiagnostics }: TechnicalSpecsProps) {
  return (
    <section className="relative z-20 bg-zinc-950 border-t border-zinc-800/80 px-6 md:px-12 py-24 max-w-7xl mx-auto space-y-24 text-zinc-100">
      {/* Proposition Overview */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
          Engine Specifications
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Progressive 195-Frame Scroll Architecture
        </h2>
        <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
          Engineered to eliminate initial loading freezes, excessive memory consumption, and
          flickering on slow connections. Scrubbing feels as fluid as native video playback while
          retaining frame-accurate scroll synchronization.
        </p>
      </div>

      {/* Quantitative Rigor Strips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
        <div className="space-y-1">
          <span className="text-xs text-zinc-400 font-mono">FIRST CONTENTFUL PAINT</span>
          <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-400 tabular-nums">
            &lt; 90ms
          </div>
          <p className="text-xs text-zinc-400">Frame 001 critical priority anchor</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-zinc-400 font-mono">COMPOSITOR FRAME RATE</span>
          <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
            60 FPS
          </div>
          <p className="text-xs text-zinc-400">Hardware accelerated rAF loop</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-zinc-400 font-mono">LAYOUT SHIFT (CLS)</span>
          <div className="text-2xl md:text-3xl font-bold font-mono text-white tabular-nums">
            0.00
          </div>
          <p className="text-xs text-zinc-400">Strictly reserved viewport box</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-zinc-400 font-mono">MAX CONCURRENT I/O</span>
          <div className="text-2xl md:text-3xl font-bold font-mono text-purple-400 tabular-nums">
            5 Streams
          </div>
          <p className="text-xs text-zinc-400">Drops to 2 on 2G/3G Save-Data</p>
        </div>
      </div>

      {/* Architecture Bento Grid */}
      <div id="architecture" className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Core Optimization Pillars
          </h3>
          <p className="text-sm text-zinc-400">
            Four specialized mechanisms ensuring stability from 4G gigabit fiber down to mobile 3G.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: col-span-2 */}
          <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">
                01. Immediate First Paint (Phase A)
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Rather than stalling until all {TOTAL_FRAMES} images download, the engine issues an
                immediate high-priority fetch for frame 001 with asynchronous decoding. The page
                shell mounts instantly, avoiding blank screens and network bottlenecks.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span>fetchPriority="high"</span>
              <span aria-hidden="true">·</span>
              <span>Image.decode()</span>
              <span aria-hidden="true">·</span>
              <span>Non-blocking Hydration</span>
            </div>
          </div>

          {/* Bento Card 2: col-span-1 */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">
                02. Nearest-Neighbor Resilient Fallback
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                If the user rapidly scrolls to frame 120 while frames 100-119 are still downloading,
                the engine renders the nearest already-loaded frame until the exact asset resolves.
                No flicker or blank states.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span>Zero-Flicker Swap</span>
              <span aria-hidden="true">·</span>
              <span>No Retries</span>
            </div>
          </div>

          {/* Bento Card 3: col-span-1 */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">
                03. Direction-Aware Sliding Buffer
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Preloading monitors user scroll velocity. Scrolling down allocates 16 frames ahead
                and 6 frames behind. Reversing instantly prioritizes preceding frames and recycles
                cached buffers.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span>Velocity Vectoring</span>
              <span aria-hidden="true">·</span>
              <span>Bi-directional</span>
            </div>
          </div>

          {/* Bento Card 4: col-span-2 */}
          <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">
                04. Sliding Window Memory Guard & Adaptive Network
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Mobile Safari and Chrome enforce strict GPU tab limits. To prevent crashes, frames
                farthest from the current scroll viewport are pruned once the cache exceeds its
                threshold, clearing image references for garbage collection while protecting anchor
                frames.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span>Save-Data Responsive</span>
              <span aria-hidden="true">·</span>
              <span>LRU Pruning</span>
              <span aria-hidden="true">·</span>
              <span>Mobile Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drop-in Asset Pipeline Guide */}
      <div id="pipeline" className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            Deployment Guide
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            How to Drop in Your 195 Frames
          </h3>
          <p className="text-sm text-zinc-400">
            The engine is completely decoupled from asset generation. As soon as your 195 JPEG files
            are added, the site automatically switches from the procedural blueprint to your footage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Step Instructions */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-800 text-xs font-mono font-semibold text-cyan-400 shrink-0">
                  1
                </span>
                <div>
                  <h5 className="text-sm font-semibold text-white">Create image directory</h5>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Directory created at <code className="text-zinc-200">public/images/</code>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-800 text-xs font-mono font-semibold text-cyan-400 shrink-0">
                  2
                </span>
                <div>
                  <h5 className="text-sm font-semibold text-white">Place 195 JPEG frames</h5>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Name them <code className="text-cyan-400">ezgif-frame-001.jpg</code> through{' '}
                    <code className="text-cyan-400">ezgif-frame-195.jpg</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-800 text-xs font-mono font-semibold text-cyan-400 shrink-0">
                  3
                </span>
                <div>
                  <h5 className="text-sm font-semibold text-white">Refresh or inspect</h5>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    The engine immediately detects frame 001, decodes it, and renders your animation.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenDiagnostics}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Open Diagnostic Ribbon</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onJumpToScrub}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white transition-colors cursor-pointer"
              >
                Jump to Scrub Viewport
              </button>
            </div>
          </div>

          {/* Directory Visualizer */}
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 font-mono text-xs text-zinc-300 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-zinc-500 mb-2">// Target file layout:</div>
              <div className="text-zinc-400">public/</div>
              <div className="pl-4 text-zinc-400">└── images/</div>
              <div className="pl-8 text-cyan-400">├── ezgif-frame-001.jpg  [Phase A Critical]</div>
              <div className="pl-8 text-cyan-400">├── ezgif-frame-002.jpg</div>
              <div className="pl-8 text-cyan-400">├── ezgif-frame-003.jpg</div>
              <div className="pl-8 text-zinc-500">│   ...</div>
              <div className="pl-8 text-cyan-400">└── ezgif-frame-195.jpg  [Final Frame]</div>
            </div>

            <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
              <div className="text-zinc-200 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Missing File Resilience Verified
              </div>
              <p>
                If any single frame is dropped or corrupted, the nearest available loaded frame is
                retained automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Strip */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="font-semibold text-zinc-300 font-mono">KEYBOARD SHORTCUTS</span>
        <div className="flex flex-wrap items-center gap-4 text-zinc-400 font-mono">
          <span>
            <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-zinc-200">Space</kbd>{' '}
            Play/Pause
          </span>
          <span>
            <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-zinc-200">←</kbd>{' '}
            <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-zinc-200">→</kbd>{' '}
            Step Frame
          </span>
          <span>
            <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-zinc-200">D</kbd>{' '}
            Diagnostics
          </span>
          <span>
            <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-zinc-200">R</kbd>{' '}
            Reset
          </span>
        </div>
      </div>
    </section>
  );
}
