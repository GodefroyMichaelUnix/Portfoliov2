drop index if exists public.tech_stack_sort_order_idx;

drop policy if exists "Authenticated users can manage tech stack" on public.tech_stack;

drop policy if exists "Authenticated users can insert tech stack" on public.tech_stack;
create policy "Authenticated users can insert tech stack"
  on public.tech_stack
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update tech stack" on public.tech_stack;
create policy "Authenticated users can update tech stack"
  on public.tech_stack
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete tech stack" on public.tech_stack;
create policy "Authenticated users can delete tech stack"
  on public.tech_stack
  for delete
  to authenticated
  using (true);

grant insert, update, delete on public.tech_stack to authenticated;
