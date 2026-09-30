import React, { useRef } from 'react';
import { motion, useScroll, useReducedMotion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  GitBranch,
  Globe2,
  Images,
  Layers3,
  MailCheck,
  PenLine,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Video,
  Workflow
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { PageIntro } from '../components/PageIntro';
import { Artwork } from '../components/Artwork';
import { Reveal } from '../components/Reveal';
import { Pill, SectionHead } from '../components/Folio';
import { MakingOfStep, MakingOfStackItem } from '../types/portfolio';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.15 } } as const;

const ICON_MAP: Record<string, React.ElementType> = {
  Compass: ArrowDownRight,
  PenLine,
  Sparkles,
  Blocks: Layers3,
  Layers3,
  GitBranch,
  Database,
  Braces,
  MailCheck,
  Images,
  Video,
  FileText,
  ShieldCheck,
  Rocket,
  Globe2,
  Bot,
  RefreshCw
};

const architecture = [
  {
    number: '01',
    title: 'Écriture & génération',
    description: 'Le brief, la direction et une partie du code ont été accélérés avec des IA, puis repris manuellement et techniquement.',
    items: ['Google AI Studio', 'Claude', 'ChatGPT / Yuna']
  },
  {
    number: '02',
    title: 'Frontend',
    description: 'L’interface finale est une application React structurée, avec navigation multi-pages, composants réutilisables et animations.',
    items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion', 'React Router']
  },
  {
    number: '03',
    title: 'Données & contenu',
    description: 'Le contenu vivant ne dépend plus de fichiers figés dans les composants. Supabase devient la source de données du portfolio.',
    items: ['Supabase', 'PostgreSQL', 'RLS', 'Supabase Storage', 'portfolioService']
  },
  {
    number: '04',
    title: 'Production & infrastructure',
    description: 'Le code versionné arrive sur Netlify, tandis que le domaine personnalisé est géré via Spaceship et la configuration DNS.',
    items: ['GitHub', 'Netlify', 'Spaceship', 'DNS', 'HTTPS']
  }
];

const productionFlows = [
  {
    label: 'Code',
    flow: ['GitHub', 'main', 'Netlify', 'production']
  },
  {
    label: 'Contenu',
    flow: ['React', 'portfolioService', 'Supabase', 'PostgreSQL']
  },
  {
    label: 'Contact',
    flow: ['Formulaire', 'Edge Function', 'Resend', 'michael@mgodefroy.com']
  },
  {
    label: 'Logos',
    flow: ['TechMarquee', 'tech_stack', 'Storage', 'fallback URL']
  }
];

const aiRoles = [
  {
    icon: Sparkles,
    title: 'Google AI Studio',
    description: 'Point de départ pour générer la base frontend et explorer rapidement des structures, composants et directions visuelles à partir de prompts détaillés.'
  },
  {
    icon: Code2,
    title: 'Claude',
    description: 'Partenaire de revue technique et de debugging : lecture du code, diagnostic de comportements subtils, corrections ciblées et amélioration de composants.'
  },
  {
    icon: Bot,
    title: 'Yuna / ChatGPT',
    description: 'Copilote du projet pour raisonner sur l’architecture, structurer les données, modifier GitHub et Supabase, documenter les décisions et piloter les grands nettoyages.'
  }
];

export interface MakingOfPageProps {
  steps?: MakingOfStep[];
  stack?: Array<string | MakingOfStackItem>;
}

const currentState = [
  { icon: CheckCircle2, title: 'Production', text: 'mgodefroy.com est servi en HTTPS sur Netlify.' },
  { icon: Database, title: 'Données', text: 'Le contenu vivant est piloté par Supabase.' },
  { icon: GitBranch, title: 'Code', text: 'Le dépôt GitHub reste la source de vérité.' },
  { icon: Workflow, title: 'Évolution', text: 'Le site peut continuer à grandir sans repartir de zéro.' }
];

const stats = [
  ['17', 'chapitres documentés'],
  ['13+', 'tables Supabase'],
  ['1', 'chaîne de déploiement']
];

export const MakingOfPage: React.FC<MakingOfPageProps> = ({ steps = [], stack = [] }) => {
  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] });

  return (
    <PageTransition>
      <div className="studio-page making-page">
        <PageIntro
          number="05"
          label="Carnet de fabrication"
          title="Rien à cacher."
          accent="Tout le système."
          description="Le portfolio n’est pas arrivé en un bloc. Il a été généré, découpé, testé, connecté, nettoyé, déployé et redéployé. Voici le journal complet de sa fabrication, de la première idée jusqu’au site en ligne."
        />

        <section className="fb-split fb-mk-intro" data-testid="making-intro">
          <Reveal variant="mask">
            <Artwork kind="workflow" index="atelier" label="L’architecture avant le code" />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="fb-label">Du brief au site en ligne</span>
            <h2 className="fb-title">Penser. Générer. Relier. Itérer.</h2>
            <p className="fb-text">
              Ce site est volontairement documenté comme un système, pas seulement comme une vitrine. Chaque couche raconte
              quelque chose de mon apprentissage : comment une idée devient une interface, comment une interface devient une
              application, puis comment cette application devient un produit déployable et maintenable.
            </p>
            <div className="fb-mk-stats">
              {stats.map(([value, label]) => (
                <div key={label} className="fb-mk-stat" data-testid={`making-stat-${value}`}><strong>{value}</strong><span>{label}</span></div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="fb-mk-section" data-testid="making-journal">
          <Reveal>
            <SectionHead
              label="01 → 17"
              title="Le journal de fabrication."
              text="Pas seulement les grandes étapes : aussi les corrections, les décisions d’architecture, les outils, les migrations, les nettoyages et les détails d’infrastructure qui ont fait passer le projet d’une maquette à un vrai site."
            />
          </Reveal>
          <div ref={timelineRef} className="fb-journal" data-testid="making-timeline">
            <div className="fb-journal-rail" aria-hidden="true">
              <motion.span style={{ scaleY: reduced ? 1 : stepsProgress }} />
            </div>
            {steps.map((item, i) => {
              const Icon = (item.iconName && ICON_MAP[item.iconName]) || Sparkles;
              return (
                <motion.article key={item.step || i} variants={staggerItem} {...inView} className="fb-journal-row" data-testid={`making-step-${i}`}>
                  <span className="fb-journal-num">{item.step || String(i + 1).padStart(2, '0')}</span>
                  <span className="fb-journal-icon"><Icon size={22} strokeWidth={1.8} /></span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="fb-mk-section" data-testid="making-architecture">
          <Reveal>
            <SectionHead
              label="Architecture finale"
              title="Les briques derrière l’écran."
              text="Le visiteur voit une interface. Derrière, quatre couches travaillent ensemble : la génération et la revue, le frontend, la donnée et l’infrastructure de production."
            />
          </Reveal>
          <motion.div variants={staggerContainer} {...inView} className="fb-arch-grid">
            {architecture.map((item) => (
              <motion.article key={item.number} variants={staggerItem} className="fb-card fb-arch-card" data-testid={`making-arch-${item.number}`}>
                <span className="fb-journal-num">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="fb-chips">
                  {item.items.map((tool) => <span key={tool} className="fb-chip">{tool}</span>)}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="fb-mk-section" data-testid="making-flows">
          <Reveal>
            <SectionHead label="Les flux réels" title="Comment les morceaux communiquent." />
          </Reveal>
          <motion.div variants={staggerContainer} {...inView} className="fb-list">
            {productionFlows.map((item) => (
              <motion.div key={item.label} variants={staggerItem} className="fb-flow-row" data-testid={`making-flow-${item.label}`}>
                <span className="fb-row-cat">{item.label}</span>
                <div className="fb-flow-steps">
                  {item.flow.map((node, index) => (
                    <React.Fragment key={node}>
                      <span className="fb-chip">{node}</span>
                      {index < item.flow.length - 1 && <ArrowRight size={18} className="fb-flow-arrow" />}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="fb-mk-section" data-testid="making-ai-roles">
          <Reveal>
            <SectionHead
              label="Collaboration IA"
              title="Plusieurs IA. Plusieurs rôles."
              text="L’IA n’a pas été utilisée comme un bouton « générer un portfolio ». Chaque outil a eu un rôle différent dans le cycle de construction."
            />
          </Reveal>
          <motion.div variants={staggerContainer} {...inView} className="fb-dark-grid fb-dark-grid-3">
            {aiRoles.map(({ icon: Icon, title, description }) => (
              <motion.article key={title} variants={staggerItem} className="fb-dark-card">
                <Icon size={24} strokeWidth={1.8} />
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="fb-mk-section" data-testid="making-state">
          <Reveal>
            <SectionHead label="État actuel" title="Ce qui tourne aujourd’hui." />
          </Reveal>
          <motion.div variants={staggerContainer} {...inView} className="fb-dark-grid fb-dark-grid-4">
            {currentState.map(({ icon: Icon, title, text }) => (
              <motion.article key={title} variants={staggerItem} className="fb-dark-card">
                <Icon size={24} strokeWidth={1.8} />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="fb-mk-section" data-testid="making-stack">
          <Reveal>
            <SectionHead label="Outils & infrastructure" title="La stack utilisée." />
          </Reveal>
          <motion.div variants={staggerContainer} {...inView} className="fb-stack">
            {stack.map((item, i) => (
              <motion.span key={i} variants={staggerItem} className="fb-chip fb-chip-lg">{typeof item === 'string' ? item : item.name}</motion.span>
            ))}
          </motion.div>
        </section>

        <section className="fb-cta-panel fb-inline-cta" data-testid="making-cta">
          <span className="fb-label">Et maintenant ?</span>
          <h2 className="fb-title">Le projet continue.</h2>
          <p className="fb-text">
            De nouveaux projets viendront remplacer l’espace « En préparation », les certifications évolueront, la stack
            s’enrichira et la partie data continuera d’être améliorée. Ce carnet est l’historique vivant d’un système qui apprend avec moi.
          </p>
          <div className="fb-cta-actions">
            <Pill to="/contact" variant="light" testId="making-contact-cta">Discutons de votre projet</Pill>
            <Pill to="/" variant="ghost" testId="making-home-cta">Retour à l’accueil</Pill>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
