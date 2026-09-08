import { GeneratedScript, ScriptGenerationInput } from "@/types";

// AI_PROVIDER controls which engine writes the scripts:
// - "mock"   (default) — built-in templates, zero cost, works with no keys
// - "gemini" — Google Gemini API, has a genuine free tier (no card needed)
// - "openai" — GPT-4o-mini, paid but very cheap
const AI_PROVIDER = (process.env.AI_PROVIDER ?? "mock") as "mock" | "gemini" | "openai";

const HOOK_TEMPLATES: Record<string, { visual: string; speech: string }[]> = {
  fitness: [
    { visual: "Gros plan sur une paire de baskets qui tape le sol, caméra au ras du sol", speech: "Arrête de faire du cardio si tu veux perdre du ventre." },
    { visual: "Toi face caméra, essoufflé, juste après une série", speech: "Personne ne t'a dit ça avant ta première séance." },
  ],
  mode: [
    { visual: "Transition rapide entre deux tenues, coupe sèche sur le beat", speech: "3000 FCFA pour cette pièce ? Voici où je l'ai trouvée moins cher." },
  ],
  restauration: [
    { visual: "Plan macro sur le plat qui fume encore, vapeur visible", speech: "Ce plat coûte 500 FCFA à préparer et se vend à 3000." },
  ],
  tech: [
    { visual: "Écran de téléphone qui affiche une erreur, puis la solution", speech: "Ton téléphone rame ? Ce n'est pas ce que tu crois." },
  ],
  vente: [
    { visual: "Colis qui s'ouvre, produit mis en scène sur fond neutre", speech: "J'ai vendu ça 40 fois cette semaine sans publicité." },
  ],
  beaute: [
    { visual: "Avant/après en split screen, même lumière, même angle", speech: "Ce produit à 2000 FCFA remplace 3 étapes de ta routine." },
  ],
  business: [
    { visual: "Toi assis à un bureau simple, ton carnet ouvert devant toi", speech: "J'ai commencé ce business avec 15 000 FCFA. Voici comment." },
  ],
};

const CTA_BY_OBJECTIVE: Record<string, string[]> = {
  abonnes: ["Abonne-toi pour la suite demain", "Suis-moi, je poste un nouveau tips chaque semaine"],
  vente: ["Lien en bio pour commander", "Écris \"INFO\" en commentaire, je t'envoie les détails"],
  engagement: ["Dis-moi en commentaire si tu es d'accord", "Tag quelqu'un qui doit voir ça"],
};

const HASHTAG_POOL: Record<string, string[]> = {
  fitness: ["#fitnesscameroun", "#sport237", "#coachvirtuel"],
  mode: ["#mode237", "#styledakar", "#fashionafrica"],
  restauration: ["#foodyaounde", "#cuisine237", "#streetfood"],
  tech: ["#tech237", "#astucephone", "#digitalafrica"],
  vente: ["#vente237", "#business237", "#ecommerceafrique"],
  beaute: ["#beaute237", "#skincare237", "#glowup"],
  business: ["#entrepreneur237", "#business237", "#hustleafrica"],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Mock generator — used when AI_PROVIDER=mock (the default). Zero cost, zero setup. */
async function generateMock(input: ScriptGenerationInput): Promise<GeneratedScript> {
  await new Promise((resolve) => setTimeout(resolve, 900)); // feels like a real call

  const hookPool = HOOK_TEMPLATES[input.niche] ?? HOOK_TEMPLATES.business;
  const hook = pick(hookPool);

  const bodyByTone: Record<string, string[]> = {
    educatif: [
      "Explique la cause du problème en une phrase simple.",
      "Donne une astuce concrète que la personne peut appliquer aujourd'hui.",
      "Termine par le résultat attendu si elle applique le conseil.",
    ],
    buzz: [
      "Annonce une opinion qui va à l'encontre de ce que tout le monde pense.",
      "Donne un exemple concret qui prouve ton point.",
      "Laisse la question ouverte pour forcer la réaction en commentaire.",
    ],
    humoristique: [
      "Pose la situation du quotidien que tout le monde reconnaît.",
      "Exagère la réaction pour créer le décalage comique.",
      "Referme la blague avec une chute courte.",
    ],
    storytelling: [
      "Raconte le point de départ : la galère ou le doute.",
      "Montre le déclic ou la découverte qui a tout changé.",
      "Relie l'histoire à l'offre sans que ça sonne comme une pub.",
    ],
    camfranglais: [
      "Parle comme tu parlerais à un ami, pas comme une pub.",
      "Donne l'info direct, sans détour.",
      "Ajoute une expression locale qui rend le ton crédible.",
    ],
  };

  return {
    id: `scr_${Date.now()}`,
    createdAt: new Date().toISOString(),
    niche: input.niche,
    tone: input.tone,
    objective: input.objective,
    hook,
    body: bodyByTone[input.tone] ?? bodyByTone.educatif,
    cta: pick(CTA_BY_OBJECTIVE[input.objective] ?? CTA_BY_OBJECTIVE.abonnes),
    hashtags: HASHTAG_POOL[input.niche] ?? HASHTAG_POOL.business,
    bestPostingTime: pick(["18h30 - 20h00", "12h15 - 13h30", "20h30 - 22h00"]),
  };
}

const SYSTEM_PROMPT =
  "Tu es un scénariste spécialisé en vidéos courtes virales pour créateurs et commerces d'Afrique francophone. Réponds uniquement en JSON valide avec les clés: hook (objet avec visual et speech), body (array de 3 chaînes), cta (chaîne), hashtags (array de 3 chaînes), bestPostingTime (chaîne).";

function buildUserPrompt(input: ScriptGenerationInput): string {
  return `Niche: ${input.niche}. Ton: ${input.tone}. Objectif: ${input.objective}. Génère un script de 30 secondes.`;
}

/** Gemini path — free tier, no card required. Default model is Flash-Lite for the highest free daily quota. */
async function generateGemini(input: ScriptGenerationInput): Promise<GeneratedScript> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY manquant alors que AI_PROVIDER=gemini.");
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash-lite";

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_PROMPT}\n\n${buildUserPrompt(input)}` }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini a renvoyé une erreur: ${await response.text()}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Réponse Gemini vide ou mal formée.");
  }
  const parsed = JSON.parse(text);

  return {
    id: `scr_${Date.now()}`,
    createdAt: new Date().toISOString(),
    niche: input.niche,
    tone: input.tone,
    objective: input.objective,
    ...parsed,
  };
}

/** OpenAI path — GPT-4o-mini, paid but cheap. Opt in with AI_PROVIDER=openai. */
async function generateOpenAI(input: ScriptGenerationInput): Promise<GeneratedScript> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY manquant alors que AI_PROVIDER=openai.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(input) },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI a renvoyé une erreur: ${await response.text()}`);
  }

  const data = await response.json();
  const parsed = JSON.parse(data.choices[0].message.content);

  return {
    id: `scr_${Date.now()}`,
    createdAt: new Date().toISOString(),
    niche: input.niche,
    tone: input.tone,
    objective: input.objective,
    ...parsed,
  };
}

export async function generateScript(input: ScriptGenerationInput): Promise<GeneratedScript> {
  switch (AI_PROVIDER) {
    case "gemini":
      return generateGemini(input);
    case "openai":
      return generateOpenAI(input);
    default:
      return generateMock(input);
  }
}
