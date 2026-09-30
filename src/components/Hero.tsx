import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ProfileInfo, SkillCategory } from '../types/portfolio';
import { Pill } from './Folio';

interface HeroProps {
  profile: ProfileInfo;
  skills: SkillCategory[];
  backgroundImage?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

export const Hero: React.FC<HeroProps> = ({ profile, skills, backgroundImage }) => {
  const reduced = useReducedMotion();

  return (
    <section id="hero" data-testid="home-hero" className="fb-hero">
      <motion.img
        src={backgroundImage || "/art/ref/home.jpg"}
        alt=""
        aria-hidden="true"
        className="page-hero-img"
        initial={reduced ? false : { scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      />
      <div className="fb-hero-main">
        <div>
          <motion.span {...rise(0.1)} className="fb-hero-hello">Salut, je suis</motion.span>
          <h1 className="fb-hero-name" data-testid="hero-title">
            <span className="title-mask">
              <motion.span initial={reduced ? false : { y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: EASE }} className="fb-gold">
                {profile.name}
              </motion.span>
            </span>
          </h1>
        </div>
        <motion.div {...rise(0.5)} className="fb-hero-aside">
          <p className="fb-lead" data-testid="hero-profession">{profile.title}</p>
          {profile.valueProposition && <p data-testid="hero-description">{profile.valueProposition}</p>}
          <div className="fb-hero-actions">
            <Pill to="/contact" testId="hero-start">Démarrer</Pill>
            <Pill to="/projets" variant="ghost" testId="hero-projects">Projets</Pill>
          </div>
        </motion.div>
      </div>

      {skills.length > 0 && (
        <div className="fb-hero-index" data-testid="hero-index">
          {skills.slice(0, 3).map((category, i) => (
            <motion.div key={category.id} {...rise(0.8 + i * 0.1)}>
              <span>#{String(i + 1).padStart(2, '0')}</span>
              <strong>{category.title}</strong>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
