import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, className = "", element = 'h2' }) => {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[element] as any;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.07,
      }
    }
  };

  const item = {
    hidden: { y: '115%' },
    show: {
      y: '0%',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <MotionTag
      variants={container}
      initial={reduced ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] pb-[0.1em] -mb-[0.1em] align-bottom">
          <motion.span variants={item} className="inline-block will-change-transform">
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};
