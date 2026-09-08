import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseConfigured } from "./client";

export { isSupabaseConfigured };

/**
 * Server client for Server Components and Route Handlers. Reads/writes the
 * auth cookies via Next's `cookies()` so the session survives navigation.
 * Returns null when Supabase isn't configured yet.
 */
export function getSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from a Server Component render — middleware handles
            // the actual cookie write in that case, so this is safe to skip.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // Same as above.
          }
        },
      },
    }
  );
}
