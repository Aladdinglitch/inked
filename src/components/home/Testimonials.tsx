"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { testimonials } from "@/content/testimonials";
import { FadeUp } from "@/components/motion/FadeUp";

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: true });

  return (
    <section className="border-y border-border bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <FadeUp className="mb-12 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow mb-4">Client notes</p>
            <h2 className="display text-5xl leading-none text-foreground md:text-6xl">
              Trust is in
              <br />
              the details.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            A thoughtful tattoo is a collaboration from the first reference to
            the final aftercare check-in.
          </p>
        </FadeUp>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {testimonials.map((t, index) => (
              <motion.article
                key={t.id}
                className="min-w-[85%] shrink-0 border border-border bg-card p-7 md:min-w-[45%] lg:min-w-[32%] rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(212, 175, 55, 0.1)",
                }}
              >
                <motion.div
                  className="mb-4 flex gap-1 text-primary"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Star className="size-4 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>
                <motion.p
                  className="leading-relaxed text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  &ldquo;{t.body}&rdquo;
                </motion.p>
                <motion.p
                  className="mt-4 text-sm font-medium text-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {t.name}
                </motion.p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
