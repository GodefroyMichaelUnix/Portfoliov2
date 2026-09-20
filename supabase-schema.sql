-- ==============================================================================
-- SCHEMA COMPLET SUPABASE - PORTFOLIO MICHAEL GODEFROY
-- ==============================================================================
-- Ce script crée l'ensemble des 7 tables dynamiques permettant de piloter
-- 100% des données du site directement depuis l'interface Supabase (Table Editor).
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

-- Politiques de lecture publique (accessible avec la clé anonyme VITE_SUPABASE_ANON_KEY)
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

-- ==============================================================================
-- INSERTION DES DONNÉES INITIALES (REMPLI AUTOMATIQUEMENT)
-- ==============================================================================

-- 1. PROFIL
INSERT INTO public.profile (
  id, name, title, role_subtitle, value_proposition, bio_summary, 
  availability, location, contact, stats, about_journey, about_manifesto, 
  about_closing, methodology
) VALUES (
  'main',
  'Michael Godefroy',
  'AI Automation Engineer',
  'Automatisation & Intégrations',
  'Du processus manuel au workflow automatisé.',
  '[
    "Je conçois des workflows d’automatisation qui connectent applications, APIs, données et outils d’IA pour créer des systèmes pratiques.",
    "Mon objectif est de transformer les processus répétitifs en workflows fiables nécessitant moins d’intervention manuelle."
  ]'::jsonb,
  '{"status": "Disponible", "subtext": "CDI & Freelance", "responseTime": "Réponse sous 24h"}'::jsonb,
  'Paris • Remote',
  '{
    "email": "godefroy.michael.unix@gmail.com",
    "linkedin": "https://linkedin.com/in/michael-godefroy",
    "upwork": "https://upwork.com/freelancers/michaelg",
    "github": "https://github.com/mgodefroy",
    "fiverr": "https://fiverr.com",
    "malt": "https://malt.fr",
    "instagram": "https://instagram.com/michael_godefroy"
  }'::jsonb,
  '[
    {"value": "99.9%", "label": "Uptime", "sublabel": "Workflows fiabilisés"},
    {"value": "-85%", "label": "Temps Manuel", "sublabel": "Processus automatisés"},
    {"value": "< 24h", "label": "Réactivité", "sublabel": "Intervention rapide"},
    {"value": "100%", "label": "Production", "sublabel": "Code versionné & audité"}
  ]'::jsonb,
  '[
    {"year": "2023", "text": "Service client — Débute dans le service client, principalement sur des appels entrants."},
    {"year": "2024", "text": "Expert métier — Évolue vers un poste d''expert métier sur le même projet, après avoir acquis de l''expérience."},
    {"year": "2025", "text": "Secteur automobile électrique — Travaille sur un projet lié aux voitures électriques, toujours dans le service client et les appels entrants."},
    {"year": "2026", "text": "Énergie renouvelable — Change complètement de domaine pour rejoindre le secteur de l''énergie renouvelable, comme chargé de suivi en énergie renouvelable (poste actuel)."}
  ]'::jsonb,
  'Tout ce parcours, je l''ai construit sans diplôme universitaire.',
  'Il me reste maintenant la partie la plus importante : les compétences. Et c''est précisément là que je concentre toute mon énergie aujourd''hui. Je sais que je pars avec un parcours différent de celui de beaucoup de personnes, mais j''ai déjà appris une chose : je peux changer de domaine, apprendre par moi-même et progresser. Mon objectif maintenant est simple : continuer à apprendre, construire de vrais projets, obtenir de l''expérience et transformer progressivement mes compétences en une véritable carrière dans l''AI Automation.',
  '[
    {"step": "01", "title": "Compréhension", "tasks": ["Analyse du processus", "Identification des blocages"]},
    {"step": "02", "title": "Conception", "tasks": ["Logique du workflow", "Choix des déclencheurs"]},
    {"step": "03", "title": "Intégration", "tasks": ["Connexion des outils", "Gestion des erreurs"]},
    {"step": "04", "title": "Déploiement", "tasks": ["Tests du système", "Amélioration continue"]}
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  role_subtitle = EXCLUDED.role_subtitle,
  value_proposition = EXCLUDED.value_proposition,
  bio_summary = EXCLUDED.bio_summary,
  availability = EXCLUDED.availability,
  location = EXCLUDED.location,
  contact = EXCLUDED.contact,
  stats = EXCLUDED.stats,
  about_journey = EXCLUDED.about_journey,
  about_manifesto = EXCLUDED.about_manifesto,
  about_closing = EXCLUDED.about_closing,
  methodology = EXCLUDED.methodology,
  updated_at = timezone('utc'::text, now());

-- 2. PROJETS
INSERT INTO public.projects (id, title, category, category_label, subtitle, context, problem, solution, tech_stack, measurable_result, metrics, architecture_summary, featured, mockup_type)
VALUES 
(
  'project-1',
  'Pipeline IA de Tri Documentaire B2B',
  'ai-agents',
  'IA & Automatisation',
  'Extraction structurée & injection ERP',
  'Logistique traitant 500+ documents non standardisés/semaine.',
  'Saisie manuelle lente et sujette aux erreurs.',
  'Agent LLM couplé à n8n pour parsing JSON strict et validation humaine ciblée.',
  '["Python", "n8n", "OpenAI API", "PostgreSQL"]'::jsonb,
  '-82% de temps de traitement, taux d''erreur <0.4%',
  '[{"label": "Gain de temps", "value": "-82%"}, {"label": "Erreurs", "value": "< 0.4%"}, {"label": "Volume", "value": "450/j"}]'::jsonb,
  '["Ingestion webhook sécurisée", "Parsing hybride OCR/LLM", "Contrôle d''intégrité métier"]'::jsonb,
  true,
  'agent-orchestrator'
),
(
  'project-2',
  'Moteur de Synchronisation Multi-SaaS',
  'workflows',
  'Workflows & API',
  'CRM, Facturation & Support temps réel',
  'Scale-up SaaS avec silos entre Stripe, HubSpot et l''application core.',
  'Désynchronisation des abonnements et délais d''activation (48h).',
  'Architecture événementielle idempotente avec file d''attente Redis et Make.',
  '["Python", "Make", "Redis", "Stripe API"]'::jsonb,
  'Activation instantanée (<30s), 0 conflit de données',
  '[{"label": "Activation", "value": "< 30s"}, {"label": "Incidents", "value": "0"}, {"label": "Événements", "value": "25k/m"}]'::jsonb,
  '["Webhook centralisé", "Queue transactionnelle", "Résolution de conflits automatisée"]'::jsonb,
  true,
  'automation-pipeline'
),
(
  'project-3',
  'Observabilité Infrastructure Centralisée',
  'data-infra',
  'Data & Infra',
  'Collecte, nettoyage et alerting auto',
  'Parc de serveurs hétérogènes sans monitoring unifié.',
  'Pannes détectées par les clients, scripts de maintenance dispersés.',
  'Agents de collecte Python, aggrégation SQL et dashboard Grafana.',
  '["Python", "Bash", "PostgreSQL", "Grafana"]'::jsonb,
  'Uptime sécurisé, résolution proactive',
  '[{"label": "Uptime", "value": "99.9%"}, {"label": "Détection", "value": "< 1m"}, {"label": "Scripts unifiés", "value": "35+"}]'::jsonb,
  '["Sondes Python modulaires", "Stockage relationnel", "Alerting sélectif"]'::jsonb,
  true,
  'database-sync'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  category_label = EXCLUDED.category_label,
  subtitle = EXCLUDED.subtitle,
  context = EXCLUDED.context,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  tech_stack = EXCLUDED.tech_stack,
  measurable_result = EXCLUDED.measurable_result,
  metrics = EXCLUDED.metrics,
  architecture_summary = EXCLUDED.architecture_summary,
  featured = EXCLUDED.featured,
  mockup_type = EXCLUDED.mockup_type;

-- 3. CATÉGORIES & COMPÉTENCES
INSERT INTO public.skill_categories (id, title, subtitle, icon_name, skills, sort_order)
VALUES
(
  'automation-workflows',
  'Workflows',
  'Orchestration & APIs',
  'Network',
  '[
    {"name": "Python (Scripting & Automation)", "levelBadge": "Avancé", "useCase": "Scripts, manipulation de données.", "tags": ["Requests", "Pandas", "Pydantic"]},
    {"name": "n8n & Make", "levelBadge": "Expert", "useCase": "Conception de flux.", "tags": ["Webhooks", "OAuth2", "Custom Code"]},
    {"name": "APIs RESTful", "levelBadge": "Avancé", "useCase": "Interconnexion de systèmes.", "tags": ["JSON", "Auth", "Rate Limiting"]}
  ]'::jsonb,
  1
),
(
  'ai-agents',
  'IA Agents',
  'Pipelines cognitifs',
  'Cpu',
  '[
    {"name": "LLM Orchestration", "levelBadge": "Production", "useCase": "Agents autonomes.", "tags": ["Function Calling", "State Machines"]},
    {"name": "Prompt Engineering", "levelBadge": "Avancé", "useCase": "Déterminisme LLM.", "tags": ["JSON Schema", "Guardrails"]},
    {"name": "RAG", "levelBadge": "Avancé", "useCase": "Indexation & Recherche.", "tags": ["Embeddings", "Vector DB"]}
  ]'::jsonb,
  2
),
(
  'data-infra',
  'Infra',
  'Déploiement fiable',
  'Database',
  '[
    {"name": "PostgreSQL", "levelBadge": "Avancé", "useCase": "Modélisation & requêtes.", "tags": ["SQL", "Indexes"]},
    {"name": "Linux & Bash", "levelBadge": "Solide", "useCase": "Administration & cron.", "tags": ["Systemd", "SSH"]},
    {"name": "Git & CI/CD", "levelBadge": "Standard", "useCase": "Versioning et déploiement.", "tags": ["GitHub", "Pipelines"]}
  ]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  icon_name = EXCLUDED.icon_name,
  skills = EXCLUDED.skills,
  sort_order = EXCLUDED.sort_order;

-- 4. CERTIFICATIONS
INSERT INTO public.certifications (id, title, issuer, issue_date, logo, image, verify_url, skills, featured, summary)
VALUES
(
  'cert-google-prompting',
  'Google Prompting Essentials',
  'Google',
  '2024',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
  'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=800&auto=format&fit=crop',
  'https://coursera.org/verify/professional-cert/google-prompting',
  '["AI agent design", "Multimodal Prompting", "Prompt Engineering"]'::jsonb,
  true,
  'Techniques avancées de prompting pour modèles de fondation.'
),
(
  'cert-google-it-python',
  'Google IT Automation with Python',
  'Google',
  '2023',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
  'https://coursera.org/verify/professional-cert/GOOG-IT-PY',
  '["Python", "Git", "Debugging"]'::jsonb,
  true,
  'Automatisation système, Git, et résolution de problèmes.'
),
(
  'cert-vanderbilt-ai-agents',
  'AI Agent Developer',
  'Vanderbilt University',
  '2024',
  'https://cdn.simpleicons.org/coursera/0056D2',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
  'https://coursera.org/verify/VAND-AGENTS',
  '["AI Agents", "Tool Calling"]'::jsonb,
  true,
  'Architecture d''agents autonomes, tool-use et mémoire.'
),
(
  'cert-efset-english',
  'EF SET English Certificate (C2)',
  'EF Standard English Test',
  '2023',
  'https://upload.wikimedia.org/wikipedia/commons/1/10/EF_Education_First_logo.svg',
  'https://images.unsplash.com/photo-1546410531-bea51804040a?q=80&w=800&auto=format&fit=crop',
  'https://www.efset.org/cert/EF-C2',
  '["Anglais C2", "Communication technique"]'::jsonb,
  true,
  'Niveau professionnel bilingue (C2).'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  issuer = EXCLUDED.issuer,
  issue_date = EXCLUDED.issue_date,
  logo = EXCLUDED.logo,
  image = EXCLUDED.image,
  verify_url = EXCLUDED.verify_url,
  skills = EXCLUDED.skills,
  featured = EXCLUDED.featured,
  summary = EXCLUDED.summary;

-- 5. TARIFS (PRICING)
INSERT INTO public.pricing_plans (id, icon_name, label, prefix, numeric, description, items, sort_order)
VALUES
(
  'plan-hourly',
  'Clock',
  'Mission ponctuelle',
  'Dès',
  '15$/h',
  'Je vous accompagne pour un audit technique, un ajustement rapide ou du support ponctuel sur vos outils.',
  '["Diagnostic & recommandations", "Corrections ciblées", "Réponse sous 24h"]'::jsonb,
  1
),
(
  'plan-project',
  'Workflow',
  'Projet d''automatisation',
  'À partir de',
  '500$',
  'Je prends en charge la création de votre workflow de A à Z, de l''étude de vos besoins jusqu''au déploiement.',
  '["Conception & développement", "Tests & mise en production", "Monitoring inclus"]'::jsonb,
  2
)
ON CONFLICT (id) DO UPDATE SET
  icon_name = EXCLUDED.icon_name,
  label = EXCLUDED.label,
  prefix = EXCLUDED.prefix,
  numeric = EXCLUDED.numeric,
  description = EXCLUDED.description,
  items = EXCLUDED.items,
  sort_order = EXCLUDED.sort_order;

-- 6. QUESTIONS FRÉQUENTES (FAQ)
INSERT INTO public.faqs (id, question, answer, sort_order)
VALUES
(
  'faq-1',
  'Es-tu disponible en CDI ou uniquement en freelance ?',
  'Les deux. Je suis ouvert à un poste salarié comme à des missions freelance ponctuelles ou récurrentes — le format s''adapte au besoin, pas l''inverse.',
  1
),
(
  'faq-2',
  'Dans quel fuseau horaire travailles-tu ?',
  'Madagascar (UTC+3), ce qui offre un bon chevauchement avec l''Europe et l''Afrique en direct, et reste facilement compatible avec les États-Unis en asynchrone.',
  2
),
(
  'faq-3',
  'Quels sont tes délais de réponse et de livraison ?',
  'Réponse sous 24h à toute prise de contact. Les délais de livraison dépendent de la portée du projet et sont toujours cadrés dès l''échange initial, avant le démarrage.',
  3
),
(
  'faq-4',
  'Tu utilises des outils no-code/low-code ou uniquement du code ?',
  'Les deux, selon ce qui sert le mieux le résultat : n8n ou Make pour aller vite sur des flux standards, Python et du code sur-mesure dès que la logique métier devient complexe ou critique.',
  4
),
(
  'faq-5',
  'Mon besoin n''est pas encore 100% défini, c''est un problème ?',
  'Non, c''est même la norme. Chaque mission démarre par une phase de découverte pour cadrer précisément le besoin avant toute ligne de code.',
  5
)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  answer = EXCLUDED.answer,
  sort_order = EXCLUDED.sort_order;

-- 7. DÉMONSTRATIONS WORKFLOWS
INSERT INTO public.workflows (id, name, kind, title, description, nodes, sort_order)
VALUES
(
  'wf-workflows',
  'Workflows',
  'workflow',
  'Tout se connecte.',
  'Un événement déclenche la bonne action. Vos outils échangent les bonnes données, sans intervention répétitive.',
  '["Événement", "Validation", "Connexion", "Action"]'::jsonb,
  1
),
(
  'wf-agents',
  'Agents IA',
  'agent-core',
  'L’intelligence agit.',
  'L’IA comprend le contexte, mobilise les bons outils et propose une réponse. L’humain garde le contrôle.',
  '["Demande", "Contexte", "Raisonnement", "Réponse"]'::jsonb,
  2
),
(
  'wf-data',
  'Données',
  'data-vault',
  'Le signal, pas le bruit.',
  'Collecter, structurer, faire circuler. Des données fiables pour des décisions éclairées.',
  '["Collecte", "Nettoyage", "Stockage", "Décision"]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  kind = EXCLUDED.kind,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  nodes = EXCLUDED.nodes,
  sort_order = EXCLUDED.sort_order;
