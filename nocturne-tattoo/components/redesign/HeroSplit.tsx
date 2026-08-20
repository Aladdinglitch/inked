"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SLIDE_DURATION = 5500;

const heroSlides = [
  {
    image: "/images/porfolio/Heroshow/b14.jpg",
    title: "Portfolio image 01",
    medium: "Portfolio work",
    objectPosition: "center 38%",
  },
  {
    image: "/images/fwc2.jpg",
    title: "Portfolio image 02",
    medium: "Portfolio work",
    objectPosition: "center center",
  },
  {
    image: "/images/fwc4.jpg",
    title: "Portfolio image 03",
    medium: "Portfolio work",
    objectPosition: "center center",
  },
  {
    image: "/images/fwc6.jpg",
    title: "Portfolio image 04",
    medium: "Portfolio work",
    objectPosition: "center center",
  },
];

const process = [
  ["01", "Consultation", "Shaping your idea around placement and story."],
  ["02", "Craft", "Clean lines, calm pacing, precise technique."],
  ["03", "Care", "Guidance so the work settles and lasts."],
];

export default function HeroSplit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goTo = (index: number) => setActiveIndex(index);

  return (
    <section
      aria-label="Featured tattoo portfolio"
      className="border-b border-border bg-void text-foreground"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const touchEnd = event.changedTouches[0]?.clientX;
        const delta = touchEnd === undefined ? 0 : touchEnd - touchStart.current;
        touchStart.current = null;
        if (Math.abs(delta) < 48) return;
        setActiveIndex((index) => (index + (delta < 0 ? 1 : -1) + heroSlides.length) % heroSlides.length);
      }}
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 pb-20 pt-32 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-[6vw] lg:px-[6vw] lg:py-[9vh]">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] text-gold">
            <span className="h-px w-7 bg-gold" aria-hidden="true" />
            Inked Attraction — Lagos Studio
          </p>

          <h1 className="mt-7 max-w-[11ch] font-display text-[clamp(2.8rem,5.2vw,4.6rem)] font-medium leading-[1.03] tracking-[-.01em]">
            Your story.
            <br />
            Our <em className="text-gold">art.</em>
          </h1>

          <p className="mt-6 max-w-[42ch] text-base leading-[1.65] text-foreground-secondary sm:text-[16.5px]">
            Transform your ideas into timeless tattoos and professional piercings, crafted with creativity, precision, and uncompromising care.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-7">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-void transition-colors hover:bg-gold-bright focus-visible:outline-offset-4"
            >
              Book an Appointment <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/gallery"
              className="group relative inline-flex items-center gap-2 text-sm text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-foreground-muted/40"
            >
              Explore Portfolio <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-16 grid max-w-[520px] grid-cols-1 gap-7 border-t border-border pt-8 sm:grid-cols-3 sm:gap-6">
            {process.map(([number, label, description]) => (
              <div key={number}>
                <span className="font-mono text-[11.5px] tracking-[.05em] text-gold">{number}</span>
                <span className="mt-2 block font-display text-[15.5px]">{label}</span>
                <p className="mt-1.5 text-[12.5px] leading-[1.5] text-foreground-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative" onFocus={() => setIsPaused(true)} onBlur={() => setIsPaused(false)}>
          <div className="border border-gold/35 bg-gradient-to-b from-gold/[.04] to-transparent p-3.5">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              {heroSlides.map((slide, index) => (
                <Image
                  key={slide.image}
                  src={slide.image}
                  alt={`${slide.title}, ${slide.medium} work by Inked Attraction`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={`object-cover transition-opacity duration-1000 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
                  style={{ objectPosition: slide.objectPosition }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-[19px] italic">{activeSlide.title}</p>
              <p className="mt-1 text-xs tracking-[.03em] text-foreground-muted">{activeSlide.medium} — Inked Attraction</p>
            </div>
            <span className="whitespace-nowrap font-mono text-xs text-foreground-muted" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2" aria-label="Featured work selection">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Show ${slide.title}`}
                aria-current={index === activeIndex}
                onClick={() => goTo(index)}
                className={`h-[5px] rounded-full bg-border transition-all duration-300 focus-visible:outline-offset-4 ${index === activeIndex ? "w-[18px] bg-gold" : "w-[5px] hover:bg-gold/70"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
