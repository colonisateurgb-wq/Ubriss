import { Niche, Tone, Objective, Platform } from "@/types";

export const NICHES: { id: Niche; label: string }[] = [
  { id: "fitness", label: "Fitness" },
  { id: "mode", label: "Mode" },
  { id: "restauration", label: "Restauration" },
  { id: "tech", label: "Tech" },
  { id: "vente", label: "Vente en ligne" },
  { id: "beaute", label: "Beauté" },
  { id: "coiffure", label: "Coiffure & tresses" },
  { id: "business", label: "Business / Services" },
  { id: "immobilier", label: "Immobilier" },
  { id: "education", label: "Éducation & formation" },
  { id: "sante", label: "Santé & bien-être" },
  { id: "artisanat", label: "Artisanat & fait main" },
  { id: "agriculture", label: "Agriculture & élevage" },
  { id: "transport", label: "Transport & logistique" },
  { id: "automobile", label: "Automobile" },
  { id: "evenementiel", label: "Événementiel" },
  { id: "freelance", label: "Services digitaux & freelance" },
  { id: "musique", label: "Musique & divertissement" },
  { id: "sport", label: "Sport & coaching" },
  { id: "voyage", label: "Voyage & tourisme" },
  { id: "finance", label: "Finance & assurance" },
  { id: "ong", label: "ONG & associatif" },
  { id: "juridique", label: "Services juridiques" },
];

export const TONES: { id: Tone; label: string; description: string }[] = [
  { id: "educatif", label: "Éducatif", description: "Tu enseignes un truc utile en 30 secondes" },
  { id: "buzz", label: "Provocateur / Buzz", description: "Une opinion tranchée qui fait réagir" },
  { id: "humoristique", label: "Humoristique", description: "Tu fais sourire pour rester en tête" },
  { id: "storytelling", label: "Storytelling vendeur", description: "Une histoire courte qui mène à l'offre" },
  { id: "camfranglais", label: "Camfranglais / Street", description: "Le ton local, direct, sans filtre" },
];

export const OBJECTIVES: { id: Objective; label: string }[] = [
  { id: "abonnes", label: "Gagner des abonnés" },
  { id: "vente", label: "Vendre un produit" },
  { id: "engagement", label: "Faire réagir en commentaires" },
];

export const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "facebook", label: "Page Facebook" },
];
