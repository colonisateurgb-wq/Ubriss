import { createClient } from "@supabase/supabase-js";

export function isSupabaseAdminConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Service-role client — bypasses Row Level Security entirely. Only ever call
 * this from trusted server contexts with no user session to rely on, such as
 * the Notch Pay webhook. Never expose SUPABASE_SERVICE_ROLE_KEY to the client.
 */
export function getSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured()) return null;

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
