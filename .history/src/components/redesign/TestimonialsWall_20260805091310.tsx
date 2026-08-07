"use client";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function TestimonialsWall() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <div className="container">
        <h3 className="font-display text-3xl">What clients remember.</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduce ? undefined : { delay: i * 0.08 }}
              className="relative rounded-2xl border border-neutral-100 bg-white p-6 shadow-lg"
            >
              <p className="text-sm text-muted">“{t.quote}”</p>
              <footer className="mt-4 text-xs font-medium">— {t.name}</footer>
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-100/30 blur-2xl" />
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
