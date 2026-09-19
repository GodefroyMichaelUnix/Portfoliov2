import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ProfileInfo } from '../types/portfolio';
import { PopoutPortrait } from './PopoutPortrait';
import { CountUpNumber } from './CountUpNumber';
import { MagneticWrapper } from './MagneticWrapper';

interface HeroProps {
  profile: ProfileInfo;
}

const MASK_EASE = [0.16, 1, 0.3, 1] as const;

const MaskedLine: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <span className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${className}`}>
    <motion.span
      initial={{ y: '112%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1.1, ease: MASK_EASE, delay }}
      className="block will-change-transform"
    >
      {children}
    </motion.span>
  </span>
);

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 45]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -30]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  // Subtle 3D tilt following the mouse on the portrait composition
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      data-testid="home-hero"
      onMouseMove={reduced ? undefined : handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="editorial-hero"
    >
      <motion.div
        style={reduced ? {} : { y: y1 }}
        className="editorial-hero-grid"
      >
        {/* Left Column: Heading, Value Proposition & Actions */}
        <div className="hero-copy space-y-10 z-10">
          <div className="space-y-7">
            {/* Kinetic masked line reveal */}
            <h1 className="hero-name" data-testid="hero-title" aria-label={profile.name}>
              <MaskedLine delay={0.15}>{profile.name.split(' ')[0]}</MaskedLine>
              <MaskedLine delay={0.3} className="hero-name-accent">{profile.name.split(' ').slice(1).join(' ')}<span className="hero-name-period">.</span></MaskedLine>
            </h1>
            <p className="hero-profession" data-testid="hero-profession">{profile.title}<span>Automatisation & intégrations</span></p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease: MASK_EASE }}
              className="hero-description"
            >
              {profile.valueProposition}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: MASK_EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticWrapper strength={0.3}>
              <Link
                data-testid="hero-start"
                to="/contact"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white rounded-full text-sm font-bold uppercase tracking-widest transition-transform shadow-xl flex items-center gap-3 cursor-pointer"
              >
                <span>Démarrer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticWrapper>

            <MagneticWrapper strength={0.2}>
              <Link
                data-testid="hero-projects"
                to="/projets"
                className="px-8 py-4 bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-zinc-400 dark:hover:border-zinc-600 rounded-full text-sm font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Projets
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>

        {/* Right Column: 3D Pop-Out Portrait with mouse tilt */}
        <motion.div
          style={reduced ? {} : { y: y2 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: MASK_EASE }}
          className="hero-visual relative [perspective:1400px]"
        >
          <span className="hero-system-caption">UN ESPRIT CURIEUX. DES SYSTÈMES UTILES.</span>
          <motion.div className="hero-portrait-wrap" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
            <PopoutPortrait
              badgeText="AI & AGENT"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Metrics Bar */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1 } } }}
        initial="hidden"
        animate="show"
        className="hero-metrics"
      >
        {profile.stats.map((stat, idx) => (
          <motion.div
            key={idx}
            data-testid={`hero-stat-${idx}`}
            className="space-y-2"
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: MASK_EASE } },
            }}
          >
            <div className="font-display text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">
              <CountUpNumber value={stat.value} />
            </div>
            <div className="font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.25em]">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="hero-scroll-hint"
        style={{ opacity: opacityFade }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <div className="w-px h-12 bg-zinc-300 dark:bg-zinc-700 overflow-hidden">
          <div className="w-full h-full bg-orange-600 dark:bg-orange-500 animate-scroll-hint" />
        </div>
      </motion.div>
    </section>
  );
};
