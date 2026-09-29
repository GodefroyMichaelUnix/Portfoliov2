-- Services & Passions — paste into the Supabase SQL editor
-- Public read of visible rows only; no public write (edit from the Supabase dashboard).

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  description text,
  icon_name text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.passions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_path text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;
alter table public.passions enable row level security;

drop policy if exists "Public can read visible services" on public.services;
create policy "Public can read visible services" on public.services
  for select to anon, authenticated using (is_visible = true);

drop policy if exists "Public can read visible passions" on public.passions;
create policy "Public can read visible passions" on public.passions
  for select to anon, authenticated using (is_visible = true);

-- Public storage bucket for passion images (image_path = file path inside the bucket, or a full https URL)
insert into storage.buckets (id, name, public)
values ('passion-images', 'passion-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read passion images" on storage.objects;
create policy "Public can read passion images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'passion-images');

-- Starter services (benefit-oriented, editable)
insert into public.services (category, title, description, icon_name, sort_order)
select * from (values
  ('Automatisation', 'J’automatise la saisie de vos factures', 'Vos factures sont lues, classées et enregistrées sans ressaisie manuelle.', 'FileText', 10),
  ('Automatisation', 'J’automatise vos tâches répétitives', 'Les actions qui reviennent chaque jour s’exécutent seules, sans erreur.', 'Workflow', 20),
  ('Automatisation', 'Je trie et traite vos e-mails automatiquement', 'Les demandes entrantes sont classées, routées et suivies sans effort.', 'Mail', 30),
  ('Automatisation', 'Je synchronise vos données entre vos outils', 'Une information saisie une fois est à jour partout.', 'RefreshCw', 40),
  ('IA', 'Je crée des assistants IA pour vos équipes', 'Des agents qui répondent, rédigent et préparent le travail à votre place.', 'Bot', 50),
  ('IA', 'Je mets en place un support client assisté par IA', 'Des réponses rapides et cohérentes, avec escalade vers un humain si besoin.', 'MessageSquare', 60),
  ('IA', 'J’exploite vos documents avec l’IA', 'Vos contrats, PDF et notes deviennent interrogeables et résumables.', 'Sparkles', 70),
  ('Intégrations', 'Je connecte votre CRM à vos outils', 'Vos contacts, ventes et relances circulent sans copier-coller.', 'Plug', 80),
  ('Intégrations', 'Je relie vos applications entre elles via API', 'Vos logiciels échangent leurs données en temps réel.', 'Link2', 90),
  ('Intégrations', 'J’automatise vos prises de rendez-vous et rappels', 'Agenda, confirmations et relances se gèrent tout seuls.', 'Calendar', 100),
  ('Données', 'Je centralise vos données dans une base fiable', 'Une source unique, propre et structurée pour piloter votre activité.', 'Database', 110),
  ('Données', 'Je crée des tableaux de bord automatiques', 'Vos indicateurs clés se mettent à jour sans export manuel.', 'BarChart3', 120),
  ('Données', 'Je fiabilise et nettoie vos données', 'Doublons, erreurs et formats incohérents sont corrigés automatiquement.', 'ShieldCheck', 130),
  ('Développement sur mesure', 'Je développe des outils internes sur mesure', 'Des applications simples, pensées pour votre façon de travailler.', 'Code2', 140),
  ('Développement sur mesure', 'Je construis des portails et mini-applications', 'Des interfaces claires pour vos clients ou vos équipes.', 'LayoutDashboard', 150)
) as seed(category, title, description, icon_name, sort_order)
where not exists (select 1 from public.services);

-- Example passion (uncomment and adapt):
-- insert into public.passions (title, description, image_path, sort_order)
-- values ('Photographie', 'Capturer la lumière et les détails du quotidien.', 'photographie.jpg', 10);
