import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/FadeUp";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden">
      <Image
        src="/images/hero.svg"
        alt=""
        fill
        priority
        className="object-cover opacity-80"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 md:px-6 md:pb-24">
        <FadeUp>
          <p className="eyebrow mb-4">{SITE.name}</p>
          <h1 className="display max-w-4xl text-5xl leading-tight text-foreground md:text-7xl lg:text-8xl">
            Where art meets precision
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {SITE.tagline} A luxury tattoo studio for custom work, elevated piercings, and thoughtful appointments designed for lasting results.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/booking">Book appointment</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">View portfolio</Link>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
