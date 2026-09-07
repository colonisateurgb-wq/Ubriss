"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, CalendarClock, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Accueil", icon: LayoutDashboard },
  { href: "/dashboard/generator", label: "Générer", icon: Sparkles },
  { href: "/dashboard/scheduler", label: "Planifier", icon: CalendarClock },
  { href: "/dashboard/analytics", label: "Stats", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Réglages", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink-800 bg-ink-950/95 backdrop-blur-md md:hidden">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
              active ? "text-signal" : "text-mute"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
