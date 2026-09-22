import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
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
  Send,
  ShieldCheck,
  Sparkles,
  Video,
  Workflow
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { PageIntro } from '../components/PageIntro';
import { Artwork } from '../components/Artwork';
import { MakingOfStep, MakingOfStackItem } from '../types/portfolio';

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
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

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

export const MakingOfPage: React.FC<MakingOfPageProps> = ({
  steps = [],
  stack = []
}) => {
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

        <section className="grid lg:grid-cols-[0.78fr_1.22fr] gap-10 lg:gap-16 items-start mb-24">
          <aside>
            <Artwork
              kind="workflow"
              index="atelier"
              label="L’architecture avant le code"
            />
            <p className="chapter-meta mt-6">DU BRIEF AU SITE EN LIGNE</p>
            <p className="font-serif-accent italic text-3xl mt-5 leading-tight">
              Penser.
              <br />
              Générer.
              <br />
              Relier.
              <br />
              Itérer.
            </p>
          </aside>

          <div className="space-y-7">
            <p className="text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
              Ce site est volontairement documenté comme un système, pas seulement comme une vitrine.
              Chaque couche raconte quelque chose de mon apprentissage : comment une idée devient une
              interface, comment une interface devient une application, puis comment cette application
              devient un produit déployable et maintenable.
            </p>

            <div className="grid sm:grid-cols-3 gap-3">
              {[
                ['17', 'chapitres documentés'],
                ['13+', 'tables Supabase'],
                ['1', 'chaîne de déploiement']
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 p-5"
                >
                  <div className="font-display text-3xl font-extrabold tracking-tight text-orange-600 dark:text-orange-500">
                    {value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.16em] font-bold text-zinc-500 dark:text-zinc-400 mt-2">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-28"
        >
          <motion.div variants={staggerItem} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div>
              <p className="chapter-meta">01 → 17</p>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter mt-3">
                Le journal de fabrication.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Pas seulement les “grandes étapes” : aussi les corrections, les décisions d’architecture,
              les outils, les migrations, les nettoyages et les détails d’infrastructure qui ont fait
              passer le projet d’une maquette à un vrai site.
            </p>
          </motion.div>

          <div className="mt-10 space-y-4">
            {steps.map((item, i) => {
              const Icon = (item.iconName && ICON_MAP[item.iconName]) || Sparkles;

              return (
                <motion.article
                  key={item.step || i}
                  variants={staggerItem}
                  className="group grid md:grid-cols-[88px_54px_1fr] gap-5 md:gap-7 items-start rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 p-5 md:p-7 hover:border-orange-300/70 dark:hover:border-orange-700/60 transition-colors"
                >
                  <div className="font-mono text-xs font-bold text-orange-600 dark:text-orange-500 pt-1">
                    {item.step}
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-[15px] text-zinc-600 dark:text-zinc-400 leading-7 max-w-4xl">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <section className="mb-28">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <p className="chapter-meta">ARCHITECTURE FINALE</p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter mt-3">
              Les briques derrière l’écran.
            </h2>
            <p className="mt-5 max-w-3xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Le visiteur voit une interface. Derrière, quatre couches travaillent ensemble : la
              génération et la revue, le frontend, la donnée et l’infrastructure de production.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mt-8">
            {architecture.map((item) => (
              <motion.article
                key={item.number}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-7"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="font-mono text-xs text-orange-600 dark:text-orange-500">{item.number}</span>
                    <h3 className="text-2xl font-bold tracking-tight mt-2">{item.title}</h3>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-7 mt-4">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {item.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-28">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <p className="chapter-meta">LES FLUX RÉELS</p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter mt-3">
              Comment les morceaux communiquent.
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {productionFlows.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 md:p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-orange-600 dark:text-orange-500">
                    {item.label}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {item.flow.map((node, index) => (
                      <React.Fragment key={node}>
                        <span className="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold">
                          {node}
                        </span>
                        {index < item.flow.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-28">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <p className="chapter-meta">COLLABORATION IA</p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter mt-3">
              Plusieurs IA. Plusieurs rôles.
            </h2>
            <p className="mt-5 max-w-3xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              L’IA n’a pas été utilisée comme un bouton “générer un portfolio”. Chaque outil a eu un
              rôle différent dans le cycle de construction.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mt-8">
            {aiRoles.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-7"
              >
                <div className="w-11 h-11 rounded-2xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mt-5 tracking-tight">{title}</h3>
                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400 mt-3">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-28">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <p className="chapter-meta">ÉTAT ACTUEL</p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter mt-3">
              Ce qui tourne aujourd’hui.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              { icon: CheckCircle2, title: 'Production', text: 'mgodefroy.com est servi en HTTPS sur Netlify.' },
              { icon: Database, title: 'Données', text: 'Le contenu vivant est piloté par Supabase.' },
              { icon: GitBranch, title: 'Code', text: 'Le dépôt GitHub reste la source de vérité.' },
              { icon: Workflow, title: 'Évolution', text: 'Le site peut continuer à grandir sans repartir de zéro.' }
            ].map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-6"
              >
                <Icon className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                <h3 className="text-lg font-bold mt-4">{title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-6 mt-2">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <motion.div variants={staggerItem} className="border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <p className="chapter-meta">OUTILS & INFRASTRUCTURE</p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter mt-3">
              La stack utilisée.
            </h2>
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-wrap gap-2.5 mt-8">
            {stack.map((item, i) => {
              const name = typeof item === 'string' ? item : item.name;
              return (
                <span
                  key={i}
                  className="px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  {name}
                </span>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[36px] bg-zinc-950 text-white p-9 md:p-14"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <p className="chapter-meta text-zinc-400">ET MAINTENANT ?</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter mt-3">
              Le projet continue.
            </h2>
            <p className="text-zinc-300 leading-7 mt-5">
              De nouveaux projets viendront remplacer l’espace “En préparation”, les certifications
              évolueront, la stack s’enrichira et la partie data continuera d’être améliorée. Ce carnet
              n’est donc pas une fin de chantier : c’est l’historique vivant d’un système qui apprend avec moi.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <MagneticWrapper strength={0.3}>
                <Link
                  data-testid="making-contact-cta"
                  to="/contact"
                  className="px-7 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full text-sm font-bold uppercase tracking-widest transition-colors shadow-xl flex items-center gap-3"
                >
                  <Send className="w-4 h-4" />
                  <span>Discutons de votre projet</span>
                </Link>
              </MagneticWrapper>

              <MagneticWrapper strength={0.3}>
                <Link
                  data-testid="making-home-cta"
                  to="/"
                  className="px-7 py-4 bg-white/10 hover:bg-white/15 text-white rounded-full text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-3"
                >
                  <span>Retour à l’accueil</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticWrapper>
            </div>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
};
