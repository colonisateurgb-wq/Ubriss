"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserAccount } from "@/types";

export function Topbar({ user }: { user: UserAccount }) {
  const isFree = user.plan === "gratuit";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink-800 bg-ink-950/90 px-5 backdrop-blur-md sm:px-8">
      <div className="text-sm text-mute">
        {isFree ? (
          <span>
            Essais restants :{" "}
            <span className="font-semibold text-paper">{user.trialGenerationsLeft}/3</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="font-semibold text-paper">Abonnement actif</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isFree && (
          <Link href="/dashboard/settings">
            <Button size="sm">Passer à un Pass</Button>
          </Link>
        )}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pulse-soft text-sm font-semibold text-pulse">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
