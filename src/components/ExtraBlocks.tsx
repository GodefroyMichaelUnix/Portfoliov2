import React, { useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight, BarChart3, Bot, Calendar, Code2, Database, FileText, LayoutDashboard, Link2,
  Mail, MessageSquare, Plug, RefreshCw, ShieldCheck, Sparkles, Workflow, X, Zap
} from 'lucide-react';
import type { ServiceItem, PassionItem } from '../lib/extraContent';
import { Pill } from './Folio';

const ICONS: Record<string, React.ElementType> = {
  BarChart3, Bot, Calendar, Code2, Database, FileText, LayoutDashboard, Link2, Mail, MessageSquare,
  Plug, RefreshCw, ShieldCheck, Sparkles, Workflow, Zap
};

export const cascade = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

export const cascadeItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export const ServiceRow: React.FC<{ service: ServiceItem; index: number; onOpen: (s: ServiceItem) => void }> = ({ service, index, onOpen }) => {
  const Icon = ICONS[service.iconName] || Sparkles;
  return (
    <motion.button type="button" variants={cascadeItem} onClick={() => onOpen(service)} className="fb-service-row" data-testid={`service-row-${index}`} aria-haspopup="dialog">
      <span className="fb-service-icon"><Icon size={24} strokeWidth={1.8} /></span>
      <span>
        <h3>{service.title}</h3>
        {service.description && <p>{service.description}</p>}
      </span>
      <ArrowUpRight className="fb-service-arrow" size={20} />
    </motion.button>
  );
};

export const ServiceDialog: React.FC<{ service: ServiceItem | null; onClose: () => void }> = ({ service, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (service && !d.open) d.showModal();
    if (!service && d.open) d.close();
  }, [service]);
  const Icon = (service && ICONS[service.iconName]) || Sparkles;
  const hasExample = !!service && (!!service.before || !!service.after);

  return (
    <dialog ref={ref} className="fb-dialog" data-testid="service-dialog" aria-labelledby="service-dialog-title" data-lenis-prevent onClose={onClose} onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}>
      {service && (
        <div className="fb-dialog-inner">
          <button type="button" className="fb-dialog-close" data-testid="service-dialog-close" aria-label="Fermer le détail" onClick={() => ref.current?.close()}><X size={18} /></button>
          <span className="fb-service-icon"><Icon size={24} strokeWidth={1.8} /></span>
          {service.category && <span className="fb-label fb-dialog-cat">{service.category}</span>}
          <h3 id="service-dialog-title" data-testid="service-dialog-title">{service.title}</h3>
          {service.description && <p className="fb-dialog-desc">{service.description}</p>}
          {hasExample && (
            <div className="fb-ba" data-testid="service-dialog-example">
              {service.before && <div className="fb-ba-before" data-testid="service-dialog-before"><span>Avant</span><p>{service.before}</p></div>}
              {service.after && <div className="fb-ba-after" data-testid="service-dialog-after"><span>Après</span><p>{service.after}</p></div>}
            </div>
          )}
          <div className="fb-dialog-cta"><Pill to="/contact" testId="service-dialog-contact">En parler</Pill></div>
        </div>
      )}
    </dialog>
  );
};

const repeatTo = <T,>(list: T[], min: number) => Array.from({ length: Math.max(1, Math.ceil(min / list.length)) }, () => list).flat();

export const PassionsMarquee: React.FC<{ passions: PassionItem[] }> = ({ passions }) => {
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const speed = useRef(1);
  const target = useRef(1);
  const base = repeatTo(passions, 6);
  const loop = reduced ? passions : [...base, ...base];

  useAnimationFrame((_, delta) => {
    if (reduced || !track.current) return;
    speed.current += (target.current - speed.current) * 0.06;
    const half = track.current.scrollWidth / 2;
    let next = x.get() - (delta / 1000) * 42 * speed.current;
    if (-next >= half) next += half;
    x.set(next);
  });

  return (
    <div className={`fb-pmarquee ${reduced ? 'is-static' : ''}`} data-testid="home-passions-marquee" onMouseEnter={() => { target.current = 0.2; }} onMouseLeave={() => { target.current = 1; }}>
      <motion.div ref={track} className="fb-pmarquee-track" style={{ x }}>
        {loop.map((passion, i) => (
          <figure key={`${passion.id}-${i}`} className="fb-pmarquee-item" data-testid={i < passions.length ? `passion-slide-${i}` : undefined} aria-hidden={i >= passions.length || undefined}>
            {passion.imageUrl && <img src={passion.imageUrl} alt={i < passions.length ? passion.title : ''} loading="lazy" draggable={false} />}
            <figcaption><strong>{passion.title}</strong></figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
};

export const EmptyBlock: React.FC<{ label: string; title: string; text: string; testId: string }> = ({ label, title, text, testId }) => (
  <div className="fb-empty" data-testid={testId}>
    <span className="fb-label">{label}</span>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);
