import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Artwork, ArtKind } from './Artwork';
import { WorkflowDiagram } from './WorkflowDiagram';
import { WorkflowScenario } from '../types/portfolio';

interface WorkflowShowcaseProps {
  workflows?: WorkflowScenario[];
}

export const WorkflowShowcase: React.FC<WorkflowShowcaseProps> = ({ workflows = [] }) => {
  const [active, setActive] = useState(0);

  if (!workflows || workflows.length === 0) {
    return null;
  }

  const count = workflows.length;
  const safeActive = Math.min(active, count - 1);
  const scenario = workflows[safeActive];

  return (
    <section className="workflow-lab" data-testid="workflow-lab">
      <div className="workflow-lab-layout">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tighter">
            Des connexions.<br />
            <span className="font-serif-accent italic text-orange-600 dark:text-orange-400">Pas de complications.</span>
          </h2>
          <div
            className="workflow-lab-tabs"
            data-testid="workflow-tablist"
            onKeyDown={(event) => {
              const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
              if (!keys.includes(event.key) || count === 0) return;
              event.preventDefault();
              const next =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                  ? count - 1
                  : (safeActive + (event.key === 'ArrowRight' ? 1 : count - 1)) % count;
              setActive(next);
              document.getElementById(`workflow-tab-${next}`)?.focus();
            }}
            role="tablist"
            aria-label="Explorer les automatisations"
          >
            {workflows.map((item, i) => (
              <button
                key={item.id || item.name}
                role="tab"
                tabIndex={i === safeActive ? 0 : -1}
                id={`workflow-tab-${i}`}
                aria-controls="workflow-panel"
                aria-selected={i === safeActive}
                data-testid={`workflow-tab-${i}`}
                onClick={() => setActive(i)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id="workflow-panel"
            aria-labelledby={`workflow-tab-${safeActive}`}
            data-testid="workflow-panel"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={safeActive}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-lg font-semibold mb-3">{scenario.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed min-h-[80px]">
                  {scenario.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <Link data-testid="workflow-contact-cta" to="/contact" className="text-link mt-8">
            Discutons de vos besoins <ArrowUpRight size={18} />
          </Link>
        </div>
        <div>
          <Artwork
            kind={(scenario.kind as ArtKind) || 'workflow'}
            index="lab"
            label="ÉTUDE DE SYSTÈME / VISUALISATION CONCEPTUELLE"
          />
          <div className="workflow-lab-bottom">
            <WorkflowDiagram labels={scenario.nodes} />
          </div>
        </div>
      </div>
    </section>
  );
};
