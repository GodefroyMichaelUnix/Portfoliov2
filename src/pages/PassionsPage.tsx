import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { PageIntro } from '../components/PageIntro';
import { Reveal } from '../components/Reveal';
import { EmptyBlock } from '../components/ExtraBlocks';
import { usePassions } from '../lib/extraContent';

export const PassionsPage: React.FC = () => {
  const { items, loaded } = usePassions();

  return (
    <PageTransition>
      <div className="studio-page passions-page">
        <PageIntro
          number="08"
          label="Passions"
          title="L’humain derrière les systèmes."
          accent=""
          description="Ce qui m’inspire, me ressource et nourrit ma curiosité en dehors des projets."
        />

        {loaded && items.length === 0 && (
          <EmptyBlock testId="passions-empty" label="Bientôt" title="Les passions arrivent." text="Cette galerie accueillera bientôt ce qui m’anime au quotidien, en dehors du travail." />
        )}

        <div className="fb-passions-list">
          {items.map((passion, i) => (
            <article key={passion.id} className="fb-passion" data-testid={`passion-${i}`}>
              <Reveal variant="mask" className="fb-passion-img">
                {passion.imageUrl && <img src={passion.imageUrl} alt={passion.title} loading="lazy" />}
              </Reveal>
              <Reveal delay={0.15}>
                <span className="fb-label">#{String(i + 1).padStart(2, '0')}</span>
                <h2 className="fb-title">{passion.title}</h2>
                {passion.description && <p className="fb-text">{passion.description}</p>}
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
