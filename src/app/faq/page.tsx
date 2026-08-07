import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FadeUp } from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about booking, prep, and aftercare.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp className="mb-10">
        <p className="eyebrow mb-2">FAQ</p>
        <h1 className="display text-5xl text-foreground md:text-6xl">Questions</h1>
        <p className="mt-4 text-muted-foreground">
          Booking, preparation, pricing, and studio policies—answered upfront.
        </p>
      </FadeUp>
      <FaqAccordion />
    </div>
  );
}
