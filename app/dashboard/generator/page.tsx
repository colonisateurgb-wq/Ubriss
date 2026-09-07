"use client";

import { useState } from "react";
import { GeneratorForm } from "@/components/dashboard/generator-form";
import { ScriptOutputCard } from "@/components/dashboard/script-output-card";
import { Niche, Tone, Objective, GeneratedScript } from "@/types";

export default function GeneratorPage() {
  const [niche, setNiche] = useState<Niche>("vente");
  const [tone, setTone] = useState<Tone>("educatif");
  const [objective, setObjective] = useState<Objective>("abonnes");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<GeneratedScript | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/scripts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, tone, objective }),
      });

      if (!res.ok) {
        throw new Error("La génération a échoué. Réessaie.");
      }

      const data: GeneratedScript = await res.json();
      setScript(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold tracking-tight">Générateur de scripts viraux</h1>
      <p className="mt-1.5 text-mute">
        Choisis ta niche, ton ton et ton objectif — on s&apos;occupe de la structure.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GeneratorForm
          niche={niche}
          tone={tone}
          objective={objective}
          loading={loading}
          onNicheChange={setNiche}
          onToneChange={setTone}
          onObjectiveChange={setObjective}
          onSubmit={handleGenerate}
        />

        <div>
          {error && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          {!error && !script && (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-xl2 border border-dashed border-ink-700 p-6 text-center text-mute">
              <p className="text-sm">
                Ton script apparaîtra ici une fois généré.
              </p>
            </div>
          )}

          {script && <ScriptOutputCard script={script} />}
        </div>
      </div>
    </div>
  );
}
