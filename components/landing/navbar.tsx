"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-800/80 bg-ink-950/80 backdrop-blur-md">
      <div className="container-px mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-ink-950 font-extrabold">
            U
          </span>
          <span className="text-lg font-bold tracking-tight">UBriss</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-mute md:flex">
          <a href="#fonctionnalites" className="hover:text-paper transition-colors">
            Fonctionnalités
          </a>
          <a href="#tarifs" className="hover:text-paper transition-colors">
            Tarifs
          </a>
          <a href="#demo" className="hover:text-paper transition-colors">
            Démo
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm text-mute hover:text-paper sm:block">
            Se connecter
          </Link>
          <Link href="/login">
            <Button size="sm">Tester gratuitement</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
