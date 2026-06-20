-- =============================================================================
-- Graft Digital — initial schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New Query).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. profiles
--    Auto-created for every new auth user via the trigger below.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid        primary key references auth.users(id) on delete cascade,
  role          text        not null default 'customer'
                              check (role in ('admin', 'staff', 'customer')),
  staff_role    text        null,
  full_name     text        null,
  business_name text        null,
  email         text        null,
  phone         text        null,
  created_at    timestamptz not null default now()
);

-- Trigger: insert a profile row whenever a new auth.users row appears.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    -- honour a role supplied in app_metadata (used when admin creates a user),
    -- otherwise default to 'customer'.
    coalesce(new.raw_app_meta_data ->> 'role', 'customer')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 2. projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id             uuid        primary key default gen_random_uuid(),
  customer_id    uuid        not null references public.profiles(id) on delete cascade,
  name           text        not null,
  current_stage  text        not null default 'onboarding'
                               check (current_stage in (
                                 'onboarding', 'content', 'design',
                                 'development', 'qa', 'devops', 'launched'
                               )),
  version        text        null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Trigger: keep updated_at current.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 3. project_stages
--    One row per stage per project (7 rows total, seeded by trigger).
--    Later phases will attach files, approvals, and comments to these rows.
-- ---------------------------------------------------------------------------
create table if not exists public.project_stages (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  stage_key   text not null,
  position    int  not null,
  status      text not null default 'not_started'
                check (status in (
                  'not_started', 'in_progress', 'awaiting_approval',
                  'approved', 'complete'
                )),
  unique (project_id, stage_key)
);

-- Trigger: seed the 7 stage rows whenever a project is created.
create or replace function public.seed_project_stages()
returns trigger
language plpgsql
as $$
begin
  insert into public.project_stages (project_id, stage_key, position, status)
  values
    (new.id, 'onboarding',   1, 'in_progress'),
    (new.id, 'content',      2, 'not_started'),
    (new.id, 'design',       3, 'not_started'),
    (new.id, 'development',  4, 'not_started'),
    (new.id, 'qa',           5, 'not_started'),
    (new.id, 'devops',       6, 'not_started'),
    (new.id, 'launched',     7, 'not_started');
  return new;
end;
$$;

drop trigger if exists on_project_created on public.projects;
create trigger on_project_created
  after insert on public.projects
  for each row execute function public.seed_project_stages();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles      enable row level security;
alter table public.projects      enable row level security;
alter table public.project_stages enable row level security;

-- Helper: returns true if the calling user is an admin.
-- SECURITY DEFINER means it runs as the DB owner, bypassing RLS on profiles.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Helper: returns true if admin or staff.
create or replace function public.is_staff_or_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'staff')
  );
$$;

-- ---- profiles policies ----

-- Admin: full access to all profiles.
drop policy if exists "admin_all_profiles" on public.profiles;
create policy "admin_all_profiles" on public.profiles
  for all
  using  (public.is_admin())
  with check (public.is_admin());

-- Any authenticated user: read their own profile row only.
drop policy if exists "read_own_profile" on public.profiles;
create policy "read_own_profile" on public.profiles
  for select
  using (id = auth.uid());

-- ---- projects policies ----

-- Admin: full access.
drop policy if exists "admin_all_projects" on public.projects;
create policy "admin_all_projects" on public.projects
  for all
  using  (public.is_admin())
  with check (public.is_admin());

-- Customer: read their own projects only. NO write access.
drop policy if exists "customer_own_projects" on public.projects;
create policy "customer_own_projects" on public.projects
  for select
  using (customer_id = auth.uid());

-- Staff: read all projects (no write).
drop policy if exists "staff_read_projects" on public.projects;
create policy "staff_read_projects" on public.projects
  for select
  using (public.is_staff_or_admin());

-- ---- project_stages policies ----

-- Admin: full access.
drop policy if exists "admin_all_stages" on public.project_stages;
create policy "admin_all_stages" on public.project_stages
  for all
  using  (public.is_admin())
  with check (public.is_admin());

-- Customer: read stages for their own projects only.
drop policy if exists "customer_own_stages" on public.project_stages;
create policy "customer_own_stages" on public.project_stages
  for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_stages.project_id
        and p.customer_id = auth.uid()
    )
  );

-- Staff: read all stages (no write).
drop policy if exists "staff_read_stages" on public.project_stages;
create policy "staff_read_stages" on public.project_stages
  for select
  using (public.is_staff_or_admin());
