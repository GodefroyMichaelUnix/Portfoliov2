import React from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

const WORDS = [
  'Automatisation',
  'Agents IA',
  'Workflows',
  'Intégrations API',
  'Pipelines de données',
  'Orchestration',
];

const Separator: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 md:w-7 md:h-7 text-orange-600 dark:text-orange-500 shrink-0"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" />
  </svg>
);

export const EditorialMarquee: React.FC = () => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const drift = useSpring(useTransform(scrollY, [0, 6000], [0, -600]), { stiffness: 60, damping: 20 });

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden py-10 sm:py-14 relative"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <motion.div style={reduced ? {} : { x: drift }}>
      <motion.div
        className="flex items-center gap-10 md:gap-16 w-max"
        animate={reduced ? { x: '0%' } : { x: ['0%', '-50%'] }}
        transition={reduced ? { duration: 0 } : { ease: 'linear', duration: 56, repeat: Infinity }}
      >
        {[...WORDS, ...WORDS].map((word, index) => (
          <div key={index} className="flex items-center gap-10 md:gap-16 shrink-0">
            <span
              className={`font-display font-black uppercase tracking-tighter leading-none text-5xl sm:text-7xl lg:text-8xl whitespace-nowrap ${
                index % WORDS.length === 1
                  ? 'text-orange-600 dark:text-orange-500'
                  : 'text-transparent'
              }`}
              style={
                index % WORDS.length === 1
                  ? undefined
                  : { WebkitTextStroke: '1.5px rgb(161 161 170 / 0.55)' }
              }
            >
              {word}
            </span>
            <Separator />
          </div>
        ))}
      </motion.div>
      </motion.div>
    </div>
  );
};
