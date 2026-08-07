import { Star } from "lucide-react";
import { Testimonial, artists } from "@/lib/data";
import { Card } from "./ui/card";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const artist = artists.find((a) => a.slug === testimonial.artistSlug);
  return (
    <Card className="flex h-full flex-col justify-between p-8">
      <div>
        <div className="flex gap-1 text-gold">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <p className="mt-5 font-display text-lg leading-relaxed text-fg/90">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
        <div>
          <p className="text-sm font-medium text-fg">{testimonial.name}</p>
          <p className="text-xs text-muted">Tattooed by {artist?.name}</p>
        </div>
      </div>
    </Card>
  );
}
