/**
 * ---------------------------------------------------------------------------
 * DATABASE SCHEMA (run in the Supabase SQL editor once you connect a project)
 * ---------------------------------------------------------------------------
 *
 * -- Profiles, one row per authenticated user
 * create table profiles (
 *   id uuid primary key references auth.users(id) on delete cascade,
 *   full_name text,
 *   niche text,
 *   target_platform text,
 *   plan text not null default 'gratuit' check (plan in ('gratuit','createur','pro')),
 *   trial_generations_left int not null default 3,
 *   connected_accounts int not null default 1,
 *   created_at timestamptz not null default now()
 * );
 *
 * -- Auto-create a profile row whenever someone signs up via Supabase Auth,
 * -- so the app never has to handle a logged-in user with no profile row.
 * create function public.handle_new_user()
 * returns trigger as $$
 * begin
 *   insert into public.profiles (id, full_name)
 *   values (new.id, new.raw_user_meta_data->>'full_name');
 *   return new;
 * end;
 * $$ language plpgsql security definer;
 *
 * create trigger on_auth_user_created
 *   after insert on auth.users
 *   for each row execute procedure public.handle_new_user();
 *
 * -- One row per Notch Pay checkout session
 * create table subscriptions (
 *   id uuid primary key default gen_random_uuid(),
 *   user_id uuid references profiles(id) on delete cascade,
 *   plan text not null check (plan in ('createur','pro')),
 *   reference text unique not null,
 *   status text not null default 'pending' check (status in ('pending','active','failed','canceled')),
 *   amount_fcfa int not null,
 *   created_at timestamptz not null default now(),
 *   confirmed_at timestamptz
 * );
 *
 * -- Generated scripts, kept for the "Sauvegarder" action
 * create table scripts (
 *   id uuid primary key default gen_random_uuid(),
 *   user_id uuid references profiles(id) on delete cascade,
 *   niche text not null,
 *   tone text not null,
 *   objective text not null,
 *   hook_visual text not null,
 *   hook_speech text not null,
 *   body jsonb not null,
 *   cta text not null,
 *   hashtags text[] not null,
 *   best_posting_time text,
 *   created_at timestamptz not null default now()
 * );
 *
 * -- Scheduled posts for the content planner
 * create table scheduled_posts (
 *   id uuid primary key default gen_random_uuid(),
 *   user_id uuid references profiles(id) on delete cascade,
 *   caption text not null,
 *   platforms text[] not null,
 *   media_placeholder text not null check (media_placeholder in ('image','video')),
 *   scheduled_for timestamptz not null,
 *   status text not null default 'planifie' check (status in ('planifie','publie','brouillon')),
 *   created_at timestamptz not null default now()
 * );
 *
 * -- Row Level Security: every table above should only ever be readable/
 * -- writable by its own user_id. Example policy (repeat per table):
 * -- alter table profiles enable row level security;
 * -- create policy "Users manage their own profile"
 * --   on profiles for all using (auth.uid() = id);
 * -- alter table scripts enable row level security;
 * -- create policy "Users manage their own scripts"
 * --   on scripts for all using (auth.uid() = user_id);
 * -- (repeat the same policy pattern for subscriptions and scheduled_posts)
 */
export {};
