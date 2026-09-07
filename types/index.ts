export type Niche =
  | "fitness"
  | "mode"
  | "restauration"
  | "tech"
  | "vente"
  | "beaute"
  | "business";

export type Tone =
  | "educatif"
  | "buzz"
  | "humoristique"
  | "storytelling"
  | "camfranglais";

export type Objective = "abonnes" | "vente" | "engagement";

export type Platform = "instagram" | "tiktok" | "facebook";

export type PlanId = "gratuit" | "createur" | "pro";

export interface Plan {
  id: PlanId;
  name: string;
  priceFcfa: number;
  period: "mois" | null;
  tagline: string;
  features: string[];
  highlighted?: boolean;
  generationsLimit: number | "illimite";
  accountsLimit: number;
}

export interface ScriptGenerationInput {
  niche: Niche;
  tone: Tone;
  objective: Objective;
}

export interface GeneratedScript {
  id: string;
  createdAt: string;
  niche: Niche;
  tone: Tone;
  objective: Objective;
  hook: {
    visual: string;
    speech: string;
  };
  body: string[];
  cta: string;
  hashtags: string[];
  bestPostingTime: string;
}

export interface ScheduledPost {
  id: string;
  caption: string;
  platforms: Platform[];
  scheduledFor: string;
  status: "planifie" | "publie" | "brouillon";
  mediaPlaceholder: "image" | "video";
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  plan: PlanId;
  trialGenerationsLeft: number;
  connectedAccounts: number;
}

export interface NotchPayInitPayload {
  amount: number;
  currency: "XAF";
  email: string;
  phone: string;
  reference: string;
  callback_url: string;
  description?: string;
}

export interface NotchPayInitResponse {
  status: string;
  message: string;
  authorization_url: string;
  reference: string;
}
