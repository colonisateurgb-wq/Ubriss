import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-14">
      <div className="container-px mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal text-ink-950 text-sm font-extrabold">
              U
            </span>
            <span className="text-base font-bold">UBriss</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            Fait à Yaoundé pour les créateurs et commerces d&apos;Afrique francophone.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="text-sm font-semibold text-paper">Légal</p>
            <ul className="mt-3 space-y-2 text-sm text-mute">
              <li>
                <Link href="/terms" className="hover:text-paper transition-colors">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-paper transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">Aide</p>
            <ul className="mt-3 space-y-2 text-sm text-mute">
              <li>
                <a
                  href="https://wa.me/237671671359"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-paper transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Support WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-px mx-auto mt-10 max-w-6xl border-t border-ink-800 pt-6 text-xs text-mute">
        © {new Date().getFullYear()} UBriss. Tous droits réservés.
      </div>
    </footer>
  );
}
