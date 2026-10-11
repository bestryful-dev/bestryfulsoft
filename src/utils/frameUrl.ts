export const TOTAL_FRAMES = 195;
export const BASE_FPS = 30;

/**
 * Precomputed array of all 195 frame URLs.
 * Statically generated once at module evaluation to prevent garbage collection churn
 * and string allocations during high-frequency scroll frames.
 */
export const FRAME_URLS: readonly string[] = Object.freeze(
  Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const frameNum = String(i + 1).padStart(3, '0');
    return `/images/ezgif-frame-${frameNum}.jpg`;
  })
);

/**
 * Returns zero-padded 3-digit frame string (e.g. 1 -> "001")
 */
export function formatFrameNumber(frameIndex: number): string {
  const safe = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameIndex)));
  return String(safe).padStart(3, '0');
}

/**
 * Maps a normalized scroll progress (0.0 to 1.0) to frame number (1 to 195)
 */
export function progressToFrame(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  const frame = 1 + Math.round(clamped * (TOTAL_FRAMES - 1));
  return Math.max(1, Math.min(TOTAL_FRAMES, frame));
}

/**
 * Maps a frame number (1 to 195) to normalized scroll progress (0.0 to 1.0)
 */
export function frameToProgress(frame: number): number {
  const clamped = Math.max(1, Math.min(TOTAL_FRAMES, frame));
  return (clamped - 1) / (TOTAL_FRAMES - 1);
}

/**
 * Formats frame number into cinematic timecode (MM:SS:FF)
 */
export function frameToTimecode(frame: number, fps: number = BASE_FPS): string {
  const frameOffset = Math.max(0, Math.round(frame) - 1);
  const totalSeconds = Math.floor(frameOffset / fps);
  const remainingFrames = frameOffset % fps;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  const ff = String(remainingFrames).padStart(2, '0');

  return `${mm}:${ss}.${ff}`;
}
