import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Network, Cpu, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { SkillCategory, SkillItem } from '../types/portfolio';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { PageIntro } from '../components/PageIntro';
import { WorkflowDiagram } from '../components/WorkflowDiagram';
import { TiltCard } from '../components/TiltCard';

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
    transition: { staggerChildren: 0.09 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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
    <div className="skill-visual relative w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center overflow-hidden">
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
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
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
                    {category.skills.length} compétences présentées avec leur usage concret.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                  {category.skills.map((skill, skillIdx) => (
                    <TiltCard
                      key={skill.name}
                      variants={staggerItem}
                      whileHover={{ y: -8 }}
                      data-testid={`skill-${category.id}-${skillIdx}`}
                      className="group fb-skill-card"
                    >
                      <div className="fb-skill-logo"><SkillVisual skill={skill} /></div>
                      <h3 className="fb-skill-name">{skill.name}</h3>
                      {skill.useCase && <p className="fb-skill-text">{skill.useCase}</p>}
                    </TiltCard>
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
