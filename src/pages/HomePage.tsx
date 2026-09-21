import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Workflow,
  Cpu,
  Database,
  ShieldCheck,
  Send,
  Clock,
  Check,
  Sparkles,
  Code2,
  ArrowUpRight,
  Wand2,
  X
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { PageTransition } from '../components/PageTransition';
import { 
  ProfileInfo, 
  ProjectItem, 
  SkillCategory, 
  Certification,
  PricingPlan,
  FAQItem,
  WorkflowScenario,
  HomeExpertiseCard,
  HomePillar
} from '../types/portfolio';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { WorkflowShowcase } from '../components/WorkflowShowcase';
import { TechMarquee } from '../components/TechMarquee';
import { EditorialMarquee } from '../components/EditorialMarquee';
import { CountUpNumber } from '../components/CountUpNumber';
import { FAQSection } from '../components/FAQSection';
import { AboutPreview } from '../components/AboutPreview';
import { CertificateCard } from '../components/CertificateCard';
import { AnimatedTitle } from '../components/AnimatedTitle';

interface HomePageProps {
  profile: ProfileInfo;
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: Certification[];
  pricingPlans?: PricingPlan[];
  faqs?: FAQItem[];
  workflows?: WorkflowScenario[];
  expertiseCards: HomeExpertiseCard[];
  pillars: HomePillar[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)', scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const LevelDots: React.FC<{ level: number }> = ({ level }) => (
  <div className="flex items-center gap-1.5">
    {[1, 2, 3, 4].map((dot) => (
      <span
        key={dot}
        className={`w-1.5 h-1.5 rounded-full ${dot <= level ? 'bg-white' : 'bg-white/30'}`}
      />
    ))}
  </div>
);

const CyclingExpertiseCard: React.FC<{ items: HomeExpertiseCard[], index: number }> = ({ items, index }) => {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (items.length <= 1 || reduced) return;

    // Desynchronize the start times so they don't all flip at the same time
    const intervalTime = 9000 + Math.random() * 3000;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [items.length, reduced]);

  return (
    <div className="expertise-card group/card">
      {items.map((item, idx) => (
        <div
          key={item.title}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={item.bgImage}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover grayscale-[35%] group-hover/card:grayscale-0 transition-all duration-700 group-hover/card:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">{item.category}</span>
              <LevelDots level={item.level} />
            </div>
            <h3 className="text-xl font-bold text-white leading-snug drop-shadow-md">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({
  profile,
  projects,
  skills,
  certifications,
  pricingPlans = [],
  faqs = [],
  workflows = [],
  expertiseCards = [],
  pillars = []
}) => {
  const reduced = useReducedMotion();
  const [cardGroups, setCardGroups] = React.useState<HomeExpertiseCard[][]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!expertiseCards || expertiseCards.length === 0) {
      setCardGroups([]);
      return;
    }

    // Shuffle the array uniquely on each mount
    const shuffled = [...expertiseCards].sort(() => Math.random() - 0.5);

    // We want 6 fixed card slots, each containing 2 items to cycle between
    const groups: HomeExpertiseCard[][] = [];
    const maxSlots = 6;
    for (let i = 0; i < maxSlots; i++) {
      const slice = shuffled.slice(i * 2, i * 2 + 2);
      if (slice.length > 0) {
        groups.push(slice);
      }
    }
    setCardGroups(groups);
  }, [expertiseCards]);

  return (
    <PageTransition>

      <div ref={containerRef} className="home-editorial relative z-10">
        <Hero profile={profile} />
        <TechMarquee />
        <AboutPreview />

        {/* 1. IMMERSIVE PROJECTS PREVIEW */}
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            <div className="space-y-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
              <div className="flex items-end justify-between">
                <AnimatedTitle
                  text="Sélection de projets"
                  className="font-display text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-500 tracking-tighter"
                />
                <motion.div variants={staggerItem}>
                  <MagneticWrapper strength={0.2}>
                    <Link
                      data-testid="home-all-projects"
                      to="/projets"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      <span>Tous les projets</span>
                    </Link>
                  </MagneticWrapper>
                </motion.div>
              </div>
            </div>

            <div className="selected-work-grid">
              {pillars.map((item, i) => (
                <Link
                  to="/projets"
                  data-testid={`home-project-${i}`}
                  key={i}
                  className={`block ${item.span || ''}`}
                >
                  <motion.div
                    variants={staggerItem}
                    whileHover={{ y: -8 }}
                    data-cursor="project"
                    className="group selected-work-card"
                  >
                    <div className="selected-work-image">
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <span className="selected-work-index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="selected-work-arrow"><ArrowUpRight size={21} strokeWidth={1.4} /></span>
                    </div>
                    <div className="selected-work-caption">
                      <span className="chapter-meta">{item.tags.join(' / ')}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <span className="text-link">Explorer le projet <ArrowUpRight size={15} /></span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 1.5. HOW THIS PORTFOLIO WAS BUILT (TEASER - SCROLL EXPANSION) */}
        <section className="home-teaser">
          <div className="home-teaser-stage">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="editorial-making-banner"
            >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/20 blur-3xl pointer-events-none" />

            {/* Motifs de fleurs poétiques en arrière-plan */}
            <div className="home-teaser-decoration absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              {/* Fleur 1 : Grande fleur épanouie à double rangée de pétales (haut droite) */}
              <svg
                className="absolute -top-16 -right-16 w-72 h-72 md:w-88 md:h-88 text-white/20 dark:text-white/15 transform rotate-12"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                  <path
                    key={idx}
                    d="M 94 100 L 88 30 L 112 30 L 106 100 Z"
                    transform={`rotate(${angle} 100 100)`}
                  />
                ))}
                {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, idx) => (
                  <path
                    key={`inner-${idx}`}
                    d="M 96 100 L 94 58 L 106 58 L 104 100 Z"
                    opacity="0.75"
                    transform={`rotate(${angle} 100 100)`}
                  />
                ))}
                <circle cx="100" cy="100" r="16" fill="currentColor" opacity="0.9" />
                <circle cx="100" cy="100" r="8" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
              </svg>

              {/* Fleur 2 : Fleur à 5 pétales doux (bas gauche) */}
              <svg
                className="absolute -bottom-14 -left-10 w-52 h-52 md:w-64 md:h-64 text-white/18 dark:text-white/15 transform -rotate-15"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                {[0, 72, 144, 216, 288].map((angle, idx) => (
                  <path
                    key={idx}
                    d="M 95 100 L 82 35 L 118 35 L 105 100 Z"
                    transform={`rotate(${angle} 100 100)`}
                  />
                ))}
                <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.8" />
                <circle cx="100" cy="100" r="11" fill="none" stroke="white" strokeWidth="2.5" opacity="0.6" />
              </svg>

              {/* Fleur 3 : Fleur délicate à 6 pétales (centre haut) */}
              <svg
                className="absolute top-4 left-1/3 w-28 h-28 text-white/15 transform rotate-45 hidden sm:block"
                viewBox="0 0 120 120"
                fill="currentColor"
              >
                {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                  <path
                    key={idx}
                    d="M 55 60 L 50 20 L 70 20 L 65 60 Z"
                    transform={`rotate(${angle} 60 60)`}
                  />
                ))}
                <circle cx="60" cy="60" r="9" fill="currentColor" />
              </svg>

              {/* Fleur 4 : Fleur discrète à 8 pétales (bas droite, sous la vidéo) */}
              <svg
                className="absolute -bottom-10 right-1/4 w-36 h-36 text-white/15 transform rotate-30"
                viewBox="0 0 160 160"
                fill="currentColor"
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                  <path
                    key={idx}
                    d="M 75 80 L 70 28 L 90 28 L 85 80 Z"
                    transform={`rotate(${angle} 80 80)`}
                  />
                ))}
                <circle cx="80" cy="80" r="12" fill="currentColor" opacity="0.85" />
              </svg>

              {/* Pétales isolés flottants */}
              <svg
                className="absolute top-1/4 left-14 w-8 h-8 text-white/20 transform rotate-12 hidden md:block"
                viewBox="0 0 40 40"
                fill="currentColor"
              >
                <path d="M 20 5 C 10 15, 12 30, 20 35 C 28 30, 30 15, 20 5 Z" />
              </svg>
              <svg
                className="absolute bottom-1/3 right-14 w-9 h-9 text-white/15 transform -rotate-45 hidden md:block"
                viewBox="0 0 40 40"
                fill="currentColor"
              >
                <path d="M 20 5 C 8 18, 14 32, 20 35 C 26 32, 32 18, 20 5 Z" />
              </svg>
            </div>

            <div className="lg:w-[55%] flex flex-col items-start gap-8 relative z-10">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <Wand2 className="w-6 h-6" />
                </div>
                <div className="space-y-4 max-w-xl">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                    De l’idée <span className="font-serif-accent italic text-orange-400">au système.</span>
                  </h3>
                  <p className="text-orange-50 font-medium leading-relaxed">
                    Apprendre, construire, tester, casser, comprendre et améliorer — je documente le raisonnement derrière mes projets, car la solution n'est qu'une partie du travail. Découvrez comment j'ai conçu cette plateforme.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 opacity-90">
                    <img src="https://cdn.simpleicons.org/supabase/ffffff" alt="Supabase" title="Supabase" className="h-5 w-auto object-contain" />
                    <img src="https://cdn.simpleicons.org/netlify/ffffff" alt="Netlify" title="Netlify" className="h-5 w-auto object-contain" />
                    <img src="https://cdn.simpleicons.org/anthropic/ffffff" alt="Claude" title="Claude (Anthropic)" className="h-5 w-auto object-contain" />
                    <div className="flex items-center gap-1.5 bg-white/20 px-2 py-1 rounded-md" title="Google AI Studio">
                      <img src="https://cdn.simpleicons.org/google/ffffff" alt="Google AI Studio" className="h-4 w-auto object-contain" />
                      <span className="text-[10px] font-bold tracking-wider uppercase text-white">AI Studio</span>
                    </div>
                  </div>
                </div>
              </div>

              <MagneticWrapper strength={0.3} className="shrink-0">
                <Link
                  data-testid="home-making-of"
                  to="/coulisses"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-orange-600 hover:bg-orange-50 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-xl cursor-pointer"
                >
                  <span>Explorer les coulisses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticWrapper>
            </div>

            <div className="lg:w-[45%] w-full relative z-10 hidden sm:block">
              <div className="rounded-[24px] overflow-hidden bg-orange-900/20 border border-white/20 aspect-video shadow-2xl relative">
                <img
                  src="/art/workflow.webp"
                  alt="Aperçu du travail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
          </div>
        </section>

        {/* 1.75. WORKFLOW INTERACTIONS GRID */}
        <WorkflowShowcase workflows={workflows} />

        {/* MARQUEE ÉDITORIALE */}
        <EditorialMarquee />

        {/* 2. IMMERSIVE SKILLS ABSTRACT */}
        <section className="home-expertise">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

              {/* Sticky Left Sidebar */}
              <motion.div
                className="lg:w-1/3 lg:sticky lg:top-32 flex flex-col gap-8"
                initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatedTitle
                  text="Savoir-faire"
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white"
                />
                <p className="text-white/90 font-medium leading-relaxed max-w-md text-lg">
                  Je m'intéresse particulièrement à l'intersection entre l'IA, l'automatisation, les APIs et les processus métier. Mon approche consiste d'abord à comprendre le problème, avant de choisir la technologie.
                </p>
                <MagneticWrapper strength={0.2} className="self-start mt-4">
                  <Link
                    data-testid="home-all-skills"
                    to="/competences"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-orange-600 hover:bg-orange-50 rounded-full text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-lg"
                  >
                    <span>Toutes les compétences</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticWrapper>
              </motion.div>

              {/* Scrolling Right Column */}
              <motion.div
                className="lg:w-2/3 w-full pt-8 lg:pt-0"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cardGroups.map((group, idx) => (
                    <motion.div key={idx} variants={staggerItem}>
                      <CyclingExpertiseCard items={group} index={idx} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. IMMERSIVE CERTIFICATIONS */}
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            <div className="space-y-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
              <div className="flex items-end justify-between">
                <AnimatedTitle
                  text="Certifications"
                  className="font-display text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-500 tracking-tighter"
                />
                <motion.div variants={staggerItem}>
                  <MagneticWrapper strength={0.2}>
                    <Link
                      data-testid="home-all-certifications"
                      to="/certifications"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      <span>Tout voir</span>
                    </Link>
                  </MagneticWrapper>
                </motion.div>
              </div>
            </div>

            <div className="home-credentials">
              {certifications.slice(0, 9).map((cert, index) => <CertificateCard key={cert.id} cert={cert} index={index} />)}
            </div>
          </motion.div>
        </section>

        {/* 4. PRICING / INVESTMENT SHOWCASE */}
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            <div className="space-y-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <AnimatedTitle
                  text="Mes tarifs"
                  className="font-display text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-500 tracking-tighter"
                />
                <motion.p variants={staggerItem} className="text-sm text-zinc-500 dark:text-zinc-400 font-medium max-w-xs sm:text-right">
                  Disponible pour des missions freelances ou des collaborations sur le long terme.
                </motion.p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingPlans.map((plan, i) => {
                const IconComponent = plan.iconName === 'Clock' ? Clock : Workflow;
                return (
                  <motion.div
                    key={plan.id || i}
                    variants={staggerItem}
                    whileHover={{ y: -5 }}
                    data-testid={`pricing-plan-${i}`}
                    className="group editorial-price"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-orange-500 mb-6">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
                      {plan.label}
                    </span>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{plan.prefix}</span>
                      <CountUpNumber
                        value={plan.numeric}
                        className="font-display text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter"
                      />
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-6">
                      {plan.description}
                    </p>
                    <ul className="space-y-3 mt-auto">
                      {plan.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          <Check className="w-4 h-4 text-orange-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            <motion.p variants={staggerItem} className="text-center text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Tarifs indicatifs, ajustés selon la complexité et la portée du projet.
            </motion.p>
          </motion.div>
        </section>

        {/* 5. FAQ */}
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1400px] mx-auto space-y-12">
          <FAQSection faqs={faqs} />
        </section>

      </div>

      {/* 6. IMMERSIVE CONTACT CTA (CURTAIN REVEAL) */}
      <div id="contact" className="home-contact-curtain">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="editorial-contact-banner"
        >

          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/70 relative z-10">
            06 — Contact
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter relative z-10 drop-shadow-sm">
            Un projet <span className="font-serif-accent italic font-normal">en tête ?</span>
          </h2>
          <p className="text-white/90 text-lg max-w-xl relative z-10 mb-8 font-medium">
            Je suis disponible pour discuter de vos besoins en développement IA et automatisation.
          </p>

          <MagneticWrapper strength={0.4}>
            <Link
              data-testid="home-contact-cta"
              to="/contact"
              className="relative z-10 px-10 py-5 bg-white text-orange-600 hover:bg-zinc-50 rounded-full text-sm font-bold uppercase tracking-widest transition-transform shadow-xl flex items-center gap-3 cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Contactez-moi</span>
            </Link>
          </MagneticWrapper>
        </motion.div>
      </div>
    </PageTransition>
  );
};
