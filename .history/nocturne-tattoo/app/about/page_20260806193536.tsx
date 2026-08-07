import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, HandHeart, Ruler, Sparkle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeUp } from "@/components/fade-up";
import { NeedleLine } from "@/components/needle-line";
import { CtaBanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Inked Attraction — a Lagos tattoo and piercing studio created to turn your ideas into lasting body art.",
};

const values = [
  {
    icon: Ruler,
    title: "Precision Design",
    text: "Every tattoo and piercing concept is drawn and refined to fit your body before a needle touches skin.",
  },
  {
    icon: ShieldCheck,
    title: "Clean, safe studio",
    text: "Professional hygiene, single-use needles, and careful aftercare support are standard on every appointment.",
  },
  {
    icon: HandHeart,
    title: "Personal collaboration",
    text: "Your vision is central — every piece is designed to reflect your story, not the studio's flash archive.",
  },
  {
    icon: Sparkle,
    title: "Attention to detail",
    text: "Fine-line work, custom composition, and piercings finished with a level of care that holds as your lifestyle changes.",
  },
];

const timeline = [
  { year: "2015", text: "Elizabeth opens Inked Attraction as a single-chair studio in Lagos, focusing on bespoke tattoos and safe piercings." },
  { year: "2018", text: "The studio adds additional resident artists and expands its custom tattoo and piercing services." },
  { year: "2021", text: "Inked Attraction moves into a private, appointment-only studio space built for calm consultations." },
  { year: "2024", text: "The team reaches six resident artists, widening the studio's offered styles and availability." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-20 sm:pt-48">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <FadeUp className="overflow-hidden rounded-xl2 border border-border">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/about.svg"
                alt="Inked Attraction studio interior"
                fill
                className="object-cover"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Story</p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-fg sm:text-6xl">
              Inked Attraction is built around one belief: every piece should feel personal.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              I&apos;m Elizabeth, the artist behind INKED ATTRACTION Tattoo & Piercing Studio in Lagos.
              I believe tattoos and piercings should be more than ink or metal — they should tell a story,
              celebrate individuality, and feel like art designed for your body. From the first consultation
              through aftercare, every step is handled with precision, professionalism, and care.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="container">
        <NeedleLine />
      </div>

      {/* Values */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <SectionHeading eyebrow="What We Hold To" title="Four things that don't flex." />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.08} className="rounded-xl2 border border-border bg-surface p-7">
                <v.icon size={22} className="text-gold" />
                <h3 className="mt-4 font-display text-lg text-fg">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — a real chronological sequence, so numbering earns its place here */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="container max-w-2xl">
          <SectionHeading eyebrow="Since 2015" title="How the studio grew." />
          <div className="mt-14 space-y-10 border-l border-border pl-8">
            {timeline.map((t, i) => (
              <FadeUp key={t.year} delay={i * 0.08} className="relative">
                <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-void text-[10px] text-gold">
                  &bull;
                </span>
                <p className="font-display text-2xl text-gold">{t.year}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Come see the studio for yourself."
        description="Book a consultation and we'll walk you through the space, the process, and what to expect."
      />
    </>
  );
}
