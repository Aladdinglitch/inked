import type { Metadata } from "next";
import { PiercingFormWrapper } from "@/components/booking/PiercingFormWrapper";
import { FadeUp } from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Piercing Booking",
  description: "Piercing booking and intake form",
};

export default function PiercingBookingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp className="mb-10">
        <p className="eyebrow mb-2">Piercing Appointment</p>
        <h1 className="display text-4xl text-foreground md:text-5xl">Piercing booking</h1>
        <p className="mt-4 text-muted-foreground">Help us understand your piercing request so we can confirm availability and advise on jewellery.</p>
      </FadeUp>
      <PiercingFormWrapper />
    </div>
  );
}
