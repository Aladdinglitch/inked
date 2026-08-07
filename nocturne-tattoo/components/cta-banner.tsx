import Link from "next/link";
import { Button } from "./ui/button";
import { FadeUp } from "./fade-up";
import { InkArt } from "./ink-art";

export function CtaBanner({
  eyebrow = "Ready when you are",
  title = "Your next piece starts with a conversation.",
  description = "Tell us what you're picturing and we'll match you with the right artist — no pressure, no obligation.",
  primaryHref = "/booking",
  primaryLabel = "Start Your Booking",
  secondaryHref = "/artists",
  secondaryLabel = "Meet the Artists",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.14]">
        <InkArt seed={77} styleSlug="ornamental" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-void" />
      <div className="container relative py-24 sm:py-32">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">{eyebrow}</p>
          <h2 className="font-display text-4xl leading-tight text-fg sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-lg text-muted">{description}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
