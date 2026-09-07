"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { NICHES } from "@/data/options";
import { Niche } from "@/types";
import { cn } from "@/lib/utils";

interface DemoResult {
  hook: { visual: string; speech: string };
  hashtags: string[];
}

export function DemoWidget() {
  const [selected, setSelected] = useState<Niche>("vente");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);

  async function runDemo(niche: Niche) {
    setSelected(niche);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="demo" className="relative mx-auto w-full max-w-[300px]">
      {/* Phone frame — the product is mobile-first, so the demo lives where the product lives */}
      <div className="relative rounded-[2.5rem] border-4 border-ink-700 bg-ink-900 p-2 shadow-2xl">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-950" />
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-4 pb-6 pt-8">
          <p className="mb-3 text-xs text-mute">Choisis ta niche</p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {NICHES.slice(0, 5).map((n) => (
              <button
                key={n.id}
                onClick={() => runDemo(n.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  selected === n.id
                    ? "bg-signal text-ink-950"
                    : "bg-ink-800 text-mute hover:text-paper"
                )}
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="min-h-[180px] rounded-2xl border border-ink-700 bg-ink-900 p-4">
            {loading && (
              <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-mute">
                <Loader2 className="h-5 w-5 animate-spin text-signal" />
                <span className="text-xs">Génération du hook...</span>
              </div>
            )}

            {!loading && !result && (
              <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center text-mute">
                <Sparkles className="h-5 w-5 text-signal" />
                <span className="text-xs">Choisis une niche pour voir un aperçu instantané</span>
              </div>
            )}

            {!loading && result && (
              <div className="animate-rise-in space-y-3">
                <div>
                  <p className="text-[11px] font-semibold text-signal">Accroche (0-3s)</p>
                  <p className="mt-1 text-sm leading-snug text-paper">{result.hook.visual}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-pulse">Ce que tu dis</p>
                  <p className="mt-1 text-sm italic leading-snug text-paper">&laquo; {result.hook.speech} &raquo;</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.hashtags.map((h) => (
                    <span key={h} className="rounded-full bg-ink-800 px-2 py-0.5 text-[11px] text-mute">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="mt-3 text-center text-[11px] text-mute">
            Aperçu du hook seulement — le script complet arrive avec ton compte
          </p>
        </div>
      </div>
    </div>
  );
}
