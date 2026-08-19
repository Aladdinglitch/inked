"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, CalendarDays, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function HeroSplit() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 640], [0, shouldReduceMotion ? 0 : -56]);

  return (
    <section className="relative isolate overflow-hidden border-b border-white/8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_28%,rgba(210,173,74,.15),transparent_19rem),radial-gradient(circle_at_10%_80%,rgba(155,27,48,.14),transparent_30rem),linear-gradient(135deg,#0c0e12_0%,#08090b_60%,#111013_100%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute -right-24 top-16 -z-10 size-80 rounded-full border border-primary/20 bg-primary/5 blur-3xl"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,.84fr)] lg:gap-20 lg:py-20">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="eyebrow mb-5 flex items-center gap-3"><span className="size-2 rounded-full bg-primary shadow-[0_0_18px_rgba(210,173,74,.9)]" />Lagos tattoo & piercing studio</p>
          <h1 className="display max-w-3xl text-5xl leading-[.9] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Wear your story.
            <span className="block text-primary">Make it art.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-foreground-secondary sm:text-lg">
            Bespoke tattoos and precision piercings, thoughtfully designed by Elizabeth Adedayo Towobola in a calm, client-first studio.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/booking" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Request a session <ArrowDownRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
            <Link href="/portfolio" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[.03] px-6 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/70 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Explore the work
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-foreground-muted">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" />Thoughtful, professional care</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="size-4 text-primary" />By appointment</span>
          </div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-primary/20 bg-primary/5 blur-sm" />
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface p-3 shadow-2xl shadow-black/40">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.15rem]">
              <Image src="/images/folio-6.svg" alt="Illustrated fine-line tattoo portfolio feature" fill priority sizes="(max-width: 1024px) 90vw, 42vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow text-[.63rem] text-primary">Featured work</p>
                  <p className="mt-1 font-medium text-foreground">Fine-line & custom design</p>
                </div>
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs text-foreground-secondary backdrop-blur">Inked Attraction</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
