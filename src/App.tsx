/**
 * Portfolio professionnel de Michael Godefroy
 * AI Automation Engineer | IT Automation
 *
 * Stack: React 19 + TypeScript + Tailwind CSS + React Router + Motion
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { SoundProvider } from './context/SoundContext';
import { portfolioService } from './services/portfolioService';
import {
  ProfileInfo,
  ProjectItem,
  SkillCategory,
  Certification
} from './types/portfolio';
import { ThemeProvider } from './context/ThemeContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AutomationBackground } from './components/AutomationBackground';

import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { BootLoader } from './components/BootLoader';
import { ScrollProgress } from './components/ScrollProgress';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { MakingOfPage } from './pages/MakingOfPage';

export default function App() {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [
          profData,
          projData,
          skillData,
          certData
        ] = await Promise.all([
          portfolioService.getProfile(),
          portfolioService.getProjects(),
          portfolioService.getSkills(),
          portfolioService.getCertifications()
        ]);

        setProfile(profData);
        setProjects(projData);
        setSkills(skillData);
        setCertifications(certData);
      } catch (err) {
        console.error('Erreur lors du chargement des données portfolio :', err);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  if (loading || !profile) {
    return (
      <>
        <AnimatePresence>
          {booting && <BootLoader onComplete={() => setBooting(false)} />}
        </AnimatePresence>
        <div className="min-h-screen bg-[#fafaf8] dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 flex items-center justify-center font-mono text-xs">
          <div className="flex items-center gap-3 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping"></span>
            <span className="font-sans font-medium text-zinc-800 dark:text-zinc-200">Initialisation du portfolio de Michael Godefroy...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <ThemeProvider>
      <SoundProvider>
      <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {booting && <BootLoader onComplete={() => setBooting(false)} />}
      </AnimatePresence>
      <SmoothScroll>
        <BrowserRouter>
          <ScrollToTop />
          <ScrollProgress />
          <CustomCursor />
          <div className="min-h-screen bg-[#fafaf8] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 relative flex flex-col justify-between transition-colors duration-300">
          {/* Engineering & AI Automation Background Motifs */}
          <AutomationBackground />

          {/* Top Navbar */}
          <a href="#main-content" className="skip-link" data-testid="skip-to-content">Aller au contenu</a>
          <Navbar profile={profile} />

          {/* Main Content Area: Multi-Page Routing */}
          <main id="main-content" data-booting={booting} className="relative z-10 pt-28 pb-16 flex-1">
            {!booting && (
              <AppRoutes
                profile={profile}
                projects={projects}
                skills={skills}
                certifications={certifications}
              />
            )}
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

/**
 * Location-keyed routes wrapped in AnimatePresence so every navigation
 * plays the cinematic PageTransition curtain (exit, then enter).
 */
const AppRoutes: React.FC<{
  profile: ProfileInfo;
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: Certification[];
}> = ({ profile, projects, skills, certifications }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <HomePage
              profile={profile}
              projects={projects}
              skills={skills}
              certifications={certifications}
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
    </AnimatePresence>
  );
};
