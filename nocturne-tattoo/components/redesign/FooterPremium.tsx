"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/artists", label: "Artists" },
  { href: "/gallery", label: "Portfolio" },
  { href: "/booking", label: "Book" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function FooterPremium() {
  const shouldReduce = useReducedMotion();
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("loading");
    setTimeout(() => {
      setSubscribeStatus("success");
      setSubscribeEmail("");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-white to-cream overflow-hidden">
      {/* Background accent */}
      <motion.div
        className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-gold/5 blur-3xl"
        animate={shouldReduce ? undefined : {
          y: [0, 50, 0],
        }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Main Footer Content */}
      <div className="container py-20 lg:py-24 relative z-10">
        <motion.div
          className="grid grid-cols-1 gap-16 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="font-display text-2xl font-light text-ink">INKED ATTRACTION</h4>
            <p className="mt-4 text-sm text-muted leading-relaxed font-light max-w-xs">
              Precision tattooist and piercer in Lagos. Bespoke designs. Uncompromising quality.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <p className="text-sm font-medium text-ink mb-6">Explore</p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {navLinks.map((link) => (
                <FooterLink key={link.href} href={link.href} label={link.label} />
              ))}
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <p className="text-sm font-medium text-ink mb-6">Stay Updated</p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <motion.input
                aria-label="Email"
                type="email"
                placeholder="Your email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                required
                className="px-4 py-3 text-sm rounded-lg border border-border bg-white/50 backdrop-blur text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent transition-all font-light"
                whileFocus={{ boxShadow: "0 0 0 3px rgba(212, 175, 87, 0.1)" }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                type="submit"
                disabled={subscribeStatus === "loading"}
                className="px-4 py-3 text-sm font-medium rounded-lg bg-ink text-white relative overflow-hidden"
                whileHover={shouldReduce ? undefined : { scale: 1.05 }}
                whileTap={shouldReduce ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative block">
                  {subscribeStatus === "loading" && "..."}
                  {subscribeStatus === "success" && "✓ Subscribed"}
                  {subscribeStatus !== "loading" && subscribeStatus !== "success" && "Subscribe"}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-border" />

      {/* Bottom Footer */}
      <motion.div
        className="container py-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted font-light">
          <p>© 2024 Inked Attraction. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-ink transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-ink transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-ink transition-colors">LinkedIn</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <motion.div
        className="group relative inline-block"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm text-muted group-hover:text-ink font-light transition-colors">
          {label}
        </span>
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-gold"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </Link>
  );
}
