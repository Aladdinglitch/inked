import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FounderArtistPage } from "@/components/founder-artist-page";
import { artists } from "@/lib/data";

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const artist = artists.find((artist) => artist.slug === params.slug);
  if (!artist) return {};

  return {
    title: `${artist.name} | Inked Attraction`,
    description: "Meet Elizabeth Adedayo Towobola, owner, founder, and lead artist of Inked Attraction Tattoo & Piercing Studio in Lagos.",
  };
}

export default function ArtistProfilePage({ params }: { params: { slug: string } }) {
  if (!artists.some((artist) => artist.slug === params.slug)) notFound();
  return <FounderArtistPage />;
}
