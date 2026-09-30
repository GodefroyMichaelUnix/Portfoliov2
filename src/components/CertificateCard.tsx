import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, X, Fingerprint, ExternalLink } from 'lucide-react';
import { Certification } from '../types/portfolio';

export const CertificateCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <motion.article initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="credential-card" data-testid={`credential-${cert.id}`}>
      <div className="credential-top"><span className="chapter-meta">ACCRÉDITATION / {String(index + 1).padStart(2, '0')}</span><span className="font-mono text-xs">{cert.issueDate}</span></div>
      <div className="credential-mark"><Fingerprint size={64} strokeWidth={0.65} aria-hidden="true" />{cert.id === 'cert-efset-english' ? <span aria-label={cert.issuer} className="issuer-monogram">EF</span> : <img src={cert.logo} alt={cert.issuer} loading="lazy" />}</div>
      <span className="credential-issuer">{cert.issuer}</span>
      <h2>{cert.title}</h2>
      <div className="credential-footer"><span className="credential-barcode" aria-hidden="true" /><button data-testid={`credential-open-${cert.id}`} onClick={() => dialog.current?.showModal()} className="text-link">Examiner <ArrowUpRight size={18} /></button></div>
      <dialog ref={dialog} data-testid={`credential-dialog-${cert.id}`} className="credential-dialog" aria-labelledby={`credential-title-${cert.id}`} data-lenis-prevent onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}>
        <div className="credential-dialog-inner">
          <button data-testid={`credential-close-${cert.id}`} aria-label="Fermer le détail" className="dialog-close" onClick={() => dialog.current?.close()}><X size={20} /></button>
          <span className="chapter-meta">DOSSIER / CERTIFICATION</span>
          {cert.id === 'cert-efset-english' ? <span aria-label={cert.issuer} className="issuer-monogram my-8">EF</span> : <img src={cert.logo} alt={cert.issuer} className="w-12 h-12 object-contain my-8" />}
          <h3 id={`credential-title-${cert.id}`} className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{cert.title}</h3>
          <p className="text-orange-600 dark:text-orange-400 text-sm mt-3">{cert.issuer} · {cert.issueDate}</p>
          <p className="my-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">{cert.summary}</p>
          <div className="flex flex-wrap gap-2 mb-10">{cert.skills.map(skill => <span className="skill-level" key={skill}>{skill}</span>)}</div>
          <a data-testid={`credential-verify-${cert.id}`} href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-link">Voir la source officielle <ExternalLink size={16} /></a>
        </div>
      </dialog>
    </motion.article>
  );
};
