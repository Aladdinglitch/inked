"use client";
// Use native <img> to avoid Next image optimizer issues in dev
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./redesign.module.css";

export default function HeroSplit() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 bg-gradient-to-br from-white to-[rgba(255,247,237,1)] opacity-90" />

      <div className="container grid grid-cols-1 gap-8 py-28 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm uppercase tracking-widest text-muted">Tattoo & Piercing Studio</p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-tight md:text-7xl">
            Crafted with Precision. Inspired by You.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">
            At INKED ATTRACTION, we transform your ideas, memories, and milestones into timeless tattoos and precision piercings. Every design is thoughtfully crafted with artistry, passion, and uncompromising attention to detail.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="/booking" className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">Book Your Session</a>
            <a href="/gallery" className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium">Explore Our Portfolio</a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-[420px] max-w-full rounded-3xl bg-white/80 p-6 shadow-2xl backdrop-blur">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100">
              <img src="/images/folio-6.svg" alt="Featured tattoo work" width={820} height={1025} loading="eager" className="w-full h-auto object-cover" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Featured — Lagos Studio</p>
                <p className="text-xs text-muted">Custom fine-line and precision piercing work</p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl">Inked Attraction</p>
                <p className="text-xs text-muted">Est. 2024</p>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-20 -top-10 h-40 w-40 rounded-full bg-amber-100/40 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
