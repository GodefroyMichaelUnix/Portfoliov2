import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight, BarChart3, Bot, Calendar, Code2, Database, FileText, LayoutDashboard, Link2,
  Mail, MessageSquare, Plug, RefreshCw, ShieldCheck, Sparkles, Workflow, Zap
} from 'lucide-react';
import type { ServiceItem, PassionItem } from '../lib/extraContent';

const ICONS: Record<string, React.ElementType> = {
  BarChart3, Bot, Calendar, Code2, Database, FileText, LayoutDashboard, Link2, Mail, MessageSquare,
  Plug, RefreshCw, ShieldCheck, Sparkles, Workflow, Zap
};

export const cascade = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export const ServiceRow: React.FC<{ service: ServiceItem; index: number }> = ({ service, index }) => {
  const Icon = ICONS[service.iconName] || Sparkles;
  return (
    <motion.div variants={item} className="fb-service-row" data-testid={`service-row-${index}`}>
      <span className="fb-service-icon"><Icon size={24} strokeWidth={1.8} /></span>
      <div>
        <h3>{service.title}</h3>
        {service.description && <p>{service.description}</p>}
      </div>
      <ArrowUpRight className="fb-service-arrow" size={20} />
    </motion.div>
  );
};

export const PassionTile: React.FC<{ passion: PassionItem; index: number }> = ({ passion, index }) => (
  <motion.figure variants={item} className="fb-passion-tile" data-testid={`passion-tile-${index}`}>
    {passion.imageUrl && <img src={passion.imageUrl} alt={passion.title} loading="lazy" />}
    <figcaption><strong>{passion.title}</strong></figcaption>
  </motion.figure>
);

export const EmptyBlock: React.FC<{ label: string; title: string; text: string; testId: string }> = ({ label, title, text, testId }) => (
  <div className="fb-empty" data-testid={testId}>
    <span className="fb-label">{label}</span>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);
