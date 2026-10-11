import React from 'react';
import { Play, Pause, RotateCcw, Activity, Maximize2, Minimize2 } from 'lucide-react';
import { TOTAL_FRAMES, formatFrameNumber, frameToTimecode } from '../utils/frameUrl';

interface ScrubberHUDProps {
  currentFrame: number;
  onScrub: (frame: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  onReset: () => void;
  onToggleDiagnostics: () => void;
  fitMode: 'cover' | 'contain';
  onToggleFitMode: () => void;
  loadedCount: number;
}

export function ScrubberHUD({
  currentFrame,
  onScrub,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onChangeSpeed,
  onReset,
  onToggleDiagnostics,
  fitMode,
  onToggleFitMode,
  loadedCount,
}: ScrubberHUDProps) {
  const speeds = [0.5, 1, 2];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    onScrub(val);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 select-none">
      <div className="backdrop-blur-xl bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-3 md:p-4 shadow-2xl space-y-3">
        {/* Top Scrubber Row: Slider + Metrics */}
        <div className="flex items-center gap-3">
          {/* Play / Pause button */}
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause auto-scrub playback' : 'Play auto-scrub animation'}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold transition-colors shrink-0 shadow-lg cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Reset Frame button */}
          <button
            type="button"
            onClick={onReset}
            title="Reset to frame 001"
            aria-label="Reset to frame 001"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Range Slider Container with buffered track progress */}
          <div className="relative flex-1 flex items-center h-10 px-2">
            <input
              type="range"
              min={1}
              max={TOTAL_FRAMES}
              value={currentFrame}
              onChange={handleSliderChange}
              aria-label="Scrub animation frame"
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            />
          </div>

          {/* Frame Number & Timecode */}
          <div className="hidden sm:flex flex-col items-end text-right shrink-0 font-mono">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <span className="text-cyan-400">{formatFrameNumber(currentFrame)}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">{TOTAL_FRAMES}</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              {frameToTimecode(currentFrame)}
            </div>
          </div>
        </div>

        {/* Bottom Utility Controls Row */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-zinc-800/60 text-xs">
          {/* Left: Speed selector */}
          <div className="flex items-center gap-1">
            <span className="text-zinc-400 text-[11px] mr-1 hidden sm:inline">Speed:</span>
            {speeds.map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => onChangeSpeed(spd)}
                className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-colors cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-zinc-800 text-cyan-400 border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Center: Buffer status */}
          <div className="text-[11px] text-zinc-400 font-mono hidden md:flex items-center gap-2">
            <span>Buffer: {loadedCount} cached</span>
            <span aria-hidden="true" className="text-zinc-700">·</span>
            <span>{((loadedCount / TOTAL_FRAMES) * 100).toFixed(0)}% ready</span>
          </div>

          {/* Right: Viewport fit mode & Engine Diagnostics */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleFitMode}
              title={`Switch to ${fitMode === 'cover' ? 'contain' : 'cover'} mode`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
            >
              {fitMode === 'cover' ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="capitalize">Contain</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="capitalize">Cover</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onToggleDiagnostics}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-750 text-cyan-400 hover:text-cyan-300 font-medium transition-colors border border-zinc-700/80 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Diagnostics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
