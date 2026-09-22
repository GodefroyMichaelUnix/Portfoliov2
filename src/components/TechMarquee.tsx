import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { portfolioService } from '../services/portfolioService';
import { supabase } from '../lib/supabase';
import type { TechStackItem } from '../types/portfolio';

const STORAGE_BUCKET = 'tech-logos';

function getStorageUrl(path?: string): string | undefined {
  if (!path || !supabase) return undefined;
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

export const TechMarquee: React.FC = () => {
  const [logos, setLogos] = useState<TechStackItem[]>([]);
  const [failedStorage, setFailedStorage] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    portfolioService
      .getTechStack()
      .then((data) => {
        if (!cancelled) setLogos(data);
      })
      .catch((error) => {
        console.error('Impossible de charger le Tech Stack depuis Supabase:', error);
        if (!cancelled) setLogos([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (logos.length === 0) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto">
      <div
        className="w-full overflow-hidden py-6 sm:py-8 relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 3%, rgba(0,0,0,0.7) 8%, black 15%, black 85%, rgba(0,0,0,0.7) 92%, rgba(0,0,0,0.2) 97%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 3%, rgba(0,0,0,0.7) 8%, black 15%, black 85%, rgba(0,0,0,0.7) 92%, rgba(0,0,0,0.2) 97%, transparent 100%)',
        }}
      >
        <motion.div
          className="flex items-center gap-16 md:gap-20 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 24,
            repeat: Infinity,
          }}
        >
          {[...logos, ...logos].map((tech, index) => {
            const storageUrl = getStorageUrl(tech.storagePath);
            const src = !failedStorage[tech.id] && storageUrl
              ? storageUrl
              : tech.fallbackUrl;

            return (
              <div
                key={`${tech.id}-${index}`}
                className="shrink-0 flex items-center justify-center transition-opacity duration-300 opacity-60 hover:opacity-100 cursor-default"
                title={tech.name}
              >
                <div className="shrink-0 min-w-8 h-8 md:min-w-10 md:h-10 flex items-center justify-center">
                  <img
                    src={src}
                    alt={tech.altText}
                    onError={() => {
                      if (!failedStorage[tech.id] && storageUrl && tech.fallbackUrl) {
                        setFailedStorage((current) => ({ ...current, [tech.id]: true }));
                      }
                    }}
                    style={{ transform: `scale(${tech.displayScale})` }}
                    className="max-w-10 max-h-full object-contain select-none pointer-events-none grayscale brightness-0 dark:invert transition-all duration-300"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};