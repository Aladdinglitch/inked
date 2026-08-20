import type { Metadata } from "next";
import { FounderArtistPage } from "@/components/founder-artist-page";

export const metadata: Metadata = {
  title: "Elizabeth Adedayo Towobola | Inked Attraction",
  description:
    "Meet Elizabeth Adedayo Towobola, owner, founder, and lead artist of Inked Attraction Tattoo & Piercing Studio in Lagos.",
};

export default function ArtistsPage() {
  return <FounderArtistPage />;
}
