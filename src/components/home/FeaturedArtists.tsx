import Link from "next/link";
import { artists } from "@/content/artists";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";

export function FeaturedArtists() {
  const featured = artists.filter((a) => a.featured).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <FadeUp className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow mb-4">The people behind the needle</p>
          <h2 className="display max-w-2xl text-5xl leading-none text-foreground md:text-6xl">Find the artist who speaks your visual language.</h2>
        </div>
        <Button asChild variant="outline" className="w-fit rounded-sm">
          <Link href="/artists">Meet the full collective</Link>
        </Button>
      </FadeUp>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((artist, i) => (
          <FadeUp key={artist.id} delay={i * 0.08}>
            <ArtistCard artist={artist} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
