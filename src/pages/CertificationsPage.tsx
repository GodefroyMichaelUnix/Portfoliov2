import React from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { Certification } from '../types/portfolio';
import { PageIntro } from '../components/PageIntro';
import { CertificateCard } from '../components/CertificateCard';
import { Reveal } from '../components/Reveal';
import { Pill, SectionHead } from '../components/Folio';
import { cascade } from '../components/ExtraBlocks';

interface CertificationsPageProps {
  certifications: Certification[];
}

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ certifications }) => (
  <PageTransition>
    <div className="studio-page certifications-page">
      <PageIntro number="03" label="Validation" title="Apprendre. Construire." accent="Aller plus loin." description="La curiosité comme moteur. Des connaissances structurées, des compétences mises à l’épreuve et une progression continue." />

      <Reveal>
        <SectionHead label="Registre" title="Certifications" text={`${String(certifications.length).padStart(2, '0')} certifications obtenues. Cliquez sur une ligne pour voir le détail, les compétences validées et la source officielle.`} />
      </Reveal>

      <div className="credential-register">
        <span className="chapter-meta">REGISTRE DES CERTIFICATIONS</span>
        <span className="font-mono text-xs">{String(certifications.length).padStart(2, '0')} DOSSIERS</span>
      </div>

      <motion.div
        variants={cascade}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        data-testid="certifications-list"
      >
        {certifications.map((cert, index) => (
          <CertificateCard key={cert.id} cert={cert} index={index} />
        ))}
      </motion.div>

      <section className="fb-cta-panel fb-inline-cta" data-testid="certifications-cta">
        <span className="fb-label">Veille continue</span>
        <h2 className="fb-title">Toujours en apprentissage.</h2>
        <p className="fb-text">Je teste en continu les nouveaux modèles et outils pour proposer la solution la plus adaptée à chaque besoin.</p>
        <div className="mt-10"><Pill to="/contact" variant="light" testId="certifications-contact-cta">Me contacter</Pill></div>
      </section>
    </div>
  </PageTransition>
);
