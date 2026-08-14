"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { GalleryPiece, artists, styles } from "@/lib/data";
import { InkArt } from "./ink-art";
import { cn } from "@/lib/utils";

export function Lightbox({
  pieces,
  activeIndex,
  onClose,
  onNavigate,
  favorites,
  onToggleFavorite,
}: {
  pieces: GalleryPiece[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}) {
  const piece = activeIndex !== null ? pieces[activeIndex] : null;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % pieces.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + pieces.length) % pieces.length);
    },
    [activeIndex, pieces.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = piece ? "hidden" : "";
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey, piece]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {piece && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-4 backdrop-blur-sm sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${piece.title} — full view`}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-foreground transition-colors hover:border-gold hover:text-gold"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex - 1 + pieces.length) % pieces.length);
            }}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-foreground transition-colors hover:border-gold hover:text-gold sm:left-6"
            aria-label="Previous piece"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex + 1) % pieces.length);
            }}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-foreground transition-colors hover:border-gold hover:text-gold sm:right-6"
            aria-label="Next piece"
          >
            <ChevronRight size={18} />
          </button>

          <motion.div
            key={piece.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl"
          >
            <div className="overflow-hidden rounded-xl2 border border-border">
              {piece.image ? (
                <Image
                  src={piece.image}
                  alt={piece.title}
                  width={1200}
                  height={1600}
                  className="max-h-[70vh] w-full object-cover"
                  priority
                />
              ) : (
                <InkArt seed={piece.seed} styleSlug={piece.styleSlug} className="max-h-[70vh] w-full" title={piece.title} />
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl text-foreground">{piece.title}</h3>
                <p className="text-sm text-foreground-secondary">
                  {artists.find((a) => a.slug === piece.artistSlug)?.name} &middot;{" "}
                  {styles.find((s) => s.slug === piece.styleSlug)?.name}
                </p>
              </div>
              <button
                onClick={() => onToggleFavorite(piece.id)}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold",
                  favorites.has(piece.id) && "border-oxblood-bright text-oxblood-bright"
                )}
                aria-pressed={favorites.has(piece.id)}
                aria-label="Toggle favorite"
              >
                <Heart size={16} fill={favorites.has(piece.id) ? "currentColor" : "none"} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
