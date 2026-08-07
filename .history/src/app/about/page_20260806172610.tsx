import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { FadeUp } from "@/components/motion/FadeUp";
import { SocialLinks } from "@/components/ui/social-links";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Ink Attraction studio.",
};

const timeline = [
  { year: "2024", text: "Inked Attraction Tattoo & Piercing Studio opened with a focus on custom tattoos, precision piercings, and thoughtful consultation." },
  { year: "2025", text: "Elizabeth Adedayo Towobola expanded the studio's approach to include refined fine-line design, cover-ups, and client-led custom work." },
  { year: "2026", text: "Inked Attraction continues as a calm, appointment-first studio rooted in craftsmanship and care." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <FadeUp>
          <p className="eyebrow mb-2">About</p>
          <h1 className="display text-5xl text-foreground md:text-6xl">A premium tattoo studio with quiet confidence</h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Inked Attraction Tattoo & Piercing Studio is a luxury appointment studio for custom tattoos, precision piercings, and calm consultation experiences.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Elizabeth Adedayo Towobola leads each experience with careful design planning, clean studio practice, and an emphasis on meaningful custom work.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every session is treated as a collaboration, with thoughtful planning, honest expectations, and a focus on how the work will heal and age.
          </p>
          <div className="mt-8">
            <SocialLinks />
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
            <Image src="/images/about.svg" alt="Studio interior" fill className="object-cover" />
          </div>
        </FadeUp>
      </div>

      <section className="mt-20">
        <h2 className="display mb-10 text-3xl text-foreground">Timeline</h2>
        <div className="space-y-6 border-l border-border pl-6">
          {timeline.map((item) => (
            <div key={item.year}>
              <p className="text-sm text-primary">{item.year}</p>
              <p className="mt-1 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-border bg-card p-8">
        <h2 className="display text-2xl text-foreground">Studio hours</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {SITE.hours.map((h) => (
            <li key={h.day} className="flex justify-between gap-4">
              <span>{h.day}</span>
              <span>{h.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
