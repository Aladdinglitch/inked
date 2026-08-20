import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeUp } from "@/components/fade-up";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { InkArt } from "@/components/ink-art";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Inked Attraction — Lagos tattoo and piercing studio with custom booking and support.",
};

const details = [
  { icon: MapPin, label: "Location", value: "Lagos, Lagos State, Nigeria" },
  { icon: Phone, label: "Phone", value: "+234 813 038-1326" },
  { icon: Mail, label: "Email", value: "khalilhayfa5@gmail.com" },
  { icon: Clock, label: "Hours", value: "By appointment — confirm availability during booking." },
];

export default function ContactPage() {
  return (
    <section className="pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Reach out to book your tattoo or piercing."
          description="For a detailed booking request, use the Booking page. This form is best for general questions, pricing, or studio availability."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
          <FadeUp>
            <div className="overflow-hidden rounded-xl2 border border-border">
              <div className="aspect-[16/10]">
                <InkArt seed={301} styleSlug="geometric" className="h-full w-full" title="Studio location" />
              </div>
            </div>
            <dl className="mt-8 space-y-5">
              {details.map((d) => (
                <div key={d.label} className="flex gap-4">
                  <d.icon size={18} className="mt-0.5 shrink-0 text-gold" />
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-foreground-muted">{d.label}</dt>
                    <dd className="mt-1 text-sm text-foreground">
                      {d.label === "Phone" ? <a href="tel:+2348130381326" className="hover:text-gold">{d.value}</a> : d.label === "Email" ? <a href="mailto:khalilhayfa5@gmail.com" className="hover:text-gold">{d.value}</a> : d.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-muted">TODO(confirm-with-studio): Confirm Inked Attraction&apos;s complete public street address before publishing a map or street-level location.</p>
            <SocialLinks className="mt-8" />
          </FadeUp>

          <FadeUp delay={0.1} className="rounded-xl2 border border-border bg-surface p-8 sm:p-10">
            <ContactForm />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
