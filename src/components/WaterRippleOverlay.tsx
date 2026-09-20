import React, { useEffect, useRef } from 'react';
import { WaterRippleData } from '../context/ThemeContext';

interface WaterRippleOverlayProps {
  ripple: WaterRippleData;
  onComplete: () => void;
}

export const WaterRippleOverlay: React.FC<WaterRippleOverlayProps> = ({ ripple, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { x, y, targetTheme, duration = 950, endRadius } = ripple;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    const hasViewTransition =
      typeof document !== 'undefined' && 'startViewTransition' in document;

    // Fluid liquid ease-out curve matching CSS cubic-bezier(0.2, 0.8, 0.25, 1)
    const easeLiquidOut = (t: number) => 1 - Math.pow(1 - t, 3);

    let animId: number;
    let startTime: number | null = null;

    const render = (now: number) => {
      if (startTime === null) {
        startTime = now;
      }
      const elapsed = Math.max(0, now - startTime);
      const t = Math.max(0, Math.min(1, elapsed / duration));
      const progress = Math.max(0, easeLiquidOut(t));
      const currentRadius = Math.max(0, progress * endRadius);

      ctx.clearRect(0, 0, width, height);

      // Fallback for browsers without native View Transitions:
      // Fill the expanding liquid circle with the target theme background
      if (!hasViewTransition && currentRadius > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = targetTheme === 'dark' ? '#09090b' : '#fafaf8';
        ctx.fill();
        ctx.restore();
      }

      // 1. Luminous water wavefront crest (travels in lockstep with the theme boundary)
      if (currentRadius > 0 && t < 0.98) {
        const fade = Math.max(0, (1 - Math.pow(t, 2.2)) * 0.85);

        // Soft outer caustic aura (refraction halo)
        ctx.beginPath();
        ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle =
          targetTheme === 'dark'
            ? `rgba(251, 133, 57, ${fade * 0.35})`
            : `rgba(234, 88, 12, ${fade * 0.3})`;
        ctx.lineWidth = 5;
        ctx.stroke();

        // Sharp water wavefront edge
        ctx.beginPath();
        ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle =
          targetTheme === 'dark'
            ? `rgba(255, 237, 213, ${fade * 0.95})`
            : `rgba(234, 88, 12, ${fade * 0.85})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 2. Trailing harmonic wave (gentle secondary ripple echoing behind)
      const lagElapsed = elapsed - 85;
      if (lagElapsed > 0 && lagElapsed < duration) {
        const tHarm = Math.max(0, Math.min(1, lagElapsed / duration));
        const rHarm = Math.max(0, easeLiquidOut(tHarm) * endRadius);
        const fadeHarm = Math.max(0, (1 - tHarm) * 0.4);

        if (rHarm > 0) {
          ctx.beginPath();
          ctx.arc(x, y, rHarm, 0, Math.PI * 2);
          ctx.strokeStyle =
            targetTheme === 'dark'
              ? `rgba(251, 133, 57, ${fadeHarm * 0.6})`
              : `rgba(234, 88, 12, ${fadeHarm * 0.5})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // 3. Initial droplet splash ring (tactile local pulse around the button)
      if (elapsed < 280) {
        const tDrop = Math.max(0, Math.min(1, elapsed / 280));
        const rDrop = Math.max(0, (1 - Math.pow(1 - tDrop, 2)) * 60);
        const fadeDrop = Math.max(0, (1 - tDrop) * 0.7);

        if (rDrop > 0) {
          ctx.beginPath();
          ctx.arc(x, y, rDrop, 0, Math.PI * 2);
          ctx.strokeStyle =
            targetTheme === 'dark'
              ? `rgba(251, 133, 57, ${fadeDrop})`
              : `rgba(234, 88, 12, ${fadeDrop})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      if (t < 1) {
        animId = requestAnimationFrame(render);
      } else {
        onComplete();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [ripple.id, duration, endRadius, onComplete, targetTheme, x, y]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[10000] select-none"
      aria-hidden="true"
    />
  );
};
