import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  LayoutTemplate, 
  Bug, 
  Database, 
  Rocket,
  ArrowRight,
  Send
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
    transition: {
      staggerChildren: 0.12
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

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  Sparkles,
  LayoutTemplate,
  Bug,
  Database,
  Rocket
};

export const DEFAULT_MAKING_OF_STEPS: MakingOfStep[] = [
  {
    iconName: "Compass",
    step: "01",
    title: "Cadrage & positionnement",
    description: "Avant toute ligne de code : définir le message. Ce portfolio devait convaincre aussi bien un recruteur CDI qu'un client freelance, sans jamais donner l'impression d'un profil en apprentissage — un brief écrit noir sur blanc, structure de conversion et ton inclus."
  },
  {
    iconName: "Sparkles",
    step: "02",
    title: "Génération de la base avec Google AI Studio",
    description: "La structure du projet (React + Vite + TypeScript + Tailwind CSS), le design system et les premiers composants ont été générés à partir de prompts détaillés donnés à Google AI Studio — pas de code écrit à la main dès la première ligne, mais un cahier des charges précis."
  },
  {
    iconName: "LayoutTemplate",
    step: "03",
    title: "Itérations de design",
    description: "Passage d'une seule page à une architecture multi-pages avec React Router, ajout des transitions de page et des animations au scroll avec Framer Motion, affinage visuel section par section jusqu'à obtenir un rendu premium plutôt qu'un simple template."
  },
  {
    iconName: "Bug",
    step: "04",
    title: "Revue technique & debugging",
    description: "Chaque nouvelle version a été passée en revue avec Claude : diagnostic de bugs d'animation invisibles à l'œil nu (par exemple une boucle de défilement de logos mal calibrée), corrections ciblées, et rédaction de nouveaux composants complets."
  },
  {
    iconName: "Database",
    step: "05",
    title: "Couche data avec Supabase",
    description: "Le contenu (projets, compétences, certifications) est pensé pour vivre dans une base PostgreSQL sur Supabase plutôt qu'en dur dans le code — pour pouvoir le faire évoluer sans redéployer tout le site."
  },
  {
    iconName: "Rocket",
    step: "06",
    title: "Déploiement continu",
    description: "Le code est versionné sur GitHub et déployé automatiquement sur Netlify à chaque mise à jour — la même chaîne CI/CD que celle utilisée pour les projets présentés dans ce portfolio."
  }
];

export const DEFAULT_MAKING_OF_STACK: Array<string | MakingOfStackItem> = [
  "Google AI Studio", "Claude", "React", "TypeScript", "Tailwind CSS", 
  "Framer Motion", "Supabase", "PostgreSQL", "GitHub", "Netlify"
];

export interface MakingOfPageProps {
  steps?: MakingOfStep[];
  stack?: Array<string | MakingOfStackItem>;
}

export const MakingOfPage: React.FC<MakingOfPageProps> = ({ 
  steps = DEFAULT_MAKING_OF_STEPS, 
  stack = DEFAULT_MAKING_OF_STACK 
}) => {
  return (
    <PageTransition>
      <div className="studio-page making-page">
        <PageIntro number="05" label="Carnet de fabrication" title="Rien à cacher." accent="Tout à construire." description="Un brief précis, une génération assistée par IA, des itérations mesurées. Ce portfolio est aussi un projet : voici ce qu’il y a sous le capot." />
        <div className="making-layout">
          <aside className="making-aside"><Artwork kind="workflow" index="atelier" label="L’architecture avant le code" /><p className="chapter-meta mt-6">DU PREMIER BRIEF AU DERNIER PIXEL</p><p className="font-serif-accent italic text-3xl mt-5">Apprendre. Tester.<br />Casser. Recommencer.</p></aside>

        {/* Steps timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6"
        >
          {steps.map((item, i) => {
            const Icon = (item.iconName && ICON_MAP[item.iconName]) || Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="group making-step"
                data-testid={`making-step-${item.step}`}
              >
                <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-6 shrink-0">
                  <span className="font-mono text-sm font-bold text-orange-500">{item.step}</span>
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-orange-500">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        </div>

        {/* Stack used */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          <motion.h2 variants={staggerItem} className="text-2xl sm:text-3xl font-extrabold text-orange-600 dark:text-orange-500 tracking-tighter">
            La stack utilisée
          </motion.h2>
          <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
            {stack.map((item, i) => {
              const name = typeof item === 'string' ? item : item.name;
              return (
                <span
                  key={i}
                  className="px-5 py-2.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 rounded-full text-sm font-bold text-zinc-700 dark:text-zinc-300"
                >
                  {name}
                </span>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Closing note + CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="bg-zinc-900 dark:bg-zinc-900 text-white rounded-[40px] p-12 md:p-16 flex flex-col items-start gap-8 relative overflow-hidden"
        >
          <p className="text-xl md:text-2xl font-bold leading-snug max-w-2xl relative z-10">
            Ce site est lui-même une démonstration de mon approche : cadrer, automatiser, itérer,
            surveiller. La même méthode que j'applique à vos flux.
          </p>
          <div className="flex flex-wrap gap-4 relative z-10">
            <MagneticWrapper strength={0.3}>
              <Link
                data-testid="making-contact-cta"
                to="/contact"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full text-sm font-bold uppercase tracking-widest transition-colors shadow-xl flex items-center gap-3 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Discutons de votre projet</span>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper strength={0.3}>
              <Link
                data-testid="making-projects-cta"
                to="/projets"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-3 cursor-pointer"
              >
                <span>Voir mes projets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticWrapper>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};