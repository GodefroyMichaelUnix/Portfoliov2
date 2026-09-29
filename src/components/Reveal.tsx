import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

type RevealVariant = 'up' | 'mask' | 'blur' | 'left' | 'right' | 'scale';

const HIDDEN: Record<RevealVariant, Record<string, string | number>> = {
  up: { opacity: 0, y: 60 },
  mask: { opacity: 0, clipPath: 'inset(100% 0% 0% 0% round 24px)', y: 40 },
  blur: { opacity: 0, filter: 'blur(14px)', y: 30 },
  left: { opacity: 0, x: -70, filter: 'blur(8px)' },
  right: { opacity: 0, x: 70, filter: 'blur(8px)' },
  scale: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
};

const SHOWN: Record<RevealVariant, Record<string, string | number>> = {
  up: { opacity: 1, y: 0 },
  mask: { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)', y: 0 },
  blur: { opacity: 1, filter: 'blur(0px)', y: 0 },
  left: { opacity: 1, x: 0, filter: 'blur(0px)' },
  right: { opacity: 1, x: 0, filter: 'blur(0px)' },
  scale: { opacity: 1, scale: 1, filter: 'blur(0px)' },
};

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  id?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, variant = 'up', delay = 0, className = '', id }) => (
  <motion.div
    id={id}
    className={className}
    initial={HIDDEN[variant]}
    whileInView={SHOWN[variant]}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export const ScrollScene: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 30%'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.15, 0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);

  return (
    <motion.div ref={ref} id={id} style={reduced ? undefined : { scale, opacity, y }} className={className}>
      {children}
    </motion.div>
  );
};
