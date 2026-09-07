import { MOCK_USER } from "@/data/mock-user";
import { UpgradePanel } from "@/components/dashboard/upgrade-panel";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Réglages</h1>
        <p className="mt-1.5 text-mute">Gère ton compte et ton abonnement.</p>
      </div>

      <div className="rounded-xl2 border border-ink-700 bg-ink-900/40 p-6">
        <h2 className="font-semibold">Profil</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between border-b border-ink-800 pb-3">
            <dt className="text-mute">Nom</dt>
            <dd>{MOCK_USER.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-mute">Email</dt>
            <dd>{MOCK_USER.email}</dd>
          </div>
        </dl>
      </div>

      <UpgradePanel currentPlan={MOCK_USER.plan} />
    </div>
  );
}
