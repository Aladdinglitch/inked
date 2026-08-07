"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./redesign.module.css";

const textVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const floatingOrb = {
  animate: {
    y: [0, -30, 0],
    x: [0, 15, 0],
  },
  transition: { duration: 7, ease: "easeInOut", repeat: Infinity },
};

export default function HeroSplit() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-40 pb-32 lg:pt-48 lg:pb-40">
      {/* Premium animated background */}
      <motion.div
        style={{ y: shouldReduce ? 0 : y }}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-void via-void to-void"
      />

      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -right-1/2 -top-1/2 w-full h-full bg-gradient-radial from-gold/20 via-gold/5 to-transparent blur-3xl"
          animate={shouldReduce ? undefined : {
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-1/4 bottom-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
          animate={shouldReduce ? undefined : floatingOrb}
        />
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 -z-10 backdrop-blur-xl bg-gradient-to-b from-gold/5 via-transparent to-transparent" />

      {/* Animated grain overlay */}
      <div className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay bg-grain pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:items-center">
          {/* Content Column */}
          <motion.div className="space-y-10">
            {/* Premium subtitle with animation */}
            <motion.div
              variants={textVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              <div className="group relative overflow-hidden rounded-full border border-gold/40 bg-gradient-to-r from-gold/15 to-gold/5 px-6 py-3 backdrop-blur-md hover:border-gold/60 transition-all duration-500">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={shouldReduce ? undefined : { x: [-200, 200] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative flex items-center gap-2 text-sm font-medium tracking-wide text-gold">
                  <motion.span
                    animate={shouldReduce ? undefined : { scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block h-2 w-2 rounded-full bg-gold/80"
                  />
                  Private Studio • Est. 2015
                </span>
              </div>
            </motion.div>

            {/* Editorial headline with gradient */}
            <motion.div
              variants={textVariants}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <h1 className="font-display text-6xl lg:text-8xl font-light leading-[1.1] text-fg tracking-tight">
                Ink That
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-gold">Outlasts</span>
                  <motion.div
                    className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-gold via-gold/50 to-transparent blur-sm opacity-60"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    style={{ originX: 0 }}
                  />
                </span>
                <br />
                the Trend
              </h1>
            </motion.div>

            {/* Premium description */}
            <motion.p
              variants={textVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              className="text-lg lg:text-xl leading-relaxed text-muted/85 max-w-xl font-light tracking-wide"
            >
              Transform your ideas into timeless tattoos and professional piercings, crafted with creativity, precision, and uncompromising care</motion.p>

            {/* Premium CTA buttons with magnetic effect */}
            <motion.div
              variants={textVariants}
              custom={3}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <HeroButton href="/booking" variant="primary">
                <span>Book a Session</span>
                <ArrowRight size={18} />
              </HeroButton>
              <HeroButton href="/gallery" variant="secondary">
                <span>View Portfolio</span>
              </HeroButton>
            </motion.div>

            {/* Premium stats row with glassmorphism */}
            <motion.div
              variants={textVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-6 pt-12 border-t border-gold/20"
            >
              <StatItem value="11+" label="Years Open" />
              <StatItem value="6" label="Artists" />
              <StatItem value="3200+" label="Pieces" />
            </motion.div>
          </motion.div>

          {/* Image Column with premium treatment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Floating glass card */}
            <motion.div
              className="group relative overflow-hidden rounded-3xl"
              whileHover={{
                boxShadow: "0 80px 160px rgba(212, 175, 87, 0.25)",
                y: -20,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glass border with gradient */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-gold/30 to-gold/10 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />

              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-gold/20 bg-slate-950/10 shadow-[0_40px_120px_rgba(0,0,0,0.28)]">
                <motion.img
                  src="/images/folio-6.png"
                  alt="Featured tattoo work"
                  width={820}
                  height={1025}
                  loading="eager"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Refined gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent opacity-90" />

                {/* Floating title badge */}
                <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl text-xs uppercase tracking-[0.28em] text-gold/70 shadow-lg shadow-black/20">
                  Signature Portrait
                </div>

                {/* Info card */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-2xl shadow-2xl shadow-black/30 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">
                    Studio Highlight
                  </p>
                  <p className="text-2xl font-light text-white">
                    Deep tonal contrast with editorial polish.
                  </p>
                </motion.div>

                {/* Floating accent elements */}
                <motion.div
                  className="absolute top-8 right-8 h-20 w-20 border border-gold/30 rounded-3xl"
                  animate={shouldReduce ? undefined : { rotate: [0, 5, 0] }}
                  transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                />

                <motion.div
                  className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl"
                  animate={shouldReduce ? undefined : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-12 -right-12 h-40 w-40 border-t-2 border-r-2 border-gold/20 rounded-tr-3xl"
              animate={shouldReduce ? undefined : { rotate: [0, 3, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-12 -left-12 h-40 w-40 border-b-2 border-l-2 border-gold/10 rounded-bl-3xl"
              animate={shouldReduce ? undefined : { rotate: [0, -3, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted/40"
        animate={shouldReduce ? undefined : { y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <svg className="w-4 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
            <path d="M12 5v14m0 0l-7-7m7 7l7-7" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <motion.a
      href={href}
      className={`group relative rounded-xl px-8 py-4 text-sm font-medium transition-all inline-flex items-center gap-3 ${
        variant === "primary"
          ? "bg-gradient-to-r from-gold to-gold/80 text-ink border border-gold/50 hover:shadow-xl hover:shadow-gold/30"
          : "border-2 border-gold/40 text-gold bg-gold/5 backdrop-blur-md hover:border-gold/80 hover:bg-gold/15"
      } ${variant === "primary" ? "hover:shadow-2xl" : ""}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative flex items-center gap-3">
        {children}
      </span>
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"
      />
    </motion.a>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <p className="text-3xl lg:text-4xl font-light text-gold/90 group-hover:text-gold transition-colors">
        {value}
      </p>
      <p className="text-xs uppercase tracking-widest text-muted/60 mt-2 group-hover:text-muted/80 transition-colors">
        {label}
      </p>
    </motion.div>
  );
}
