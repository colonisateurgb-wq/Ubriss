"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { NICHES, PLATFORMS } from "@/data/options";
import { Niche, Platform } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Step = "auth" | "niche" | "platform" | "goal";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("auth");
  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState<Niche | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [followerGoal, setFollowerGoal] = useState("");

  function handleGoogleLogin() {
    // TODO (Supabase): supabase.auth.signInWithOAuth({ provider: 'google' })
    setStep("niche");
  }

  function handleEmailContinue() {
    if (!email) return;
    // TODO (Supabase): supabase.auth.signInWithOtp({ email })
    setStep("niche");
  }

  function finishOnboarding() {
    // TODO (Supabase): update profiles row with niche/platform/goal, then
    // route based on session — this mock always sends to the dashboard.
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-ink-950 font-extrabold">
            U
          </span>
          <span className="text-lg font-bold">UBriss</span>
        </Link>

        <div className="rounded-xl2 border border-ink-700 bg-ink-900/50 p-7">
          {step === "auth" && (
            <>
              <h1 className="text-center text-lg font-semibold">Commence en 30 secondes</h1>
              <Button onClick={handleGoogleLogin} variant="outline" size="lg" className="mt-6 w-full">
                Continuer avec Google
              </Button>

              <div className="my-5 flex items-center gap-3 text-xs text-mute">
                <div className="h-px flex-1 bg-ink-700" />
                ou
                <div className="h-px flex-1 bg-ink-700" />
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    className="w-full rounded-lg border border-ink-700 bg-ink-950 py-2.5 pl-10 pr-3.5 text-sm outline-none focus-visible:border-signal"
                  />
                </div>
                <Button onClick={handleEmailContinue} size="lg" className="w-full">
                  Recevoir un code par email
                </Button>
              </div>
            </>
          )}

          {step === "niche" && (
            <>
              <h1 className="text-center text-lg font-semibold">Ta niche principale ?</h1>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {NICHES.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setNiche(n.id)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm",
                      niche === n.id ? "border-signal/60 bg-signal-soft text-signal" : "border-ink-700 text-mute"
                    )}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep("platform")} disabled={!niche} size="lg" className="mt-6 w-full">
                Continuer <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {step === "platform" && (
            <>
              <h1 className="text-center text-lg font-semibold">Ta plateforme principale ?</h1>
              <div className="mt-6 grid grid-cols-1 gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm",
                      platform === p.id ? "border-signal/60 bg-signal-soft text-signal" : "border-ink-700 text-mute"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep("goal")} disabled={!platform} size="lg" className="mt-6 w-full">
                Continuer <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {step === "goal" && (
            <>
              <h1 className="text-center text-lg font-semibold">
                Ton objectif d&apos;abonnés dans 3 mois ?
              </h1>
              <input
                type="number"
                value={followerGoal}
                onChange={(e) => setFollowerGoal(e.target.value)}
                placeholder="Ex : 5000"
                className="mt-6 w-full rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm outline-none focus-visible:border-signal"
              />
              <Button onClick={finishOnboarding} size="lg" className="mt-6 w-full">
                Accéder à mon tableau de bord
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
