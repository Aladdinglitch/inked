import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SocialLinks } from "./social-links";

const columns = [
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/artists", label: "Artist" },
      { href: "/styles", label: "Tattoo Styles" },
      { href: "/blog", label: "Journal" },
    ],
  },
  {
    title: "Visit",
    links: [
      { href: "/booking", label: "Book a Session" },
      { href: "/pricing", label: "Pricing" },
      { href: "/gallery", label: "Portfolio" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-void">
      <div className="container grid grid-cols-1 gap-12 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 font-display text-base text-gold">
              IA
            </span>
            <span className="font-display text-lg text-fg">
              Inked <span className="text-gold">Attraction</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Transform your ideas into timeless tattoos and professional piercings, crafted with creativity, precision, and uncompromising care.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">{col.title}</p>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold">Contact</p>
          <ul className="mt-5 space-y-4 text-sm text-muted">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>Lagos, Lagos State, Nigeria</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>+234 813 038-1326</span>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>Studio@InkedAttraction.com</span>
            </li>
            <li className="flex gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>Mon–Sat 10am–10pm · Sun 2pm–9pm</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="container flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Inked Attraction. All rights reserved.</p>
          <p>18+ clients only. Appointments are by consultation.</p>
        </div>
      </div>
    </footer>
  );
}
