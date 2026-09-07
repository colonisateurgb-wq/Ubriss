import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">Analytique</h1>
      <p className="mt-1.5 text-mute">
        Le suivi de performance arrive une fois tes comptes Instagram et TikTok connectés.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-xl2 border border-dashed border-ink-700 p-16 text-center text-mute">
        <BarChart3 className="h-8 w-8" />
        <p className="text-sm">
          Connecte un compte social depuis Réglages pour voir tes statistiques ici.
        </p>
      </div>
    </div>
  );
}
