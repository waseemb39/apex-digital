# Supabase Setup

## 1. Create a Supabase project

Go to https://supabase.com, create a new project, then copy the three keys
from **Project Settings → API** into your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Also add all three to **Vercel → Project Settings → Environment Variables**
before deploying. Without them, auth will fail on the live site.

## 2. Run the database migration

Open **Supabase Dashboard → SQL Editor → New Query**, paste the contents of
`migrations/001_schema.sql`, and click Run.

This creates:
- `public.profiles` — one row per user, auto-seeded by trigger
- `public.projects` — one per customer, with `current_stage`
- `public.project_stages` — 7 rows per project (seeded by trigger)
- RLS policies so customers can only see their own data
- Helper functions `is_admin()` and `is_staff_or_admin()`

## 3. Bootstrap the first admin

Because admins create everyone else, you must manually elevate the first user:

**Step 1** — Sign up that user via the Supabase Auth dashboard
(Authentication → Users → Add User), or run the app and create an account
at `/login` (it will fail to log in until you complete step 2, but the
auth record is created).

**Step 2** — In the SQL Editor, run:

```sql
-- Replace with the admin's email
UPDATE public.profiles
   SET role = 'admin'
 WHERE email = 'admin@yourdomain.com';

-- Sync the role into the JWT app_metadata so middleware can read it
-- without a DB query on every request.
UPDATE auth.users
   SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
 WHERE email = 'admin@yourdomain.com';
```

After this, the user can log in at `/login` and will be redirected to `/admin`.

## 4. Creating customers

Once logged in as admin, use the **Create Customer** form on the `/admin`
dashboard. This calls the server-side `/api/admin/create-customer` endpoint,
which:

1. Creates the auth user via the Supabase Admin API
2. Updates their profile (name, business name)
3. Creates their project and seeds the 7 stage rows

The temporary password is returned once. Share it securely with the client;
they can change it later.

## Schema notes for future phases

- `project_stages.status` can be updated to `in_progress`, `awaiting_approval`,
  `approved`, or `complete` as work progresses through each phase.
- `projects.current_stage` and `projects.version` are updated when a stage is
  marked complete.
- `staff_role` on profiles (`onboarding_specialist`, `project_manager`,
  `content_creator`, `graphic_designer`, `qa`, `devops`) is reserved for the
  staff assignment feature in a later phase.
- Files, approvals, and comments will be attached to `project_stages` rows.
