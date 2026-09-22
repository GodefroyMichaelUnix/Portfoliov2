-- ==============================================================================
-- SCHEMA COMPLET SUPABASE - PORTFOLIO MICHAEL GODEFROY
-- ==============================================================================
-- Ce script documente les 12 tables actuellement utilisées par le portfolio
-- et permettant de piloter l'ensemble des données et de réceptionner les messages de contact.
--
-- Tables incluses :
-- 1. public.profile
-- 2. public.projects
-- 3. public.skill_categories
-- 4. public.certifications
-- 5. public.pricing_plans
-- 6. public.faqs
-- 7. public.workflows
-- 8. public.contact_messages
-- 9. public.home_expertise_cards
-- 10. public.home_pillars
-- 11. public.making_of_steps
-- 12. public.making_of_stack
--
-- Instructions :
-- 1. Allez sur https://supabase.com/dashboard et ouvrez votre projet
-- 2. Ouvrez le "SQL Editor" dans le menu de gauche
-- 3. Cliquez sur "New query", collez l'intégralité de ce script et cliquez sur "Run"
-- ==============================================================================

-- 1. PROFIL & IDENTITÉ
CREATE TABLE IF NOT EXISTS public.profile (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  role_subtitle TEXT,
  value_proposition TEXT,
  bio_summary JSONB DEFAULT '[]'::jsonb,
  availability JSONB NOT NULL,
  location TEXT,
  contact JSONB NOT NULL,
  stats JSONB DEFAULT '[]'::jsonb,
  about_journey JSONB DEFAULT '[]'::jsonb,
  about_manifesto TEXT,
  about_closing TEXT,
  methodology JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROJETS & ÉTUDES DE CAS
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('workflows', 'ai-agents', 'data-infra')),
  category_label TEXT NOT NULL,
  subtitle TEXT,
  problem TEXT,
  context TEXT,
  solution TEXT,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  measurable_result TEXT,
  metrics JSONB DEFAULT '[]'::jsonb,
  architecture_summary JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT true,
  demo_url TEXT,
  github_url TEXT,
  mockup_type TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CATÉGORIES & COMPÉTENCES
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  icon_name TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CERTIFICATIONS
CREATE TABLE IF NOT EXISTS public.certifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  logo TEXT NOT NULL,
  image TEXT,
  verify_url TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT true,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TARIFS & FORMULES D'ACCOMPAGNEMENT
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id TEXT PRIMARY KEY,
  icon_name TEXT NOT NULL DEFAULT 'Clock',
  label TEXT NOT NULL,
  prefix TEXT NOT NULL DEFAULT 'Dès',
  numeric TEXT NOT NULL,
  description TEXT NOT NULL,
  items JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. QUESTIONS FRÉQUENTES (FAQ)
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. DÉMONSTRATIONS INTERACTIVES (WORKFLOW SHOWCASE)
CREATE TABLE IF NOT EXISTS public.workflows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  nodes JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. MESSAGES DE CONTACT (FORMULAIRE & EDGE FUNCTION)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL CHECK (project_type IN ('cdi', 'freelance', 'audit', 'autre')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. CARTES D'EXPERTISE HOME (CYCLING CARDS)
CREATE TABLE IF NOT EXISTS public.home_expertise_cards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  level INT NOT NULL CHECK (level >= 1 AND level <= 4),
  bg_image TEXT,
  sort_order INT DEFAULT 0
);

-- 10. PILIERS SELECTED WORK (HOME)
CREATE TABLE IF NOT EXISTS public.home_pillars (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  span TEXT,
  sort_order INT DEFAULT 0
);

-- 11. ÉTAPES DE FABRICATION (COULISSES / MAKING OF)
CREATE TABLE IF NOT EXISTS public.making_of_steps (
  id TEXT PRIMARY KEY,
  icon_name TEXT,
  step TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- 12. STACK TECHNIQUE (COULISSES / MAKING OF)
CREATE TABLE IF NOT EXISTS public.making_of_stack (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- ==============================================================================
-- ACTIVATION DE LA SÉCURITÉ ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_expertise_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.making_of_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.making_of_stack ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique pour le contenu du portfolio
-- (accessible avec la clé anonyme VITE_SUPABASE_ANON_KEY)
DROP POLICY IF EXISTS "Public select profile" ON public.profile;
CREATE POLICY "Public select profile" ON public.profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select projects" ON public.projects;
CREATE POLICY "Public select projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select skill_categories" ON public.skill_categories;
CREATE POLICY "Public select skill_categories" ON public.skill_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select certifications" ON public.certifications;
CREATE POLICY "Public select certifications" ON public.certifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select pricing_plans" ON public.pricing_plans;
CREATE POLICY "Public select pricing_plans" ON public.pricing_plans FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select faqs" ON public.faqs;
CREATE POLICY "Public select faqs" ON public.faqs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select workflows" ON public.workflows;
CREATE POLICY "Public select workflows" ON public.workflows FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select home_expertise_cards" ON public.home_expertise_cards;
CREATE POLICY "Public select home_expertise_cards"
  ON public.home_expertise_cards
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public select home_pillars" ON public.home_pillars;
CREATE POLICY "Public select home_pillars"
  ON public.home_pillars
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public select making_of_steps" ON public.making_of_steps;
CREATE POLICY "Public select making_of_steps"
  ON public.making_of_steps
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public select making_of_stack" ON public.making_of_stack;
CREATE POLICY "Public select making_of_stack"
  ON public.making_of_stack
  FOR SELECT
  USING (true);

-- Politiques pour les messages de contact (contact_messages)
-- Insertion autorisée pour réceptionner les messages (Edge Function / API)
DROP POLICY IF EXISTS "Allow insert for contact_messages" ON public.contact_messages;
CREATE POLICY "Allow insert for contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
-- Remarque de sécurité : Aucun droit SELECT public n'est accordé. Seule la clé de service ou
-- l'administrateur connecté au dashboard Supabase peut consulter les messages reçus.

-- ==============================================================================
-- INDEX DE PERFORMANCE (SORT ORDER)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS home_expertise_cards_sort_order_idx
  ON public.home_expertise_cards(sort_order);

CREATE INDEX IF NOT EXISTS home_pillars_sort_order_idx
  ON public.home_pillars(sort_order);

CREATE INDEX IF NOT EXISTS making_of_steps_sort_order_idx
  ON public.making_of_steps(sort_order);

CREATE INDEX IF NOT EXISTS making_of_stack_sort_order_idx
  ON public.making_of_stack(sort_order);


-- ==============================================================================
-- TECH STACK MARQUEE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.tech_stack (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  storage_path TEXT,
  fallback_url TEXT,
  alt_text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  display_scale NUMERIC(4,2) NOT NULL DEFAULT 1.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT tech_stack_source_check CHECK (storage_path IS NOT NULL OR fallback_url IS NOT NULL),
  CONSTRAINT tech_stack_scale_check CHECK (display_scale > 0 AND display_scale <= 2)
);

ALTER TABLE public.tech_stack ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tech stack is publicly readable" ON public.tech_stack;
CREATE POLICY "Tech stack is publicly readable"
  ON public.tech_stack
  FOR SELECT
  TO anon, authenticated
  USING (TRUE);

GRANT SELECT ON public.tech_stack TO anon, authenticated;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tech-logos',
  'tech-logos',
  TRUE,
  1048576,
  ARRAY['image/svg+xml','image/png','image/jpeg','image/webp']
)
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Tech logos are publicly readable" ON storage.objects;
CREATE POLICY "Tech logos are publicly readable"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'tech-logos');


DROP POLICY IF EXISTS "Authenticated users can manage tech stack" ON public.tech_stack;
CREATE POLICY "Authenticated users can manage tech stack"
  ON public.tech_stack
  FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

GRANT INSERT, UPDATE, DELETE ON public.tech_stack TO authenticated;

DROP POLICY IF EXISTS "Authenticated users can manage tech logos" ON storage.objects;
CREATE POLICY "Authenticated users can manage tech logos"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'tech-logos')
  WITH CHECK (bucket_id = 'tech-logos');


-- Final RLS cleanup for tech_stack
DROP POLICY IF EXISTS "Authenticated users can manage tech stack" ON public.tech_stack;

DROP POLICY IF EXISTS "Authenticated users can insert tech stack" ON public.tech_stack;
CREATE POLICY "Authenticated users can insert tech stack"
  ON public.tech_stack
  FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Authenticated users can update tech stack" ON public.tech_stack;
CREATE POLICY "Authenticated users can update tech stack"
  ON public.tech_stack
  FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Authenticated users can delete tech stack" ON public.tech_stack;
CREATE POLICY "Authenticated users can delete tech stack"
  ON public.tech_stack
  FOR DELETE
  TO authenticated
  USING (TRUE);

DROP INDEX IF EXISTS public.tech_stack_sort_order_idx;
