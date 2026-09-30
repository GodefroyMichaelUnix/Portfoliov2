import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Hero } from '../components/Hero';
import { PageTransition } from '../components/PageTransition';
import portraitFallback from '../assets/images/michael_portrait_transparent.png';
import {
  ProfileInfo,
  ProjectItem,
  SkillCategory,
  Certification,
  PricingPlan,
  FAQItem,
  WorkflowScenario,
  HomeExpertiseCard,
  HomePillar
} from '../types/portfolio';
import { WorkflowShowcase } from '../components/WorkflowShowcase';
import { TechMarquee } from '../components/TechMarquee';
import { CountUpNumber } from '../components/CountUpNumber';
import { FAQSection } from '../components/FAQSection';
import { VideoPresentation } from '../components/VideoPresentation';
import { Reveal } from '../components/Reveal';
import { Pill, SectionHead } from '../components/Folio';
import { ServiceRow, ServiceDialog, PassionsMarquee, EmptyBlock, cascade } from '../components/ExtraBlocks';
import { MakingOfBanner } from '../components/MakingOfBanner';
import { useServices, usePassions, ServiceItem } from '../lib/extraContent';

const AMBIENT_VIDEO = '/art/presentation-ambiance.mp4';

interface HomePageProps {
  profile: ProfileInfo;
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: Certification[];
  pricingPlans?: PricingPlan[];
  faqs?: FAQItem[];
  workflows?: WorkflowScenario[];
  expertiseCards: HomeExpertiseCard[];
  pillars: HomePillar[];
}

const SHOTS = [
  { image: '/art/ref/bw-automation.jpg', title: 'Automatisation', text: 'Des outils qui travaillent ensemble.' },
  { image: '/art/ref/bw-ai.jpg', title: 'Intelligence artificielle', text: 'Du contexte à l’action.' },
  { image: '/art/ref/bw-dev.jpg', title: 'Développement', text: 'La liberté de créer sur mesure.' },
];

const FAN_FALLBACK = ['/art/agent-core.webp', '/art/workflow.webp', '/art/data-vault.webp'];

const yearOf = (date: string) => (date.match(/\d{4}/) || [date])[0];

const FanGallery: React.FC<{ cards: HomeExpertiseCard[] }> = ({ cards }) => {
  const items = cards.slice(0, 5);
  const mid = (items.length - 1) / 2;
  return (
    <div className="fb-fan" data-testid="home-fan-gallery">
      {items.map((card, i) => {
        const offset = i - mid;
        return (
          <motion.figure
            key={card.title}
            className="fb-fan-card"
            style={{ zIndex: 10 - Math.abs(Math.round(offset)) }}
            initial={{ rotate: 0, x: '0%', y: 40, opacity: 0 }}
            whileInView={{ rotate: offset * 9, x: `${offset * 64}%`, y: Math.abs(offset) * 22, opacity: 1 }}
            whileHover={{ y: Math.abs(offset) * 22 - 18 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            data-testid={`home-fan-card-${i}`}
          >
            <img src={card.bgImage || FAN_FALLBACK[i % FAN_FALLBACK.length]} alt={card.title} loading="lazy" />
            <figcaption><span>{card.category}</span>{card.title}</figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({
  profile,
  projects,
  skills,
  certifications,
  pricingPlans = [],
  faqs = [],
  workflows = [],
  expertiseCards = [],
}) => {
  const methodology = profile.methodology || [];
  const services = useServices();
  const passions = usePassions();
  const [openService, setOpenService] = useState<ServiceItem | null>(null);

  return (
    <PageTransition>
      <div className="fb-home relative z-10">
        <Hero profile={profile} skills={skills} />

        <section className="fb-panel fb-video-panel" data-testid="home-video">
          <VideoPresentation
            videoSrcFr={profile.presentationVideoUrl || AMBIENT_VIDEO}
            posterUrl={profile.presentationVideoPoster || '/art/presentation-poster.jpg'}
            placeholder={!profile.presentationVideoUrl}
            webmSrc={profile.presentationVideoUrl ? undefined : '/art/presentation-ambiance.webm'}
          />
        </section>

        <section className="fb-panel fb-panel-tight fb-tools-band" data-testid="home-tools">
          <TechMarquee />
        </section>

        <section className="fb-panel" data-testid="home-about-preview">
          <Reveal>
            <SectionHead
              label="Derrière les systèmes"
              title={profile.homeAboutTitle || 'Comprendre le problème.'}
              lead={profile.homeAboutAccent}
              text={profile.homeAboutDescription}
              cta={{ to: '/a-propos', label: 'Un peu plus sur moi', testId: 'home-about-link' }}
            />
          </Reveal>
          <div className="fb-trio">
            {SHOTS.map((shot, i) => (
              <Reveal key={shot.title} delay={i * 0.12}>
                <Link to="/competences" data-testid={`home-service-${i}`}>
                  <figure className="fb-shot">
                    <img src={shot.image} alt="" loading="lazy" />
                    <figcaption><strong>{shot.title}</strong><span>{shot.text}</span></figcaption>
                  </figure>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="fb-panel" data-testid="home-services">
          <Reveal>
            <SectionHead label="Mes services" title="Ce que je fais pour votre entreprise" cta={{ to: '/services', label: 'Voir tous les services', testId: 'home-all-services' }} />
          </Reveal>
          {services.items.length > 0 ? (
            <motion.div variants={cascade} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} className="fb-services-grid">
              {services.items.slice(0, 6).map((service, i) => <ServiceRow key={service.id} service={service} index={i} onOpen={setOpenService} />)}
            </motion.div>
          ) : services.loaded && (
            <EmptyBlock testId="home-services-empty" label="Bientôt" title="Les services arrivent." text="La liste détaillée des services sera publiée ici très prochainement." />
          )}
          <ServiceDialog service={openService} onClose={() => setOpenService(null)} />
        </section>

        <section className="fb-panel" data-testid="home-expertise">
          <Reveal>
            <SectionHead
              center
              label="Expertise"
              title="Savoir-faire"
              text={profile.homeSavoirFaireDescription}
              cta={{ to: '/competences', label: 'Toutes les compétences', testId: 'home-all-skills' }}
            />
          </Reveal>
          {expertiseCards.length > 0 && <FanGallery cards={expertiseCards} />}
          {methodology.length > 0 && (
            <div className="fb-steps">
              {methodology.slice(0, 4).map((phase, i) => (
                <Reveal key={phase.step || i} delay={i * 0.1} className="fb-step">
                  <span>#{String(i + 1).padStart(2, '0')}</span>
                  <h3>{phase.title}</h3>
                  {phase.tasks[0] && <p>{phase.tasks.slice(0, 2).join(' · ')}</p>}
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <section className="fb-panel" data-testid="home-about-me">
          <div className="fb-split">
            <Reveal>
              <span className="fb-label">À propos de moi</span>
              <h2 className="fb-title">{profile.aboutJourneyIntroTitle || profile.name}</h2>
              {profile.bioSummary[0] && <p className="fb-text">{profile.bioSummary[0]}</p>}
              {profile.bioSummary[1] && <p className="fb-text">{profile.bioSummary[1]}</p>}
              <div className="mt-8"><Pill to="/a-propos" testId="home-about-more">En savoir plus</Pill></div>
            </Reveal>
            {(
              <Reveal variant="scale">
                <div className="fb-portrait">
                  <img src={profile.heroPhotoUrl || profile.avatarUrl || portraitFallback} alt={profile.name} loading="lazy" />
                </div>
              </Reveal>
            )}
          </div>
        </section>

        <section className="fb-panel" data-testid="home-passions">
          <Reveal>
            <SectionHead label="Passions" title="Au-delà du travail" cta={{ to: '/passions', label: 'Voir plus', testId: 'home-all-passions' }} />
          </Reveal>
          {passions.items.length > 0 ? (
            <PassionsMarquee passions={passions.items} />
          ) : passions.loaded && (
            <EmptyBlock testId="home-passions-empty" label="Bientôt" title="Les passions arrivent." text="Cette section accueillera bientôt ce qui m’anime au quotidien, en dehors du travail." />
          )}
        </section>

        {workflows.length > 0 && (
          <section className="fb-panel fb-panel-tight"><WorkflowShowcase workflows={workflows} /></section>
        )}

        {pricingPlans.length > 0 && (
          <section className="fb-panel" data-testid="home-pricing">
            <Reveal>
              <SectionHead center label="Offres" title="Mes tarifs" text="Disponible pour des missions freelances ou des collaborations sur le long terme." />
            </Reveal>
            <div className="fb-prices">
              {pricingPlans.map((plan, i) => (
                <Reveal key={plan.id || i} delay={i * 0.12} className="h-full">
                  <div data-testid={`pricing-plan-${i}`} className="fb-card fb-price h-full">
                    <span className="fb-label">{plan.label}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{plan.prefix}</span>
                      <CountUpNumber value={plan.numeric} className="text-5xl md:text-6xl font-extrabold tracking-tighter" />
                    </div>
                    <p className="fb-text">{plan.description}</p>
                    <ul className="space-y-3 mt-8">
                      {plan.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 font-semibold">
                          <Check className="w-4 h-4 text-orange-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-8">Tarifs indicatifs, ajustés selon la complexité et la portée du projet.</p>
          </section>
        )}

        <section className="fb-panel" data-testid="home-projects">
          <Reveal>
            <SectionHead
              label="Réalisations"
              title="Projets récents"
              lead="Des problèmes concrets, des systèmes sur mesure."
              cta={{ to: '/projets', label: 'Tous les projets', testId: 'home-all-projects' }}
            />
          </Reveal>
          {projects.length > 0 ? (
            <div className="fb-list">
              {projects.slice(0, 5).map((project, i) => (
                <Link key={project.id} to="/projets" data-testid={`home-project-${i}`} className="fb-row">
                  <span className="fb-row-cat">{project.categoryLabel}</span>
                  <span className="fb-row-title">{project.title}</span>
                  <span className="fb-row-text">{project.subtitle}</span>
                  <ArrowUpRight className="w-5 h-5 text-orange-500" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="fb-empty" data-testid="home-projects-empty">
              <span className="fb-label">En préparation</span>
              <h3>Les premiers projets arrivent bientôt.</h3>
              <p>Cette section accueillera progressivement les systèmes et automatisations que je construis et documente.</p>
            </div>
          )}
        </section>

        {certifications.length > 0 && (
          <section className="fb-panel" data-testid="home-certifications">
            <Reveal>
              <SectionHead label="Validation" title="Certifications" cta={{ to: '/certifications', label: 'Tout voir', testId: 'home-all-certifications' }} />
            </Reveal>
            <div className="fb-awards">
              <Reveal variant="scale"><div className="fb-awards-img"><img src="/art/ref/certs.jpg" alt="" loading="lazy" /></div></Reveal>
              <div className="fb-list">
                {certifications.slice(0, 8).map((cert, i) => (
                  <Link key={cert.id} to="/certifications" className="fb-row" data-testid={`home-cert-${i}`}>
                    <span className="fb-row-cat">{cert.issuer}</span>
                    <span className="fb-row-title">{cert.title}</span>
                    <span className="fb-row-year">{yearOf(cert.issueDate)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <MakingOfBanner />

        {faqs.length > 0 && (
          <section className="fb-panel"><FAQSection faqs={faqs} /></section>
        )}

        <section id="contact" className="fb-panel fb-cta-panel" data-testid="home-contact">
          <Reveal>
            <span className="fb-label">Contact</span>
            <h2 className="fb-title">Un projet en tête ?</h2>
            {profile.homeContactDescription && <p className="fb-text">{profile.homeContactDescription}</p>}
            <div className="mt-10"><Pill to="/contact" variant="light" testId="home-contact-cta">Contactez-moi</Pill></div>
          </Reveal>
        </section>
      </div>
    </PageTransition>
  );
};
