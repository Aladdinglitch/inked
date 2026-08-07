import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { PricingCards } from "@/components/pricing-cards";
import { FadeUp } from "@/components/fade-up";
import { CtaBanner } from "@/components/cta-banner";
import { pricingTiers, pricingPolicies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Inked Attraction pricing for tattoos and piercings, including small pieces, medium composition work, and custom sessions.",
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-40 pb-16 sm:pt-48">
        <div className="container">
          <SectionHeading
            eyebrow="Pricing"
            title="Clear pricing for custom tattoos and piercings."
            description="These starting points help you plan your piece. Final pricing is confirmed after consultation, once size, detail, and placement are set."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <PricingCards tiers={pricingTiers} />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container max-w-2xl">
          <FadeUp className="rounded-xl2 border border-border bg-surface p-8 sm:p-10">
            <h3 className="font-display text-xl text-fg">Policies worth knowing</h3>
            <ul className="mt-6 space-y-4">
              {pricingPolicies.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      <CtaBanner
        title="Get a firm quote in one conversation."
        description="Bring your reference images and we'll walk you through sizing, session count, and total cost before you commit."
      />
    </>
  );
}
