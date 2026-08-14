import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Instagram } from "lucide-react";
import { artists, styles, gallery } from "@/lib/data";
import { InkArt } from "@/components/ink-art";
import { FadeUp } from "@/components/fade-up";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/cta-banner";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const artist = artists.find((a) => a.slug === params.slug);
  if (!artist) return {};
  return {
    title: artist.name,
    description: artist.longBio,
  };
}

export default function ArtistProfilePage({ params }: { params: { slug: string } }) {
  const index = artists.findIndex((a) => a.slug === params.slug);
  const artist = artists[index];
  if (!artist) notFound();

  const pieces = gallery.filter((g) => g.artistSlug === artist.slug).slice(0, 8);

  return (
    <>
      <section className="pt-40 pb-20 sm:pt-48">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <FadeUp className="overflow-hidden rounded-xl2 border border-border">
            <div className="relative aspect-[4/5]">
              {artist.image ? (
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <InkArt seed={index * 13 + 5} styleSlug={artist.styleSlugs[0]} className="h-full w-full" title={artist.name} />
              )}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">{artist.role}</p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-foreground sm:text-6xl">{artist.name}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-secondary">{artist.longBio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {artist.styleSlugs.map((s) => (
                <Badge key={s}>{styles.find((st) => st.slug === s)?.name}</Badge>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-sm text-foreground-muted">{artist.years} years tattooing</span>
              <span className="text-border">&middot;</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-gold"
              >
                <Instagram size={14} /> {artist.handle}
              </a>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              {artist.booksOpen ? (
                <Button asChild size="lg">
                  <Link href="/booking">
                    Book with {artist.name.split(" ")[0]} <ArrowRight size={16} />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" disabled>
                  Books Currently Closed
                </Button>
              )}
              <Button asChild variant="outline" size="lg">
                <Link href="/artists">All Artists</Link>
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container">
          <h2 className="font-display text-3xl text-foreground">Selected work</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {pieces.map((piece, i) => (
              <FadeUp key={piece.id} delay={i * 0.05} className="group overflow-hidden rounded-xl2 border border-border">
                <div className="relative aspect-square transition-transform duration-700 group-hover:scale-110">
                  {piece.image ? (
                    <Image
                      src={piece.image}
                      alt={piece.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  ) : (
                    <InkArt seed={piece.seed} styleSlug={piece.styleSlug} className="h-full w-full" title={piece.title} />
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={`Ready to book with ${artist.name.split(" ")[0]}?`}
        description="Tell us your idea and preferred dates — we'll confirm availability within two business days."
      />
    </>
  );
}
