/**
 * Portfolio professionnel de Michael Godefroy
 * AI & Automation Engineer | IT Automation
 *
 * Stack: React 19 + TypeScript + Tailwind CSS + React Router + Motion
 */

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MotionConfig, AnimatePresence } from 'motion/react';
import { SoundProvider } from './context/SoundContext';
import { portfolioService } from './services/portfolioService';
import {
  ProfileInfo,
  ProjectItem,
  SkillCategory,
  Certification,
  PricingPlan,
  FAQItem,
  WorkflowScenario,
  HomeExpertiseCard,
  HomePillar,
  MakingOfStep,
  MakingOfStackItem
} from './types/portfolio';
import { ThemeProvider } from './context/ThemeContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { resetScroll } from './components/ScrollToTop';

import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';

const HomePage = lazy(() => import('./pages/HomePage').then(({ HomePage }) => ({ default: HomePage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(({ ProjectsPage }) => ({ default: ProjectsPage })));
const SkillsPage = lazy(() => import('./pages/SkillsPage').then(({ SkillsPage }) => ({ default: SkillsPage })));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage').then(({ CertificationsPage }) => ({ default: CertificationsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(({ AboutPage }) => ({ default: AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(({ ContactPage }) => ({ default: ContactPage })));
const MakingOfPage = lazy(() => import('./pages/MakingOfPage').then(({ MakingOfPage }) => ({ default: MakingOfPage })));

const initialProfile: ProfileInfo = {
  name: '',
  title: '',
  roleSubtitle: '',
  valueProposition: '',
  bioSummary: [],
  availability: {
    status: '',
    subtext: '',
    responseTime: ''
  },
  location: '',
  contact: {
    email: '',
    linkedin: '',
    upwork: '',
    github: ''
  },
  stats: [],
  avatarUrl: '',
  heroPhotoUrl: '',
  presentationVideoUrl: '',
  presentationVideoPoster: '',
  aboutPageLabel: '',
  aboutPageTitle: '',
  aboutPageAccent: '',
  aboutPageDescription: '',
  aboutJourneyIntroTitle: '',
  aboutJourneyIntroText: '',
  aboutTransitionText: '',
  aboutExpertise: [],
  homeAboutTitle: '',
  homeAboutAccent: '',
  homeAboutDescription: '',
  homeSavoirFaireDescription: '',
  homeContactDescription: ''
};

const AnimatedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={resetScroll}>
      <React.Fragment key={location.pathname}>
        <Routes location={location}>{children}</Routes>
      </React.Fragment>
    </AnimatePresence>
  );
};

const prefetchPages = () => Promise.all([
  import('./pages/ProjectsPage'),
  import('./pages/SkillsPage'),
  import('./pages/CertificationsPage'),
  import('./pages/AboutPage'),
  import('./pages/ContactPage'),
  import('./pages/MakingOfPage'),
]);

export default function App() {
  const [profile, setProfile] = useState<ProfileInfo>(initialProfile);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowScenario[]>([]);
  const [homeExpertiseCards, setHomeExpertiseCards] = useState<HomeExpertiseCard[]>([]);
  const [homePillars, setHomePillars] = useState<HomePillar[]>([]);
  const [makingOfSteps, setMakingOfSteps] = useState<MakingOfStep[]>([]);
  const [makingOfStack, setMakingOfStack] = useState<Array<string | MakingOfStackItem>>([]);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [
          profData,
          projData,
          skillData,
          certData,
          pricingData,
          faqData,
          wfData,
          expData,
          pillarsData,
          stepsData,
          stackData
        ] = await Promise.all([
          portfolioService.getProfile(),
          portfolioService.getProjects(),
          portfolioService.getSkills(),
          portfolioService.getCertifications(),
          portfolioService.getPricingPlans(),
          portfolioService.getFaqs(),
          portfolioService.getWorkflows(),
          portfolioService.getHomeExpertiseCards(),
          portfolioService.getHomePillars(),
          portfolioService.getMakingOfSteps(),
          portfolioService.getMakingOfStack()
        ]);

        if (profData) setProfile(profData);
        if (projData) setProjects(projData);
        if (skillData) setSkills(skillData);
        if (certData) setCertifications(certData);
        if (pricingData) setPricingPlans(pricingData);
        if (faqData) setFaqs(faqData);
        if (wfData) setWorkflows(wfData);
        if (expData) setHomeExpertiseCards(expData);
        if (pillarsData) setHomePillars(pillarsData);
        if (stepsData) setMakingOfSteps(stepsData);
        if (stackData) setMakingOfStack(stackData);
      } catch (err) {
        console.error('Erreur lors du chargement des données portfolio depuis Supabase :', err);
      }
    }

    loadPortfolioData();
    const prefetch = window.setTimeout(prefetchPages, 2500);
    return () => window.clearTimeout(prefetch);
  }, []);

  return (
    <ThemeProvider>
      <SoundProvider>
      <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <BrowserRouter>
          <CustomCursor />
          <div className="min-h-screen bg-[var(--fb-bg)] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 relative flex flex-col justify-between transition-colors duration-300">

          {/* Top Navbar */}
          <a href="#main-content" className="skip-link" data-testid="skip-to-content">Aller au contenu</a>
          <Navbar profile={profile} />

          {/* Main Content Area: Multi-Page Routing */}
          <main id="main-content" className="relative z-10 pt-28 pb-16 flex-1">
            <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" aria-label="Chargement de la page" />}>
            <AnimatedRoutes>
              <Route
                path="/"
                element={
                  <HomePage
                    profile={profile}
                    projects={projects}
                    skills={skills}
                    certifications={certifications}
                    pricingPlans={pricingPlans}
                    faqs={faqs}
                    workflows={workflows}
                    expertiseCards={homeExpertiseCards}
                    pillars={homePillars}
                  />
                }
              />
              <Route
                path="/projets"
                element={<ProjectsPage projects={projects} />}
              />
              <Route
                path="/competences"
                element={<SkillsPage skills={skills} />}
              />
              <Route
                path="/certifications"
                element={<CertificationsPage certifications={certifications} />}
              />
              <Route
                path="/a-propos"
                element={<AboutPage profile={profile} />}
              />
              <Route
                path="/contact"
                element={<ContactPage profile={profile} />}
              />
              <Route
                path="/coulisses"
                element={
                  <MakingOfPage
                    steps={makingOfSteps}
                    stack={makingOfStack}
                  />
                }
              />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </AnimatedRoutes>
            </Suspense>
          </main>

          {/* Footer */}
          <Footer profile={profile} />
        </div>
        </BrowserRouter>
      </SmoothScroll>
      </MotionConfig>
      </SoundProvider>
    </ThemeProvider>
  );
}
