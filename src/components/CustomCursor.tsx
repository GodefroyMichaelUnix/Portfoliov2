import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

type CursorMode = 'default' | 'link' | 'project';

/**
 * Premium dual-layer cursor:
 * - a tight orange dot that follows the pointer almost 1:1
 * - a slower trailing ring that breathes on interactive elements
 *   and expands into a filled "Voir" badge over project cards.
 */
export const CustomCursor: React.FC = () => {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<CursorMode>('default');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 1000, damping: 60, mass: 0.15 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 60, mass: 0.15 });
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile || reduced) return;

    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="project"]')) {
        setMode('project');
      } else if (target.closest('a, button, summary, input, textarea, select, [role="button"], [data-cursor]')) {
        setMode('link');
      } else {
        setMode('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [x, y, reduced]);

  if (reduced || window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return null;

  const isProject = mode === 'project';
  const isLink = mode === 'link';

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="cursor-ring fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isProject ? 84 : isLink ? 54 : 36,
          height: isProject ? 84 : isLink ? 54 : 36,
          backgroundColor: isProject ? '#ea580c' : 'rgb(234 88 12 / 7%)',
          borderColor: isProject ? 'rgb(234 88 12 / 0%)' : 'rgb(234 88 12 / 65%)',
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 24 }}
      >
        <motion.span
          className="text-[9px] font-bold uppercase tracking-[0.2em] text-white select-none"
          animate={{ opacity: isProject ? 1 : 0, scale: isProject ? 1 : 0.6 }}
          transition={{ duration: 0.18 }}
        >
          Voir
        </motion.span>
      </motion.div>

      {/* Tight dot */}
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-orange-500 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isProject ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </>
  );
};
