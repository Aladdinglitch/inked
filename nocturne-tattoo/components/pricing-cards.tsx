import Link from "next/link";
import { Check } from "lucide-react";
import { PricingTier } from "@/lib/data";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { FadeUp } from "./fade-up";

export function PricingCards({ tiers }: { tiers: PricingTier[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {tiers.map((tier, i) => (
        <FadeUp key={tier.name} delay={i * 0.08}>
          <Card
            className={cn(
              "flex h-full flex-col p-7",
              tier.highlight && "border-gold/60 bg-gradient-to-b from-gold/10 to-surface"
            )}
          >
            {tier.highlight && (
              <span className="mb-4 inline-block w-fit rounded-full bg-gold px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-void">
                Most Booked
              </span>
            )}
            <h3 className="font-display text-xl text-fg">{tier.name}</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-3xl text-gold">{tier.price}</span>
              <span className="text-xs text-muted">{tier.unit}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{tier.description}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-fg/80">
                  <Check size={14} className="mt-1 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild variant={tier.highlight ? "primary" : "outline"} className="mt-8">
              <Link href="/booking">Book This Tier</Link>
            </Button>
          </Card>
        </FadeUp>
      ))}
    </div>
  );
}
