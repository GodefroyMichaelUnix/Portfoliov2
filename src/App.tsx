/**
 * Portfolio professionnel de Michael Godefroy
 * AI & Automation Engineer | IT Automation
 *
 * Stack: React 19 + TypeScript + Tailwind CSS + React Router + Motion
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { SoundProvider } from './context/SoundContext';
import { portfolioService } from './services/portfolioService';
import {
  ProfileInfo,
  ProjectItem,
  SkillCategory,
  Certification,
  PricingPlan,
  FAQItem,
  WorkflowScenario
} from './types/portfolio';
import { ThemeProvider } from './context/ThemeContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AutomationBackground } from './components/AutomationBackground';

import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { MakingOfPage } from './pages/MakingOfPage';

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
  stats: []
};

export default function App() {
  const [profile, setProfile] = useState<ProfileInfo>(initialProfile);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowScenario[]>([]);

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
          wfData
        ] = await Promise.all([
          portfolioService.getProfile(),
          portfolioService.getProjects(),
          portfolioService.getSkills(),
          portfolioService.getCertifications(),
          portfolioService.getPricingPlans(),
          portfolioService.getFaqs(),
          portfolioService.getWorkflows()
        ]);

        if (profData) setProfile(profData);
        if (projData) setProjects(projData);
        if (skillData) setSkills(skillData);
        if (certData) setCertifications(certData);
        if (pricingData) setPricingPlans(pricingData);
        if (faqData) setFaqs(faqData);
        if (wfData) setWorkflows(wfData);
      } catch (err) {
        console.error('Erreur lors du chargement des données portfolio depuis Supabase :', err);
      }
    }

    loadPortfolioData();
  }, []);

  return (
    <ThemeProvider>
      <SoundProvider>
      <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <BrowserRouter>
          <ScrollToTop />
          <CustomCursor />
          <div className="min-h-screen bg-[#fafaf8] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 relative flex flex-col justify-between transition-colors duration-300">
          {/* Engineering & AI Automation Background Motifs */}
          <AutomationBackground />

          {/* Top Navbar */}
          <a href="#main-content" className="skip-link" data-testid="skip-to-content">Aller au contenu</a>
          <Navbar profile={profile} />

          {/* Main Content Area: Multi-Page Routing */}
          <main id="main-content" className="relative z-10 pt-28 pb-16 flex-1">
            <Routes>
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
                element={<MakingOfPage />}
              />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
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
