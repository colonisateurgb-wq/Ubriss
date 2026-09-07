import Link from "next/link";
import { Sparkles, CalendarClock, ArrowUpRight } from "lucide-react";
import { MOCK_USER } from "@/data/mock-user";

export default function DashboardHome() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold tracking-tight">
        Salut {MOCK_USER.name.split(" ")[0]} 👋
      </h1>
      <p className="mt-1.5 text-mute">
        Voici ce que tu peux faire aujourd&apos;hui pour rester régulier sur tes publications.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/generator"
          className="group rounded-xl2 border border-ink-700 bg-ink-900/50 p-6 transition-colors hover:border-signal/50"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal-soft text-signal">
              <Sparkles className="h-5 w-5" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <h2 className="mt-4 font-semibold">Générer un script</h2>
          <p className="mt-1 text-sm text-mute">
            Un hook, un corps et un call-to-action prêts en 30 secondes.
          </p>
        </Link>

        <Link
          href="/dashboard/scheduler"
          className="group rounded-xl2 border border-ink-700 bg-ink-900/50 p-6 transition-colors hover:border-pulse/50"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-pulse-soft text-pulse">
              <CalendarClock className="h-5 w-5" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <h2 className="mt-4 font-semibold">Programmer une publication</h2>
          <p className="mt-1 text-sm text-mute">
            Choisis la date, la légende et les plateformes.
          </p>
        </Link>
      </div>

      <div className="mt-10 rounded-xl2 border border-ink-700 bg-ink-900/30 p-6">
        <h2 className="font-semibold">Ton compte</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-mute">Offre actuelle</dt>
            <dd className="mt-1 font-medium capitalize">{MOCK_USER.plan}</dd>
          </div>
          <div>
            <dt className="text-mute">Essais restants</dt>
            <dd className="mt-1 font-medium">{MOCK_USER.trialGenerationsLeft} / 3</dd>
          </div>
          <div>
            <dt className="text-mute">Comptes connectés</dt>
            <dd className="mt-1 font-medium">{MOCK_USER.connectedAccounts}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
