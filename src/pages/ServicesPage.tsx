import React from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { PageIntro } from '../components/PageIntro';
import { Pill } from '../components/Folio';
import { ServiceRow, EmptyBlock, cascade } from '../components/ExtraBlocks';
import { useServices, ServiceItem } from '../lib/extraContent';

const ORDER = ['Automatisation', 'IA', 'Intégrations', 'Données', 'Développement sur mesure'];

const groupServices = (services: ServiceItem[]) => {
  const groups = new Map<string, ServiceItem[]>();
  services.forEach((s) => groups.set(s.category || 'Autres', [...(groups.get(s.category || 'Autres') || []), s]));
  return [...groups.entries()].sort(([a], [b]) => (ORDER.indexOf(a) + 1 || 99) - (ORDER.indexOf(b) + 1 || 99));
};

export const ServicesPage: React.FC = () => {
  const { items, loaded } = useServices();
  let index = 0;

  return (
    <PageTransition>
      <div className="studio-page services-page">
        <PageIntro
          number="07"
          label="Mes services"
          title="Moins de tâches répétitives."
          accent="Plus de temps utile."
          description="Des résultats concrets pour votre entreprise : je connecte vos outils, j’automatise vos processus et je mets l’IA au service de vos équipes."
        />

        {loaded && items.length === 0 && (
          <EmptyBlock testId="services-empty" label="Bientôt" title="Les services arrivent." text="La liste détaillée des services sera publiée ici très prochainement." />
        )}

        {groupServices(items).map(([category, services]) => (
          <section key={category} className="fb-service-group" data-testid={`service-group-${category}`}>
            <span className="fb-label">{category}</span>
            <motion.div variants={cascade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="fb-services-grid">
              {services.map((service) => <ServiceRow key={service.id} service={service} index={index++} />)}
            </motion.div>
          </section>
        ))}

        <section className="fb-cta-panel fb-inline-cta" data-testid="services-cta">
          <span className="fb-label">Un besoin précis ?</span>
          <h2 className="fb-title">Parlons de votre projet.</h2>
          <p className="fb-text">Décrivez-moi le processus qui vous fait perdre du temps : je vous propose une solution adaptée.</p>
          <div className="mt-10"><Pill to="/contact" variant="light" testId="services-contact-cta">Me contacter</Pill></div>
        </section>
      </div>
    </PageTransition>
  );
};
