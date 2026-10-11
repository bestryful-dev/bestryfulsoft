import { useEffect, useRef, useCallback } from 'react';
import { FrameLoader } from '../services/FrameLoader';
import { TOTAL_FRAMES, formatFrameNumber, frameToTimecode } from '../utils/frameUrl';

interface CinematicCanvasProps {
  loader: FrameLoader;
  currentFrame: number;
  fitMode: 'cover' | 'contain';
  onFpsUpdate?: (fps: number) => void;
}

export function CinematicCanvas({
  loader,
  currentFrame,
  fitMode,
  onFpsUpdate,
}: CinematicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keep internal state in refs to eliminate React re-renders in tight animation loop
  const frameRef = useRef(currentFrame);
  frameRef.current = currentFrame;

  const fitModeRef = useRef(fitMode);
  fitModeRef.current = fitMode;

  const isDirtyRef = useRef(true);
  const animationFrameIdRef = useRef<number | null>(null);

  // FPS calculation refs
  const frameCountRef = useRef(0);
  const lastFpsCalcTimeRef = useRef(performance.now());

  const drawProceduralFallback = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      targetFrame: number,
      progress: number
    ) => {
      // Deep obsidian cinematic background
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric radial vignette
      const cx = width / 2;
      const cy = height / 2;
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.7);
      grad.addColorStop(0, 'rgba(24, 24, 27, 0.9)');
      grad.addColorStop(0.6, 'rgba(9, 9, 11, 0.98)');
      grad.addColorStop(1, '#050507');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Technical 16:9 framing outline
      const targetAspect = 16 / 9;
      let frameW = width * 0.88;
      let frameH = frameW / targetAspect;

      if (frameH > height * 0.82) {
        frameH = height * 0.82;
        frameW = frameH * targetAspect;
      }

      const frameX = (width - frameW) / 2;
      const frameY = (height - frameH) / 2;

      // Draw subtle grid lines inside frame bounds
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridCols = 8;
      const gridRows = 5;

      for (let c = 1; c < gridCols; c++) {
        const x = frameX + (frameW * c) / gridCols;
        ctx.beginPath();
        ctx.moveTo(x, frameY);
        ctx.lineTo(x, frameY + frameH);
        ctx.stroke();
      }

      for (let r = 1; r < gridRows; r++) {
        const y = frameY + (frameH * r) / gridRows;
        ctx.beginPath();
        ctx.moveTo(frameX, y);
        ctx.lineTo(frameX + frameW, y);
        ctx.stroke();
      }

      // Framing border with corner ticks
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeRect(frameX, frameY, frameW, frameH);

      const cornerLen = Math.min(24, frameW * 0.05);
      ctx.strokeStyle = '#06b6d4'; // Cyan highlight
      ctx.lineWidth = 2;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(frameX, frameY + cornerLen);
      ctx.lineTo(frameX, frameY);
      ctx.lineTo(frameX + cornerLen, frameY);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(frameX + frameW - cornerLen, frameY);
      ctx.lineTo(frameX + frameW, frameY);
      ctx.lineTo(frameX + frameW, frameY + cornerLen);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(frameX, frameY + frameH - cornerLen);
      ctx.lineTo(frameX, frameY + frameH);
      ctx.lineTo(frameX + cornerLen, frameY + frameH);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(frameX + frameW - cornerLen, frameY + frameH);
      ctx.lineTo(frameX + frameW, frameY + frameH);
      ctx.lineTo(frameX + frameW, frameY + frameH - cornerLen);
      ctx.stroke();

      // Central Dynamic Kinetic Ring reacting to scroll scrub
      const ringRadius = Math.min(frameW, frameH) * 0.22;
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + progress * Math.PI * 2;

      // Base track
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Progress arc
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, startAngle, endAngle);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Crosshairs
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - ringRadius - 20, cy);
      ctx.lineTo(cx + ringRadius + 20, cy);
      ctx.moveTo(cx, cy - ringRadius - 20);
      ctx.lineTo(cx, cy + ringRadius + 20);
      ctx.stroke();

      // Large central frame typography
      ctx.fillStyle = '#fafafa';
      ctx.font = '600 28px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(formatFrameNumber(targetFrame), cx, cy - 10);

      ctx.fillStyle = '#71717a';
      ctx.font = '400 13px "JetBrains Mono", monospace';
      ctx.fillText(`OF ${TOTAL_FRAMES} FRAMES`, cx, cy + 20);

      // Frame timecode & scrub percentage
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 12px "JetBrains Mono", monospace';
      ctx.fillText(
        `TIMECODE: ${frameToTimecode(targetFrame)} · ${(progress * 100).toFixed(1)}%`,
        cx,
        frameY + frameH - 36
      );

      // Asset instruction notice at top of frame
      ctx.fillStyle = '#38bdf8';
      ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('AWAITING ASSETS: DROP 195 JPEGS INTO /public/images/', cx, frameY + 36);

      ctx.fillStyle = '#71717a';
      ctx.font = '400 11px "JetBrains Mono", monospace';
      ctx.fillText(`ezgif-frame-${formatFrameNumber(targetFrame)}.jpg`, cx, frameY + 54);
    },
    []
  );

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const target = frameRef.current;
    const progress = (target - 1) / (TOTAL_FRAMES - 1);

    // Measure FPS
    frameCountRef.current++;
    const now = performance.now();
    const elapsed = now - lastFpsCalcTimeRef.current;
    if (elapsed >= 1000) {
      const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
      onFpsUpdate?.(currentFps);
      frameCountRef.current = 0;
      lastFpsCalcTimeRef.current = now;
    }

    // Try finding exact or nearest loaded frame
    const loadedData = loader.getNearestLoadedFrame(target);

    if (loadedData) {
      const img = loadedData.image;

      // Clear canvas with deep neutral
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);

      // Calculate aspect ratio containment or cover
      const imgAspect = img.naturalWidth / img.naturalHeight || 16 / 9;
      const canvasAspect = width / height;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (fitModeRef.current === 'cover') {
        if (canvasAspect > imgAspect) {
          drawW = width;
          drawH = width / imgAspect;
          drawX = 0;
          drawY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * imgAspect;
          drawX = (width - drawW) / 2;
          drawY = 0;
        }
      } else {
        // 'contain'
        if (canvasAspect > imgAspect) {
          drawH = height;
          drawW = height * imgAspect;
          drawX = (width - drawW) / 2;
          drawY = 0;
        } else {
          drawW = width;
          drawH = width / imgAspect;
          drawX = 0;
          drawY = (height - drawH) / 2;
        }
      }

      // Draw loaded image with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // If rendering nearest frame fallback rather than exact, display quiet hairline tag
      if (loadedData.frame !== target) {
        ctx.fillStyle = 'rgba(9, 9, 11, 0.8)';
        ctx.fillRect(24, height - 52, 180, 28);
        ctx.fillStyle = '#a1a1aa';
        ctx.font = '500 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`BUFFERING #${formatFrameNumber(target)}`, 36, height - 38);
      }
    } else {
      // No frames loaded yet: render procedural fallback
      drawProceduralFallback(ctx, width, height, target, progress);
    }
  }, [loader, onFpsUpdate, drawProceduralFallback]);

  // Main animation render loop using requestAnimationFrame
  useEffect(() => {
    let active = true;

    const renderLoop = () => {
      if (!active) return;
      if (isDirtyRef.current) {
        drawFrame();
        isDirtyRef.current = false;
      }
      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  // Trigger repaint on frame changes or fitMode change
  useEffect(() => {
    isDirtyRef.current = true;
  }, [currentFrame, fitMode]);

  // Handle ResizeObserver to adapt to container geometry with high DPI
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for GPU memory protection

      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        isDirtyRef.current = true;
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Subscribe to frame loader completions to repaint as soon as new frames arrive
  useEffect(() => {
    const unsubscribe = loader.subscribe(() => {
      isDirtyRef.current = true;
    });
    return unsubscribe;
  }, [loader]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-zinc-950 select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none block"
      />
    </div>
  );
}
