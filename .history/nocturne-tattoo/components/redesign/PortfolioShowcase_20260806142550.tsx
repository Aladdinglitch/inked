"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/lib/data";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PortfolioShowcase() {
  const recent = gallery.slice(0, 6);
  const shouldReduce = useReducedMotion();
  
  // Background images for each card
  const backgroundImages = [
    "/images/fwc1.jpg",
    "/images/fwc2.jpg",
    "/images/fwc3.jpg",
    "/images/fwc4.jpg",
    "/images/fwc5.jpg",
    "/images/fwc6.jpg",
  ];

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-1/4 top-0 w-[600px] h-[600px] rounded-full bg-gold/15 blur-3xl"
          animate={shouldReduce ? undefined : {
            y: [0, -60, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void/98" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay bg-grain pointer-events-none" />

      <div className="container relative z-10">
        {/* Premium header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-block mb-8"
            whileInView={{ scale: 1 }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="group relative overflow-hidden rounded-full border border-gold/40 bg-gradient-to-r from-gold/15 to-gold/5 px-6 py-3 backdrop-blur-md">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={shouldReduce ? undefined : { x: [-200, 200] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative text-sm font-medium tracking-wide text-gold">
                Portfolio & Gallery
              </span>
            </div>
          </motion.div>

          <h2 className="font-display text-5xl lg:text-7xl font-light text-fg mb-8 tracking-tight">
            Timeless <span className="italic text-gold">Art</span> on Skin
          </h2>
          <p className="max-w-3xl text-lg lg:text-xl text-muted/80 leading-relaxed font-light">
            Explore our collection of custom tattoos and piercings. Each piece represents months of consultation, design refinement, and meticulous execution.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          {recent.map((p, idx) => (
            <PortfolioCard
              key={p.id}
              backgroundImage={backgroundImages[idx]}
              title={p.title}
              style={p.styleSlug}
              variants={cardVariants}
              shouldReduce={shouldReduce}
            />
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link href="/gallery">
            <motion.div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-gold/40 text-gold bg-gold/5 backdrop-blur-md hover:border-gold/80 hover:bg-gold/15 transition-all duration-500 font-light"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Full Portfolio</span>
              <motion.div
                animate={shouldReduce ? undefined : { x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function PortfolioCard({
  backgroundImage,
  title,
  style,
  variants,
  shouldReduce,
}: {
  backgroundImage: string;
  title: string;
  style: string;
  variants: any;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.div
      variants={variants}
      className="group flex flex-col"
    >
      {/* Glass background container */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-gold/30 to-gold/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur -z-10" />

      <motion.div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/10 to-gold/5 backdrop-blur-xl"
        whileHover={{
          boxShadow: "0 60px 120px rgba(212, 175, 87, 0.25)",
          y: -12,
          borderColor: "rgba(212, 175, 87, 0.5)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={image}
          alt={title}
          width={600}
          height={800}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

        {/* Content overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-ink via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <p className="text-xs uppercase tracking-widest text-gold/60 mb-3">Featured Work</p>
          <h3 className="font-display text-2xl text-white mb-2">{title}</h3>
          <p className="text-sm text-white/80 capitalize">{style.replace("-", " ")}</p>
        </motion.div>

        {/* Floating accent */}
        <motion.div
          className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={shouldReduce ? undefined : { scale: [1, 1.3, 1] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>

      {/* Info below image */}
      <motion.div
        className="mt-6 relative z-10"
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-light text-lg text-fg group-hover:text-gold transition-colors duration-300">
          {title}
        </p>
        <p className="text-sm text-muted/60 mt-2 capitalize">
          {style.replace("-", " ")}
        </p>
      </motion.div>
    </motion.div>
  );
}
