import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFcfa(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export function generateReference(prefix = "ubr"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
