"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { InkArt } from "./ink-art";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-void">
      <div className="absolute inset-0 opacity-30">
        <InkArt seed={4} styleSlug="japanese" className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_#0a0908_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40 mix-blend-overlay" />

      <div className="container relative z-10 pt-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 font-mono text-xs uppercase tracking-widest text-gold"
        >
          Private-Studio Tattoo House &mdash; Est. 2015
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-6xl leading-[1.02] text-fg sm:text-7xl lg:text-8xl"
        >
          Ink that&apos;s built to <span className="italic text-gold">outlast</span> the trend.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-lg text-lg leading-relaxed text-muted"
        >
          Six resident artists, one shared standard: custom design, unhurried sessions, and work
          that still reads clean twenty years in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button asChild size="lg">
            <Link href="/booking">
              Book a Session <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/gallery">View Portfolio</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
