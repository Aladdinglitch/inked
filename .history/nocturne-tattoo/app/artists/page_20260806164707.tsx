import type { Metadata } from "next";
import { ArtistCard } from "@/components/artist-card";
import { SectionHeading } from "@/components/section-heading";
import { FadeUp } from "@/components/fade-up";
import { CtaBanner } from "@/components/cta-banner";
import { artists } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artists",
  description: "Meet the Inked Attraction artists — specialists in fine line, custom composition, and precision piercing.",
};

export default function ArtistsPage() {
  return (
    <>
      <section className="pt-40 pb-16 sm:pt-48">
        <div className="container">
          <SectionHeading
            eyebrow="The Residents"
            title="Three artists, three ways of holding a needle."
            description="Every resident books their own calendar and sets their own rate for large work, but all share the studio's approach to consultation, hygiene, and honest sizing."
          />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artists.slice(0, 3).map((artist, i) => (
            <FadeUp key={artist.slug} delay={(i % 3) * 0.08}>
              <ArtistCard artist={artist} index={i} />
            </FadeUp>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Found someone whose work speaks to you?"
        description="Start a booking request and tell us which artist you'd like — we'll take it from there."
      />
    </>
  );
}
