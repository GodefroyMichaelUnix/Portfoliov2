import React, { useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import Lenis from 'lenis';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;

    window.history.scrollRestoration = 'manual';

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    const forceTop = () => {
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };

    window.addEventListener('portfolio:scroll-top', forceTop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('portfolio:scroll-top', forceTop);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
};
