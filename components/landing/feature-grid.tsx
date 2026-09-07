import { FileText, CalendarClock, TrendingUp } from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    title: "Générateur de scripts viraux",
    description:
      "Hook, corps du message et appel à l'action générés pour ta niche et ton ton en quelques secondes. Tu ajustes, tu filmes.",
    accent: "signal" as const,
  },
  {
    icon: CalendarClock,
    title: "Planificateur multi-plateformes",
    description:
      "Prépare ta légende, choisis tes plateformes et programme la publication. Instagram, TikTok et ta page Facebook en un clic.",
    accent: "pulse" as const,
  },
  {
    icon: TrendingUp,
    title: "Audits & tendances locales",
    description:
      "On surveille les formats qui cartonnent en Afrique francophone en ce moment, pas des tendances américaines hors sujet.",
    accent: "gold" as const,
  },
];

const accentStyles = {
  signal: "text-signal bg-signal-soft",
  pulse: "text-pulse bg-pulse-soft",
  gold: "text-gold bg-gold-soft",
};

export function FeatureGrid() {
  return (
    <section id="fonctionnalites" className="border-b border-ink-800 py-20 lg:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Trois outils, un seul objectif : publier plus, réfléchir moins
          </h2>
          <p className="mt-4 text-lg text-mute">
            Chaque fonctionnalité répond à une friction précise : quoi dire,
            quand publier, et ce qui fonctionne vraiment ici.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl2 border border-ink-700 bg-ink-900/50 p-7 transition-colors hover:border-ink-600"
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${accentStyles[feature.accent]}`}>
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mute">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
