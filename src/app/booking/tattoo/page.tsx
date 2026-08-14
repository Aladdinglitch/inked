import type { Metadata } from "next";
import { BookingFormWrapper } from "@/components/booking/BookingFormWrapper";
import { FadeUp } from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Tattoo Booking",
  description: "Tattoo booking and intake form",
};

export default function TattooBookingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp className="mb-10">
        <p className="eyebrow mb-2">Booking</p>
        <h1 className="display text-5xl text-foreground md:text-6xl">Tattoo booking</h1>
      </FadeUp>
      <BookingFormWrapper />
    </div>
  );
}
