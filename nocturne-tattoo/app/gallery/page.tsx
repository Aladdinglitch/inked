import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { GalleryGrid } from "@/components/gallery-grid";
import { gallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore Inked Attraction's portfolio of custom tattoos and body art — thoughtfully designed for longevity and style.",
};

export default function GalleryPage() {
  return (
    <section className="pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="container">
        <SectionHeading
          eyebrow="Gallery"
          title="Explore our custom work."
          description="Browse tattoos and piercings created with precision, care, and the body's natural flow in mind."
        />
        <div className="mt-14">
          <GalleryGrid pieces={gallery} />
        </div>
      </div>
    </section>
  );
}
