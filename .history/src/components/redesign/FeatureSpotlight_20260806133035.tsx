"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type FeatureItem = {
  title: string;
  blurb: string;
  icon?: string;
  iconSrc: string;
};

type FeatureItem = {
  title: string;
  blurb: string;
  icon?: string;
  iconSrc: string;
  backgroundImage?: string;
};

const features: FeatureItem[] = [
  {
    title: "Custom Tattoo Design",
    blurb: "Every piece is crafted to your body and story — not pasted from a flash sheet.",
    iconSrc: "/icons/design.png",
    backgroundImage: "/images/folio-1.svg",
  },
  {
    title: "Precision Piercing",
    blurb: "Clean technique, quality jewellery, and aftercare guidance for every piercing appointment.",
    iconSrc: "/icons/piercing.png",
    backgroundImage: "/images/folio-2.svg",
  },
  {
    title: "Thoughtful Aftercare",
    blurb: "Detailed healing instructions and support to help your ink and piercings settle beautifully.",
    iconSrc: "/icons/aftercare.png",
    backgroundImage: "/images/folio-3.svg",
  },
];

export default function FeatureSpotlight() {
  return (
    <section className="py-20">
      <div className="container grid gap-10 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="relative rounded-2xl border border-neutral-100 overflow-hidden shadow-lg"
          >
            {/* Background image */}
            {f.backgroundImage && (
              <div className="absolute inset-0 -z-10">
                <Image
                  src={f.backgroundImage}
                  alt={f.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-25 hover:opacity-40 transition-opacity duration-300"
                />
              </div>
            )}
            
            {/* Content background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-white/90 -z-10" />
            
            <div className="relative p-8">
              <h3 className="font-display text-xl">{f.title}</h3>
              <p className="mt-3 text-sm text-muted">{f.blurb}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                {f.iconSrc ? (
                  <Image
                    src={f.iconSrc}
                    alt={`${f.title} icon`}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                ) : null}
              </div>
              <div>
                <p className="text-sm font-medium">Consult</p>
                <p className="text-xs text-muted">Book a session from the first consult to final touch-up.</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
