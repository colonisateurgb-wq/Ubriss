"use client";

import { useState } from "react";
import { Plus, Instagram, Facebook, Music2 } from "lucide-react";
import { MOCK_POSTS } from "@/data/mock-posts";
import { ScheduledPost, Platform } from "@/types";
import { Button } from "@/components/ui/button";
import { ScheduleModal } from "@/components/dashboard/schedule-modal";
import { cn } from "@/lib/utils";

const PLATFORM_ICON: Record<Platform, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music2,
};

const STATUS_STYLES: Record<ScheduledPost["status"], string> = {
  planifie: "bg-signal-soft text-signal",
  publie: "bg-pulse-soft text-pulse",
  brouillon: "bg-ink-800 text-mute",
};

const STATUS_LABEL: Record<ScheduledPost["status"], string> = {
  planifie: "Planifié",
  publie: "Publié",
  brouillon: "Brouillon",
};

export default function SchedulerPage() {
  const [posts, setPosts] = useState<ScheduledPost[]>(MOCK_POSTS);
  const [modalOpen, setModalOpen] = useState(false);

  function handleCreate(newPost: Omit<ScheduledPost, "id" | "status">) {
    setPosts((prev) => [
      { ...newPost, id: `post_${Date.now()}`, status: "planifie" },
      ...prev,
    ]);
    setModalOpen(false);
  }

  const sorted = [...posts].sort(
    (a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
  );

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Planificateur</h1>
          <p className="mt-1.5 text-mute">Tes publications à venir, toutes plateformes confondues.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="sm">
          <Plus className="h-4 w-4" />
          Programmer
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        {sorted.length === 0 && (
          <div className="rounded-xl2 border border-dashed border-ink-700 p-10 text-center text-mute">
            Aucune publication programmée pour l&apos;instant.
          </div>
        )}

        {sorted.map((post) => {
          const date = new Date(post.scheduledFor);
          return (
            <div
              key={post.id}
              className="flex items-start gap-4 rounded-xl2 border border-ink-700 bg-ink-900/40 p-5"
            >
              <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-ink-800 py-2 text-center">
                <span className="text-xs text-mute">
                  {date.toLocaleDateString("fr-FR", { month: "short" })}
                </span>
                <span className="text-lg font-bold leading-tight">
                  {date.toLocaleDateString("fr-FR", { day: "2-digit" })}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px]">{post.caption}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_STYLES[post.status])}>
                    {STATUS_LABEL[post.status]}
                  </span>
                  <span className="text-xs text-mute">
                    {date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <div className="flex gap-1.5">
                    {post.platforms.map((p) => {
                      const Icon = PLATFORM_ICON[p];
                      return (
                        <span key={p} className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-800 text-mute">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <ScheduleModal onClose={() => setModalOpen(false)} onCreate={handleCreate} />
      )}
    </div>
  );
}
