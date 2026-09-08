"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { NICHES, PLATFORMS } from "@/data/options";
import { Niche, Platform } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type Step = "email" | "code" | "niche" | "platform" | "goal";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();
  const isDemoMode = supabase === null;

  const [step, setStep] = useState<Step>("email");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [niche, setNiche] = useState<Niche | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [followerGoal, setFollowerGoal] = useState("");

  async function handleSendCode() {
    if (!email || !fullName) return;
    setError(null);

    if (isDemoMode) {
      // Supabase isn't configured yet — skip straight to onboarding so the
      // rest of the app stays demoable.
      setStep("niche");
      return;
    }

    setLoading(true);
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true, data: { full_name: fullName } },
    });
    setLoading(false);

    if (otpError) {
      setError("Impossible d'envoyer le code. Vérifie l'adresse email et réessaie.");
      return;
    }
    setStep("code");
  }

  async function handleVerifyCode() {
    if (!code || isDemoMode) return;
    setError(null);
    setLoading(true);
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    setLoading(false);

    if (verifyError) {
      setError("Code invalide ou expiré. Vérifie le code reçu par email.");
      return;
    }
    setStep("niche");
  }

  async function finishOnboarding() {
    if (!isDemoMode) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from("profiles")
          .update({ niche, target_platform: platform, full_name: fullName || undefined })
          .eq("id", user.id);
      }
    }

    const next = searchParams.get("next") ?? "/dashboard";
    router.push(next);
    router.refresh();
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

        {isDemoMode && (
          <p className="mb-4 rounded-lg border border-gold/30 bg-gold-soft px-3.5 py-2.5 text-center text-xs text-gold">
            Mode démo — Supabase n&apos;est pas encore configuré. La connexion
            est simulée.
          </p>
        )}

        <div className="rounded-xl2 border border-ink-700 bg-ink-900/50 p-7">
          {step === "email" && (
            <>
              <h1 className="text-center text-lg font-semibold">Commence en 30 secondes</h1>
              <p className="mt-1.5 text-center text-sm text-mute">
                On t&apos;envoie un code à usage unique par email, pas de mot de passe.
              </p>

              <div className="mt-6 space-y-3">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ton nom"
                  className="w-full rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm outline-none focus-visible:border-signal"
                />
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
                {error && <p className="text-sm text-red-300">{error}</p>}
                <Button onClick={handleSendCode} disabled={loading || !email || !fullName} size="lg" className="w-full">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Recevoir un code par email"}
                </Button>
              </div>
            </>
          )}

          {step === "code" && (
            <>
              <h1 className="text-center text-lg font-semibold">Vérifie ton email</h1>
              <p className="mt-1.5 text-center text-sm text-mute">
                On a envoyé un code à 6 chiffres à {email}.
              </p>
              <input
                type="text"
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className="mt-6 w-full rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-center text-lg tracking-[0.3em] outline-none focus-visible:border-signal"
              />
              {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
              <Button onClick={handleVerifyCode} disabled={loading || code.length < 6} size="lg" className="mt-4 w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Valider le code"}
              </Button>
              <button
                onClick={() => setStep("email")}
                className="mt-3 w-full text-center text-xs text-mute hover:text-paper"
              >
                Mauvaise adresse email ? Recommencer
              </button>
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

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
