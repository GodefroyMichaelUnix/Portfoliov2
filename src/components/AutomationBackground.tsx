import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export const AutomationBackground: React.FC = () => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 500]);
  const y3 = useTransform(scrollY, [0, 2000], [0, -300]);

  return (
    <div
      aria-hidden="true"
      className="ambient-editorial fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* 1. Lueurs d'ambiance chaudes et douces */}
      <motion.div style={reduced ? {} : { y: y1 }} className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-orange-400/10 dark:bg-orange-600/10 blur-[130px]" />
      <motion.div style={reduced ? {} : { y: y2 }} className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full bg-amber-400/10 dark:bg-amber-600/5 blur-[140px]" />
      <motion.div style={reduced ? {} : { y: y3 }} className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/10 dark:bg-orange-700/10 blur-[140px]" />

      {/* 2. Motif de grille de points techniques */}
      <svg className="absolute inset-0 w-full h-full opacity-40 dark:opacity-25">
        <defs>
          <pattern id="tech-dot-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="18" cy="18" r="1" className="fill-zinc-400 dark:fill-zinc-600" />
            <path
              d="M 0 0 L 4 0 M 0 0 L 0 4 M 36 0 L 32 0 M 36 0 L 36 4 M 0 36 L 4 36 M 0 36 L 0 32 M 36 36 L 32 36 M 36 36 L 36 32"
              stroke="currentColor"
              strokeWidth="0.6"
              className="text-zinc-300/80 dark:text-zinc-700/60"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-dot-grid)" />
      </svg>

      {/* 3. Circuits d'automatisation (coordonnées numériques via viewBox) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35 dark:opacity-30"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="circuit-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="circuit-cyan-grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Motif Circuit 1 : En haut à gauche */}
        <g className="text-orange-500">
          <path
            d="M 0 100 L 90 100 L 140 150 L 260 150 M 140 150 L 140 220 L 200 280"
            fill="none"
            stroke="url(#circuit-orange-grad)"
            strokeWidth="1.5"
          />
          <circle cx="90" cy="100" r="3" className="fill-orange-500" />
          <circle cx="260" cy="150" r="3.5" className="fill-orange-500" />
          <circle cx="200" cy="280" r="3" className="fill-amber-500" />
          {/* Piste parallèle avec signal animé */}
          <path
            d="M 0 115 L 75 115 L 115 155 L 180 155"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="3 3"
            className="text-zinc-400 dark:text-zinc-600 animate-circuit-flow"
          />
        </g>

        {/* Motif Circuit 2 : En haut à droite */}
        <g className="text-orange-500">
          <path
            d="M 1440 120 L 1340 120 L 1280 180 L 1160 180 M 1280 180 L 1280 250"
            fill="none"
            stroke="url(#circuit-cyan-grad)"
            strokeWidth="1.5"
          />
          <circle cx="1340" cy="120" r="3" className="fill-orange-500" />
          <circle cx="1160" cy="180" r="3.5" className="fill-amber-500" />
          <circle cx="1280" cy="250" r="3" className="fill-orange-500" />
        </g>

        {/* Motif Circuit 3 : Milieu gauche */}
        <g>
          <path
            d="M 0 520 L 60 520 L 110 470 L 190 470"
            fill="none"
            stroke="url(#circuit-orange-grad)"
            strokeWidth="1.2"
          />
          <circle cx="60" cy="520" r="2.5" className="fill-orange-500" />
          <circle cx="190" cy="470" r="3" className="fill-amber-500" />
        </g>

        {/* Motif Circuit 4 : En bas à droite */}
        <g>
          <path
            d="M 1440 640 L 1320 640 L 1260 580 L 1180 580"
            fill="none"
            stroke="url(#circuit-cyan-grad)"
            strokeWidth="1.5"
          />
          <circle cx="1320" cy="640" r="3" className="fill-orange-500" />
          <circle cx="1180" cy="580" r="3.5" className="fill-amber-500" />
        </g>

        {/* Petits symboles de flux discrets aux extrémités */}
        <g className="text-zinc-400 dark:text-zinc-600 opacity-60">
          <circle cx="40" cy="300" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="40" cy="300" r="2" className="fill-orange-500" />

          <circle cx="1390" cy="420" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="1390" cy="420" r="2" className="fill-amber-500" />
        </g>
      </svg>
    </div>
  );
};
