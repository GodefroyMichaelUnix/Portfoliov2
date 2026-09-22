import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Award, ArrowUpRight, ChevronDown, Code2, User, Wrench } from 'lucide-react';

const destinations = [
  { path: '/competences', label: 'Compétences', description: 'Les outils au service des idées', icon: Wrench, image: 'workflow', caption: 'Du savoir-faire aux systèmes utiles.' },
  { path: '/certifications', label: 'Certifications', description: 'Apprendre, pratiquer, progresser', icon: Award, image: 'data-vault', caption: 'Une expertise qui se construit.' },
  { path: '/a-propos', label: 'À propos', description: 'L’humain derrière les projets', icon: User, image: 'agent-core', caption: 'Curieux par nature. Bâtisseur par choix.' },
];

export const ExplorerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const location = useLocation();
  const reduced = useReducedMotion();
  const selected = destinations[preview];

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const close = () => setOpen(false);
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false); trigger.current?.focus(); }
  };
  return (
    <div className="explorer-anchor" ref={root} onKeyDown={handleKeyDown} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}>
      <button ref={trigger} type="button" data-testid="explorer-toggle" className={`nav-disclosure ${destinations.some(item => item.path === location.pathname) ? 'is-active' : ''}`} aria-expanded={open} aria-controls="explorer-panel" onClick={() => setOpen(value => !value)} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); requestAnimationFrame(() => firstLink.current?.focus()); } }}>
        Explorer <ChevronDown size={13} className={open ? 'is-open' : ''} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && <motion.div id="explorer-panel" data-testid="explorer-panel" className="explorer-panel" initial={{ opacity: 0, y: reduced ? 0 : 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : 5 }} transition={{ duration: .2, ease: [.16, 1, .3, 1] }}>
          <nav className="explorer-links" aria-label="Explorer le portfolio">
            <span className="explorer-eyebrow">FAIRE CONNAISSANCE</span>
            {destinations.map((item, i) => <NavLink ref={i === 0 ? firstLink : undefined} key={item.path} to={item.path} data-testid={`explore-link-${item.path.slice(1)}`} className={({ isActive }) => `explorer-link ${isActive ? 'is-active' : ''}`} onMouseEnter={() => setPreview(i)} onFocus={() => setPreview(i)} onClick={() => setOpen(false)}>
              <span className="explorer-link-icon"><item.icon size={17} strokeWidth={1.6} /></span><span><strong>{item.label}</strong><small>{item.description}</small></span><ArrowUpRight className="explorer-row-arrow" size={15} />
            </NavLink>)}
          </nav>
          <Link to={selected.path} data-testid="explorer-preview-link" className="explorer-preview" onClick={() => setOpen(false)}>
            <div className="explorer-preview-art"><img src={`/art/${selected.image}.webp`} alt="Composition originale de systèmes d’automatisation" /><span>MG / EXPLORATIONS</span></div>
            <div className="explorer-preview-caption"><span data-testid="explorer-preview-caption">{selected.caption}</span><ArrowUpRight size={17} /></div>
          </Link>
          <div className="explorer-bottom"><span className="signal-dot" /><span>Les bonnes connexions commencent ici.</span></div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
};
