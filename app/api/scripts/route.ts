import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    // Demo mode — nothing to persist to, but don't error the UI out.
    return NextResponse.json({ saved: false, demo: true }, { status: 200 });
  }

  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase!.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Connecte-toi pour sauvegarder un script." }, { status: 401 });
  }

  const script = await request.json();

  const { error } = await supabase!.from("scripts").insert({
    user_id: user.id,
    niche: script.niche,
    tone: script.tone,
    objective: script.objective,
    hook_visual: script.hook?.visual,
    hook_speech: script.hook?.speech,
    body: script.body,
    cta: script.cta,
    hashtags: script.hashtags,
    best_posting_time: script.bestPostingTime,
  });

  if (error) {
    console.error("[scripts:save]", error);
    return NextResponse.json({ error: "La sauvegarde a échoué." }, { status: 500 });
  }

  return NextResponse.json({ saved: true }, { status: 200 });
}
