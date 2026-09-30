import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { Certification } from '../types/portfolio';
import { cascadeItem } from './ExtraBlocks';

const yearOf = (date: string) => (date.match(/\d{4}/) || [date])[0];

export const CertificateCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const logo = cert.id === 'cert-efset-english'
    ? <span aria-label={cert.issuer} className="issuer-monogram">EF</span>
    : cert.logo && <img src={cert.logo} alt={cert.issuer} className="fb-cert-logo" />;

  return (
    <motion.div variants={cascadeItem} data-testid={`credential-${cert.id}`}>
      <button type="button" className="fb-row fb-cert-row" data-testid={`credential-open-${cert.id}`} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
        <span className="fb-row-cat">{cert.issuer}</span>
        <span className="fb-row-title">{cert.title}</span>
        <span className="fb-row-year">{yearOf(cert.issueDate)}</span>
        <ArrowUpRight className="fb-cert-arrow" size={20} aria-label={`Examiner la certification ${index + 1}`} />
      </button>
      <dialog ref={dialog} data-testid={`credential-dialog-${cert.id}`} className="fb-dialog" aria-labelledby={`credential-title-${cert.id}`} data-lenis-prevent onClick={(e) => { if (e.target === dialog.current) dialog.current.close(); }}>
        <div className="fb-dialog-inner">
          <button type="button" data-testid={`credential-close-${cert.id}`} aria-label="Fermer le détail" className="fb-dialog-close" onClick={() => dialog.current?.close()}><X size={18} /></button>
          <span className="fb-label">Certification</span>
          <div className="fb-dialog-logo">{logo}</div>
          <h3 id={`credential-title-${cert.id}`}>{cert.title}</h3>
          <p className="fb-dialog-meta">{cert.issuer} · {cert.issueDate}</p>
          {cert.summary && <p className="fb-dialog-desc">{cert.summary}</p>}
          {cert.skills.length > 0 && <div className="fb-chips">{cert.skills.map((skill) => <span className="fb-chip" key={skill}>{skill}</span>)}</div>}
          {cert.verifyUrl && (
            <a data-testid={`credential-verify-${cert.id}`} href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="fb-pill fb-pill-line fb-dialog-verify">
              <span>Voir la source officielle</span>
              <span className="fb-pill-dot" aria-hidden="true"><ExternalLink size={15} /></span>
            </a>
          )}
        </div>
      </dialog>
    </motion.div>
  );
};
