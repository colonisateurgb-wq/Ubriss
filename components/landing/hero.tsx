import Link from "next/link";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoWidget } from "./demo-widget";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-800">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]" />

      <div className="container-px relative mx-auto grid max-w-6xl gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-900/60 px-3.5 py-1.5 text-xs text-mute">
            <Wallet className="h-3.5 w-3.5 text-signal" />
            Paiement 100% Mobile Money — MTN &amp; Orange
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Explose ta visibilité sur TikTok &amp; Instagram sans y passer tes journées
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            UBriss écrit tes scripts viraux, te dit quand poster et programme
            tes publications à ta place. Pensé pour les créateurs et commerces
            qui n&apos;ont pas 3 heures par jour à donner aux réseaux sociaux.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Tester gratuitement
              </Button>
            </Link>
            <a href="#demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Voir la démo en direct
              </Button>
            </a>
          </div>

          <p className="mt-5 text-sm text-mute">
            3 générations offertes, sans carte bancaire nécessaire.
          </p>
        </div>

        <DemoWidget />
      </div>
    </section>
  );
}
