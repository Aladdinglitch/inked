import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBanner } from "@/components/cta-banner";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about booking, pricing, healing, and studio policy at Inked Attraction.",
};

export default function FaqPage() {
  return (
    <>
      <section className="pt-40 pb-16 sm:pt-48">
        <div className="container max-w-2xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions we hear most."
            description="If your question isn't below, the contact page reaches our front desk directly."
          />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container max-w-2xl">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CtaBanner
        eyebrow="Still unsure?"
        title="Ask us before you book."
        description="No question is too small — a quick message now saves confusion later."
        primaryHref="/contact"
        primaryLabel="Contact the Studio"
        secondaryHref="/booking"
        secondaryLabel="Start Booking"
      />
    </>
  );
}
