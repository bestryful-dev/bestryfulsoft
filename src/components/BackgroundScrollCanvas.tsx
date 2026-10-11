import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 153;
const LERP_FACTOR = 0.085;

const getFrameFilename = (index: number) => {
  const num = String(index + 1).padStart(3, '0');
  return `frame_${num}.jpg`;
};

const HIGH_RES_PATHS: readonly string[] = Object.freeze(
  Array.from({ length: TOTAL_FRAMES }, (_, i) => `/images/${getFrameFilename(i)}`)
);

const LOW_RES_PATHS: readonly string[] = Object.freeze(
  Array.from({ length: TOTAL_FRAMES }, (_, i) => `/images/low/${getFrameFilename(i)}`)
);

export const BackgroundScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const highResImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const lowResImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  const highResStatusRef = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES));
  const lowResStatusRef = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES));

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const lastRenderedIsHighResRef = useRef<boolean | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const [initialLoading, setInitialLoading] = useState(true);

  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    let isHighRes = false;
    let img: HTMLImageElement | null = highResImagesRef.current[frameIndex];

    if (img && img.naturalWidth) {
      isHighRes = true;
    } else {
      const lowImg = lowResImagesRef.current[frameIndex];
      if (lowImg && lowImg.naturalWidth) {
        img = lowImg;
      } else {
        // Nearest neighbor fallback
        for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
          const prev = frameIndex - delta;
          if (prev >= 0) {
            if (highResImagesRef.current[prev]) {
              img = highResImagesRef.current[prev];
              isHighRes = true;
              break;
            }
            if (lowResImagesRef.current[prev]) {
              img = lowResImagesRef.current[prev];
              break;
            }
          }
          const next = frameIndex + delta;
          if (next < TOTAL_FRAMES) {
            if (highResImagesRef.current[next]) {
              img = highResImagesRef.current[next];
              isHighRes = true;
              break;
            }
            if (lowResImagesRef.current[next]) {
              img = lowResImagesRef.current[next];
              break;
            }
          }
        }
      }
    }

    if (!img || !img.naturalWidth) {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // Cover calculation preserving aspect ratio
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio > imgRatio) {
      drawW = width;
      drawH = width / imgRatio;
      drawX = 0;
      drawY = (height - drawH) / 2;
    } else {
      drawH = height;
      drawW = height * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    lastRenderedFrameRef.current = frameIndex;
    lastRenderedIsHighResRef.current = isHighRes;
  };

  // High-performance RAF lerp loop
  useEffect(() => {
    const tick = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * LERP_FACTOR;
      } else {
        currentProgressRef.current = target;
      }

      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );

      currentFrameRef.current = targetFrame;

      const hasHighResNow = !!highResImagesRef.current[targetFrame];
      const needsUpgrade = hasHighResNow && lastRenderedIsHighResRef.current === false;

      if (targetFrame !== lastRenderedFrameRef.current || needsUpgrade) {
        renderFrame(targetFrame);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Handle window resize and high-DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      const targetW = Math.round(w * dpr);
      const targetH = Math.round(h * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        if (lastRenderedFrameRef.current >= 0) {
          renderFrame(lastRenderedFrameRef.current);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Passive scroll listener (zero re-render cost)
  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Loader for single frame
  const loadSingleFrame = async (index: number, isHigh: boolean): Promise<boolean> => {
    const statusArray = isHigh ? highResStatusRef.current : lowResStatusRef.current;
    const imagesArray = isHigh ? highResImagesRef.current : lowResImagesRef.current;
    const paths = isHigh ? HIGH_RES_PATHS : LOW_RES_PATHS;

    if (statusArray[index] !== 0) return false;
    statusArray[index] = 1;

    return new Promise((resolve) => {
      const img = new Image();
      img.src = paths[index];

      const finish = async () => {
        try {
          if (typeof img.decode === 'function') {
            await img.decode();
          }
        } catch {
          // ignore
        }
        imagesArray[index] = img;
        statusArray[index] = 2;

        if (currentFrameRef.current === index) {
          renderFrame(index);
        }
        resolve(true);
      };

      img.onload = finish;
      img.onerror = () => {
        statusArray[index] = 0;
        resolve(false);
      };
    });
  };

  // Progressive streaming & smart lazy loading
  useEffect(() => {
    let active = true;

    const init = async () => {
      // Load frame 1 immediately
      await Promise.all([
        loadSingleFrame(0, true),
        loadSingleFrame(0, false)
      ]);

      if (!active) return;
      setInitialLoading(false);
      renderFrame(0);

      // Rapidly stream low-res preview frames in background chunks
      (async () => {
        const LOW_BATCH = 8;
        for (let i = 1; i < TOTAL_FRAMES; i += LOW_BATCH) {
          if (!active) break;
          const chunk = Array.from({ length: Math.min(LOW_BATCH, TOTAL_FRAMES - i) }, (_, k) => i + k);
          await Promise.all(chunk.map((idx) => loadSingleFrame(idx, false)));
        }
      })();

      // Smart proximity lazy loader for high-res frames
      const loadNextHighRes = async () => {
        if (!active) return;

        let pendingCount = 0;
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          if (highResStatusRef.current[i] === 0) pendingCount++;
        }
        if (pendingCount === 0) return;

        const current = currentFrameRef.current;
        const candidates: number[] = [];

        for (let delta = 0; delta < TOTAL_FRAMES && candidates.length < 4; delta++) {
          const forward = current + delta;
          if (forward < TOTAL_FRAMES && highResStatusRef.current[forward] === 0) {
            candidates.push(forward);
            if (candidates.length >= 4) break;
          }
          const backward = current - delta;
          if (delta > 0 && backward >= 0 && highResStatusRef.current[backward] === 0) {
            candidates.push(backward);
            if (candidates.length >= 4) break;
          }
        }

        if (candidates.length > 0) {
          await Promise.all(candidates.map((idx) => loadSingleFrame(idx, true)));
        }

        setTimeout(loadNextHighRes, 25);
      };

      loadNextHighRes();
    };

    init();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* Pinned Fullscreen Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
      />



      {/* Initial load indicator */}
      {initialLoading && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-mono text-zinc-400">
          <div className="w-2.5 h-2.5 border border-zinc-500 border-t-lime-400 rounded-full animate-spin" />
          <span>Syncing Animation</span>
        </div>
      )}
    </>
  );
};
