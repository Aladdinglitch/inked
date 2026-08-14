import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Artist, styles } from "@/lib/data";
import { InkArt } from "./ink-art";
import { Badge } from "./ui/badge";

export function ArtistCard({ artist, index = 0 }: { artist: Artist; index?: number }) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className="group block overflow-hidden rounded-xl2 border border-border bg-surface transition-colors duration-300 hover:border-gold/50"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
          {artist.image ? (
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover"
            />
          ) : (
            <InkArt
              seed={index * 13 + 5}
              styleSlug={artist.styleSlugs[0]}
              className="h-full w-full"
              title={artist.name}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-void/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </div>
        {!artist.booksOpen && (
          <div className="absolute left-4 top-4">
            <Badge className="border-oxblood/40 bg-oxblood/30 text-foreground-secondary">Books Closed</Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-fg">{artist.name}</h3>
        <p className="mt-1 text-sm text-gold">{artist.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{artist.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {artist.styleSlugs.map((s) => (
            <span key={s} className="text-[11px] font-mono uppercase tracking-wide text-muted">
              {styles.find((st) => st.slug === s)?.name}
              {s !== artist.styleSlugs[artist.styleSlugs.length - 1] && " ·"}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
