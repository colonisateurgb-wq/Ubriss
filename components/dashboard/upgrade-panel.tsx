"use client";

import { useState } from "react";
import { PLANS } from "@/data/plans";
import { formatFcfa, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlanId } from "@/types";
import { Loader2 } from "lucide-react";

export function UpgradePanel({ currentPlan }: { currentPlan: PlanId }) {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const payablePlans = PLANS.filter((p) => p.id !== "gratuit");

  async function handleUpgrade(planId: PlanId) {
    if (!email || !phone) {
      setError("Renseigne ton email et ton numéro Mobile Money avant de continuer.");
      return;
    }
    setError(null);
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur de paiement");
      window.location.href = data.authorization_url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      setLoadingPlan(null);
    }
  }

  return (
    <div className="rounded-xl2 border border-ink-700 bg-ink-900/40 p-6">
      <h2 className="font-semibold">Passer à un Pass payant</h2>
      <p className="mt-1 text-sm text-mute">
        Paiement sécurisé via Notch Pay — MTN Mobile Money et Orange Money.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="toi@example.com"
            className="mt-1.5 w-full rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm outline-none focus-visible:border-signal"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Numéro Mobile Money</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="6XX XXX XXX"
            className="mt-1.5 w-full rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm outline-none focus-visible:border-signal"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {payablePlans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "rounded-lg border p-4",
              currentPlan === plan.id ? "border-signal/60 bg-signal-soft" : "border-ink-700"
            )}
          >
            <p className="font-medium">{plan.name}</p>
            <p className="text-sm text-mute">{formatFcfa(plan.priceFcfa)} / mois</p>
            <Button
              size="sm"
              variant={currentPlan === plan.id ? "outline" : "primary"}
              className="mt-3 w-full"
              disabled={currentPlan === plan.id || loadingPlan !== null}
              onClick={() => handleUpgrade(plan.id)}
            >
              {loadingPlan === plan.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : currentPlan === plan.id ? (
                "Offre actuelle"
              ) : (
                "Choisir"
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
