import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { ProjectItem } from '../types/portfolio';
import { CountUpNumber } from '../components/CountUpNumber';
import { PageIntro } from '../components/PageIntro';
import { Artwork } from '../components/Artwork';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

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

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'workflows' | 'ai-agents' | 'data-infra'>('all');

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <PageTransition>
      <div className="studio-page projects-page">
        <PageIntro number="01" label="Réalisations" title="Moins de friction." accent="Plus d’impact." description="Des problèmes concrets. Des systèmes sur mesure. Découvrez ce qui se passe derrière chaque automatisation." />
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

        {/* Minimal Project Feed */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="projects-gallery"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                variants={staggerItem}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                className="group project-dossier"
                data-testid={`project-${project.id}`}
              >
                <div className="dossier-visual">
                  <Artwork kind={project.category === 'ai-agents' ? 'agent-core' : project.category === 'workflows' ? 'workflow' : 'data-vault'} index={String(projects.indexOf(project) + 1).padStart(2, '0')} label={project.categoryLabel} />
                  <div className="dossier-architecture" data-testid={`architecture-${project.id}`}>
                    <span className="chapter-meta">LOGIQUE DU SYSTÈME</span>
                    {project.architectureSummary?.map((step, i) => <div key={step}><span className="text-orange-500 font-mono">0{i + 1}</span><span>{step}</span><ArrowDownRight size={15} /></div>)}
                  </div>
                </div>
                <div className="dossier-content">
                  {/* Left Specs */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-zinc-800 px-4 py-2 rounded-full shadow-sm">
                        {project.categoryLabel}
                      </span>
                      <div>
                        <h2 className="dossier-title">
                          {project.title}
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <details className="project-details" data-testid={`project-details-${project.id}`}>
                      <summary data-testid={`project-inspect-${project.id}`}>Ouvrir le dossier <ArrowUpRight size={17} /></summary>
                      <div className="space-y-5 pt-6 pb-3">
                        {[['Contexte', project.context], ['Problème', project.problem], ['Solution', project.solution]].map(([label, text]) => <div key={label}><h3 className="chapter-meta mb-2">{label}</h3><p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{text}</p></div>)}
                      </div>
                    </details>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-xs font-bold bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-lg shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Metrics & Highlights */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {project.metrics.slice(0,2).map((metric, mIdx) => (
                          <div key={mIdx} data-testid={`project-metric-${project.id}-${mIdx}`} className="dossier-metric">
                            <div className="text-3xl font-black text-orange-600 dark:text-orange-500 tracking-tighter">
                              <CountUpNumber value={metric.value} />
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mt-2">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="dossier-result" data-testid={`project-result-${project.id}`}>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-orange-200 block mb-2">
                        Résultat clé
                      </span>
                      <div className="text-lg font-bold leading-tight">
                        {project.measurableResult}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  );
};
