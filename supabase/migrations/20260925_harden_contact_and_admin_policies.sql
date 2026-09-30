-- Harden the public contact endpoint and restrict content administration.

alter table public.contact_messages
  add column if not exists request_id uuid,
  add column if not exists source_hash text,
  add column if not exists delivery_status text not null default 'pending',
  add column if not exists resend_message_id text;

alter table public.contact_messages
  drop constraint if exists contact_messages_delivery_status_check;

alter table public.contact_messages
  add constraint contact_messages_delivery_status_check
  check (delivery_status in ('pending', 'sent', 'failed'));

create unique index if not exists contact_messages_request_id_key
  on public.contact_messages(request_id)
  where request_id is not null;

create index if not exists contact_messages_source_hash_created_at_idx
  on public.contact_messages(source_hash, created_at desc);

drop policy if exists "Allow insert for contact_messages" on public.contact_messages;
drop policy if exists "Allow public submissions" on public.contact_messages;
revoke all on public.contact_messages from anon, authenticated;

drop policy if exists "Authenticated users can insert tech stack" on public.tech_stack;
create policy "Authenticated users can insert tech stack"
  on public.tech_stack for insert to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Authenticated users can update tech stack" on public.tech_stack;
create policy "Authenticated users can update tech stack"
  on public.tech_stack for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Authenticated users can delete tech stack" on public.tech_stack;
create policy "Authenticated users can delete tech stack"
  on public.tech_stack for delete to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Authenticated users can manage tech logos" on storage.objects;
create policy "Authenticated users can manage tech logos"
  on storage.objects for all to authenticated
  using (bucket_id = 'tech-logos' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check (bucket_id = 'tech-logos' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
