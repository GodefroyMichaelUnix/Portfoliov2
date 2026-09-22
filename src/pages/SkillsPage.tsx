import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Network, Cpu, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { SkillCategory, SkillItem } from '../types/portfolio';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { PageIntro } from '../components/PageIntro';
import { WorkflowDiagram } from '../components/WorkflowDiagram';

interface SkillsPageProps {
  skills: SkillCategory[];
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Network,
  Cpu,
  Database
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  }
};

const SkillVisual: React.FC<{ skill: SkillItem }> = ({ skill }) => {
  const [failed, setFailed] = React.useState(false);
  const fallback = skill.name
    .split(/[s(&]/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="relative w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center overflow-hidden">
      {skill.imageUrl && !failed ? (
        <img
          src={skill.imageUrl}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-8 h-8 object-contain"
        />
      ) : (
        <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400">
          {fallback || 'MG'}
        </span>
      )}
    </div>
  );
};

export const SkillsPage: React.FC<SkillsPageProps> = ({ skills }) => {
  return (
    <PageTransition>
      <div className="studio-page skills-page">
        <PageIntro
          number="02"
          label="Savoir-faire"
          title="Connecter les outils."
          accent="Libérer le potentiel."
          description="L’outil n’est jamais le point de départ. Le problème, oui. Une cartographie claire de mes compétences, organisée autour des workflows, de l’IA et de l’infrastructure."
        />

        <div className="skills-overview mb-16">
          <div className="flex items-center justify-between gap-4 mb-5">
            <span className="chapter-meta">CARTOGRAPHIE / COMPÉTENCES</span>
            <span className="font-mono text-[10px] text-zinc-400">{skills.reduce((total, category) => total + category.skills.length, 0)} MODULES</span>
          </div>
          <WorkflowDiagram labels={['Code', 'Workflows', 'Intelligence', 'Infrastructure']} />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-20"
        >
          {skills.map((category, catIdx) => {
            const CategoryIcon = CATEGORY_ICONS[category.iconName] || Network;

            return (
              <motion.section
                key={category.id}
                variants={staggerItem}
                className="relative"
                data-testid={`skill-category-${category.id}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-zinc-200 dark:border-zinc-800 pb-7 mb-7">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-500">
                        0{catIdx + 1}
                      </span>
                      <span className="chapter-meta">{category.subtitle}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <CategoryIcon className="w-4 h-4" />
                      </span>
                      <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter">
                        {category.title}
                      </h2>
                    </div>
                  </div>

                  <p className="max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {category.skills.length} compétences présentées comme de petites unités de travail,
                    avec leur usage concret, leur niveau et leurs outils associés.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.article
                      key={skill.name}
                      variants={staggerItem}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                      data-testid={`skill-${category.id}-${skillIdx}`}
                      className="group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 shadow-[0_10px_35px_-28px_rgba(0,0,0,0.35)] hover:border-orange-300/80 dark:hover:border-orange-700/70 hover:shadow-[0_18px_45px_-28px_rgba(234,88,12,0.28)] transition-all"
                    >
                      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-orange-100/50 dark:bg-orange-500/5 blur-2xl pointer-events-none" />

                      <div className="relative flex items-start justify-between gap-4">
                        <SkillVisual skill={skill} />
                        <span className="px-2.5 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          {skill.levelBadge || 'En cours'}
                        </span>
                      </div>

                      <div className="relative mt-5">
                        <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-6 mt-2 min-h-[48px]">
                          {skill.useCase}
                        </p>
                      </div>

                      {skill.tags && skill.tags.length > 0 && (
                        <div className="relative flex flex-wrap gap-1.5 mt-5">
                          {skill.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="relative flex items-center justify-between gap-3 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="chapter-meta">MODULE {String(skillIdx + 1).padStart(2, '0')}</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-orange-500 transition-colors" />
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </motion.div>

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
