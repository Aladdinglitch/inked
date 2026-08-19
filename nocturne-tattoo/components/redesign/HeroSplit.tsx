"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SLIDE_DURATION = 6200;
const SWIPE_THRESHOLD = 48;
const TRANSITION = { duration: 1.25, ease: [0.22, 1, 0.36, 1] as const };

type HeroSlide = {
  id: string;
  image: string;
  title: string;
  style: string;
  artist: string;
  objectPosition: string;
  drift: { x: number; y: number };
};

const heroSlides: HeroSlide[] = [
  {
    id: "hero-b14",
    image: "/images/porfolio/Heroshow/b14.jpg",
    title: "Black Orchid",
    style: "Blackwork",
    artist: "Inked Attraction",
    objectPosition: "center 38%",
    drift: { x: -8, y: -4 },
  },
  {
    id: "hero-b16",
    image: "/images/porfolio/Heroshow/b16.jpg",
    title: "Contour Study",
    style: "Fine line",
    artist: "Inked Attraction",
    objectPosition: "center center",
    drift: { x: 7, y: -5 },
  },
  {
    id: "hero-bbbb",
    image: "/images/porfolio/Heroshow/bbbb.jpg",
    title: "Soft Geometry",
    style: "Custom work",
    artist: "Inked Attraction",
    objectPosition: "center 42%",
    drift: { x: -6, y: 5 },
  },
  {
    id: "hero-body",
    image: "/images/porfolio/Heroshow/body.png",
    title: "Body of Work",
    style: "Editorial study",
    artist: "Inked Attraction",
    objectPosition: "center center",
    drift: { x: 5, y: 4 },
  },
  {
    id: "hero-po1",
    image: "/images/porfolio/Heroshow/po1.jpeg",
    title: "First Mark",
    style: "Custom work",
    artist: "Inked Attraction",
    objectPosition: "center 40%",
    drift: { x: -7, y: 3 },
  },
];

function findAvailableIndex(index: number, direction: 1 | -1, unavailable: Set<string>) {
  if (heroSlides.length < 2) return index;

  for (let offset = 1; offset < heroSlides.length; offset += 1) {
    const candidate = (index + direction * offset + heroSlides.length) % heroSlides.length;
    if (!unavailable.has(heroSlides[candidate].image)) return candidate;
  }

  return index;
}

export default function HeroSplit() {
  const heroRef = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set());
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(pointerX, { stiffness: 58, damping: 24, mass: 0.6 });
  const imageY = useSpring(pointerY, { stiffness: 58, damping: 24, mass: 0.6 });
  const contentX = useSpring(useTransform(pointerX, (value) => value * -0.16), { stiffness: 80, damping: 28 });
  const contentY = useSpring(useTransform(pointerY, (value) => value * -0.16), { stiffness: 80, damping: 28 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.28]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const availableSlides = useMemo(
    () => heroSlides.filter((slide) => !failedImages.has(slide.image)),
    [failedImages]
  );
  const activeSlide = heroSlides[activeIndex];

  const goTo = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((index) => findAvailableIndex(index, direction, failedImages));
    },
    [failedImages]
  );

  useEffect(() => {
    if (isPaused || availableSlides.length < 2) return;
    const timer = window.setTimeout(() => goTo(1), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeIndex, availableSlides.length, goTo, isPaused]);

  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!activeSlide) return;

    const nextIndex = findAvailableIndex(activeIndex, 1, failedImages);
    const preloadIndex = loadedImages.has(heroSlides[nextIndex]?.image ?? "")
      ? findAvailableIndex(nextIndex, 1, failedImages)
      : nextIndex;
    const source = heroSlides[preloadIndex]?.image;

    if (!source || source === activeSlide.image || loadedImages.has(source) || failedImages.has(source)) return;

    const image = new window.Image();
    image.onload = () => setLoadedImages((loaded) => new Set(loaded).add(source));
    image.onerror = () => setFailedImages((failed) => new Set(failed).add(source));
    image.src = source;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [activeIndex, activeSlide, failedImages, loadedImages]);

  const handleImageError = useCallback(
    (source: string) => {
      setFailedImages((failed) => {
        const next = new Set(failed);
        next.add(source);
        return next;
      });
      if (source === activeSlide?.image) {
        setActiveIndex((index) => findAvailableIndex(index, 1, new Set([...failedImages, source])));
      }
    },
    [activeSlide?.image, failedImages]
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * -12);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -8);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY) * 1.35) return;
    goTo(deltaX < 0 ? 1 : -1);
  };

  if (!activeSlide || availableSlides.length === 0) return <HeroFallback />;

  return (
    <section
      ref={heroRef}
      aria-label="Featured tattoo portfolio"
      tabIndex={0}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        resetPointer();
        setIsPaused(false);
      }}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          goTo(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={handleTouchEnd}
      className="relative isolate flex min-h-[max(620px,100svh)] items-end overflow-hidden bg-void text-foreground lg:min-h-[680px]"
    >
      <div className="absolute inset-0 z-0 bg-void" />

      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.045 }}
          animate={{ opacity: 1, scale: shouldReduceMotion ? 1 : 1 }}
          exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.015 }}
          transition={shouldReduceMotion ? { duration: 0.08 } : TRANSITION}
          className="absolute -inset-7 z-0 overflow-hidden"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { x: [0, activeSlide.drift.x], y: [0, activeSlide.drift.y] }}
            transition={shouldReduceMotion ? undefined : { duration: 7.4, ease: "linear" }}
            className="relative h-full w-full"
          >
            <motion.div style={{ x: shouldReduceMotion ? 0 : imageX, y: shouldReduceMotion ? 0 : imageY }} className="relative h-full w-full">
              <Image
                src={activeSlide.image}
                alt={`${activeSlide.title}, ${activeSlide.style} by ${activeSlide.artist}`}
                fill
                priority={activeIndex === 0}
                quality={82}
                sizes="100vw"
                onError={() => handleImageError(activeSlide.image)}
                style={{ objectPosition: activeSlide.objectPosition }}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(10,9,8,0.96)_0%,rgba(10,9,8,0.79)_26%,rgba(10,9,8,0.25)_65%,rgba(10,9,8,0.4)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,rgba(10,9,8,0.9)_0%,rgba(10,9,8,0.12)_45%,rgba(10,9,8,0.32)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,9,8,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-grain opacity-[0.04] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-y-0 left-[6%] z-[2] hidden w-px bg-white/10 lg:block" />
      <div className="pointer-events-none absolute right-8 top-8 z-[2] hidden font-mono text-[9px] uppercase tracking-[0.28em] text-white/55 lg:block">Lagos · Nigeria</div>

      <motion.div style={{ opacity: contentOpacity, x: shouldReduceMotion ? 0 : contentX, y: shouldReduceMotion ? 0 : contentY }} className="relative z-10 w-full px-6 pb-32 pt-36 sm:px-10 sm:pb-36 lg:px-[10vw] lg:pb-32">
        <div className="max-w-xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: TRANSITION.ease }} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs">
            <span className="h-px w-8 bg-gold" /> Inked Attraction · Tattoo & Piercing Studio
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.7, ease: TRANSITION.ease }} className="mt-6 max-w-3xl font-display text-6xl leading-[0.86] tracking-[-0.055em] text-foreground sm:text-8xl lg:text-[clamp(5rem,9vw,9.5rem)]">
            Your story.<br /><span className="ml-[10vw] italic text-gold sm:ml-[8vw]">Our art.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.65, ease: TRANSITION.ease }} className="mt-6 max-w-md text-base leading-relaxed text-foreground-secondary sm:text-lg">
            Transform your ideas into timeless tattoos and professional piercings, crafted with creativity, precision, and uncompromising care.
 </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.65, ease: TRANSITION.ease }} className="mt-8 flex flex-wrap gap-3">
            <MagneticLink href="/booking" primary>Book an Appointment <ArrowRight size={16} /></MagneticLink>
            <Link href="/gallery" className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur-lg transition duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:bg-white/[0.1] focus-visible:outline-offset-4">Explore Portfolio</Link>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={activeSlide.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: shouldReduceMotion ? 0.08 : 0.55, ease: TRANSITION.ease }} className="group absolute isolate bottom-8 right-6 z-10 max-w-[calc(100%-3rem)] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.065] px-5 py-3.5 shadow-[0_18px_55px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-150 sm:bottom-10 sm:right-10 lg:right-[10vw]">
          <span className="absolute inset-y-3 left-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent opacity-90" aria-hidden="true" />
          <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden="true" />
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold">Gallery caption</p>
          <p className="mt-1 font-display text-lg text-foreground">{activeSlide.title}</p>
          <p className="mt-1 text-xs capitalize text-foreground-secondary">{activeSlide.style} · {activeSlide.artist}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-6 z-10 flex items-center gap-4 sm:bottom-10 sm:left-10 lg:left-[10vw]">
        <div className="w-28 overflow-hidden bg-white/25 sm:w-40" aria-hidden="true">
          <motion.div key={activeSlide.id} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: shouldReduceMotion ? 0.01 : SLIDE_DURATION / 1000, ease: "linear" }} className="h-px origin-left bg-gold" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}</span>
        {availableSlides.length > 1 && <div className="flex items-center gap-1" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <button type="button" onClick={() => goTo(-1)} aria-label="Show previous portfolio work" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/20 text-foreground backdrop-blur-lg transition duration-300 hover:border-gold hover:text-gold active:scale-95"><ArrowLeft size={15} /></button>
          <button type="button" onClick={() => goTo(1)} aria-label="Show next portfolio work" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/20 text-foreground backdrop-blur-lg transition duration-300 hover:border-gold hover:text-gold active:scale-95"><ArrowRight size={15} /></button>
        </div>}
      </div>

      <motion.div style={{ opacity: shouldReduceMotion ? 1 : scrollCueOpacity }} className="pointer-events-none absolute bottom-8 right-6 z-10 hidden items-center gap-3 text-foreground-muted lg:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Scroll to explore</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}

function MagneticLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
        y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 6);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium transition duration-300 focus-visible:outline-offset-4 ${primary ? "bg-gold text-void shadow-[0_8px_28px_rgba(212,175,87,0.18)] hover:bg-gold-bright hover:shadow-[0_12px_36px_rgba(212,175,87,0.28)]" : "border border-white/25 bg-white/[0.04] text-foreground backdrop-blur-lg hover:border-gold/70"}`}
    >
      {children}
    </motion.a>
  );
}

function HeroFallback() {
  return (
    <section className="relative flex min-h-[max(620px,100svh)] items-end overflow-hidden bg-void px-6 py-20 sm:px-10 lg:min-h-[680px] lg:px-[10vw]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(212,175,87,0.16),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />
      <div className="relative max-w-2xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Inked Attraction · Tattoo & Piercing Studio</p>
        <h1 className="mt-6 font-display text-6xl leading-[0.88] text-foreground sm:text-8xl">Your story.<br /><span className="italic text-gold">Our art.</span></h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-foreground-secondary sm:text-lg">Custom tattoos and precision piercing crafted with intention, detail, and individuality.</p>
        <Link href="/booking" className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-void">Book an Appointment <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
