"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, CalendarClock, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Accueil", icon: LayoutDashboard },
  { href: "/dashboard/generator", label: "Générateur", icon: Sparkles },
  { href: "/dashboard/scheduler", label: "Planificateur", icon: CalendarClock },
  { href: "/dashboard/analytics", label: "Analytique", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Réglages", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-ink-800 bg-ink-900/40 px-4 py-6 md:flex md:flex-col">
      <Link href="/" className="mb-8 flex items-center gap-2 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-ink-950 font-extrabold">
          U
        </span>
        <span className="text-lg font-bold">UBriss</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-signal-soft text-signal"
                  : "text-mute hover:bg-ink-800 hover:text-paper"
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
