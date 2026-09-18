import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type SoundState = { enabled: boolean; available: boolean; toggle: () => void; boot: () => void };
const SoundContext = createContext<SoundState>({ enabled: false, available: false, toggle: () => {}, boot: () => {} });

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [enabled, setEnabled] = useState(() => localStorage.getItem('portfolio-sound') === 'on');
  const available = typeof window.AudioContext !== 'undefined';
  const context = useRef<AudioContext | null>(null);
  const active = useRef(enabled);
  const bootPlayed = useRef(false);
  const lastClick = useRef(0);

  const play = useCallback((kind: 'boot' | 'click', userGesture = false) => {
    if (!active.current || !available || document.hidden) return;
    if (!context.current && !userGesture) return;
    context.current ??= new AudioContext();
    const ctx = context.current;
    const schedule = () => {
      if (ctx.state !== 'running' || !active.current) return;
      const frequencies = kind === 'boot' ? [392, 587.33, 783.99] : [920];
      frequencies.forEach((frequency, index) => {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + index * 0.075;
        const duration = kind === 'boot' ? 0.28 : 0.045;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, start);
        if (kind === 'click') oscillator.frequency.exponentialRampToValueAtTime(460, start + duration);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(kind === 'boot' ? 0.024 : 0.016, start + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(start);
        oscillator.stop(start + duration + 0.01);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      });
      if (kind === 'boot') bootPlayed.current = true;
    };
    if (ctx.state === 'suspended' && userGesture) void ctx.resume().then(schedule).catch(() => {});
    else schedule();
  }, [available]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!event.isTrusted || target.closest('[data-sound-control]') || !target.closest('button, a, summary')) return;
      if (performance.now() - lastClick.current < 65) return;
      lastClick.current = performance.now();
      play(bootPlayed.current ? 'click' : 'boot', true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [play]);

  useEffect(() => () => { void context.current?.close(); context.current = null; }, []);
  const toggle = () => {
    active.current = !active.current;
    setEnabled(active.current);
    localStorage.setItem('portfolio-sound', active.current ? 'on' : 'off');
    if (active.current) play('boot', true);
    else void context.current?.suspend();
  };
  return <SoundContext.Provider value={{ enabled, available, toggle, boot: () => { if (!bootPlayed.current) play('boot'); } }}>{children}</SoundContext.Provider>;
};

export const useSound = () => useContext(SoundContext);
