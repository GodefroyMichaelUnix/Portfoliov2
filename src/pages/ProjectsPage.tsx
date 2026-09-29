import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { ProjectItem } from '../types/portfolio';
import { CountUpNumber } from '../components/CountUpNumber';
import { PageIntro } from '../components/PageIntro';
import { Artwork } from '../components/Artwork';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { SectionHead } from '../components/Folio';

interface ProjectsPageProps {
  projects: ProjectItem[];
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
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'workflows' | 'ai-agents' | 'data-infra'>('all');

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <PageTransition>
      <div className="studio-page projects-page">
        <PageIntro number="01" label="Réalisations" title="Moins de friction." accent="Plus d’impact." description="Des problèmes concrets. Des systèmes sur mesure. Découvrez ce qui se passe derrière chaque automatisation." />
        <SectionHead label="Réalisations" title="Des systèmes concrets." lead="Chaque projet part d’un problème réel." text="Contexte, problème, solution et résultat mesurable : chaque dossier montre ce qui se passe derrière l’automatisation." />
        {projects.length > 0 && (
          <div className="project-index-bar">
            <span className="chapter-meta">INDEX / {String(projects.length).padStart(2, '0')} SYSTÈMES</span>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer les projets">
              {[
                { id: 'all', label: `Tous (${projects.length})` },
                { id: 'ai-agents', label: 'IA' },
                { id: 'workflows', label: 'Workflows' },
                { id: 'data-infra', label: 'Data' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  data-testid={`project-filter-${tab.id}`}
                  aria-pressed={activeFilter === tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-orange-600 dark:bg-orange-500 text-white dark:text-white'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="projects-empty fb-card"
            data-testid="projects-empty-state"
          >
            <svg className="projects-empty-flow" viewBox="0 0 420 70" aria-hidden="true">
              <path d="M 20 35 C 90 35, 90 12, 160 12 S 230 58, 300 58 S 370 35, 400 35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" className="animate-circuit-flow" />
              {[[20, 35], [160, 12], [300, 58], [400, 35]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="6" className="flow-node" />)}
              <circle r="4" className="flow-pulse">
                <animateMotion dur="4.5s" repeatCount="indefinite" path="M 20 35 C 90 35, 90 12, 160 12 S 230 58, 300 58 S 370 35, 400 35" />
              </circle>
            </svg>
            <span className="chapter-meta mb-5"><span className="signal-dot" />EN PRÉPARATION</span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-100">
              Projets à <span className="editorial-accent">venir.</span>
            </h2>
            <p className="max-w-xl mt-6 text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              De nouveaux systèmes d’automatisation, d’intégration IA et d’ingénierie seront présentés ici au fur et à mesure de leur construction.
            </p>
          </motion.div>
        ) : (
        <>
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-3" data-testid="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                variants={staggerItem}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                className="group fb-card overflow-hidden p-3"
                data-testid={`project-${project.id}`}
              >
                <Artwork kind={project.category === 'ai-agents' ? 'agent-core' : project.category === 'workflows' ? 'workflow' : 'data-vault'} index={String(projects.indexOf(project) + 1).padStart(2, '0')} label={project.categoryLabel} />
                <div className="p-5 md:p-7">
                  <span className="fb-row-cat">{project.categoryLabel}</span>
                  <h2 className="fb-row-title mt-2">{project.title}</h2>
                  <p className="fb-row-text mt-2">{project.subtitle}</p>
                  <details className="project-details mt-6" data-testid={`project-details-${project.id}`}>
                    <summary data-testid={`project-inspect-${project.id}`} className="fb-pill fb-pill-orange"><span>Voir</span><span className="fb-pill-dot"><ArrowUpRight size={16} /></span></summary>
                    <div className="space-y-5 pt-6">
                      {[['Contexte', project.context], ['Problème', project.problem], ['Solution', project.solution]].map(([label, text]) => <div key={label}><h3 className="fb-label !mb-1">{label}</h3><p className="fb-row-text">{text}</p></div>)}
                      {project.architectureSummary && project.architectureSummary.length > 0 && (
                        <div className="fb-list" data-testid={`architecture-${project.id}`}>
                          {project.architectureSummary.map((step, i) => <div key={step} className="flex items-center gap-4 py-3 border-b border-[var(--fb-line)]"><span className="fb-row-cat">0{i + 1}</span><span className="fb-row-text">{step}</span><ArrowDownRight size={15} className="ml-auto" /></div>)}
                        </div>
                      )}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          {project.metrics.slice(0, 2).map((metric, mIdx) => (
                            <div key={mIdx} data-testid={`project-metric-${project.id}-${mIdx}`} className="fb-card p-5">
                              <div className="text-3xl font-extrabold text-orange-500 tracking-tighter"><CountUpNumber value={metric.value} /></div>
                              <div className="fb-row-text mt-1">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="dossier-result" data-testid={`project-result-${project.id}`}>
                        <span className="fb-label !mb-1">Résultat clé</span>
                        <div className="text-lg font-bold leading-tight">{project.measurableResult}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => <span key={tech} className="text-sm font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-full">{tech}</span>)}
                      </div>
                    </div>
                  </details>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <section className="mt-24" data-testid="projects-recent-list">
          <SectionHead label="Index" title="Projets récents" />
          <div className="fb-list">
            {projects.map((project, i) => (
              <div key={project.id} className="fb-row" data-testid={`projects-row-${i}`}>
                <span className="fb-row-cat">{project.categoryLabel}</span>
                <span className="fb-row-title">{project.title}</span>
                <span className="fb-row-text">{project.subtitle}</span>
                <span className="fb-row-year">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </section>
        </>
        )}
      </div>
    </PageTransition>
  );
};
