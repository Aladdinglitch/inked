"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

type GalleryGridProps = {
  items: PortfolioItem[];
  onSelect?: (item: PortfolioItem) => void;
  showFavorites?: boolean;
};

const heightMap = { sm: "aspect-[3/4]", md: "aspect-square", lg: "aspect-[4/5]" };

export function GalleryGrid({
  items,
  onSelect,
  showFavorites = false,
}: GalleryGridProps) {
  const { favorites, toggle } = useFavorites();

  return (
    <div className="masonry">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="masonry-item group relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.button
            type="button"
            onClick={() => onSelect?.(item)}
            className={cn(
              "relative w-full overflow-hidden border border-border transition-colors duration-300 hover:border-primary/40",
              heightMap[item.height],
            )}
            whileHover={{
              boxShadow: "0 20px 40px rgba(212, 175, 55, 0.15)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-black/0 transition-colors duration-300"
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            />

            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-xs uppercase tracking-widest text-white font-medium"
                initial={{ scale: 0.5 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {item.title}
              </motion.div>
            </motion.div>
          </motion.button>

          {showFavorites ? (
            <motion.button
              type="button"
              aria-label={
                favorites.has(item.id)
                  ? "Remove favorite"
                  : "Add favorite"
              }
              onClick={() => toggle(item.id)}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={
                  favorites.has(item.id) ? { scale: [1, 1.2, 1] } : {}
                }
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={cn(
                    "size-4",
                    favorites.has(item.id) &&
                      "fill-secondary text-secondary",
                  )}
                />
              </motion.div>
            </motion.button>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
