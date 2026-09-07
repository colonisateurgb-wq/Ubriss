"use client";

import { NICHES, TONES, OBJECTIVES } from "@/data/options";
import { Niche, Tone, Objective } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface GeneratorFormProps {
  niche: Niche;
  tone: Tone;
  objective: Objective;
  loading: boolean;
  onNicheChange: (v: Niche) => void;
  onToneChange: (v: Tone) => void;
  onObjectiveChange: (v: Objective) => void;
  onSubmit: () => void;
}

export function GeneratorForm({
  niche,
  tone,
  objective,
  loading,
  onNicheChange,
  onToneChange,
  onObjectiveChange,
  onSubmit,
}: GeneratorFormProps) {
  return (
    <div className="space-y-7 rounded-xl2 border border-ink-700 bg-ink-900/40 p-6">
      <div>
        <label className="text-sm font-semibold">Ta niche</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {NICHES.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => onNicheChange(n.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                niche === n.id
                  ? "bg-signal text-ink-950 font-medium"
                  : "bg-ink-800 text-mute hover:text-paper"
              )}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold">Ton de la vidéo</label>
        <div className="mt-3 space-y-2">
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onToneChange(t.id)}
              className={cn(
                "flex w-full flex-col items-start rounded-lg border px-4 py-2.5 text-left transition-colors",
                tone === t.id
                  ? "border-pulse/60 bg-pulse-soft"
                  : "border-ink-700 hover:border-ink-600"
              )}
            >
              <span className="text-sm font-medium">{t.label}</span>
              <span className="text-xs text-mute">{t.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold">Objectif</label>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          {OBJECTIVES.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onObjectiveChange(o.id)}
              className={cn(
                "flex-1 rounded-lg border px-4 py-2.5 text-sm transition-colors",
                objective === o.id
                  ? "border-signal/60 bg-signal-soft text-signal font-medium"
                  : "border-ink-700 text-mute hover:border-ink-600"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={onSubmit} disabled={loading} size="lg" className="w-full">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Génération en cours...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" /> Générer le script
          </>
        )}
      </Button>
    </div>
  );
}
