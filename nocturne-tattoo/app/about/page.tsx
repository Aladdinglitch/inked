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


export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-20 sm:pt-48">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <FadeUp className="overflow-hidden rounded-xl2 border border-border">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/about.jpg"
                alt="Tattoo artist holding a tattoo machine"
                fill
                className="object-cover"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Story</p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-foreground sm:text-6xl">
              Inked Attraction is built around one belief: every piece should feel personal.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-secondary">
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

      <section className="bg-surface py-24 sm:py-32">
        <div className="container max-w-2xl">
          <SectionHeading eyebrow="Since 2023" title="A considered space for personal work." />
          <p className="mt-8 text-sm leading-relaxed text-muted">
            Inked Attraction Tattoo &amp; Piercing Studio was founded in 2023 in Lagos, with a focus on personal consultation, considered design, and careful aftercare.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Come see the studio for yourself."
        description="Book a consultation and we'll walk you through the space, the process, and what to expect."
      />
    </>
  );
}
