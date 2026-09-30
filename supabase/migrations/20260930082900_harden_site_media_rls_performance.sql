drop policy if exists "Admins can insert site media" on public.site_media;
create policy "Admins can insert site media"
  on public.site_media
  for insert
  to authenticated
  with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update site media" on public.site_media;
create policy "Admins can update site media"
  on public.site_media
  for update
  to authenticated
  using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete site media" on public.site_media;
create policy "Admins can delete site media"
  on public.site_media
  for delete
  to authenticated
  using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
