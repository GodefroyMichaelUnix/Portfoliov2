import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Send,
  Layers,
  Award,
  User,
  Wrench,
  Home,
  Sun,
  Moon,
  BadgeCheck,
  Code2,
  ArrowUpRight,
  Briefcase,
  Heart
} from 'lucide-react';
import { ExplorerMenu } from './ExplorerMenu';
import { ProfileInfo } from '../types/portfolio';
import { MagneticWrapper } from './MagneticWrapper';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';
import { AudioLines, VolumeX } from 'lucide-react';

interface NavbarProps {
  profile: ProfileInfo;
}

export const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const sound = useSound();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const close = () => setMobileMenuOpen(false);
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMobileMenuOpen(false); document.getElementById('mobile-menu-toggle')?.focus(); }
    };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setMobileMenuOpen(false); };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Accueil', path: '/', icon: Home, description: 'Le portfolio en un regard' },
    { label: 'Services', path: '/services', icon: Briefcase, description: 'Ce que je fais pour votre entreprise' },
    { label: 'Projets', path: '/projets', icon: Layers, description: 'Des idées mises en pratique' },
    { label: 'Compétences', path: '/competences', icon: Wrench, description: 'Outils et savoir-faire' },
    { label: 'Certifications', path: '/certifications', icon: Award, description: 'Apprendre et progresser' },
    { label: 'À propos', path: '/a-propos', icon: User, description: 'L’humain derrière les systèmes' },
    { label: 'Passions', path: '/passions', icon: Heart, description: 'Ce qui m’anime au quotidien' },
    { label: 'Coulisses', path: '/coulisses', icon: Code2, description: 'Du premier brief au dernier pixel' },
  ];


  return (
    <header 
      ref={header}
      onBlur={event => { if (mobileMenuOpen && !event.currentTarget.contains(event.relatedTarget as Node)) setMobileMenuOpen(false); }}
      id="main-navbar"
      data-testid="floating-topbar"
      className={`topbar-shell topbar-reference ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <div className="flex items-center justify-between gap-3 px-3 sm:px-5 py-3">
        {/* Brand / Logo : Serré à gauche */}
        <div className="nav-brand-group flex items-center min-w-0">
          <Link 
            to="/"
            id="navbar-logo"
            data-testid="navbar-logo"
            className="group flex items-center gap-3 text-left focus:outline-none shrink-0"
          >
            <motion.div 
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="navbar-avatar"
              data-testid="navbar-avatar"
            >
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="navbar-avatar-img" />
              ) : (
                <div className="navbar-avatar-img bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase">
                  {profile.name ? profile.name.slice(0, 2) : ''}
                </div>
              )}
              <span className="navbar-avatar-badge" aria-label="Profil vérifié" title="Profil vérifié">
                <BadgeCheck className="w-full h-full" strokeWidth={2.4} />
              </span>
            </motion.div>
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-tight uppercase text-zinc-900 dark:text-white flex items-center gap-2 whitespace-nowrap">
                <span>{profile.name}</span>
              </div>
              <div className="navbar-brand-tagline">
                {profile.roleSubtitle || ''}
              </div>
            </div>
          </Link>
        </div>

        <nav id="desktop-nav" aria-label="Navigation principale" className="desktop-reference-nav hidden lg:flex">
          <ExplorerMenu />
          {navLinks.filter(link => ['/', '/services', '/projets', '/coulisses'].includes(link.path)).map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              data-testid={`nav-${link.path.slice(1) || 'home'}`}
              className={({ isActive }) => `nav-plain-link ${isActive ? 'is-active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="nav-active-indicator" className="nav-active-indicator" data-testid="nav-active-indicator" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span className="nav-label">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons & Theme Toggle : Serrés à droite */}
        <div className="flex items-center justify-end flex-1 gap-2.5 sm:gap-3 shrink-0">
          {/* Bouton "Me contacter" (Desktop / Tablet) */}
          <div className="hidden sm:block">
            <MagneticWrapper strength={0.25}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 16 }}
              >
                <Link
                  to="/contact"
                  id="navbar-contact-cta"
                  data-testid="navbar-contact-cta"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white rounded-full text-xs font-semibold tracking-wide transition-all shadow-xs whitespace-nowrap"
                >
                  <span>Me contacter</span>
                  <span className="fb-pill-dot" aria-hidden="true"><ArrowUpRight size={15} strokeWidth={2.2} /></span>
                </Link>
              </motion.div>
            </MagneticWrapper>
          </div>

          {/* Bouton Contact compact (< sm) */}
          <Link
            to="/contact"
            className="p-2 bg-orange-600 dark:bg-orange-500 text-white rounded-full text-xs font-semibold sm:hidden shadow-xs"
            data-testid="navbar-contact-compact"
            title="Me contacter"
          >
            <Send className="w-3.5 h-3.5" />
          </Link>

          {/* Signature sonore — activation explicite */}
          <button type="button" data-testid="sound-toggle" data-sound-control aria-pressed={sound.enabled} disabled={!sound.available} onClick={sound.toggle} className="topbar-icon sound-toggle" title={sound.enabled ? 'Couper la signature sonore' : 'Activer la signature sonore'} aria-label={sound.enabled ? 'Couper la signature sonore' : 'Activer la signature sonore'}>
            {sound.enabled ? <AudioLines size={17} /> : <VolumeX size={17} />}
          </button>
          {/* Theme Toggle Icon Button tout à droite */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => toggleTheme(e)}
            id="theme-toggle-btn"
            data-testid="theme-toggle"
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center transition-colors text-zinc-700 dark:text-amber-300 focus:outline-none shadow-xs cursor-pointer shrink-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-700" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Bouton Hamburger pour mobile (< lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            data-testid="mobile-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
            className="lg:hidden p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
            aria-label={mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            id="mobile-menu-drawer"
            data-testid="mobile-menu-drawer"
            className="mobile-reference-panel lg:hidden"
            data-lenis-prevent
          >
            <div className="mobile-reference-heading"><span>Explorer le portfolio</span><span className="signal-dot" /></div>
            <div className="space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    data-testid={`mobile-nav-${link.path.slice(1) || 'home'}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-reference-link ${isActive ? 'is-active' : ''}`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span><strong>{link.label}</strong><small>{link.description}</small></span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <Link
                to="/contact"
                data-testid="mobile-nav-contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 dark:bg-orange-500 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Initier un échange direct</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
