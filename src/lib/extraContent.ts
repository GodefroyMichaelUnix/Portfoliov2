import { useEffect, useState } from 'react';
import { portfolioService } from '../services/portfolioService';
import type { ServiceItem, PassionItem, SiteMediaItem } from '../types/portfolio';

export type { ServiceItem, PassionItem, SiteMediaItem };

function useRemote<T>(loader: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setError(null);

    loader()
      .then((data) => {
        if (cancelled) return;
        setItems(data);
        setLoaded(true);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error('Erreur Supabase (extra content):', err);
        setItems([]);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        setLoaded(true);
      });

    return () => { cancelled = true; };
  }, [loader]);

  return { items, loaded, error };
}

const loadServices = () => portfolioService.getServices();
const loadPassions = () => portfolioService.getPassions();
const loadSiteMedia = () => portfolioService.getSiteMedia();

export const useServices = () => useRemote<ServiceItem>(loadServices);
export const usePassions = () => useRemote<PassionItem>(loadPassions);
export const useSiteMedia = () => useRemote<SiteMediaItem>(loadSiteMedia);
