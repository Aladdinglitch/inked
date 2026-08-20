import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/fade-up";
import { Button } from "@/components/ui/button";
import PortfolioShowcase from "@/components/redesign/PortfolioShowcase";
import { artists, styles } from "@/lib/data";

const artist = artists[0];
const specialties = artist.styleSlugs
  .map((slug) => styles.find((style) => style.slug === slug))
  .filter((style): style is (typeof styles)[number] => Boolean(style));

export function FounderArtistPage() {
  return (
    <>
      <section className="overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44">
        <div className="container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <FadeUp className="order-2 lg:order-1">
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs">
              <span className="h-px w-8 bg-gold" /> The artist behind Inked Attraction
            </p>
            <h1 className="mt-6 max-w-[11ch] font-display text-5xl leading-[0.94] tracking-[-0.045em] text-foreground sm:text-7xl">
              {artist.name}
            </h1>
            <p className="mt-6 font-display text-xl italic text-gold">{artist.role}</p>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground-secondary sm:text-lg">
              Elizabeth Adedayo Towobola is the owner, founder, and lead artist behind Inked Attraction — bringing a considered approach to custom tattoos and piercing, with an emphasis on precision, individuality, and work designed to feel personal to each client.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/booking">Start a Booking <ArrowRight size={16} /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#selected-work">Explore Selected Work</Link>
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={0.12} className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-xl overflow-hidden border border-gold/30 bg-surface p-3.5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/artist/artist1.png"
                  alt="Elizabeth Adedayo Towobola"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover transition-transform duration-1000 hover:scale-[1.025]"
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border px-1 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Founder &amp; Lead Artist</p>
                <span className="font-mono text-[10px] text-foreground-muted">Lagos</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24 sm:py-32">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">The approach</p>
            <h2 className="mt-5 max-w-sm font-display text-4xl leading-[0.98] text-fg sm:text-5xl">A considered approach to the art.</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Every piece begins with understanding the person behind it. From the first conversation to the final details, the process is built around creating work that feels intentional, personal, and made to belong to you.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Services &amp; specialties</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-[0.98] text-foreground sm:text-5xl">What Elizabeth creates.</h2>
          </FadeUp>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((specialty, index) => (
              <FadeUp key={specialty.slug} delay={index * 0.06}>
                <Link
                  href={`/styles#${specialty.slug}`}
                  className="group flex min-h-36 flex-col justify-between rounded-xl2 border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex items-end justify-between gap-4 font-display text-xl text-fg">
                    {specialty.name}
                    <ArrowUpRight size={17} className="text-gold opacity-60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24 sm:py-32">
        <div className="container grid items-end gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">The studio</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-[0.98] text-fg sm:text-5xl">The home of Inked Attraction.</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">
              Inked Attraction is a founder-led tattoo and piercing studio in Lagos, where every consultation, design, and appointment is approached with care and intention.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.28em] text-gold">Since 2023</p>
          </FadeUp>
        </div>
      </section>

      <div id="selected-work">
        <PortfolioShowcase />
      </div>

      <section className="relative overflow-hidden border-t border-border py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,87,0.14),transparent_50%)]" />
        <FadeUp className="container relative text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Ready to start your piece?</p>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight text-foreground sm:text-6xl">Tell Elizabeth what you&apos;re thinking.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground-secondary sm:text-lg">
            Tell Elizabeth what you&apos;re thinking, and start the conversation about your next tattoo or piercing.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/booking">Start a Booking <ArrowRight size={16} /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-foreground hover:text-foreground">
              <a href="https://wa.me/2348130381326?text=Hi%2C%20I%27d%20like%20to%20book%20a%20tattoo%20or%20piercing%20session%20at%20Inked%20Attraction." target="_blank" rel="noopener noreferrer">
                WhatsApp the Studio <ArrowUpRight size={16} />
              </a>
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
