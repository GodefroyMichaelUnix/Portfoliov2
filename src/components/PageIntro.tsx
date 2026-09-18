import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

interface PageIntroProps { number: string; label: string; title: string; accent: string; description: string; children?: React.ReactNode }

export const PageIntro = ({ number, label, title, accent, description, children }: PageIntroProps) => {
  const reduced = useReducedMotion();
  return (
    <header className="page-intro" data-testid={`page-intro-${number}`}>
      <div className="chapter-meta"><span className="signal-dot" />{label}<span className="chapter-meta-end">PORTFOLIO / {number}</span></div>
      <div className="page-intro-layout">
        <h1 className="editorial-title" data-testid={`page-title-${number}`}>
          {[title, accent].map((line, index) => (
            <span className="title-mask" key={line}><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }} className={index ? 'editorial-accent' : ''}>{line}</motion.span></span>
          ))}
        </h1>
        <motion.div className="intro-aside" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <ArrowDownRight size={32} strokeWidth={1} className="text-orange-500 mb-6" aria-hidden="true" />
          <p>{description}</p>
          {children}
        </motion.div>
      </div>
    </header>
  );
};
