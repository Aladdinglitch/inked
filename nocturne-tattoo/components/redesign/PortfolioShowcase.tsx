"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

const selectedWork = [
  ["Fine Line Precision", "The details are unbelievably clean. I'm obsessed."],
  ["Blackwork Study", "The contrast and depth are just perfect. 🔥"],
  ["Portrait in Ink", "You captured every expression beautifully."],
  ["A Story in Ink", "It feels personal, timeless, and exactly like me."],
  ["Bold Expression", "This came out even better than I imagined."],
  ["Timeless Work", "Absolutely beautiful. Every detail feels intentional."],
] as const;

const cards = gallery.slice(0, 6).map((piece, index) => ({
  ...piece,
  image: showcaseImages[index],
  title: selectedWork[index][0],
  caption: selectedWork[index][1],
  number: String(index + 1).padStart(2, "0"),
}));

export default function PortfolioShowcase() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 lg:py-36" aria-labelledby="portfolio-heading">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-void via-void to-void/95" />
      <div className="pointer-events-none absolute -right-56 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-20 mix-blend-overlay" />

      <div className="container relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-border pb-8">
          <div>
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs">
              <span className="h-px w-8 bg-gold" /> Portfolio
            </p>
            <h2 id="portfolio-heading" className="mt-5 max-w-xl font-display text-5xl leading-[0.92] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
              Selected <span className="italic text-gold">work.</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 text-sm text-foreground-muted transition-colors hover:text-gold focus-visible:outline-offset-4"
          >
            View all <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid auto-rows-[minmax(180px,22vw)] grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 lg:gap-4">
          {cards.map((card, index) => (
            <PortfolioCard key={card.id} card={card} index={index} shouldReduce={shouldReduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

type PortfolioCardData = (typeof cards)[number];

function PortfolioCard({
  card,
  index,
  shouldReduce,
}: {
  card: PortfolioCardData;
  index: number;
  shouldReduce: boolean | null;
}) {
  const isLead = index === 0;
  const imageVariants = {
    idle: { scale: 1 },
    active: { scale: shouldReduce ? 1 : 1.025 },
  };
  const overlayVariants = {
    idle: { opacity: 0 },
    active: { opacity: 1 },
  };
  const bubbleVariants = {
    idle: { opacity: 0, y: shouldReduce ? 0 : 12, scale: shouldReduce ? 1 : 0.97 },
    active: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.article
      tabIndex={0}
      aria-labelledby={`portfolio-title-${card.id}`}
      aria-describedby={`portfolio-caption-${card.id}`}
      initial="idle"
      whileHover="active"
      whileFocus="active"
      variants={{ idle: {}, active: {} }}
      transition={{ duration: shouldReduce ? 0.01 : 0.4, ease: ease.expo }}
      className={`group relative overflow-hidden rounded-xl2 border border-gold/20 bg-ink text-left outline-none transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-[0_22px_60px_rgba(0,0,0,0.3)] focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/70 ${isLead ? "col-span-2 row-span-2" : index === 3 ? "row-span-2" : ""}`}
    >
      <motion.div variants={imageVariants} transition={{ duration: shouldReduce ? 0.01 : 0.45, ease: ease.expo }} className="absolute inset-0">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes={isLead ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
          className="object-cover"
        />
      </motion.div>

      <motion.div
        variants={overlayVariants}
        transition={{ duration: shouldReduce ? 0.01 : 0.4, ease: ease.expo }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,transparent_34%,rgba(10,9,8,0.12)_58%,rgba(10,9,8,0.76)_100%)]"
      />

      <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-gold">{card.number}</span>
            <h3 id={`portfolio-title-${card.id}`} className={`mt-2 font-display leading-none text-foreground ${isLead ? "text-3xl sm:text-5xl" : "text-xl sm:text-2xl"}`}>
              {card.title}
            </h3>
          </div>
        </div>

        <motion.p
          id={`portfolio-caption-${card.id}`}
          variants={bubbleVariants}
          transition={{ duration: shouldReduce ? 0.01 : 0.42, ease: ease.expo }}
          className="mt-4 max-w-[26ch] rounded-[1rem_1rem_1rem_0.35rem] border border-white/15 bg-white/[0.11] px-3.5 py-2.5 text-sm leading-[1.45] text-white shadow-[0_12px_34px_rgba(0,0,0,0.24)] backdrop-blur-[14px]"
        >
          {card.caption}
        </motion.p>
      </div>
    </motion.article>
  );
}
