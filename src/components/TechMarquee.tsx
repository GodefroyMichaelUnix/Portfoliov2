import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioService } from '../services/portfolioService';

const STORAGE_BUCKET = 'tech-logos';

function getStorageUrl(path?: string): string | undefined {
  if (!path || !supabase) return undefined;
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

export const TechMarquee: React.FC = () => {
  const [logos, setLogos] = useState<TechStackItem[]>([]);
  const [failedStorage, setFailedStorage] = useState<Record<string, boolean>>({});
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const reduced = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    portfolioService
      .getTechStack()
      .then((data) => { if (!cancelled) setLogos(data); })
      .catch((error) => {
        console.error('Impossible de charger le Tech Stack depuis Supabase:', error);
        if (!cancelled) setLogos([]);
      });
    return () => { cancelled = true; };
  }, []);

  if (logos.length === 0) return null;

  return (
    <div className="fb-marquee" aria-label="Technologies utilisées" data-testid="tech-marquee">
      <motion.div
        className="fb-marquee-track"
        animate={reduced ? { x: '0%' } : { x: ['0%', '-50%'] }}
        transition={reduced ? { duration: 0 } : { ease: 'linear', duration: 40, repeat: Infinity }}
      >
        {[...logos, ...logos].filter((tech) => !broken[tech.id]).map((tech, index) => {
          const storageUrl = getStorageUrl(tech.storagePath);
          const src = !failedStorage[tech.id] && storageUrl ? storageUrl : tech.fallbackUrl;
          return (
            <div key={`${tech.id}-${index}`} className="fb-logo" title={tech.name} data-testid={index < logos.length ? `tech-logo-${index}` : undefined}>
              <img
                src={src}
                alt={tech.altText}
                onError={() => {
                  if (!failedStorage[tech.id] && storageUrl && tech.fallbackUrl) {
                    setFailedStorage((current) => ({ ...current, [tech.id]: true }));
                  } else {
                    setBroken((current) => ({ ...current, [tech.id]: true }));
                  }
                }}
                style={{ transform: `scale(${tech.displayScale})` }}
                draggable={false}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
