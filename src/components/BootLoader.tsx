import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useSound } from '../context/SoundContext';

interface BootLoaderProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { at: 5, text: '> initialisation du système' },
  { at: 35, text: '> module automation.core — ok' },
  { at: 65, text: '> module agents.ia — ok' },
  { at: 90, text: '> interface prête' },
];

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const sound = useSound();
  const reduced = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + 6 + Math.random() * 11);
        return next;
      });
    }, 110);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => { sound.boot(); onComplete(); }, reduced ? 0 : 220);
      return () => clearTimeout(t);
    }
  }, [progress, onComplete]);

  const done = progress >= 100;

  return (
    <motion.div
      exit={reduced ? { opacity: 0 } : { y: '-100%' }}
      data-testid="boot-loader"
      transition={{ duration: reduced ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] bg-[#F6F7F9] dark:bg-zinc-950 flex flex-col items-center justify-center font-mono select-none"
    >
      <div className="boot-watermark" aria-hidden="true">MG.</div>
      <div className="w-[min(420px,80vw)] space-y-6 relative z-10">
        <div className="font-serif-accent text-5xl tracking-tight mb-12">L’intelligence <span className="text-orange-500 italic">en mouvement.</span></div>
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
          <span>MG // Systems</span>
          <span className="text-orange-600 dark:text-orange-500">boot</span>
        </div>

        <div className="space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 min-h-[88px]">
          {BOOT_LINES.filter((l) => progress >= l.at).map((l) => (
            <motion.p
              key={l.text}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {l.text}
            </motion.p>
          ))}
        </div>

        <div className="space-y-2">
          <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <motion.div
              className="h-full bg-orange-600 dark:bg-orange-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
            <span>{done ? 'prêt' : 'chargement des modules'}</span>
            <span className="text-zinc-800 dark:text-zinc-200 font-semibold tabular-nums">
              {String(Math.floor(progress)).padStart(3, '0')}%
            </span>
          </div>
        </div>
        <button type="button" data-testid="boot-sound-toggle" data-sound-control disabled={!sound.available} onClick={sound.toggle} aria-pressed={sound.enabled} className="boot-sound-button">
          {sound.enabled ? 'Son activé — couper' : 'Entrer avec le son'} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </motion.div>
  );
};
