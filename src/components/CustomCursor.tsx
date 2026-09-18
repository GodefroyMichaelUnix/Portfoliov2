import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile || reduced) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="project"]')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, reduced]);

  if (reduced || window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full bg-orange-500 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference overflow-hidden"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ width: 16, height: 16 }}
      animate={{
        width: hovered ? 80 : 16,
        height: hovered ? 80 : 16,
        backgroundColor: hovered ? '#ffffff' : '#f97316',
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
        className="text-black text-xs font-bold uppercase tracking-widest"
      >
        Voir
      </motion.span>
    </motion.div>
  );
};
