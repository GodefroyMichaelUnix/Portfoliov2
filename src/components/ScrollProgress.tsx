import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

/**
 * Thin orange rail fixed at the very top of the viewport,
 * filling left-to-right as the user scrolls. Springs for a fluid feel.
 */
export const ScrollProgress: React.FC = () => {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  if (reduced) return null;

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
};
