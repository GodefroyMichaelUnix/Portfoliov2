import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { SkillCategory } from '../types/portfolio';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { PageIntro } from '../components/PageIntro';
import { WorkflowDiagram } from '../components/WorkflowDiagram';
import { Artwork } from '../components/Artwork';

interface SkillsPageProps {
  skills: SkillCategory[];
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

export const SkillsPage: React.FC<SkillsPageProps> = ({ skills }) => {
  return (
    <PageTransition>
      <div className="studio-page skills-page">
        <PageIntro number="02" label="Savoir-faire" title="Connecter les outils." accent="Libérer le potentiel." description="L’outil n’est jamais le point de départ. Le problème, oui. Une expertise à l’intersection du code, des données et de l’intelligence artificielle." />
        <div className="skills-overview"><span className="chapter-meta">CARTOGRAPHIE / COMPÉTENCES</span><WorkflowDiagram labels={['Code', 'Workflows', 'Intelligence', 'Infrastructure']} /></div>

        {/* Minimal Skills Feed */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-16"
        >
          {skills.map((category, catIdx) => (
            <motion.div
              key={category.id}
              variants={staggerItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="skill-chapter"
              data-testid={`skill-category-${category.id}`}
            >
              <div className="skill-chapter-heading">
                <span className="oversized-index" aria-hidden="true">0{catIdx + 1}</span>
                <span className="chapter-meta">{category.subtitle}</span>
                <h2 className="font-display text-lg font-bold">{category.title}</h2>
                <Artwork kind={catIdx === 0 ? 'workflow' : catIdx === 1 ? 'agent-core' : 'data-vault'} index={`skill-${catIdx}`} label={category.title} />
              </div>

              <div className="skill-modules">
                {category.skills.map((skill, sIdx) => (
                  <motion.div
                    key={sIdx}
                    whileHover={{ x: 5 }}
                    data-testid={`skill-${category.id}-${sIdx}`}
                    className="group skill-module"
                  >
                    <div className="skill-module-heading"><span className="chapter-meta">0{sIdx + 1}</span><span className="skill-level">{skill.levelBadge}</span></div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-light leading-relaxed">
                      {skill.useCase}
                    </p>

                    {skill.tags && skill.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {skill.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-bold shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Minimal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="studio-cta"
        >
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tighter">Stack spécifique ?</h2>
            <p className="text-orange-100 text-sm font-medium opacity-80">
              Adaptation rapide à vos outils existants via API.
            </p>
          </div>
          <MagneticWrapper strength={0.25}>
            <Link
              data-testid="skills-contact-cta"
              to="/contact"
              className="px-8 py-4 bg-white text-orange-900 hover:bg-zinc-50 rounded-full text-xs font-black uppercase tracking-widest transition-all shrink-0 inline-flex items-center gap-3 shadow-lg"
            >
              <span>En discuter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MagneticWrapper>
        </motion.div>
      </div>
    </PageTransition>
  );
};
