import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateScript } from "@/lib/ai-generator";

const bodySchema = z.object({
  niche: z.enum([
    "fitness", "mode", "restauration", "tech", "vente", "beaute", "business",
    "coiffure", "immobilier", "education", "sante", "artisanat", "agriculture",
    "transport", "automobile", "evenementiel", "freelance", "musique", "sport",
    "voyage", "finance", "ong", "juridique",
  ]),
});

export async function POST(request: NextRequest) {
  let parsed;
  try {
    parsed = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Niche invalide" }, { status: 400 });
  }

  const script = await generateScript({
    niche: parsed.niche,
    tone: "educatif",
    objective: "abonnes",
  });

  // Demo widget only ever shows the hook — the full script is the reason to sign up.
  return NextResponse.json({ hook: script.hook, hashtags: script.hashtags.slice(0, 2) });
}
