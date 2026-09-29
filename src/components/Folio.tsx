import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

type PillVariant = 'orange' | 'light' | 'ghost' | 'line';

export const Pill: React.FC<{ to: string; children: React.ReactNode; variant?: PillVariant; testId?: string }> = ({ to, children, variant = 'orange', testId }) => (
  <Link to={to} data-testid={testId} className={`fb-pill fb-pill-${variant}`}>
    <span>{children}</span>
    <span className="fb-pill-dot" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={2.2} /></span>
  </Link>
);

interface SectionHeadProps {
  label?: string;
  title: string;
  lead?: string;
  text?: string;
  cta?: { to: string; label: string; testId?: string };
  center?: boolean;
}

export const SectionHead: React.FC<SectionHeadProps> = ({ label, title, lead, text, cta, center }) => (
  <div className={`fb-head ${center ? 'is-center' : ''}`}>
    <div>
      {label && <span className="fb-label">{label}</span>}
      <h2 className="fb-title">{title}</h2>
    </div>
    {(lead || text || cta) && (
      <div className="fb-head-aside">
        {lead && <p className="fb-lead">{lead}</p>}
        {text && <p className="fb-text">{text}</p>}
        {cta && <Pill to={cta.to} testId={cta.testId}>{cta.label}</Pill>}
      </div>
    )}
  </div>
);
