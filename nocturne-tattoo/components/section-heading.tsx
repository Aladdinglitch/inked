import { cn } from "@/lib/utils";
import { FadeUp } from "./fade-up";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <FadeUp className={cn(align === "center" && "text-center mx-auto", "max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl leading-[1.1] text-fg sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </FadeUp>
  );
}
