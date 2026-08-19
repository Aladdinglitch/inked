"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { portfolioItems } from "@/content/portfolio";

const SLIDE_DURATION = 6200;
const TRANSITION = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const };
const HERO_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw";

const heroSlides = portfolioItems.filter((item) => item.height !== "sm");

function findAvailableIndex(start: number, direction: number, failedIndexes: Set<number>) {
  for (let offset = 0; offset < heroSlides.length; offset += 1) {
    const index = (start + direction * offset + heroSlides.length * 2) % heroSlides.length;
    if (!failedIndexes.has(index)) return index;
  }

  return -1;
}

function formatCategory(category: string) {
  return category.replace("-", " ");
}

export default function HeroSplit() {
  const heroRef = useRef<HTMLElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const failedIndexes = useRef(new Set<number>());
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set());
  const [failedImageIndexes, setFailedImageIndexes] = useState<Set<number>>(() => new Set());
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(pointerX, { stiffness: 75, damping: 22, mass: 0.5 });
  const imageY = useSpring(pointerY, { stiffness: 75, damping: 22, mass: 0.5 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const advanceSlide = useCallback((nextDirection: number) => {
    if (heroSlides.length < 2) return;

    setDirection(nextDirection);
    setActiveIndex((current) => {
      const next = findAvailableIndex(current + nextDirection, nextDirection, failedIndexes.current);
      return next === -1 ? current : next;
    });
  }, []);

  const selectSlide = useCallback((requestedIndex: number, nextDirection: number) => {
    const next = findAvailableIndex(requestedIndex, nextDirection, failedIndexes.current);
    if (next === -1) return;

    setDirection(nextDirection);
    setActiveIndex(next);
  }, []);

  const markImageLoaded = useCallback((index: number) => {
    const slide = heroSlides[index];
    if (!slide) return;

    setLoadedImages((current) => {
      if (current.has(slide.id)) return current;
      return new Set(current).add(slide.id);
    });
  }, []);

  const handleImageError = useCallback((index: number) => {
    if (failedIndexes.current.has(index)) return;

    failedIndexes.current.add(index);
    setFailedImageIndexes(new Set(failedIndexes.current));

    setActiveIndex((current) => {
      if (current !== index) return current;

      const next = findAvailableIndex(index + 1, 1, failedIndexes.current);
      if (next === -1) return current;
      setDirection(1);
      return next;
    });
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setIsPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (heroSlides.length < 2 || isPaused || !isPageVisible) return;

    const timeout = window.setTimeout(() => advanceSlide(1), SLIDE_DURATION);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, advanceSlide, isPageVisible, isPaused]);

  if (heroSlides.length === 0) {
    return (
      <section className="relative isolate flex min-h-[max(620px,100svh)] items-end overflow-hidden border-b border-white/10 bg-[#08090b] px-4 py-16 sm:px-6 lg:min-h-[680px] lg:px-[9vw] lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(210,173,74,.16),transparent_28rem),linear-gradient(125deg,#16110d_0%,#08090b_55%,#111318_100%)]" />
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Inked Attraction · Lagos</p>
          <h1 className="display text-6xl leading-[.86] text-foreground sm:text-7xl lg:text-8xl">Wear your story.<span className="block text-primary">Make it art.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-foreground-secondary sm:text-lg">Bespoke tattoos and precision piercings, thoughtfully designed in a calm, client-first studio.</p>
          <Link href="/booking" className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">Request a session <ArrowDownRight className="size-4" /></Link>
        </div>
      </section>
    );
  }

  const activeSlide = heroSlides[activeIndex];
  const nextIndex = findAvailableIndex(activeIndex + 1, 1, failedIndexes.current);
  const nextSlide = nextIndex === -1 || nextIndex === activeIndex ? null : heroSlides[nextIndex];
  const availableSlideCount = heroSlides.length - failedImageIndexes.size;
  const canNavigate = availableSlideCount > 1;
  const imageLoaded = loadedImages.has(activeSlide.id);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") touchStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.pointerType !== "touch" || !canNavigate) return;

    const horizontalDistance = event.clientX - start.x;
    const verticalDistance = event.clientY - start.y;
    if (Math.abs(horizontalDistance) < 48 || Math.abs(horizontalDistance) < Math.abs(verticalDistance) * 1.4) return;

    advanceSlide(horizontalDistance < 0 ? 1 : -1);
  };

  return (
    <section
      ref={heroRef}
      aria-label="Featured tattoo portfolio"
      aria-roledescription="carousel"
      className="group/hero relative isolate flex min-h-[max(620px,calc(100svh-4.5rem))] overflow-hidden border-b border-white/10 bg-[#08090b] lg:min-h-[680px]"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onFocusCapture={() => setIsPaused(true)}
      onKeyDown={(event) => {
        if (!canNavigate) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          advanceSlide(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          advanceSlide(1);
        }
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        resetPointer();
      }}
      onPointerDown={handlePointerDown}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="absolute inset-0 -z-10 bg-[#08090b]" />
      <AnimatePresence initial={false}>
        {availableSlideCount > 0 ? (
          <motion.div
            key={activeSlide.id}
            className="absolute inset-0 -z-10 overflow-hidden"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : TRANSITION}
          >
            <motion.div
              className="absolute -inset-6 sm:-inset-10"
              style={{ x: shouldReduceMotion ? 0 : imageX, y: shouldReduceMotion ? 0 : imageY }}
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.012 }}
              animate={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 8.5, ease: "linear" }}
            >
              <Image
                src={activeSlide.image}
                alt={`${activeSlide.title}, ${formatCategory(activeSlide.category)} tattoo by Inked Attraction`}
                fill
                priority={activeIndex === 0}
                quality={82}
                sizes={HERO_SIZES}
                onError={() => handleImageError(activeIndex)}
                onLoad={() => markImageLoaded(activeIndex)}
                className="object-cover object-center transition-opacity duration-700"
                style={{ opacity: imageLoaded ? 1 : 0.88 }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {nextSlide ? (
        <Image
          src={nextSlide.image}
          alt=""
          aria-hidden="true"
          width={1600}
          height={2000}
          loading="eager"
          quality={82}
          sizes={HERO_SIZES}
          onError={() => handleImageError(nextIndex)}
          onLoad={() => markImageLoaded(nextIndex)}
          className="pointer-events-none absolute -z-20 h-px w-px opacity-0"
        />
      ) : null}

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,6,8,.82)_0%,rgba(5,6,8,.51)_38%,rgba(5,6,8,.13)_72%,rgba(5,6,8,.43)_100%),linear-gradient(0deg,rgba(5,6,8,.8)_0%,transparent_44%,rgba(5,6,8,.22)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_25%,rgba(210,173,74,.14),transparent_26rem)]" />

      <motion.div style={{ opacity: shouldReduceMotion ? 1 : contentOpacity }} className="relative flex w-full items-end px-4 py-14 sm:px-6 sm:py-16 lg:px-[9vw] lg:py-20">
        <div className="w-full max-w-7xl">
          <div className="max-w-xl">
            <motion.p
              className="eyebrow mb-5 flex items-center gap-3 text-primary"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <span className="size-1.5 rounded-full bg-primary shadow-[0_0_16px_rgba(210,173,74,.9)]" />
              Inked Attraction · Lagos
            </motion.p>
            <motion.h1
              className="display text-5xl leading-[.86] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06, ease: "easeOut" }}
            >
              Wear your story.
              <span className="block text-primary">Make it art.</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-lg text-base leading-7 text-foreground-secondary sm:mt-7 sm:text-lg"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            >
              Bespoke tattoos and precision piercings, thoughtfully designed by Elizabeth Adedayo Towobola in a calm, client-first studio.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
            >
              <Link href="/booking" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-110 active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                Request a session <ArrowDownRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
              <Link href="/portfolio" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/[.05] px-6 text-sm font-semibold text-foreground backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-primary/80 hover:bg-white/[.1] active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Explore the work
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 flex flex-col gap-5 sm:mt-14 sm:flex-row sm:items-end sm:justify-between lg:mt-16">
            <div className="glass w-fit max-w-full rounded-sm px-4 py-3 sm:px-5" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSlide.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.32, ease: "easeOut" }}
                >
                  <p className="eyebrow text-[0.6rem] text-primary">Featured work</p>
                  <p className="mt-1 text-sm font-medium text-foreground sm:text-base">{activeSlide.title}</p>
                  <p className="mt-0.5 text-xs capitalize text-foreground-muted">{formatCategory(activeSlide.category)} · Elizabeth Adedayo Towobola</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {canNavigate ? (
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-xs tabular-nums tracking-[0.18em] text-foreground-secondary">{String(activeIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}</span>
                <div className="h-px w-20 overflow-hidden bg-white/25 sm:w-28" aria-hidden="true">
                  <div
                    key={activeSlide.id}
                    className="h-full origin-left bg-primary [animation:hero-progress_6200ms_linear_forwards]"
                    style={{ animationPlayState: isPaused || !isPageVisible ? "paused" : "running" }}
                  />
                </div>
                <div className="flex overflow-hidden rounded-full border border-white/15 bg-black/20 backdrop-blur-md">
                  <button type="button" onClick={() => advanceSlide(-1)} className="grid size-10 place-items-center text-foreground-secondary transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" aria-label="Previous portfolio image">
                    <ChevronLeft className="size-4" />
                  </button>
                  <button type="button" onClick={() => advanceSlide(1)} className="grid size-10 place-items-center border-l border-white/15 text-foreground-secondary transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" aria-label="Next portfolio image">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>

      {canNavigate ? (
        <div className="absolute bottom-5 right-4 flex gap-1.5 sm:bottom-6 sm:right-6 lg:right-[9vw]" aria-label="Choose portfolio image" role="group">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => selectSlide(index, index > activeIndex ? 1 : -1)}
              className="group/indicator grid h-7 w-4 place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Show ${slide.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span className={`block h-px transition-all duration-300 ${index === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-white/55 group-hover/indicator:w-3 group-hover/indicator:bg-white"}`} />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
