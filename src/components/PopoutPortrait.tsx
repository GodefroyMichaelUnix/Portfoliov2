import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import michaelPortrait from '../assets/images/michael_seated_trimmed.png';

interface PopoutPortraitProps {
  className?: string;
  badgeText?: string;
  treatment?: 'editorial' | 'machine';
}

export const PopoutPortrait: React.FC<PopoutPortraitProps> = ({
  className = '',
  badgeText = 'AI & AGENTS',
  treatment = 'editorial',
}) => {
  const reduced = useReducedMotion();


  return (
    <motion.figure data-testid={`${treatment}-portrait`} className={`portrait-stage ${treatment === 'machine' ? 'portrait-stage-machine' : ''} ${className}`} whileHover={reduced ? undefined : { y: -5 }} transition={{ duration: 0.6 }}>
      {treatment === 'machine' ? <div className="portrait-halo" aria-hidden="true"><div className="portrait-orbit" /></div> : <div className="portrait-field" aria-hidden="true"><span className="portrait-signature">mg.</span></div>}
      <img src={michaelPortrait} alt="Michael Godefroy" className="portrait-cutout" fetchPriority="high" />
      <figcaption className="portrait-caption"><span>{badgeText}</span><span>{treatment === 'machine' ? 'HUMAIN × TECHNOLOGIE' : 'Créateur de connexions'}</span><span className="signal-dot" /></figcaption>
    </motion.figure>
  );
};
