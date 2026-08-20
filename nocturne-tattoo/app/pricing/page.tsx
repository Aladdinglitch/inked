import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { PricingCards } from "@/components/pricing-cards";
import { FadeUp } from "@/components/fade-up";
import { CtaBanner } from "@/components/cta-banner";
import { pricingTiers, pricingPolicies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Inked Attraction pricing is available upon consultation and assessed according to the requested service, design, placement, size, complexity, and session requirements.",
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-40 pb-16 sm:pt-48">
        <div className="container">
          <SectionHeading
            eyebrow="Pricing"
            title="Pricing shaped around your request."
            description="Pricing is available upon consultation. Each booking is assessed according to the requested service, design, placement, size, complexity, and session requirements."
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
        title="Request a personalized quote."
        description="Bring your reference images and we'll discuss the service, design, placement, complexity, and session requirements during consultation."
      />
    </>
  );
}
