import styles from "./redesign.module.css";

const highlights = ["Custom tattoos", "Precision piercing", "Fine-line detail", "Professional care", "Lagos-based studio", "Personal consultations"];

export default function Marquee() {
  const content = highlights.join("  •  ");

  return (
    <section className="overflow-hidden border-b border-white/8 bg-primary py-4 text-primary-foreground" aria-label="Studio services">
      <p className="sr-only">{highlights.join(", ")}</p>
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeInner}>
          <span className="mx-8 text-xs font-bold uppercase tracking-[.19em]">{content}  •  </span>
          <span className="mx-8 text-xs font-bold uppercase tracking-[.19em]">{content}  •  </span>
        </div>
      </div>
    </section>
  );
}
