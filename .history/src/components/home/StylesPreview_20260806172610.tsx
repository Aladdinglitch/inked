"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { styles } from "@/content/styles";
import { FadeUp } from "@/components/motion/FadeUp";

export function StylesPreview() {
  return (
    <section className="overflow-hidden border-y border-border bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <FadeUp className="mb-12 grid gap-6 md:grid-cols-[.75fr_1.25fr] md:items-end">
          <div>
            <p className="eyebrow mb-4">Craft and specialism</p>
            <h2 className="display text-5xl leading-none text-foreground md:text-6xl">
              Every style, handled with care.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground md:justify-self-end md:text-base">
            From custom tattoos and fine-line detail to cover-ups and piercing work,
            we shape every service around your story and the experience you want to have.
          </p>
        </FadeUp>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {styles.map((style, i) => (
            <FadeUp key={style.id} delay={i * 0.06}>
              <Link href="/styles">
                <motion.div
                  className="group relative block overflow-hidden rounded-3xl border border-border bg-black/40"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(212, 175, 55, 0.15)",
                    borderColor: "hsl(var(--primary))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={style.image}
                        alt={style.name}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                      whileHover={{ opacity: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-5"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3
                      className="display text-2xl text-foreground"
                      whileHover={{ color: "hsl(var(--primary))" }}
                      transition={{ duration: 0.2 }}
                    >
                      {style.name}
                    </motion.h3>
                    <motion.p
                      className="mt-1 text-sm text-muted-foreground"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {style.summary}
                    </motion.p>

                    <motion.div
                      className="mt-3 h-0.5 w-8 bg-primary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </motion.div>

                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-xs uppercase tracking-widest text-primary font-medium">
                      Explore
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
