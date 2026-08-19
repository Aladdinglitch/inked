"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { gallery } from "@/lib/data";

export default function PortfolioShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const selectedWork = gallery.slice(0, 6);

  return (
    <section className="border-y border-white/8 bg-surface/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-3 text-4xl leading-none text-foreground sm:text-5xl">Made to be personal.</h2>
          </div>
          <Link href="/portfolio" className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            View the portfolio <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {selectedWork.map((piece, index) => (
            <motion.div
              key={piece.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
            >
              <Link href="/portfolio" className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Image src={`/images/folio-${index + 1}.svg`} alt={`${piece.title}, tattoo portfolio study`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <p className="absolute inset-x-4 bottom-4 text-sm font-medium text-foreground">{piece.title}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
