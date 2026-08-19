"use client";

import { Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function TestimonialsWall() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
        <div>
          <p className="eyebrow">Client experience</p>
          <h2 className="display mt-3 text-4xl leading-none text-foreground sm:text-5xl">The feeling matters as much as the finish.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={testimonial.name}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="relative flex min-h-60 flex-col rounded-2xl border border-white/10 bg-surface p-6"
            >
              <Quote aria-hidden="true" className="size-5 text-primary" />
              <p className="mt-5 text-sm leading-6 text-foreground-secondary">“{testimonial.quote}”</p>
              <footer className="mt-auto pt-6 text-xs font-semibold tracking-wide text-foreground">{testimonial.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
