import type { Metadata } from "next";
import { BookingFormWrapper } from "@/components/booking/BookingFormWrapper";
import { FadeUp } from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Booking",
  description: "Book a consultation with Inked Attraction Tattoo & Piercing Studio in Lagos.",
};

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp className="mb-10">
        <p className="eyebrow mb-2">Booking</p>
        <h1 className="display text-5xl text-foreground md:text-6xl">Request a session</h1>
        <p className="mt-4 text-muted-foreground">
          Share your idea, placement, and budget. We&apos;ll confirm availability, pricing, and deposit details within two business days.
        </p>
      </FadeUp>
      <BookingFormWrapper />
    </div>
  );
}
