"use client";
import styles from "./redesign.module.css";

const highlights = [
  "Custom Tattoos",
  "Precision Piercing",
  "Fine Line Detail",
  "Safe, Hygienic Studio",
  "Lagos-Based Artist",
  "Personalized Consultations",
];

export default function Marquee() {
  const content = highlights.join(" • ");

  return (
    <div className="py-8">
      <div className={styles.marquee} aria-hidden>
        <div className={styles.marqueeInner}>
          <span className="mx-8 text-sm font-medium text-muted">{content} • </span>
          <span className="mx-8 text-sm font-medium text-muted">{content} • </span>
        </div>
      </div>
    </div>
  );
}
