-- Explicitly document denied direct contact access and performant admin RLS checks.

drop policy if exists "No direct public access to contact messages" on public.contact_messages;
create policy "No direct public access to contact messages"
  on public.contact_messages
  for all
  to anon, authenticated
  using (false)
  with check (false);

drop policy if exists "Authenticated users can insert tech stack" on public.tech_stack;
create policy "Authenticated users can insert tech stack"
  on public.tech_stack for insert to authenticated
  with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Authenticated users can update tech stack" on public.tech_stack;
create policy "Authenticated users can update tech stack"
  on public.tech_stack for update to authenticated
  using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Authenticated users can delete tech stack" on public.tech_stack;
create policy "Authenticated users can delete tech stack"
  on public.tech_stack for delete to authenticated
  using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
