import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book a Session",
  description: "Book your tattoo or piercing appointment with Inked Attraction — share your vision, preferred placement, and style.",
};

export default function BookingPage() {
  return (
    <section className="pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="container max-w-3xl">
        <SectionHeading
          eyebrow="Booking"
          title="Book your tattoo or piercing appointment."
          description="Complete the request form and let us know your idea, placement, and availability. We'll follow up with deposit details and next steps."
        />
        <div className="mt-14 rounded-xl2 border border-border bg-surface p-6 sm:p-10">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
