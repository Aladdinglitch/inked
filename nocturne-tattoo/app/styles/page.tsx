import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LucideIcon, PenTool, Feather, Flame, Sparkles, Aperture, Waves, PenLine, Shapes } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeUp } from "@/components/fade-up";
import { InkArt } from "@/components/ink-art";
import { CtaBanner } from "@/components/cta-banner";
import { styles, artists } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tattoo Styles",
  description: "Tattoo and piercing styles offered by Inked Attraction — from fine-line and custom work to black and grey detail.",
};

const iconMap: Record<string, LucideIcon> = {
  PenTool, Feather, Flame, Sparkles, Aperture, Waves, PenLine, Shapes,
};

export default function StylesPage() {
  return (
    <>
      <section className="pt-40 pb-16 sm:pt-48">
        <div className="container">
          <SectionHeading
            eyebrow="Range"
            title="Find the visual language that fits."
            description="Every style below is practiced daily by at least two residents — none are offered as a one-off favour."
          />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container space-y-6">
          {styles.map((style, i) => {
            const Icon = iconMap[style.icon];
            const relatedArtists = artists.filter((a) => a.styleSlugs.includes(style.slug));
            return (
              <FadeUp key={style.slug}>
                <div
                  id={style.slug}
                  className="grid scroll-mt-28 grid-cols-1 gap-8 rounded-xl2 border border-border bg-surface p-8 sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:items-center"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 border border-border lg:order-2">
                    {style.image ? (
                      <Image
                        src={style.image}
                        alt={style.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <InkArt seed={i * 17 + 9} styleSlug={style.slug} className="h-full w-full" title={style.name} />
                    )}
                  </div>
                  <div className="lg:order-1">
                    <Icon size={26} className="text-gold" />
                    <h2 className="mt-4 font-display text-3xl text-fg">{style.name}</h2>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{style.description}</p>
                    {relatedArtists.length > 0 && (
                      <div className="mt-6">
                        <p className="text-xs uppercase tracking-widest text-muted">Practiced by</p>
                        <div className="mt-3 flex flex-wrap gap-3">
                          {relatedArtists.map((a) => (
                            <Link
                              key={a.slug}
                              href={`/artists/${a.slug}`}
                              className="text-sm text-fg underline decoration-gold/40 underline-offset-4 hover:text-gold"
                            >
                              {a.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    <Link
                      href={`/gallery?style=${style.slug}`}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-bright"
                    >
                      View {style.name} portfolio <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      <CtaBanner
        eyebrow="Found your style?"
        title="Let's talk about your piece."
        description="Tell us the style, size, and placement you're picturing and we'll match you with the right artist."
      />
    </>
  );
}
