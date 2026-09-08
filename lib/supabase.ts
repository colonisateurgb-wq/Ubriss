import { createClient } from "@supabase/supabase-js";

/**
 * Browser/client-safe Supabase client (anon key only — respects RLS).
 * Server-only operations that need the service role key should create
 * their own client inline inside the API route, never export it from here.
 *
 * Returns null when env vars are missing so callers can fall back to a
 * demo mode instead of crashing (see app/(auth)/login/page.tsx).
 */
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}

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
 * -- alter table scripts enable row level security;
 * -- create policy "Users manage their own scripts"
 * --   on scripts for all using (auth.uid() = user_id);
 */
