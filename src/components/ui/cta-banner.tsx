"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaBannerProps = {
  title: string;
  subtitle?: string;
  href?: string;
  label?: string;
  className?: string;
};

export function CtaBanner({
  title,
  subtitle,
  href = "/booking",
  label = "Start booking",
  className,
}: CtaBannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-border bg-[radial-gradient(circle_at_78%_10%,rgba(201,162,39,.18),transparent_18rem),linear-gradient(135deg,#120f0c_0%,#070707_55%,#1a0f12_100%)]",
        className,
      )}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute -top-1/2 -right-1/4 h-full w-full rounded-full bg-primary/5 blur-3xl" />
      </motion.div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-7 px-4 py-20 md:flex-row md:items-center md:justify-between md:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            A considered first step
          </motion.p>
          <motion.h2
            className="display max-w-2xl text-4xl leading-none text-foreground md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {title}
          </motion.h2>
          {subtitle ? (
            <motion.p
              className="mt-5 max-w-xl leading-7 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {subtitle}
            </motion.p>
          ) : null}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button asChild size="lg" className="rounded-sm px-7">
              <Link href={href}>{label}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
