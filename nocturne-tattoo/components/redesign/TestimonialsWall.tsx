"use client";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
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

export default function TestimonialsWall() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-1/3 bottom-1/4 w-[600px] h-[600px] rounded-full bg-gold/15 blur-3xl"
          animate={shouldReduce ? undefined : {
            y: [0, 50, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/98 via-void to-void" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay bg-grain pointer-events-none" />

      <div className="container relative z-10">
        {/* Premium header */}
        <motion.div
          className="mb-24 text-center"
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
                Client Stories
              </span>
            </div>
          </motion.div>

          <h2 className="font-display text-5xl lg:text-7xl font-light text-fg mb-8 tracking-tight">
            What Clients <span className="italic text-gold">Love</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg lg:text-xl text-muted/80 leading-relaxed font-light">
            Real experiences from those who&apos;ve trusted us with their skin.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.slice(0, 3).map((t, idx) => (
            <TestimonialCard
              key={t.name}
              testimonial={t}
              index={idx}
              variants={cardVariants}
              shouldReduce={shouldReduce}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
  variants,
  shouldReduce,
}: {
  testimonial: any;
  index: number;
  variants: any;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.div
      variants={variants}
      whileHover={{
        y: -12,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative"
    >
      {/* Glass background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-gold/30 to-gold/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur -z-10" />

      <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/10 to-gold/5 backdrop-blur-xl p-10 transition-all duration-500 group-hover:border-gold/40 group-hover:bg-gold/12 flex flex-col h-full">
        {/* Animated gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={shouldReduce ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Star Rating */}
          <motion.div
            className="text-gold mb-6 text-lg group-hover:text-gold/80 transition-colors duration-300"
            animate={shouldReduce ? undefined : { scale: [1, 1.1, 1] }}
            transition={{ delay: index * 0.5, duration: 3, repeat: Infinity }}
          >
            {"★".repeat(testimonial.rating)}
          </motion.div>

          {/* Quote */}
          <motion.p
            className="text-lg lg:text-xl leading-relaxed text-fg font-light flex-1 mb-8 group-hover:text-gold/90 transition-colors duration-300"
            initial={{ opacity: 0.85 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            &quot;{testimonial.quote}&quot;
          </motion.p>

          {/* Animated Divider */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-gold/50 via-gold/30 to-transparent mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
            style={{ originX: 0 }}
          />

          {/* Author */}
          <motion.footer
            className="relative z-10"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-medium text-fg group-hover:text-gold transition-colors duration-300">
              {testimonial.name}
            </p>
            <p className="text-xs uppercase tracking-widest text-muted/60 mt-2 group-hover:text-muted/80 transition-colors duration-300">
              Verified Client
            </p>
          </motion.footer>
        </div>

        {/* Floating accent element */}
        <motion.div
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={shouldReduce ? undefined : { scale: [1, 1.2, 1] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: index * 0.5 }}
        />

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 h-20 w-20 border-t border-r border-gold/20 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={shouldReduce ? undefined : { rotate: [0, 2, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
