import Link from "next/link";
import { portfolioItems } from "@/content/portfolio";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";

export function RecentPortfolio() {
  const recent = portfolioItems.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <FadeUp className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-4">Selected work</p>
          <h2 className="display text-5xl leading-none text-foreground md:text-6xl">Made to be<br />remembered.</h2>
        </div>
        <Button asChild variant="outline" className="rounded-sm">
          <Link href="/portfolio">View the complete archive</Link>
        </Button>
      </FadeUp>
      <GalleryGrid items={recent} />
    </section>
  );
}
