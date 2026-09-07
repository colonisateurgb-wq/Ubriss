"use client";

import { useState } from "react";
import { Copy, Check, Bookmark, CalendarPlus, Clock } from "lucide-react";
import { GeneratedScript } from "@/types";
import { Button } from "@/components/ui/button";

export function ScriptOutputCard({ script }: { script: GeneratedScript }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  function fullText() {
    return [
      `HOOK (0-3s): ${script.hook.visual} — "${script.hook.speech}"`,
      "",
      "CORPS:",
      ...script.body.map((line, i) => `${i + 1}. ${line}`),
      "",
      `CTA: ${script.cta}`,
      "",
      `Hashtags: ${script.hashtags.join(" ")}`,
      `Meilleur créneau: ${script.bestPostingTime}`,
    ].join("\n");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(fullText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="animate-rise-in rounded-xl2 border border-ink-700 bg-ink-900/40 p-6">
      <div className="space-y-5">
        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-signal">
            Accroche · 0-3 secondes
          </p>
          <p className="mt-2 text-[15px]">
            <span className="text-mute">Visuel : </span>
            {script.hook.visual}
          </p>
          <p className="mt-1 text-[15px] italic">&laquo; {script.hook.speech} &raquo;</p>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-pulse">
            Corps · 3-15 secondes
          </p>
          <ul className="mt-2 space-y-1.5">
            {script.body.map((line, i) => (
              <li key={i} className="flex gap-2.5 text-[15px]">
                <span className="text-mute">{i + 1}.</span>
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">
            Appel à l&apos;action · 15-30 secondes
          </p>
          <p className="mt-2 text-[15px]">{script.cta}</p>
        </section>

        <div className="flex flex-wrap items-center gap-4 border-t border-ink-800 pt-4 text-sm text-mute">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {script.bestPostingTime}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {script.hashtags.map((h) => (
              <span key={h} className="rounded-full bg-ink-800 px-2.5 py-1 text-xs">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copié" : "Copier le script"}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setSaved(true)} disabled={saved}>
          <Bookmark className="h-4 w-4" />
          {saved ? "Sauvegardé" : "Sauvegarder"}
        </Button>
        <Button variant="secondary" size="sm">
          <CalendarPlus className="h-4 w-4" />
          Programmer la publication
        </Button>
      </div>
    </div>
  );
}
