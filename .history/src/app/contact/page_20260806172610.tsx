import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/contact/ContactForm";
import { FadeUp } from "@/components/motion/FadeUp";
import { SocialLinks } from "@/components/ui/social-links";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Inked Attraction Tattoo & Piercing Studio in Lagos.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Contact</p>
        <h1 className="display text-5xl text-foreground md:text-6xl">Visit the studio</h1>
        <p className="mt-4 text-muted-foreground">
          Appointments are required. Walk-ins welcome on announced flash days only.
        </p>
      </FadeUp>
      <div className="grid gap-10 lg:grid-cols-2">
        <FadeUp>
          <ContactForm />
        </FadeUp>
        <FadeUp delay={0.1} className="space-y-8">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="display text-xl text-foreground">Location</h2>
            <p className="mt-3 text-sm text-muted-foreground">{SITE.address}</p>
            <p className="text-sm text-muted-foreground">{SITE.city}</p>
            <p className="mt-4 text-sm text-muted-foreground">{SITE.email}</p>
            <p className="text-sm text-muted-foreground">{SITE.phone}</p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>
          <div
            className="flex aspect-video items-center justify-center rounded-3xl border border-border bg-muted text-sm text-muted-foreground"
            aria-label="Studio location"
          >
            Studio location — {SITE.city}
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="display text-xl text-foreground">Hours</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex justify-between">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
