-- Clean Shopper: products table
create table if not exists public.products (
  id           bigserial primary key,
  name         text        not null,
  brand        text        not null,
  category     text        not null,
  description  text        not null,
  safety_score text        not null check (safety_score in ('clean', 'caution', 'avoid')),
  created_at   timestamptz not null default now()
);

alter table public.products enable row level security;

-- Anyone (signed in or not) can read products
create policy "Public read access"
  on public.products
  for select
  to anon, authenticated
  using (true);

-- Only signed-in users can insert, update, or delete products
create policy "Authenticated users can write products"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);
