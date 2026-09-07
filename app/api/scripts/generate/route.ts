import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateScript } from "@/lib/ai-generator";

const bodySchema = z.object({
  niche: z.enum(["fitness", "mode", "restauration", "tech", "vente", "beaute", "business"]),
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

  // TODO (Supabase): read the session, check trial_generations_left / plan
  // limits before generating, and decrement the counter (or reject with 402
  // "Limite atteinte" once exhausted on the free plan).

  const script = await generateScript(parsed);

  // TODO (Supabase): insert into `scripts` when the user hits "Sauvegarder"
  // rather than on every generation, to avoid cluttering their history.

  return NextResponse.json(script, { status: 200 });
}
