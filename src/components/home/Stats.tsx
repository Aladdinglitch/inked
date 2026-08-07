"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";

const stats = [
  { label: "Years in studio", value: 12 },
  { label: "Resident artists", value: 5 },
  { label: "Custom sessions", value: 2400, suffix: "+" },
  { label: "Average rating", value: 4.9, suffix: "/5" },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Number((value * p).toFixed(value % 1 ? 1 : 0)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        ref={ref}
        className="display text-5xl text-primary md:text-6xl inline-block"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        {count}
        {suffix}
      </motion.span>
    </motion.div>
  );
}

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="border-y border-border bg-black/20 py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 md:grid-cols-4 md:px-6">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08} className="text-center">
            <motion.div
              className="relative mb-4"
              whileInView={{
                transition: { staggerChildren: 0.05 },
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Counter value={s.value} suffix={s.suffix} />

              <motion.div
                className="absolute inset-0 rounded-full bg-primary/10 blur-xl"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(212, 175, 55, 0.4)",
                    "0 0 0 20px rgba(212, 175, 55, 0)",
                  ],
                }}
                transitionEnd={{
                  boxShadow: "0 0 0 0 rgba(212, 175, 55, 0)",
                }}
              />
            </motion.div>

            <motion.p
              className="mt-4 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {s.label}
            </motion.p>

            <motion.div
              className="mt-3 h-1 w-12 mx-auto bg-gradient-to-r from-primary to-primary/40 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ transformOrigin: "center" }}
            />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
