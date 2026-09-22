-- Tech Stack managed from Supabase Database + Storage
create table if not exists public.tech_stack (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  storage_path text,
  fallback_url text,
  alt_text text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  display_scale numeric(4,2) not null default 1.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tech_stack_source_check check (storage_path is not null or fallback_url is not null),
  constraint tech_stack_scale_check check (display_scale > 0 and display_scale <= 2)
);

alter table public.tech_stack enable row level security;

drop policy if exists "Tech stack is publicly readable" on public.tech_stack;
create policy "Tech stack is publicly readable"
  on public.tech_stack
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can manage tech stack" on public.tech_stack;
create policy "Authenticated users can manage tech stack"
  on public.tech_stack
  for all
  to authenticated
  using (true)
  with check (true);

grant select on public.tech_stack to anon, authenticated;
grant insert, update, delete on public.tech_stack to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tech-logos',
  'tech-logos',
  true,
  1048576,
  array['image/svg+xml','image/png','image/jpeg','image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Tech logos are publicly readable" on storage.objects;
create policy "Tech logos are publicly readable"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'tech-logos');

drop policy if exists "Authenticated users can manage tech logos" on storage.objects;
create policy "Authenticated users can manage tech logos"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'tech-logos')
  with check (bucket_id = 'tech-logos');

insert into public.tech_stack (name, fallback_url, alt_text, sort_order, active, display_scale)
values
  ('Python', 'https://cdn.simpleicons.org/python', 'Python', 1, true, 1.00),
  ('n8n', 'https://cdn.simpleicons.org/n8n', 'n8n', 2, true, 1.00),
  ('Make', 'https://cdn.simpleicons.org/make', 'Make', 3, true, 1.00),
  ('Zapier', 'https://cdn.simpleicons.org/zapier', 'Zapier', 4, true, 1.00),
  ('HighLevel', 'https://assets.cdn.filesafe.space/zELBHkVp0JPbbLvKIlF5/media/690a5f4a57ea175183408da2.png', 'HighLevel', 5, true, 1.00),
  ('Twilio', 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/twilio.svg', 'Twilio', 6, true, 1.00),
  ('Vapi', 'https://cdn.jsdelivr.net/npm/@thesvg/icons/icons/vapi.svg', 'Vapi', 7, true, 1.00),
  ('Retell AI', 'https://cdn.prod.website-files.com/64ada0f2685b2d18caa5e699/6a25e25759e725c1b46fec54_Main%20Logo%20dark.svg', 'Retell AI', 8, true, 1.00),
  ('Supabase', 'https://cdn.simpleicons.org/supabase', 'Supabase', 9, true, 1.00),
  ('PostgreSQL', 'https://cdn.simpleicons.org/postgresql', 'PostgreSQL', 10, true, 1.00),
  ('GitHub', 'https://cdn.simpleicons.org/github', 'GitHub', 11, true, 1.00),
  ('TypeScript', 'https://cdn.simpleicons.org/typescript', 'TypeScript', 12, true, 1.00),
  ('React', 'https://cdn.simpleicons.org/react', 'React', 13, true, 1.00),
  ('OpenAI', 'https://cdn.simpleicons.org/openai', 'OpenAI', 14, true, 1.25),
  ('Claude', 'https://cdn.simpleicons.org/anthropic', 'Claude', 15, true, 1.25),
  ('Gemini', 'https://cdn.simpleicons.org/googlegemini', 'Gemini', 16, true, 1.25),
  ('TypeSafe AI', 'https://cdn.jsdelivr.net/gh/typesafe-ai/typesafe-ai.github.io@main/logo.svg', 'TypeSafe AI', 17, true, 1.25),
  ('Google Sheets', 'https://cdn.simpleicons.org/googlesheets', 'Google Sheets', 18, true, 1.00),
  ('Slack', 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg', 'Slack', 19, true, 1.00)
on conflict (name) do update
set fallback_url = excluded.fallback_url,
    alt_text = excluded.alt_text,
    sort_order = excluded.sort_order,
    active = excluded.active,
    display_scale = excluded.display_scale,
    updated_at = now();

create index if not exists tech_stack_sort_order_idx
  on public.tech_stack(sort_order);
