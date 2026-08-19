"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const features = [
  { title: "Custom tattoo design", description: "One-of-one concepts composed around your story, anatomy, and long-term wear.", image: "/images/folio-1.svg" },
  { title: "Precision piercing", description: "Considered placement, curated jewellery, and clear aftercare from consultation onward.", image: "/images/folio-2.svg" },
  { title: "Thoughtful aftercare", description: "A reassuring studio experience with practical guidance for healing with confidence.", image: "/images/folio-3.svg" },
];

export default function FeatureSpotlight() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">The studio standard</p>
          <h2 className="display mt-3 max-w-xl text-4xl leading-none text-foreground sm:text-5xl">Intentional from first idea to healed art.</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-foreground-muted">Every service is paced around comfort, clarity, and work you will be proud to carry.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className="group relative min-h-[23rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface"
          >
            <Image src={feature.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-35 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/75 to-[#090a0d]/15" />
            <div className="relative flex h-full min-h-[23rem] flex-col justify-end p-6">
              <ArrowUpRight className="mb-auto size-5 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              <h3 className="display text-3xl text-foreground">{feature.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-foreground-secondary">{feature.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
