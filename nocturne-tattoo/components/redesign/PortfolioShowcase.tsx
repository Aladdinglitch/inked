"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { gallery } from "@/lib/data";
import { ease } from "@/lib/motion";

const showcaseImages = [
  "/images/fwc1.jpg",
  "/images/fwc2.jpg",
  "/images/fwc3.jpg",
  "/images/fwc4.jpg",
  "/images/fwc5.jpg",
  "/images/fwc6.jpg",
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: ease.spring },
  },
};

export default function PortfolioShowcase() {
  const shouldReduce = useReducedMotion();
  const cardDescriptions = [
    "A quiet study in line, balance, and bloom.",
    "Graphic contrast with a softer edge.",
    "Delicate detail, held with intention.",
    "Shape, shadow, and a little tension.",
    "A personal mark with room to breathe.",
    "Measured lines. Lasting presence.",
  ];
  const cards = gallery.slice(0, 6).map((piece, index) => ({
    ...piece,
    image: showcaseImages[index],
    number: String(index + 1).padStart(2, "0"),
    description: cardDescriptions[index],
  }));

  return (
    <section className="relative overflow-hidden py-28 lg:py-40" aria-labelledby="portfolio-heading">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-void via-void to-void/95" />
      <div className="pointer-events-none absolute -right-56 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-20 mix-blend-overlay" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20"
        >
          <motion.div variants={cardVariants}>
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs">
              <span className="h-px w-8 bg-gold" /> Portfolio &amp; gallery
            </p>
            <h2 id="portfolio-heading" className="mt-6 max-w-xl font-display text-5xl leading-[0.92] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
              Timeless <span className="italic text-gold">art</span> on skin.
            </h2>
          </motion.div>
          <motion.p variants={cardVariants} className="max-w-xl text-base leading-relaxed text-foreground-secondary sm:text-lg">
            A considered collection of custom tattoos and precision work. Every piece begins with conversation and ends with a mark that feels entirely its own.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-6"
        >
          {cards.map((card, index) => (
            <PortfolioCard key={card.id} card={card} index={index} shouldReduce={shouldReduce} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.65, ease: ease.spring }}
          className="mt-14 flex justify-center lg:mt-20"
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-4 rounded-full border border-gold/40 bg-gold/[0.05] px-6 py-3.5 text-sm font-medium text-gold backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-gold hover:bg-gold/[0.12] hover:shadow-[0_12px_40px_rgba(212,175,87,0.14)] focus-visible:outline-offset-4"
          >
            <span>Explore full portfolio</span>
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

type PortfolioCardData = (typeof gallery)[number] & {
  image: string;
  number: string;
  description: string;
};

function PortfolioCard({
  card,
  index,
  shouldReduce,
}: {
  card: PortfolioCardData;
  index: number;
  shouldReduce: boolean | null;
}) {
  const styleLabel = card.styleSlug.replace(/-/g, " ");
  const isLead = index === 0;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={shouldReduce ? undefined : { y: -7 }}
      transition={{ duration: 0.45, ease: ease.spring }}
      className={`group relative overflow-hidden rounded-2xl border border-gold/20 bg-ink shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition-[border-color,box-shadow] duration-500 hover:border-gold/50 hover:shadow-[0_28px_90px_rgba(0,0,0,0.34)] ${isLead ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-1"}`}
    >
      <div className={`relative ${isLead ? "aspect-[4/3] sm:aspect-[16/8]" : "aspect-[4/5]"}`}>
        <Image
          src={card.image}
          alt={`${card.title}, portfolio work`}
          fill
          sizes={isLead ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
          className="object-cover grayscale-[18%] transition duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,0.08)_0%,rgba(10,9,8,0.18)_36%,rgba(10,9,8,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(212,175,87,0.2),transparent_28%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="absolute inset-x-5 top-5 flex items-start justify-between sm:inset-x-6 sm:top-6">
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/60">{card.number}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/20 text-gold opacity-70 backdrop-blur-md transition duration-500 group-hover:border-gold/70 group-hover:bg-gold group-hover:text-void group-hover:opacity-100">
            <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
          <div className="mb-4 h-px w-9 bg-gold transition-all duration-500 group-hover:w-16" />
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold">Featured work</p>
          <h3 className={`mt-2 font-display leading-none tracking-[-0.025em] text-foreground transition-colors duration-500 group-hover:text-gold ${isLead ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
            {card.title}
          </h3>
          <p className={`mt-3 max-w-[28ch] text-sm leading-relaxed text-foreground-secondary ${isLead ? "sm:text-base" : ""}`}>
            {card.description}
          </p>
          <div className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
            <span className="h-px w-4 bg-gold/70" />
            <span>{styleLabel}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
