"use client";
import { motion } from "framer-motion";
import styles from "./redesign.module.css";

const highlights = [
  "✨ Custom Tattoo Design",
  "◆ Precision Piercing",
  "✦ Fine-Line Detail",
  "● Sterile Studio",
  "⦿ Personalized Consultations",
  "◇ Premium Aftercare",
];

export default function Marquee() {
  const content = highlights.join(" • ");

  return (
    <motion.section
      className="relative py-16 lg:py-20 border-y border-gold/20 overflow-hidden bg-gradient-to-r from-void via-void/98 to-void"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      {/* Gradient borders for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-void via-void to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-void via-void to-transparent z-10" />

      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          <span className="inline-flex items-center mx-8 text-sm lg:text-base font-light text-gold/70 whitespace-nowrap">
            {content}
          </span>
          <span className="inline-flex items-center mx-8 text-sm lg:text-base font-light text-gold/70 whitespace-nowrap">
            {content}
          </span>
        </div>
      </div>
    </motion.section>
  );
}
