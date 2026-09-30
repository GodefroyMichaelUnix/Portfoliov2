import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface ServiceItem { id: string; category: string; title: string; description: string; iconName: string; before: string; after: string }
export interface PassionItem { id: string; title: string; description: string; imageUrl: string }

const db = supabase as unknown as SupabaseClient | null;
const PASSION_BUCKET = 'passion-images';

const passionImage = (path?: string | null) => {
  if (!path || !db) return '';
  if (/^https:\/\//.test(path)) return path;
  return db.storage.from(PASSION_BUCKET).getPublicUrl(path).data.publicUrl;
};

async function fetchServices(): Promise<ServiceItem[]> {
  if (!db) return [];
  const { data, error } = await db.from('services').select('*').eq('is_visible', true).order('sort_order');
  if (error || !data) return [];
  return data.map((r) => ({
    id: String(r.id),
    category: r.category || '',
    title: r.title || '',
    description: r.description || '',
    iconName: r.icon_name || '',
    before: r.before_text || '',
    after: r.after_text || ''
  }));
}

async function fetchPassions(): Promise<PassionItem[]> {
  if (!db) return [];
  const { data, error } = await db.from('passions').select('id,title,description,image_path').eq('is_visible', true).order('sort_order');
  if (error || !data) return [];
  return data.map((r) => ({ id: String(r.id), title: r.title || '', description: r.description || '', imageUrl: passionImage(r.image_path) }));
}

function useRemote<T>(loader: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let cancelled = false;
    loader().then((data) => {
      if (cancelled) return;
      setItems(data);
      setLoaded(true);
    });
    return () => { cancelled = true; };
  }, [loader]);
  return { items, loaded };
}

export const useServices = () => useRemote(fetchServices);
export const usePassions = () => useRemote(fetchPassions);
