"use client";

import { useState } from "react";
import { X, ImagePlus, Video } from "lucide-react";
import { PLATFORMS } from "@/data/options";
import { Platform, ScheduledPost } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ScheduleModalProps {
  onClose: () => void;
  onCreate: (post: Omit<ScheduledPost, "id" | "status">) => void;
}

export function ScheduleModal({ onClose, onCreate }: ScheduleModalProps) {
  const [caption, setCaption] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>(["instagram"]);
  const [mediaType, setMediaType] = useState<"image" | "video">("video");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00");

  function togglePlatform(p: Platform) {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function handleSubmit() {
    if (!caption.trim() || platforms.length === 0 || !date) return;
    onCreate({
      caption: caption.trim(),
      platforms,
      mediaPlaceholder: mediaType,
      scheduledFor: new Date(`${date}T${time}:00`).toISOString(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-lg rounded-t-2xl border border-ink-700 bg-ink-900 p-6 sm:rounded-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Programmer un post</h2>
          <button onClick={onClose} className="text-mute hover:text-paper">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <label className="text-sm font-medium">Média</label>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setMediaType("video")}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1.5 rounded-lg border py-4 text-sm",
                  mediaType === "video" ? "border-signal/60 bg-signal-soft text-signal" : "border-ink-700 text-mute"
                )}
              >
                <Video className="h-5 w-5" />
                Vidéo
              </button>
              <button
                type="button"
                onClick={() => setMediaType("image")}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1.5 rounded-lg border py-4 text-sm",
                  mediaType === "image" ? "border-signal/60 bg-signal-soft text-signal" : "border-ink-700 text-mute"
                )}
              >
                <ImagePlus className="h-5 w-5" />
                Image
              </button>
            </div>
            <p className="mt-1.5 text-xs text-mute">
              L&apos;envoi de fichier réel arrive avec la connexion Supabase Storage.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Légende</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              placeholder="Écris ta légende ou colle celle du générateur..."
              className="mt-2 w-full resize-none rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm outline-none focus-visible:border-signal"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Plateformes</label>
            <div className="mt-2 flex gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePlatform(p.id)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    platforms.includes(p.id)
                      ? "bg-signal text-ink-950 font-medium"
                      : "bg-ink-800 text-mute"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm outline-none focus-visible:border-signal"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Heure</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-2 w-full rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm outline-none focus-visible:border-signal"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Programmer
          </Button>
        </div>
      </div>
    </div>
  );
}
