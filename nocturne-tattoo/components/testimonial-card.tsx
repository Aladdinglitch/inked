import { Testimonial } from "@/lib/data";
import { Card } from "./ui/card";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col justify-between p-8">
      <p className="font-display text-lg leading-relaxed text-fg/90">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-8 border-t border-border pt-5">
        <p className="text-sm font-medium text-fg">{testimonial.name}</p>
        <p className="mt-1 text-xs uppercase tracking-widest text-muted">{testimonial.attribution}</p>
      </div>
    </Card>
  );
}
