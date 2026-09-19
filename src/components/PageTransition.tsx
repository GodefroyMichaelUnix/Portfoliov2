import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;
const CONTENT_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cinematic page transition:
 * on exit, a full-viewport orange curtain falls and covers the screen,
 * then lifts upward on the new page to reveal the next content.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const reduced = useReducedMotion();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 28 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: reduced ? 0 : 0.3, duration: 0.55, ease: CONTENT_EASE },
        }}
        exit={{
          opacity: 0,
          y: reduced ? 0 : -24,
          transition: { duration: 0.26, ease: CURTAIN_EASE },
        }}
        className="w-full"
      >
        {children}
      </motion.div>

      <motion.div
        className="page-curtain"
        initial={{ scaleY: reduced ? 0 : 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.55, ease: CURTAIN_EASE, delay: 0.06 } }}
        exit={{ scaleY: 1, transition: { duration: 0.38, ease: CURTAIN_EASE } }}
      >
        <span className="page-curtain-mark" aria-hidden="true">MG.</span>
      </motion.div>
    </>
  );
};
