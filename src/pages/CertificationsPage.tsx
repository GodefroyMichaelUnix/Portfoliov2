import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { Certification } from '../types/portfolio';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { PageIntro } from '../components/PageIntro';
import { CertificateCard } from '../components/CertificateCard';

interface CertificationsPageProps {
  certifications: Certification[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 25
    }
  }
};

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ certifications }) => {
  return (
    <PageTransition>
      <div className="studio-page certifications-page">
        <PageIntro number="03" label="Validation" title="Apprendre. Construire." accent="Aller plus loin." description="La curiosité comme moteur. Des connaissances structurées, des compétences mises à l’épreuve et une progression continue." />
        <div className="credential-register"><span className="chapter-meta">REGISTRE DES CERTIFICATIONS</span><span className="font-mono text-xs">{String(certifications.length).padStart(2, '0')} DOSSIERS</span></div>

        {/* Minimal Certifications Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {certifications.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>

        {/* Minimal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="studio-cta"
        >
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tighter">Veille continue</h2>
            <p className="text-orange-100 text-sm font-medium">
              Tests constants (Claude 3.5, Gemini 1.5) pour la meilleure solution.
            </p>
          </div>
          <MagneticWrapper strength={0.25}>
            <Link
              data-testid="certifications-contact-cta"
              to="/contact"
              className="px-8 py-4 bg-white text-orange-600 dark:text-orange-900 hover:bg-zinc-50 rounded-full text-xs font-black uppercase tracking-widest transition-all shrink-0 inline-flex items-center gap-3 shadow-lg"
            >
              <span>Me contacter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MagneticWrapper>
        </motion.div>
      </div>
    </PageTransition>
  );
};
