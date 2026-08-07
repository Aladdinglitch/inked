import { Instagram } from "lucide-react";
import { InkArt } from "./ink-art";
import { styles } from "@/lib/data";

export function InstagramFeed() {
  const tiles = Array.from({ length: 6 });
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
        {tiles.map((_, i) => (
          <a
            key={i}
            href="https://www.instagram.com/inked_attraction?igsh=ZjEybG83c290dXcz"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg"
            aria-label="View on Instagram"
          >
            <div className="h-full w-full transition-transform duration-500 group-hover:scale-110">
              <InkArt seed={i * 21 + 3} styleSlug={styles[i % styles.length].slug} className="h-full w-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-void/0 transition-colors duration-300 group-hover:bg-void/50">
              <Instagram
                size={20}
                className="text-fg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        <a href="https://www.instagram.com/inked_attraction?igsh=ZjEybG83c290dXcz" className="hover:text-gold" target="_blank" rel="noopener noreferrer">
          @inked_attraction
        </a>{" "}
        on Instagram
      </p>
    </div>
  );
}
