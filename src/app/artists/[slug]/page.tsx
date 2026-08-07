import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists, getArtist } from "@/content/artists";
import { portfolioItems } from "@/content/portfolio";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return { title: "Artist" };
  return {
    title: artist.name,
    description: artist.bio,
  };
}

export default async function ArtistProfilePage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const works = portfolioItems.filter((p) => p.artistId === artist.id).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
        <FadeUp>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border">
            <Image src={artist.image} alt={artist.name} fill className="object-cover" priority />
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="eyebrow mb-2">{artist.role}</p>
          <h1 className="display text-5xl text-foreground md:text-6xl">{artist.name}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{artist.bio}</p>
          <p className="mt-4 text-sm text-muted-foreground">{artist.years} years experience</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {artist.specialties.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3 py-1 text-xs text-primary"
              >
                {s}
              </span>
            ))}
          </div>
          <Button asChild className="mt-8" size="lg">
            <Link href={`/booking?artist=${artist.id}`}>Book with {artist.name.split(" ")[0]}</Link>
          </Button>
        </FadeUp>
      </div>
      <section className="mt-20">
        <h2 className="display mb-8 text-3xl text-foreground">Selected work</h2>
        <GalleryGrid items={works} />
      </section>
    </div>
  );
}
