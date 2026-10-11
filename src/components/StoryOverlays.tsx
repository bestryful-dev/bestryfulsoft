interface StoryOverlaysProps {
  progress: number; // 0.0 - 1.0
  currentFrame: number;
}

interface StoryChapter {
  id: string;
  minProgress: number;
  maxProgress: number;
  act: string;
  title: string;
  kicker: string;
  description: string;
  metadata: string[];
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'act-1',
    minProgress: 0.0,
    maxProgress: 0.18,
    act: '01. Inception',
    title: 'The Architecture of Continuous Motion',
    kicker: 'Discrete Frame Synchrony',
    description:
      'Every scroll tick maps strictly to a deterministic frame index. Initial paint is achieved instantly without waiting for the full 195-frame sequence.',
    metadata: ['Frame 001 Priority', '195 Total Images', 'Zero Layout Shift'],
  },
  {
    id: 'act-2',
    minProgress: 0.22,
    maxProgress: 0.40,
    act: '02. Articulation',
    title: 'Direction-Aware Sliding Window',
    kicker: 'Intelligent Preloading',
    description:
      'As you advance downward, forward frames are prioritized. Reversing scroll direction instantly redirects queue priority backward, recycling cached frames.',
    metadata: ['Dynamic Preload Window', '5x Concurrency Cap', 'Sliding LRU Eviction'],
  },
  {
    id: 'act-3',
    minProgress: 0.44,
    maxProgress: 0.64,
    act: '03. Resilience',
    title: 'Nearest-Neighbor Graceful Fallback',
    kicker: 'Zero Visual Interruption',
    description:
      'If network latency stalls an exact target frame, the engine smoothly maintains the nearest available frame. No blank flashes, no layout jumps, zero jarring artifacts.',
    metadata: ['Sub-16ms Frame Swap', 'Adaptive Network Awareness', 'Memory Protected'],
  },
  {
    id: 'act-4',
    minProgress: 0.68,
    maxProgress: 0.88,
    act: '04. Velocity',
    title: 'Hardware-Accelerated Canvas Scrub',
    kicker: 'Compositor Purity',
    description:
      'Rendering executes on high-DPI Canvas through requestAnimationFrame with zero full-page React re-renders during high-speed scrubbing.',
    metadata: ['60+ FPS Target', 'Clamped Retina DPR', 'Native Touch Fluidity'],
  },
  {
    id: 'act-5',
    minProgress: 0.91,
    maxProgress: 1.0,
    act: '05. Synthesis',
    title: 'Engine Complete & Ready For Custom Media',
    kicker: 'Drop-In Production Asset Pipeline',
    description:
      'Place your 195 JPEG frames in /public/images/ezgif-frame-[001-195].jpg to instantly replace the procedural blueprint with your custom footage.',
    metadata: ['Production Ready', 'Safe-Data Compliant', 'Fully Contained'],
  },
];

export function StoryOverlays({ progress }: StoryOverlaysProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 lg:p-16">
      {/* Top subtle indicator */}
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span className="font-mono tracking-wider text-zinc-400">
          {(progress * 100).toFixed(0)}% SCROLL DEPTH
        </span>
        <span className="hidden sm:inline font-mono text-zinc-500">
          SCROLL TO SCRUB · DRAG SLIDER · PRESS SPACE TO PLAY
        </span>
      </div>

      {/* Center dynamic story chapter cards */}
      <div className="relative w-full max-w-xl mx-auto md:mx-0 my-auto">
        {CHAPTERS.map((chapter) => {
          const isActive = progress >= chapter.minProgress && progress <= chapter.maxProgress;

          // Fade calculation for smooth entry/exit
          const fadeInRange = 0.03;
          let opacity = 0;
          if (progress >= chapter.minProgress && progress <= chapter.maxProgress) {
            const distFromStart = progress - chapter.minProgress;
            const distFromEnd = chapter.maxProgress - progress;
            const fadeIn = Math.min(1, distFromStart / fadeInRange);
            const fadeOut = Math.min(1, distFromEnd / fadeInRange);
            opacity = Math.max(0, Math.min(fadeIn, fadeOut));
          }

          if (opacity <= 0.01) return null;

          return (
            <div
              key={chapter.id}
              style={{ opacity }}
              className="transition-opacity duration-150 backdrop-blur-md bg-zinc-950/75 border border-zinc-800/80 p-6 md:p-8 rounded-xl shadow-2xl space-y-4"
            >
              {/* Editorial human act label */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                  {chapter.act}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {chapter.kicker}
                </span>
              </div>

              {/* Title with balanced text */}
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                {chapter.title}
              </h2>

              {/* Description */}
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                {chapter.description}
              </p>

              {/* Clean unboxed metadata with typographic separators */}
              <div className="pt-2 border-t border-zinc-800/60 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                {chapter.metadata.map((item, idx) => (
                  <span key={item} className="flex items-center gap-2">
                    {idx > 0 && <span aria-hidden="true" className="text-zinc-600">·</span>}
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom spacer for Scrubber HUD */}
      <div className="h-20" />
    </div>
  );
}
