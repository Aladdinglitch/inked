import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function TestimonialsWall() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-32 lg:py-40" aria-labelledby="testimonials-heading">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-1/3 bottom-1/4 h-[600px] w-[600px] rounded-full bg-gold/15 blur-3xl"
          animate={shouldReduce ? undefined : { y: [0, 50, 0], x: [0, -50, 0] }}
          transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/98 via-void to-void" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-20 mix-blend-overlay" />

      <div className="container relative z-10">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-gold">Client Stories</p>
          <h2 id="testimonials-heading" className="font-display text-5xl font-light tracking-tight text-foreground lg:text-7xl">
            What Clients <span className="italic text-gold">Love</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-gold/20 bg-gradient-to-br from-void/90 to-ink/90 p-10"
            >
              <p className="text-lg leading-relaxed text-foreground">&quot;{testimonial.quote}&quot;</p>
              <div className="mt-8 h-px bg-gradient-to-r from-gold/50 to-transparent" />
              <p className="mt-6 font-medium text-foreground">{testimonial.name}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-foreground-muted">{testimonial.attribution}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
