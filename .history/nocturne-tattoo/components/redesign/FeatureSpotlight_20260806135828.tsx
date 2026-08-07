"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type FeatureItem = {
  number: string;
  title: string;
  description: string;
  icon: string;
  iconSrc?: string;
  backgroundImage?: string;
  accent: string;
};

const features: FeatureItem[] = [
  {
    number: "01",
    title: "Custom Design Consultation",
    description: "Collaborate directly with our artists to create a design uniquely yours — bespoke, intentional, without compromise.",
    icon: "✦",
    iconSrc: "/icons/design.png",
    backgroundImage: "/images/design-consultation.jpg",
    accent: "from-gold/40",
  },
  {
    number: "02",
    title: "Precision Execution",
    description: "State-of-the-art equipment and meticulous technique ensure perfect lines, vibrant colors, and lasting brilliance.",
    icon: "◆",
    iconSrc: "/icons/piercing.png",
    backgroundImage: "/images/piercing.jpg",
    accent: "from-gold/30",
  },
  {
    number: "03",
    title: "Aftercare Excellence",
    description: "Premium guidance and detailed care instructions to help your ink heal beautifully and remain vivid for decades.",
    icon: "●",
    iconSrc: "/icons/aftercare.png",
    backgroundImage: "/images/aftercare.jpg",
    accent: "from-gold/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
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

export default function FeatureSpotlight() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-1/3 top-1/2 w-full h-96 rounded-full bg-gradient-to-r from-gold/15 to-transparent blur-3xl"
          animate={shouldReduce ? undefined : {
            y: [0, -50, 0],
            x: [0, 40, 0],
          }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void/95" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay bg-grain pointer-events-none" />

      <div className="container relative z-10">
        {/* Premium section header */}
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
                Our Philosophy
              </span>
            </div>
          </motion.div>

          <h2 className="font-display text-5xl lg:text-7xl font-light text-fg mb-8 tracking-tight">
            Thoughtfully <span className="italic text-gold">Crafted</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg lg:text-xl text-muted/80 leading-relaxed font-light">
            Every tattoo and piercing is an investment in your story. We approach each piece with artistic precision, meticulous execution, and an unwavering commitment to excellence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((f, idx) => (
            <FeatureCard key={f.number} feature={f} variants={cardVariants} index={idx} shouldReduce={shouldReduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  variants,
  index,
  shouldReduce,
}: {
  feature: FeatureItem;
  variants: any;
  index: number;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.div
      variants={variants}
      whileHover={{
        y: -12,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative flex flex-col"
    >
      {/* Glass background container */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur -z-10" />

      <div className="relative overflow-hidden rounded-2xl border border-gold/20 backdrop-blur-lg p-8 transition-all duration-500 group-hover:border-gold/40 flex flex-col h-full">
        {/* Background image */}
        {feature.backgroundImage && (
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <Image
              src={feature.backgroundImage}
              alt={feature.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
            />
          </div>
        )}

        {/* Base background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-gold/3 -z-10 rounded-2xl" />

        {/* Animated gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ rotate: 0 }}
          animate={shouldReduce ? undefined : { rotate: 360 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />

        {/* Number with glow */}
        <motion.div
          className="relative text-7xl lg:text-8xl font-light text-gold/30 mb-8 group-hover:text-gold/50 transition-colors duration-500"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            animate={shouldReduce ? undefined : { opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 1 }}
          >
            {feature.number}
          </motion.span>
        </motion.div>

        {/* Icon */}
        <motion.div
          className="inline-block w-12 h-12 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 text-gold/60 flex items-center justify-center mb-6 group-hover:bg-gold/40 group-hover:text-gold transition-all duration-500 text-lg"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {feature.iconSrc ? (
            <Image
              src={feature.iconSrc}
              alt={`${feature.title} icon`}
              width={28}
              height={28}
              className="h-7 w-7 object-contain" 
              style={{ width: "auto" }}
            />
          ) : (
            <span>{feature.icon}</span>
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 relative z-10">
          <motion.h3
            className="font-display text-2xl lg:text-3xl font-light text-fg mb-4 group-hover:text-gold transition-colors duration-500"
          >
            {feature.title}
          </motion.h3>

          <motion.p
            className="text-base text-muted/70 leading-relaxed font-light group-hover:text-muted/90 transition-colors duration-500"
          >
            {feature.description}
          </motion.p>
        </div>

        {/* Animated bottom border accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold to-gold/0"
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />

        {/* Floating elements */}
        <motion.div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={shouldReduce ? undefined : { scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
