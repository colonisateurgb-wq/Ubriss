import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS } from "@/data/plans";
import { formatFcfa, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PricingTable() {
  return (
    <section id="tarifs" className="border-b border-ink-800 py-20 lg:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Un tarif pensé pour le marché local
          </h2>
          <p className="mt-4 text-lg text-mute">
            Paye en Mobile Money, sans engagement. Change ou annule quand tu veux.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col rounded-xl2 border p-7",
                plan.highlighted
                  ? "border-signal/50 bg-signal-soft/40 shadow-glow"
                  : "border-ink-700 bg-ink-900/50"
              )}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-full bg-signal px-3 py-1 text-xs font-semibold text-ink-950">
                  Le plus choisi
                </span>
              )}

              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-mute">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight">
                  {plan.priceFcfa === 0 ? "Gratuit" : formatFcfa(plan.priceFcfa)}
                </span>
                {plan.period && <span className="text-sm text-mute">/ {plan.period}</span>}
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                    <span className="text-paper/90">{feature}</span>
                  </li>
                ))}
              </ul>

              href={
  plan.priceFcfa === 0
    ? "/login"
    : `/login?next=${encodeURIComponent(`/dashboard/settings?plan=${plan.id}`)}`
}
                <Button
                  variant={plan.highlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.priceFcfa === 0 ? "Commencer gratuitement" : "Choisir cette offre"}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
