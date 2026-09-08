import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateScript } from "@/lib/ai-generator";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

const bodySchema = z.object({
  niche: z.enum([
    "fitness", "mode", "restauration", "tech", "vente", "beaute", "business",
    "coiffure", "immobilier", "education", "sante", "artisanat", "agriculture",
    "transport", "automobile", "evenementiel", "freelance", "musique", "sport",
    "voyage", "finance", "ong", "juridique",
  ]),
  tone: z.enum(["educatif", "buzz", "humoristique", "storytelling", "camfranglais"]),
  objective: z.enum(["abonnes", "vente", "engagement"]),
});

export async function POST(request: NextRequest) {
  let parsed;
  try {
    parsed = bodySchema.parse(await request.json());
  } catch (error) {
    return NextResponse.json({ error: "Champs manquants ou invalides" }, { status: 400 });
  }

  // Enforce the free-plan trial limit when Supabase is configured. In demo
  // mode (no Supabase yet) generation stays unlimited so the product stays
  // demoable.
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase!.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Connecte-toi pour générer un script." }, { status: 401 });
    }

    const { data: profile } = await supabase!
      .from("profiles")
      .select("plan, trial_generations_left")
      .eq("id", user.id)
      .single();

    if (profile && profile.plan === "gratuit" && profile.trial_generations_left <= 0) {
      return NextResponse.json(
        { error: "Tu as utilisé tes 3 générations gratuites. Passe à un Pass pour continuer." },
        { status: 402 }
      );
    }

    const script = await generateScript(parsed);

    if (profile && profile.plan === "gratuit") {
      await supabase!
        .from("profiles")
        .update({ trial_generations_left: profile.trial_generations_left - 1 })
        .eq("id", user.id);
    }

    return NextResponse.json(script, { status: 200 });
  }

  const script = await generateScript(parsed);
  return NextResponse.json(script, { status: 200 });
}
