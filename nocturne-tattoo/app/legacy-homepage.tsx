"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { artists, styles, gallery, testimonials } from "@/lib/data";

const StatCard = ({ value, suffix, label, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, margin: "-100px" }}
    className="group relative"
  >
    <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 via-transparent to-transparent p-8 backdrop-blur-xl transition-all duration-500 hover:border-gold/40 hover:bg-gold/10">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-transparent to-gold/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <p className="relative font-display text-5xl sm:text-6xl font-light text-gold/90 transition-colors duration-500 group-hover:text-gold">
        {value}
        <span className="text-4xl sm:text-5xl">{suffix}</span>
      </p>
      <p className="relative mt-3 text-sm uppercase tracking-widest text-foreground-muted transition-colors duration-500 group-hover:text-foreground-secondary">
        {label}
      </p>
      <div className="absolute top-0 right-0 h-32 w-32 bg-gold/10 rounded-full blur-3xl -z-10 group-hover:bg-gold/20 transition-all duration-500" />
    </div>
  </motion.div>
);

const StyleCard = ({ style, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, margin: "-50px" }}
    className="group relative"
  >
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-surface via-surface/50 to-gold/5 p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-2">
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 text-gold/80 transition-all duration-500 group-hover:bg-gold/30 group-hover:text-gold">
          {style.icon === "PenTool" && <span>✎</span>}
          {style.icon === "Feather" && <span>🪶</span>}
          {style.icon === "Flame" && <span>🔥</span>}
          {style.icon === "Sparkles" && <span>✨</span>}
          {style.icon === "Aperture" && <span>◎</span>}
          {style.icon === "Waves" && <span>≈</span>}
          {style.icon === "PenLine" && <span>⎯</span>}
          {style.icon === "Shapes" && <span>◆</span>}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-ink mb-2 transition-colors duration-500 group-hover:text-gold">
        {style.name}
      </h3>
      <p className="text-sm leading-relaxed text-muted/70 transition-colors duration-500 group-hover:text-muted">
        {style.blurb}
      </p>
    </div>
  </motion.div>
);

const ArtistShowcase = ({ artist, index }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, margin: "-100px" }}
    className="group relative"
  >
    <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-ink/40 to-ink/20 backdrop-blur-lg transition-all duration-500 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/30">
      <div className="aspect-square bg-gradient-to-br from-gold/10 to-gold/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-foreground-accent text-sm mb-2">Featured Artist</p>
            <h3 className="font-display text-3xl text-foreground-accent">{artist.name.split(" ")[0]}</h3>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="p-6 relative">
        <h3 className="font-display text-xl text-gold mb-1">{artist.name}</h3>
        <p className="text-sm text-foreground-secondary mb-4">{artist.role}</p>
        <p className="text-xs text-foreground-muted leading-relaxed mb-4">{artist.bio}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-foreground-muted">{artist.years} yrs</span>
          {artist.booksOpen && (
            <span className="px-2 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold">
              Booking
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const TestimonialCard = ({ testimonial, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, margin: "-50px" }}
    className="group"
  >
    <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-surface/80 via-surface/50 to-gold/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 hover:bg-surface/90">

      <p className="text-lg leading-relaxed text-ink mb-6">&quot;{testimonial.quote}&quot;</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm text-ink">{testimonial.name}</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10" />
      </div>
    </div>
  </motion.div>
);

const SectionDivider = () => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent my-24 origin-center"
  />
);

const GalleryItem = ({ piece, index }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05, duration: 0.6 }}
    viewport={{ once: true, margin: "-50px" }}
    className="group relative overflow-hidden rounded-2xl"
  >
    <div className="relative aspect-square bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20">
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div>
          <p className="text-foreground-accent text-xs mb-1">Gallery</p>
          <h4 className="font-display text-foreground-accent text-lg">{piece.title}</h4>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  </motion.div>
);

export default function LegacyHome() {
  const featured = artists.filter((a) => a.featured).slice(0, 4);
  const recent = gallery.slice(0, 12);
  const featuredStyles = styles.slice(0, 8);

  return (
    <>
      <Hero />

      {/* Premium Stats Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-void via-void/95 to-void overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-widest text-gold/70">Studio practice</p>
            <h2 className="font-display text-5xl sm:text-6xl text-foreground mb-6">
              A Decade of <span className="text-gold italic">Excellence</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-secondary">
              Metrics that speak to our commitment — steady hands, consistent vision, and the clients who trust us with their skin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            <StatCard value="—" suffix="" label="Years open — confirm" delay={0} />
            <StatCard value="—" suffix="" label="Artists — see roster" delay={0.1} />
            <StatCard value="—" suffix="" label="Completed pieces — confirm" delay={0.2} />
            <StatCard value="—" suffix="" label="Client rating — pending" delay={0.3} />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Premium Styles Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-void to-void/98 overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-widest text-gold/70">Artistic Range</p>
            <h2 className="font-display text-5xl sm:text-6xl text-foreground">
              Eight Distinct <span className="text-gold italic">Disciplines</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStyles.map((style, i) => (
              <StyleCard key={style.slug} style={style} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Featured Artists Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-void via-void to-void/95 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold rounded-full blur-[200px] pointer-events-none" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-widest text-gold/70">Core Team</p>
            <h2 className="font-display text-5xl sm:text-6xl text-foreground">
              Meet Our <span className="text-gold italic">Artists</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-secondary">
              Each artist brings a distinct voice and expertise. All available for consultations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((artist, i) => (
              <ArtistShowcase key={artist.slug} artist={artist} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-16 text-center"
          >
            <Button asChild size="lg" variant="outline">
              <Link href="/artists">
                View All Artists <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Gallery Showcase */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-void/95 to-void overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-widest text-gold/70">Our Work</p>
            <h2 className="font-display text-5xl sm:text-6xl text-foreground mb-6">
              Portfolio <span className="text-gold italic">Highlights</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-secondary">
              A selection of portfolio work. Details and approved captions are available during consultation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {recent.map((piece, i) => (
              <GalleryItem key={piece.id} piece={piece} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center"
          >
            <Button asChild size="lg">
              <Link href="/gallery">
                Explore Full Gallery <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Testimonials Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-void to-void/98 overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-widest text-gold/70">Social Proof</p>
            <h2 className="font-display text-5xl sm:text-6xl text-foreground">
              What Clients <span className="text-gold italic">Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-void via-void/95 to-void overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/20 rounded-full blur-[150px] pointer-events-none" />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-display text-5xl sm:text-6xl text-foreground mb-6">
              Ready to Make Your <span className="text-gold italic">Mark</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-foreground-secondary mb-12">
              Start with a consultation. Discuss ideas, placement, and timeline with the right artist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/booking">
                  Book Now <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
