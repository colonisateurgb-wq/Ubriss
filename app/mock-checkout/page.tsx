"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Smartphone, CheckCircle2 } from "lucide-react";
import { formatFcfa } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function MockCheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const amount = Number(params.get("amount") ?? 0);
  const ref = params.get("ref");
  const [confirmed, setConfirmed] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5">
      <div className="w-full max-w-sm rounded-xl2 border border-ink-700 bg-ink-900 p-7 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
          <Smartphone className="h-6 w-6" />
        </div>

        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-mute">
          Mode démo — aucun vrai paiement
        </p>
        <h1 className="mt-2 text-xl font-bold">{formatFcfa(amount)}</h1>
        <p className="mt-1 break-all text-xs text-mute">Référence : {ref}</p>

        {!confirmed ? (
          <>
            <p className="mt-5 text-sm text-mute">
              En production, tu recevrais ici une invite MTN MoMo ou Orange
              Money sur ton téléphone pour valider le paiement.
            </p>
            <Button className="mt-6 w-full" onClick={() => setConfirmed(true)}>
              Simuler la confirmation
            </Button>
          </>
        ) : (
          <>
            <CheckCircle2 className="mx-auto mt-5 h-8 w-8 text-signal" />
            <p className="mt-2 text-sm">Paiement confirmé (simulation).</p>
            <Button className="mt-6 w-full" onClick={() => router.push("/dashboard/settings?payment=success")}>
              Retour au tableau de bord
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
