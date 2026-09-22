import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { ProfileInfo } from '../types/portfolio';
import { PopoutPortrait } from '../components/PopoutPortrait';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { PageIntro } from '../components/PageIntro';
import { VideoPresentation } from '../components/VideoPresentation';

interface AboutPageProps {
  profile: ProfileInfo;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 25
    }
  }
};

export const AboutPage: React.FC<AboutPageProps> = ({ profile }) => {
  const journeyItems = (profile.about_journey && profile.about_journey.length > 0)
    ? profile.about_journey
    : (profile.aboutJourney && profile.aboutJourney.length > 0 ? profile.aboutJourney : []);

  const methodologyPhases = (profile.methodology && profile.methodology.length > 0)
    ? profile.methodology
    : [];

  const manifestoText = (profile.about_manifesto || profile.aboutManifesto || '').trim();
  const closingText = (profile.about_closing || profile.aboutClosing || '').trim();

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
            <h2 className="chapter-meta">
              01 / {profile.roleSubtitle || profile.title || ''}
            </h2>
            
            {profile.bioSummary && profile.bioSummary.length > 0 && (
              <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed">
                {profile.bioSummary.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {profile.aboutExpertise && profile.aboutExpertise.length > 0 && (
              <div className="grid grid-cols-2 gap-4 pt-4">
                {profile.aboutExpertise.map((item, idx) => (
                  <div key={idx} className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-[24px]">
                    <span className="block text-sm font-black text-orange-600 dark:text-orange-500 uppercase tracking-widest mb-1">{item.label}</span>
                    <span className="block text-xs font-bold text-zinc-500 dark:text-zinc-400">{item.sub}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-1/2 min-w-0 flex flex-col items-center justify-center">
            <PopoutPortrait 
              treatment="machine"
              badgeText="L’HUMAIN / MG"
              imageSrc={profile.heroPhotoUrl || profile.avatarUrl}
              name={profile.name}
            />
            <div className="mt-4 px-6 py-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg text-center">
              <span className="block font-black text-2xl tracking-tight text-zinc-900 dark:text-white">{profile.name}</span>
              {profile.location && <span className="block text-xs font-bold uppercase tracking-widest text-orange-500 mt-1">{profile.location}</span>}
            </div>
          </div>
        </motion.div>

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
                <h2 className="text-4xl sm:text-5xl font-black text-orange-600 dark:text-orange-500 tracking-tighter leading-[1.1]">
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
            <motion.div variants={staggerItem} className="journey-timeline">
              <div className="journey-rail" aria-hidden="true" />
              <div className="journey-entries">
                {journeyItems.map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="journey-entry" data-testid={`journey-${item.year}`}>
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
            <motion.div variants={staggerItem} className="bg-zinc-900 text-white p-10 md:p-14 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
              <p className="text-lg md:text-xl font-medium leading-relaxed relative z-10 text-zinc-300">
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
              <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-500 tracking-tighter">
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

        <div className="about-film">
          <VideoPresentation
            videoSrcFr={profile.presentationVideoUrl}
            posterUrl={profile.presentationVideoPoster || '/art/agent-core.webp'}
          />
        </div>
        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center pt-10"
        >
          <MagneticWrapper strength={0.4}>
            <Link
              data-testid="about-contact-cta"
              to="/contact"
              className="px-10 py-5 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white rounded-full text-sm font-bold uppercase tracking-widest transition-transform shadow-xl flex items-center gap-3 cursor-pointer"
            >
              <span>Démarrer un échange</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MagneticWrapper>
        </motion.div>
      </div>
    </PageTransition>
  );
};
