"use client";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/artists", label: "Artists" },
  { href: "/gallery", label: "Portfolio" },
  { href: "/booking", label: "Booking" },
];

export default function Nav() {
  const shouldReduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Properly cleaned-up scroll listener
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const bgOpacity = useTransform(scrollY, [0, 200], [0.8, 0.98]);

  return (
    <>
      <motion.header
        initial={shouldReduce ? undefined : { opacity: 0, y: -12 }}
        animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
        transition={shouldReduce ? undefined : { type: "spring", stiffness: 120, damping: 14 }}
        className="sticky top-4 z-40 mx-auto w-[92%] lg:w-[96%] rounded-xl border border-border/50 backdrop-blur-md shadow-sm"
      >
        <motion.div
          className="absolute inset-0 rounded-xl bg-white"
          style={{ opacity: bgOpacity }}
          initial={false}
        />

        <div className="relative container flex items-center justify-between gap-6 py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="font-display text-xl font-light tracking-widest text-ink">
              INKED
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Right Side: CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <MagneticButton href="/booking">Book Now</MagneticButton>

            {/* Mobile hamburger — visible only on < lg */}
            <button
              id="mobile-nav-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden relative flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-white/80 text-ink transition-colors hover:bg-cream"
            >
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
              <motion.span
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[5px]"
                aria-hidden="true"
              >
                <motion.span
                  className="block h-[1.5px] w-5 rounded bg-ink origin-center"
                  animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block h-[1.5px] w-5 rounded bg-ink"
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[1.5px] w-5 rounded bg-ink origin-center"
                  animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-ink/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.nav
              key="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 right-0 top-20 z-30 mx-auto w-[92%] rounded-xl border border-border/50 bg-white/95 backdrop-blur-md shadow-xl lg:hidden"
            >
              <ul className="flex flex-col p-4 gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between rounded-lg px-5 py-3.5 text-base font-light text-ink transition-colors hover:bg-cream hover:text-gold"
                    >
                      <span>{link.label}</span>
                      <span className="text-muted transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </motion.li>
                ))}
                {/* Mobile CTA */}
                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2 pt-2 border-t border-border"
                >
                  <Link
                    href="/booking"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3.5 text-sm font-medium text-white hover:bg-ink/90 transition-colors"
                  >
                    Book a Consultation →
                  </Link>
                </motion.li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <motion.div
        className="group relative overflow-hidden rounded-lg px-4 py-2"
        whileHover={{
          backgroundColor: "rgba(0, 0, 0, 0.02)",
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="relative text-sm font-light text-ink group-hover:text-gold transition-colors">
          {label}
        </span>
        <motion.div
          className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gold"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </Link>
  );
}
