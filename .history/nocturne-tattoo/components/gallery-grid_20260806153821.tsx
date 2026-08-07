"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Search } from "lucide-react";
import { GalleryPiece, artists, styles } from "@/lib/data";
import { InkArt } from "./ink-art";
import { Lightbox } from "./lightbox";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;
const FAVORITES_KEY = "inkedattraction:favorites";

const aspectClass: Record<GalleryPiece["aspect"], string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  tall: "aspect-[3/5]",
  wide: "aspect-[4/3]",
};

export function GalleryGrid({ pieces }: { pieces: GalleryPiece[] }) {
  const [activeStyle, setActiveStyle] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(new Set(JSON.parse(stored)));
    } catch {
      // ignore malformed storage
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // storage may be unavailable — favorites still work for this session
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    return pieces.filter((p) => {
      const artist = artists.find((a) => a.slug === p.artistSlug);
      const matchesStyle = activeStyle === "all" || p.styleSlug === activeStyle;
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        artist?.name.toLowerCase().includes(query.toLowerCase());
      const matchesFavorites = !showFavoritesOnly || favorites.has(p.id);
      return matchesStyle && matchesQuery && matchesFavorites;
    });
  }, [pieces, activeStyle, query, showFavoritesOnly, favorites]);

  useEffect(() => setVisibleCount(PAGE_SIZE), [activeStyle, query, showFavoritesOnly]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadingMore(true);
          window.setTimeout(() => {
            setVisibleCount((c) => c + PAGE_SIZE);
            setLoadingMore(false);
          }, 400);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative max-w-sm">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or artist"
            className="pl-11"
            aria-label="Search gallery"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterPill active={activeStyle === "all"} onClick={() => setActiveStyle("all")}>
            All Work
          </FilterPill>
          {styles.map((s) => (
            <FilterPill key={s.slug} active={activeStyle === s.slug} onClick={() => setActiveStyle(s.slug)}>
              {s.name}
            </FilterPill>
          ))}
          <FilterPill active={showFavoritesOnly} onClick={() => setShowFavoritesOnly((v) => !v)}>
            <Heart size={12} className="mr-1 inline" fill={showFavoritesOnly ? "currentColor" : "none"} />
            Favorites
          </FilterPill>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-16 rounded-xl2 border border-dashed border-border py-20 text-center">
          <p className="font-display text-xl text-fg">No pieces match yet.</p>
          <p className="mt-2 text-sm text-muted">Try a different style filter or search term.</p>
        </div>
      ) : (
        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visible.map((piece, i) => {
            const artist = artists.find((a) => a.slug === piece.artistSlug);
            const globalIndex = filtered.findIndex((p) => p.id === piece.id);
            return (
              <button
                key={piece.id}
                onClick={() => setLightboxIndex(globalIndex)}
                className={cn(
                  "group relative mb-5 block w-full overflow-hidden rounded-xl2 border border-border text-left",
                  aspectClass[piece.aspect]
                )}
              >
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                  {piece.image ? (
                    <img
                      src={piece.image}
                      alt={piece.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <InkArt seed={piece.seed} styleSlug={piece.styleSlug} className="h-full w-full" title={piece.title} />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/0 to-void/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-base text-fg">{piece.title}</p>
                  <p className="text-xs text-gold">{artist?.name}</p>
                </div>
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(piece.id);
                  }}
                  className={cn(
                    "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-void/60 text-fg backdrop-blur-sm transition-colors",
                    favorites.has(piece.id) && "text-oxblood-bright"
                  )}
                >
                  <Heart size={14} fill={favorites.has(piece.id) ? "currentColor" : "none"} />
                </span>
              </button>
            );
          })}
        </div>
      )}

      {hasMore && (
        <div ref={sentinelRef} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loadingMore &&
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] w-full" />)}
        </div>
      )}

      <Lightbox
        pieces={filtered}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors",
        active
          ? "border-gold bg-gold text-void"
          : "border-border text-muted hover:border-gold/50 hover:text-fg"
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
