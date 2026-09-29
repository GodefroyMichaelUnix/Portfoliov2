import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageIntroProps { number: string; label: string; title: string; accent: string; description: string; children?: React.ReactNode }

const PAGES: Record<string, { name: string; image: string }> = {
  '01': { name: 'Projets', image: '/art/ref/projects.jpg' },
  '02': { name: 'Compétences', image: '/art/ref/skills.jpg' },
  '03': { name: 'Certifications', image: '/art/ref/certs.jpg' },
  '04': { name: 'À propos', image: '/art/ref/about.jpg' },
  '05': { name: 'Coulisses', image: '/art/ref/coulisses.jpg' },
  '06': { name: 'Contact', image: '/art/ref/contact.jpg' },
  '07': { name: 'Mes services', image: '/art/ref/services.jpg' },
  '08': { name: 'Passions', image: '/art/ref/passions.jpg' },
};

const EASE = [0.16, 1, 0.3, 1] as const;

export const PageIntro = ({ number, label, title, accent, description, children }: PageIntroProps) => {
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const page = PAGES[number] || PAGES['01'];

  const handleBack = () => {
    const referrerIsInternal = document.referrer.startsWith(window.location.origin);
    if (referrerIsInternal && window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/');
  };

  return (
    <header className="page-hero" data-testid={`page-intro-${number}`}>
      <motion.img
        src={page.image}
        alt=""
        aria-hidden="true"
        className="page-hero-img"
        initial={reduced ? false : { scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 9, ease: 'easeOut' }}
      />
      <button type="button" onClick={handleBack} className="page-hero-back" data-testid={`page-back-${number}`}>
        <ArrowLeft className="w-4 h-4" />
        <span>Retour</span>
      </button>

      <div className="page-hero-bottom">
        <div>
          <motion.span className="fb-label" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}>
            {label}
          </motion.span>
          <h1 className={`page-hero-title ${page.name.length > 9 ? 'is-long' : ''}`} data-testid={`page-title-${number}`}>
            <span className="title-mask">
              <motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.15, ease: EASE }}>{page.name}</motion.span>
            </span>
          </h1>
        </div>
        <motion.div className="page-hero-aside" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
          {(title || accent) && <p className="fb-lead">{[title, accent].filter(Boolean).join(' ')}</p>}
          {description && <p>{description}</p>}
          {children}
        </motion.div>
      </div>
    </header>
  );
};
