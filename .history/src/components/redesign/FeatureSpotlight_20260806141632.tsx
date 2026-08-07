"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type FeatureItem = {
  title: string;
  iconSrc: string;
  backgroundImage?: string;
};

const features: FeatureItem[] = [
  {
    title: "Custom Tattoo Design",
    iconSrc: "/icons/design.png",
    backgroundImage: "/images/folio-1.svg",
  },
  {
    title: "Precision Piercing",
    iconSrc: "/icons/piercing.png",
    backgroundImage: "/images/folio-2.svg",
  },
  {
    title: "Thoughtful Aftercare",
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
            className="relative rounded-2xl border border-neutral-100 overflow-hidden shadow-lg min-h-96"
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
            
            <div className="relative p-8 h-full flex items-center justify-center min-h-64">
              <h3 className="font-display text-2xl lg:text-3xl text-center text-fg">{f.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
