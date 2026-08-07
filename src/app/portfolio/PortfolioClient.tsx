"use client";

import { useCallback, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { portfolioItems } from "@/content/portfolio";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import type { PortfolioItem } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const categories = ["all", "blackwork", "fine-line", "traditional", "realism", "custom", "piercings"] as const;
const PAGE_SIZE = 9;

export default function PortfolioClient() {
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(() => {
    return portfolioItems.filter((item) => {
      const matchCat = category === "all" || item.category === category;
      const matchSearch =
        !search || item.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setPage((p) => p + 1);
      setLoading(false);
    }, 400);
  }, [hasMore]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow mb-2">Portfolio</p>
        <h1 className="display text-5xl text-foreground md:text-6xl">Gallery</h1>
        <p className="mt-4 text-muted-foreground">
          Filter by style, search titles, save favorites, and open any piece in the lightbox.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={cn(
                "rounded-full border px-4 py-2 text-xs capitalize transition",
                category === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search work…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>

      <GalleryGrid items={visible} onSelect={setSelected} showFavorites />

      {loading ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full" />
          ))}
        </div>
      ) : null}

      {hasMore ? (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={loadMore}
            className="rounded-full border border-border px-6 py-3 text-sm text-foreground transition hover:border-primary hover:text-primary"
          >
            Load more
          </button>
        </div>
      ) : null}

      <GalleryLightbox item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
