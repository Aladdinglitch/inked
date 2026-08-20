import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { SocialLinks } from "./social-links";

const columns = [
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/artists", label: "Artists" },
      { href: "/styles", label: "Tattoo Styles" },
      { href: "/blog", label: "Journal" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/gallery", label: "Portfolio" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-void text-foreground">
      <div className="pointer-events-none absolute -right-48 top-0 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035] mix-blend-overlay" />

      <div className="container relative z-10 py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-white/[0.035] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:px-8 lg:px-12 lg:py-10">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,87,0.16),transparent_55%)]" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs">
                <span className="h-px w-8 bg-gold" /> Ready when you are
              </p>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[0.92] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                Make your next mark <span className="italic text-gold">matter.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-void shadow-[0_10px_30px_rgba(212,175,87,0.15)] transition duration-300 hover:-translate-y-1 hover:bg-gold-bright hover:shadow-[0_16px_40px_rgba(212,175,87,0.25)] focus-visible:outline-offset-4"
              >
                Book Your Session
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="https://wa.me/2348130381326?text=Hi%2C%20I%27d%20like%20to%20book%20a%20tattoo%20or%20piercing%20session%20at%20Inked%20Attraction."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 px-5 py-3.5 text-sm text-gold transition hover:border-gold hover:bg-gold/10 focus-visible:outline-offset-4"
              >
                WhatsApp
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-14 lg:mt-24 lg:grid-cols-[1.25fr_0.7fr_0.7fr_1.15fr] lg:gap-12">
          <div>
            <Link href="/" className="group flex w-fit items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 font-display text-base text-gold transition duration-300 group-hover:border-gold group-hover:bg-gold/10">
                IA
              </span>
              <span className="font-display text-xl tracking-wide text-foreground">
                Inked <span className="text-gold">Attraction</span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-foreground-secondary">
              Custom tattoos and precision piercings, shaped with creativity, care, and uncompromising attention to detail.
            </p>
            <SocialLinks className="mt-7" />
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={`${column.title} links`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{column.title}</p>
              <ul className="mt-6 space-y-4">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors duration-300 hover:text-foreground">
                      <span>{link.label}</span>
                      <ArrowUpRight size={12} className="-translate-x-1 translate-y-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="rounded-2xl border border-white/10 bg-black/15 p-5 backdrop-blur-lg">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Visit the studio</p>
            <ul className="mt-6 space-y-4 text-sm text-foreground-secondary">
              <li className="flex gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                <span>Lagos, Lagos State, Nigeria</span>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-gold" />
                <a href="tel:+2348130381326" className="hover:text-foreground">+234 813 038-1326</a>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="mt-0.5 shrink-0 text-gold" />
                <a href="mailto:towobolaelizabeth79@gmail.com" className="hover:text-foreground">towobolaelizabeth79@gmail.com</a>
              </li>
              <li className="flex gap-3">
                <Clock size={15} className="mt-0.5 shrink-0 text-gold" />
                <span>By appointment — confirm availability during booking.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-foreground-muted sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Inked Attraction. All rights reserved.</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em]">18+ clients only · Appointments by consultation</p>
        </div>
      </div>
    </footer>
  );
}
