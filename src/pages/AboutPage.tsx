import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import portraitFallback from '../assets/images/michael_portrait_transparent.png';
import { ProfileInfo } from '../types/portfolio';
import { TiltCard } from '../components/TiltCard';
import { SectionHead, Pill } from '../components/Folio';
import { PageIntro } from '../components/PageIntro';

interface AboutPageProps {
  profile: ProfileInfo;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

export const AboutPage: React.FC<AboutPageProps> = ({ profile }) => {
  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 900], [0, -70]);
  const { scrollYProgress: railProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 55%'] });
  const journeyItems = (profile.aboutJourney && profile.aboutJourney.length > 0)
    ? profile.aboutJourney
    : [];

  const methodologyPhases = (profile.methodology && profile.methodology.length > 0)
    ? profile.methodology
    : [];

  const manifestoText = (profile.aboutManifesto || '').trim();
  const closingText = (profile.aboutClosing || '').trim();

  return (
    <PageTransition>
      <div className="studio-page about-page">
        <PageIntro
          number="04"
          label={profile.aboutPageLabel || ''}
          title={profile.aboutPageTitle || ''}
          accent={profile.aboutPageAccent || ''}
          description={profile.aboutPageDescription || ''}
        />
        {/* Intro Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-10 flex flex-col lg:flex-row gap-16 lg:gap-24"
        >
          <div className="lg:w-1/2 min-w-0 space-y-10">
            <div>
              <span className="fb-label">Qui je suis</span>
              <h2 className="fb-title">{profile.roleSubtitle || profile.title || ''}</h2>
            </div>
            
            {profile.bioSummary && profile.bioSummary.length > 0 && (
              <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed">
                {profile.bioSummary.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          <motion.div style={reduced ? {} : { y: portraitY }} className="about-parallax lg:w-1/2 min-w-0 flex flex-col items-center justify-center">
            {(
              <div className="fb-portrait w-full max-w-[480px]" data-testid="about-portrait">
                <img src={profile.heroPhotoUrl || profile.avatarUrl || portraitFallback} alt={profile.name} />
              </div>
            )}
            <div className="mt-4 px-6 py-3 fb-card text-center">
              <span className="block font-black text-2xl tracking-tight text-zinc-900 dark:text-white">{profile.name}</span>
              {profile.location && <span className="block text-xs font-bold uppercase tracking-widest text-orange-500 mt-1">{profile.location}</span>}
            </div>
          </motion.div>
        </motion.div>

        {profile.aboutExpertise && profile.aboutExpertise.length > 0 && (
          <section className="pt-24 pb-8" data-testid="about-services">
            <SectionHead label="Services" title="Ce que je peux faire pour vous" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {profile.aboutExpertise.map((item, idx) => (
                <TiltCard
                  key={idx}
                  data-testid={`about-expertise-${idx}`}
                  className="glass-card p-7 min-h-[200px] flex flex-col justify-between"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="fb-label">#{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="block text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">{item.label}</span>
                    <span className="block mt-2 text-base text-zinc-500 dark:text-zinc-400">{item.sub}</span>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>
        )}

        {/* Mon parcours */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="journey-section space-y-16 border-t border-zinc-200 dark:border-zinc-800 pt-20"
        >
          {/* 1. Paragraphe d'ouverture */}
          {(profile.aboutJourneyIntroTitle || profile.aboutJourneyIntroText) && (
            <motion.div variants={staggerItem} className="max-w-3xl space-y-6">
              {profile.aboutJourneyIntroTitle && (
                <h2 className="fb-title">
                  {profile.aboutJourneyIntroTitle}
                </h2>
              )}
              {profile.aboutJourneyIntroText && (
                <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed">
                  {profile.aboutJourneyIntroText}
                </p>
              )}
            </motion.div>
          )}

          {/* 2. Timeline de parcours */}
          {journeyItems.length > 0 && (
            <motion.div variants={staggerItem} className="journey-timeline" ref={timelineRef}>
              <div className="journey-rail" aria-hidden="true">
                <motion.span className="journey-rail-progress" style={{ scaleY: reduced ? 1 : railProgress }} data-testid="journey-rail-progress" />
              </div>
              <div className="journey-entries">
                {journeyItems.map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }} whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="journey-entry" data-testid={`journey-${item.year}`}>
                    <span className="journey-point" aria-hidden="true" />
                    
                    <h3 className="text-4xl font-black text-orange-600 dark:text-orange-500 mb-4 tracking-tighter">{item.year}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 3. Citation mise en avant */}
          {manifestoText && (
            <motion.div variants={staggerItem} className="manifesto-quote">
              <p className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                {manifestoText.startsWith('"') ? manifestoText : `"${manifestoText}"`}
              </p>
            </motion.div>
          )}

          {/* 4. Paragraphe de transition */}
          {profile.aboutTransitionText && (
            <motion.div variants={staggerItem} className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed">
                {profile.aboutTransitionText}
              </p>
            </motion.div>
          )}

          {/* 5. Bloc de clôture mis en avant */}
          {closingText && (
            <motion.div variants={staggerItem} className="fb-card fb-card-line p-10 md:p-14 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
              <p className="text-lg md:text-xl font-semibold leading-relaxed relative z-10">
                {closingText}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Process Section */}
        {methodologyPhases.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-20"
          >
            <div className="space-y-4">
              <motion.h2 variants={staggerItem} className="fb-title">
                Méthodologie
              </motion.h2>
            </div>

            <div className="method-grid">
              {methodologyPhases.map((phase, idx) => (
                <motion.div 
                  key={idx}
                  variants={staggerItem}
                  whileHover={{ y: -8 }}
                  className="method-phase space-y-6 flex flex-col justify-between"
                  data-testid={`method-${phase.step}`}
                >
                  <div>
                    <span className="font-mono text-sm font-extrabold text-orange-500 mb-4 block">
                      {phase.step}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                      {phase.title}
                    </h3>
                    <ul className="space-y-3">
                      {phase.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <div className="flex justify-center pt-16">
          <Pill to="/contact" testId="about-contact-cta">Démarrer un échange</Pill>
        </div>
      </div>
    </PageTransition>
  );
};
