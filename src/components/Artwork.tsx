import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export type ArtKind = 'agent-core' | 'workflow' | 'data-vault';
const descriptions = {
  'agent-core': 'Noyau d’agent IA : anneau de métal et sphère lumineuse reliée à ses satellites',
  workflow: 'Workflow sculptural : modules en aluminium connectés par des conduits orange',
  'data-vault': 'Architecture de données : disques de verre en suspension autour d’un axe lumineux',
};

export const Artwork = ({ kind, index = '01', label, className = '', priority = false }: { kind: ArtKind; index?: string; label?: string; className?: string; priority?: boolean }) => {
  const reduced = useReducedMotion();
  const frame = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 120, damping: 25 });
  const rotateY = useSpring(x, { stiffness: 120, damping: 25 });
  const move = (event: React.PointerEvent) => {
    if (reduced || event.pointerType !== 'mouse' || !frame.current) return;
    const rect = frame.current.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 5);
    y.set(-((event.clientY - rect.top) / rect.height - 0.5) * 5);
  };
  return (
    <motion.figure ref={frame} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }} style={{ rotateX, rotateY, transformPerspective: 1200 }} className={`artwork ${className}`} data-testid={`artwork-${kind}-${index}`}>
      <img src={`/art/${kind}.webp`} alt={descriptions[kind]} loading={priority ? 'eager' : 'lazy'} decoding="async" width="1600" height="900" />
      <div className="artwork-top" aria-hidden="true"><span>FIG. {index}</span><span>MG / SYSTEM OBJECTS</span></div>
      <figcaption><span>{label || descriptions[kind].split(' :')[0]}</span><span className="art-cross">+</span></figcaption>
    </motion.figure>
  );
};
