import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { ProfileInfo } from '../types/portfolio';

interface FooterProps {
  profile: ProfileInfo;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  const wordmark = profile.name ? (profile.name.trim().split(/\s+/).pop() || '').toUpperCase() : '';

  return (
    <footer id="main-footer" className="footer-studio">
      <div className="footer-next"><div><p className="text-sm text-zinc-500">Les meilleures connexions commencent par une conversation.</p></div><Link to="/contact" data-testid="footer-start-conversation">Créons la suite. <ArrowUpRight size={34} strokeWidth={1} /></Link></div>
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Center links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-bold text-zinc-500 dark:text-zinc-400">
          <Link data-testid="footer-home" to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Accueil</Link>
          <Link data-testid="footer-services" to="/services" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Services</Link>
          <Link data-testid="footer-projects" to="/projets" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Projets</Link>
          <Link data-testid="footer-skills" to="/competences" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Compétences</Link>
          <Link data-testid="footer-certifications" to="/certifications" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Certifications</Link>
          <Link data-testid="footer-about" to="/a-propos" className="hover:text-zinc-900 dark:hover:text-white transition-colors">À propos</Link>
          <Link data-testid="footer-passions" to="/passions" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Passions</Link>
          <Link data-testid="footer-making-of" to="/coulisses" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Coulisses</Link>
          <Link data-testid="footer-contact" to="/contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Right back to top */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            data-testid="back-to-top"
            aria-label="Remonter en haut de page"
            className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-all focus:outline-none shadow-xs cursor-pointer"
            title="Remonter en haut de page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
      {wordmark && <div className="footer-wordmark" aria-hidden="true">{wordmark}.</div>}
    </footer>
  );
};
