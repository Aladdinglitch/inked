import { FadeUp } from "@/components/motion/FadeUp";
import { SocialLinks } from "@/components/ui/social-links";

const feedCards = Array.from({ length: 6 }, (_, i) => i + 1);

export function InstagramFeed() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <FadeUp className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-4">The studio, in motion</p>
          <h2 className="display text-5xl leading-none text-foreground md:text-6xl">Behind the ink.</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Follow for flash drops, healed work, and open appointment windows.
          </p>
        </div>
        <SocialLinks />
      </FadeUp>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {feedCards.map((n) => (
          <div
            key={n}
            className="aspect-square border border-border bg-[linear-gradient(135deg,#151515,#1a1410)] transition duration-500 hover:-translate-y-1 hover:border-primary/40"
            aria-hidden="true"
          />
        ))}
      </div>
    </section>
  );
}
