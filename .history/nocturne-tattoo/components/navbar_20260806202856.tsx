"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/artists", label: "Artists" },
  { href: "/styles", label: "Styles" },
  { href: "/gallery", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        scrolled
          ? "border-b border-white/10 bg-black/45 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,.45)]"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-[88px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-4 transition-all duration-300">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-white/[0.03] backdrop-blur-xl shadow-lg shadow-black/30 transition-all duration-300 group-hover:scale-105 group-hover:border-gold group-hover:shadow-[0_0_25px_rgba(212,175,55,.35)]"
          >
            <span className="font-display text-sm font-semibold tracking-widest text-gold">IA</span>
          </motion.div>

          <div className="leading-none">
            <h1 className="font-display text-xl tracking-[.2em] text-white">Inked</h1>
            <p className="text-[11px] uppercase tracking-[.45em] text-zinc-500">Attraction</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative px-1 py-2 text-sm font-medium tracking-[.18em] uppercase transition-all duration-300",
                pathname === l.href ? "text-gold" : "text-zinc-400 hover:text-white"
              )}
            >
              {l.label}
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gold transition-all duration-300",
                  pathname === l.href && "w-full"
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            asChild
            size="sm"
            className="rounded-full border border-gold/40 bg-gold px-7 text-black font-medium shadow-lg shadow-gold/20 transition-all duration-300 hover:scale-105 hover:bg-[#E5B82D] hover:shadow-[0_0_30px_rgba(212,175,55,.45)]"
          >
            <Link href="/booking">Book Your Session</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="overflow-hidden border-t border-white/10 bg-black/70 backdrop-blur-3xl shadow-2xl lg:hidden"
          >
            <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-4 py-4 text-sm uppercase tracking-[.15em] transition-all duration-300",
                    pathname === l.href
                      ? "bg-gold/10 text-gold"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {l.label}
                  {pathname === l.href && <span className="text-xs text-gold">Active</span>}
                </Link>
              ))}
              <Button asChild className="mt-3 rounded-full border border-gold/40 bg-gold px-7 text-black font-medium shadow-lg shadow-gold/20 transition-all duration-300 hover:scale-105 hover:bg-[#E5B82D] hover:shadow-[0_0_30px_rgba(212,175,55,.45)]">
                <Link href="/booking">Book Your Session</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
