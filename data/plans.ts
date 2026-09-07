import { Plan } from "@/types";

export const PLANS: Plan[] = [
  {
    id: "gratuit",
    name: "Gratuit",
    priceFcfa: 0,
    period: null,
    tagline: "Pour tester le générateur avant de te lancer",
    generationsLimit: 3,
    accountsLimit: 1,
    features: [
      "3 générations de scripts pour tester",
      "1 compte social connecté",
      "Accès aux tendances locales",
    ],
  },
  {
    id: "createur",
    name: "Pass Créateur",
    priceFcfa: 3000,
    period: "mois",
    tagline: "Pour publier chaque semaine sans sécher sur les idées",
    generationsLimit: 30,
    accountsLimit: 2,
    highlighted: true,
    features: [
      "30 scripts viraux par mois",
      "Programmation sur 2 comptes",
      "Planificateur multi-plateformes",
      "Hashtags et créneaux recommandés",
    ],
  },
  {
    id: "pro",
    name: "Pass Pro / Agence",
    priceFcfa: 7500,
    period: "mois",
    tagline: "Pour les agences et créateurs qui gèrent plusieurs marques",
    generationsLimit: "illimite",
    accountsLimit: 5,
    features: [
      "Générations illimitées",
      "5 comptes connectés",
      "Support prioritaire WhatsApp",
      "Historique et export des scripts",
    ],
  },
];
