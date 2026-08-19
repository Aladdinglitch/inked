"use client";

import Image from "next/image";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { ease } from "@/lib/motion";

type FeatureItem = {
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
  backgroundImage: string;
  accent: string;
};

const features: FeatureItem[] = [
  {
    eyebrow: "01 / Consultation",
    title: "Custom Design Consultation",
    description: "A considered start — shaping your idea around your story, placement, and the way you want it to live on the body.",
    icon: "✦",
    backgroundImage: "/images/Sportlight/consultation.jpg",
    accent: "from-gold/45 via-gold/10 to-transparent",
  },
  {
    eyebrow: "02 / Craft",
    title: "Precision Execution",
    description: "Clean lines, calm pacing, and meticulous technique from the first mark to the finished piece.",
    icon: "◆",
    backgroundImage: "/images/Sportlight/Precision.jpg",
    accent: "from-gold/35 via-gold/10 to-transparent",
  },
  {
    eyebrow: "03 / Care",
    title: "Aftercare Excellence",
    description: "Thoughtful guidance and clear aftercare so your work settles beautifully and lasts with intention.",
    icon: "●",
    backgroundImage: "/images/Sportlight/Aftercare.jpg",
    accent: "from-gold/25 via-gold/10 to-transparent",
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.spring },
  },
};

export default function FeatureSpotlight() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-28 lg:py-40" aria-labelledby="philosophy-heading">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-void via-void to-void/95" />
      <div className="pointer-events-none absolute -left-48 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-20 mix-blend-overlay" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20"
        >
          <motion.div variants={cardVariants}>
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs">
              <span className="h-px w-8 bg-gold" /> Our philosophy
            </p>
            <h2 id="philosophy-heading" className="mt-6 max-w-xl font-display text-5xl leading-[0.92] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
              Thoughtfully <span className="italic text-gold">crafted.</span>
            </h2>
          </motion.div>

          <motion.p variants={cardVariants} className="max-w-xl text-base leading-relaxed text-foreground-secondary sm:text-lg">
            Every tattoo and piercing is an investment in your story. We bring artistic precision, meticulous execution, and an unwavering commitment to the details that make the work yours.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} shouldReduce={shouldReduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  shouldReduce,
}: {
  feature: FeatureItem;
  index: number;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={shouldReduce ? undefined : { y: -8 }}
      transition={{ duration: 0.45, ease: ease.spring }}
      className={`group relative min-h-[28rem] overflow-hidden rounded-2xl border border-gold/20 bg-ink shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition-[border-color,box-shadow] duration-500 hover:border-gold/45 hover:shadow-[0_28px_90px_rgba(0,0,0,0.34)] ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
    >
      <Image
        src={feature.backgroundImage}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover opacity-45 grayscale-[15%] transition duration-1000 ease-out group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,0.2)_0%,rgba(10,9,8,0.34)_32%,rgba(10,9,8,0.96)_100%)]" />
      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${feature.accent} opacity-50 transition-opacity duration-500 group-hover:opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(212,175,87,0.18),transparent_28%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full min-h-[28rem] flex-col justify-between p-6 sm:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/20 font-display text-lg text-gold backdrop-blur-md transition duration-500 group-hover:border-gold/70 group-hover:bg-gold group-hover:text-void">
            {feature.icon}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">{feature.eyebrow}</span>
        </div>

        <div>
          <div className="mb-5 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
          <h3 className="max-w-[14ch] font-display text-3xl leading-[0.96] tracking-[-0.025em] text-foreground transition-colors duration-500 group-hover:text-gold sm:text-4xl">
            {feature.title}
          </h3>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground-secondary transition-colors duration-500 group-hover:text-foreground">
            {feature.description}
          </p>
          <div className="mt-7 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground-muted transition-colors duration-500 group-hover:text-gold">
            <span>Inked Attraction</span>
            <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
