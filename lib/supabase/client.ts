import { createBrowserClient } from "@supabase/ssr";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Browser client for use in client components ("use client").
 * Returns null when Supabase isn't configured yet, so the UI can fall back
 * to demo mode instead of crashing before the person adds their keys.
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null;

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
}
