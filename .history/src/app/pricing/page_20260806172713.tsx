import type { Metadata } from "next";
import Link from "next/link";
import { pricingTiers, depositNote } from "@/content/pricing";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Session rates and deposit policy at Inked Attraction Tattoo & Piercing Studio.",
};

export function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {pricingTiers.map((tier, i) => (
        <FadeUp key={tier.id} delay={i * 0.08}>
          <article
            className={cn(
              "flex h-full flex-col rounded-3xl border p-8",
              tier.highlighted
                ? "border-primary bg-[linear-gradient(180deg,#15120e_0%,#0a0a0a_100%)]"
                : "border-border bg-card",
            )}
          >
            <h3 className="display text-2xl text-foreground">{tier.name}</h3>
            <p className="mt-2 text-2xl font-medium text-primary">{tier.price}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {tier.description}
            </p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
              {tier.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <Button asChild className="mt-8" variant={tier.highlighted ? "default" : "outline"}>
              <Link href="/booking">Book now</Link>
            </Button>
          </article>
        </FadeUp>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Pricing</p>
        <h1 className="display text-5xl text-foreground md:text-6xl">Rates & deposits</h1>
        <p className="mt-4 text-muted-foreground">{depositNote}</p>
      </FadeUp>
      <PricingCards />
    </div>
  );
}
