-- Final privilege tightening for the public portfolio API surface.

drop policy if exists "Allow public submissions" on public.contact_messages;
drop policy if exists "Allow insert for contact_messages" on public.contact_messages;
revoke all on public.contact_messages from anon, authenticated;

revoke all on public.services from anon, authenticated;
grant select on public.services to anon, authenticated;

revoke all on public.passions from anon, authenticated;
grant select on public.passions to anon, authenticated;

revoke all on public.tech_stack from anon, authenticated;
grant select on public.tech_stack to anon, authenticated;
grant insert, update, delete on public.tech_stack to authenticated;

drop policy if exists "Public can read passion images" on storage.objects;
create policy "Public can read passion images"
  on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'passion-images');

drop policy if exists "Tech logos are publicly readable" on storage.objects;
create policy "Tech logos are publicly readable"
  on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'tech-logos');

drop policy if exists "Authenticated users can manage tech logos" on storage.objects;
create policy "Authenticated users can manage tech logos"
  on storage.objects for all to authenticated
  using (bucket_id = 'tech-logos' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check (bucket_id = 'tech-logos' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
