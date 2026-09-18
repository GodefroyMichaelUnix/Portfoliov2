import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxVisualProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  speed?: 'subtle' | 'medium' | 'gentle';
}

/**
 * Adds a subtle, elegant parallax displacement to visuals/cards during scrolling.
 * Uses motion's useScroll + useTransform to provide real visual depth without breaking layout.
 */
export const ParallaxVisual: React.FC<ParallaxVisualProps> = ({
  children,
  offset = 18,
  className = '',
  speed = 'subtle'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const range = speed === 'gentle' ? 12 : speed === 'medium' ? 26 : offset;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <div ref={containerRef} className={`relative will-change-transform ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};
