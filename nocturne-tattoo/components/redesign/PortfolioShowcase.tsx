"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

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

const cards = gallery.slice(0, 6).map((piece, index) => ({
  ...piece,
  image: showcaseImages[index],
  number: String(index + 1).padStart(2, "0"),
}));

export default function PortfolioShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();
  const activeCard = activeIndex === null ? null : cards[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? 0 : (index + 1) % cards.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? cards.length - 1 : (index - 1 + cards.length) % cards.length);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

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
            <motion.button
              key={card.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.06, duration: 0.6, ease: ease.spring }}
              className={`group relative overflow-hidden rounded-xl2 border border-gold/20 bg-ink text-left transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_22px_60px_rgba(0,0,0,0.3)] focus-visible:outline-offset-4 ${index === 0 ? "col-span-2 row-span-2" : index === 3 ? "row-span-2" : ""}`}
              aria-label={`Open ${card.title}`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes={index === 0 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/95 via-void/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-gold">{card.number}</span>
                  <h3 className={`mt-2 font-display leading-none text-foreground ${index === 0 ? "text-3xl sm:text-5xl" : "text-xl sm:text-2xl"}`}>
                    {card.title}
                  </h3>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 bg-black/20 text-gold backdrop-blur-md transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-void">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {activeCard && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCard.title} gallery view`}
          onClick={() => setActiveIndex(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 border border-gold/30 bg-ink sm:aspect-[16/10]">
              <Image src={activeCard.image} alt={activeCard.title} fill sizes="(max-width: 1024px) 100vw, 900px" className="object-contain" priority />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-gold">{activeCard.number} / {String(cards.length).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">{activeCard.title}</h3>
              </div>
              <button type="button" onClick={() => setActiveIndex(null)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-foreground transition-colors hover:border-gold hover:text-gold" aria-label="Close gallery view">
                <X size={18} />
              </button>
            </div>
            <div className="mt-5 flex gap-2">
              <button type="button" onClick={() => setActiveIndex((index) => index === null ? 0 : (index - 1 + cards.length) % cards.length)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-foreground transition-colors hover:border-gold hover:text-gold" aria-label="Previous portfolio image">
                <ArrowLeft size={16} />
              </button>
              <button type="button" onClick={() => setActiveIndex((index) => index === null ? 0 : (index + 1) % cards.length)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-foreground transition-colors hover:border-gold hover:text-gold" aria-label="Next portfolio image">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
