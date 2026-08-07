import type { Metadata } from "next";
import { artists } from "@/content/artists";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { FadeUp } from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Artists",
  description: "Meet Elizabeth Adedayo Towobola and the studio’s custom tattoo and piercing work at Inked Attraction.",
};

export default function ArtistsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Artists</p>
        <h1 className="display text-5xl text-foreground md:text-6xl">Resident artists</h1>
        <p className="mt-4 text-muted-foreground">
          Elizabeth Adedayo Towobola leads the studio with custom tattoo design, fine-line work, and professional piercing care.
        </p>
      </FadeUp>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist, i) => (
          <FadeUp key={artist.id} delay={i * 0.06}>
            <ArtistCard artist={artist} />
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
