import { redirect } from "next/navigation";
import { MOCK_USER } from "@/data/mock-user";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { UserAccount } from "@/types";

/**
 * Server-side helper: returns the authenticated user's profile, or the demo
 * MOCK_USER when Supabase isn't configured yet. Redirects to /login when
 * Supabase IS configured but no session exists (middleware normally catches
 * this first, but this is a safety net for direct server component calls).
 */
export async function getCurrentUser(): Promise<UserAccount> {
  if (!isSupabaseConfigured()) {
    return MOCK_USER;
  }

  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase!.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase!
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    name: profile?.full_name || user.email?.split("@")[0] || "Utilisateur",
    email: user.email ?? "",
    plan: profile?.plan ?? "gratuit",
    trialGenerationsLeft: profile?.trial_generations_left ?? 3,
    connectedAccounts: profile?.connected_accounts ?? 1,
  };
}
