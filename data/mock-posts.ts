import { ScheduledPost } from "@/types";

export const MOCK_POSTS: ScheduledPost[] = [
  {
    id: "post_1",
    caption: "Ce plat coûte 500 FCFA à préparer et se vend à 3000. Voici comment 👇",
    platforms: ["tiktok", "instagram"],
    scheduledFor: "2026-09-09T19:00:00.000Z",
    status: "planifie",
    mediaPlaceholder: "video",
  },
  {
    id: "post_2",
    caption: "3 erreurs que tout le monde fait en négociant un salaire.",
    platforms: ["facebook"],
    scheduledFor: "2026-09-11T12:30:00.000Z",
    status: "brouillon",
    mediaPlaceholder: "image",
  },
];
