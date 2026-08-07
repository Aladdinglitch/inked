"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { gallery } from "@/lib/data";

export default function PortfolioShowcase() {
  const recent = gallery.slice(0, 6);

  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider text-muted">Selected Work</p>
            <h2 className="mt-2 font-display text-3xl">Timeless body art, made to last.</h2>
          </div>
          <Link href="/gallery" className="text-sm font-medium text-muted">Explore the portfolio →</Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {recent.map((p, i) => (
            <motion.a
              key={p.id}
              href="/gallery"
              className="group block overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <img
                  src={p.image || `/images/folio-${(i % 8) + 1}.svg`}
                  alt={p.title || "Portfolio piece"}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 text-sm text-muted">{p.title}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
