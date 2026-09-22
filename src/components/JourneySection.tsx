import React from 'react';
import { motion } from 'motion/react';
import { ProfileInfo } from '../types/portfolio';

interface JourneySectionProps {
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

export const JourneySection: React.FC<JourneySectionProps> = ({ profile }) => {
  const journeyItems = (profile.aboutJourney && profile.aboutJourney.length > 0)
    ? profile.aboutJourney
    : [];

  const manifestoText = (profile.aboutManifesto || '').trim();
  const closingText = (profile.aboutClosing || '').trim();

  if (!profile.aboutJourneyIntroTitle && !profile.aboutJourneyIntroText && journeyItems.length === 0 && !manifestoText && !closingText) {
    return null;
  }

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="journey-section space-y-16 border-t border-zinc-200 dark:border-zinc-800 pt-20"
      data-testid="journey-section"
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
    </motion.section>
  );
};
