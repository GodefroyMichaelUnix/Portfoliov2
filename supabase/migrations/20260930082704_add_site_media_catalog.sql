create table public.site_media (
  id uuid primary key default gen_random_uuid(),
  media_key text not null unique,
  storage_bucket text not null default 'site-media',
  storage_path text,
  fallback_path text,
  alt_text text not null default '',
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_media_source_check check (storage_path is not null or fallback_path is not null)
);

create index site_media_visible_sort_idx
  on public.site_media (is_visible, sort_order);

alter table public.site_media enable row level security;

grant select on public.site_media to anon, authenticated;
grant insert, update, delete on public.site_media to authenticated;

create policy "Public can read visible site media"
  on public.site_media
  for select
  to anon, authenticated
  using (is_visible = true);

create policy "Admins can insert site media"
  on public.site_media
  for insert
  to authenticated
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update site media"
  on public.site_media
  for update
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete site media"
  on public.site_media
  for delete
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into public.site_media
  (media_key, fallback_path, alt_text, sort_order)
values
  ('home_header', '/art/ref/home.jpg', 'En-tête de la page d’accueil', 10),
  ('home_automation', '/art/ref/bw-automation.jpg', 'Illustration en noir et blanc de l’automatisation', 20),
  ('home_ai', '/art/ref/bw-ai.jpg', 'Illustration en noir et blanc de l’intelligence artificielle', 30),
  ('home_development', '/art/ref/bw-dev.jpg', 'Illustration en noir et blanc du développement', 40),
  ('about_header', '/art/ref/about.jpg', 'En-tête de la page À propos', 50),
  ('skills_header', '/art/ref/skills.jpg', 'En-tête de la page Compétences', 60),
  ('certifications_header', '/art/ref/certs.jpg', 'En-tête de la page Certifications', 70),
  ('coulisses_header', '/art/ref/coulisses.jpg', 'En-tête de la page Coulisses', 80),
  ('contact_header', '/art/ref/contact.jpg', 'En-tête de la page Contact', 90),
  ('services_header', '/art/ref/services.jpg', 'En-tête de la page Services', 100),
  ('passions_header', '/art/ref/passions.jpg', 'En-tête de la page Passions', 110),
  ('projects_header', '/art/ref/projects.jpg', 'En-tête de la page Projets', 120),
  ('making_of_preview', '/art/workflow.webp', 'Aperçu visuel des coulisses du portfolio', 130),
  ('presentation_poster', '/art/presentation-poster.jpg', 'Poster de la vidéo de présentation', 140),
  ('presentation_video_mp4', '/art/presentation-ambiance.mp4', 'Vidéo d’ambiance de présentation', 150),
  ('presentation_video_webm', '/art/presentation-ambiance.webm', 'Version WebM de la vidéo d’ambiance', 160)
on conflict (media_key) do nothing;
