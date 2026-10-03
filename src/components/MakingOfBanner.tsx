import React from 'react';
import { Reveal } from './Reveal';
import { Pill } from './Folio';

const petals = (count: number, d: string, c: number, offset = 0) =>
  Array.from({ length: count }, (_, i) => <path key={i} d={d} transform={`rotate(${offset + (360 / count) * i} ${c} ${c})`} />);

const Flowers: React.FC = () => (
  <div className="fb-mk-flowers" aria-hidden="true">
    <svg className="fb-mk-f1" viewBox="0 0 200 200" fill="currentColor">
      {petals(8, 'M 94 100 L 88 30 L 112 30 L 106 100 Z', 100)}
      <g opacity=".75">{petals(8, 'M 96 100 L 94 58 L 106 58 L 104 100 Z', 100, 22.5)}</g>
      <circle cx="100" cy="100" r="16" />
    </svg>
    <svg className="fb-mk-f2" viewBox="0 0 200 200" fill="currentColor">
      {petals(5, 'M 95 100 L 82 35 L 118 35 L 105 100 Z', 100)}
      <circle cx="100" cy="100" r="20" />
    </svg>
    <svg className="fb-mk-f3" viewBox="0 0 120 120" fill="currentColor">
      {petals(6, 'M 55 60 L 50 20 L 70 20 L 65 60 Z', 60)}
      <circle cx="60" cy="60" r="9" />
    </svg>
    <svg className="fb-mk-f4" viewBox="0 0 160 160" fill="currentColor">
      {petals(8, 'M 75 80 L 70 28 L 90 28 L 85 80 Z', 80)}
      <circle cx="80" cy="80" r="12" />
    </svg>
    <svg className="fb-mk-petal fb-mk-p1" viewBox="0 0 40 40" fill="currentColor"><path d="M 20 5 C 10 15, 12 30, 20 35 C 28 30, 30 15, 20 5 Z" /></svg>
    <svg className="fb-mk-petal fb-mk-p2" viewBox="0 0 40 40" fill="currentColor"><path d="M 20 5 C 8 18, 14 32, 20 35 C 26 32, 32 18, 20 5 Z" /></svg>
  </div>
);

const TOOLS = [
  { src: 'https://cdn.simpleicons.org/supabase/ffffff', name: 'Supabase' },
  { src: 'https://cdn.simpleicons.org/netlify/ffffff', name: 'Netlify' },
  { src: 'https://cdn.simpleicons.org/anthropic/ffffff', name: 'Claude' },
];

interface MakingOfBannerProps {
  previewImage: string;
}

export const MakingOfBanner: React.FC<MakingOfBannerProps> = ({ previewImage }) => (
  <section className="fb-mk-banner" data-testid="home-making-of-block">
    <Flowers />
    <span className="fb-mk-glow" aria-hidden="true" />
    <Reveal className="fb-mk-copy">
      <span className="fb-label">Les coulisses</span>
      <h2 className="fb-title">De l’idée <span className="fb-accent">au système.</span></h2>
      <p className="fb-text">Apprendre, construire, tester, casser, comprendre et améliorer. Je documente le raisonnement derrière mes projets, car la solution n’est qu’une partie du travail. Découvrez comment j’ai conçu cette plateforme.</p>
      <div className="fb-mk-logos" data-testid="home-making-of-logos">
        {TOOLS.map((tool) => <img key={tool.name} src={tool.src} alt={tool.name} title={tool.name} loading="lazy" />)}
        <span className="fb-mk-studio" title="Google AI Studio"><img src="https://cdn.simpleicons.org/google/ffffff" alt="Google AI Studio" loading="lazy" />AI Studio</span>
      </div>
      <Pill to="/coulisses" testId="home-making-of">Explorer les coulisses</Pill>
    </Reveal>
    {previewImage && (
      <Reveal variant="scale" delay={0.15}>
        <figure className="fb-mk-visual">
          <img src={previewImage} alt="Aperçu de la fabrication du portfolio" loading="lazy" />
        </figure>
      </Reveal>
    )}
  </section>
);