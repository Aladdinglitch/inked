import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { styles } from "@/content/styles";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tattoo Styles",
  description: "Explore custom tattoos, fine-line work, cover-ups, and piercing services at Inked Attraction Tattoo & Piercing Studio.",
};

export default function StylesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Services</p>
        <h1 className="display text-5xl text-foreground md:text-6xl">Tattoo styles</h1>
        <p className="mt-4 text-muted-foreground">
          From custom tattoos and fine-line detail to cover-ups and professional piercings, each service is shaped around your story.
        </p>
      </FadeUp>
      <div className="space-y-8">
        {styles.map((style, i) => (
          <FadeUp key={style.id} delay={i * 0.06}>
            <article className="grid gap-6 overflow-hidden rounded-3xl border border-border md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px]">
                <Image src={style.image} alt={style.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8">
                <h2 className="display text-3xl text-foreground md:text-4xl">{style.name}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{style.summary}</p>
                <Button asChild className="mt-6 w-fit">
                  <Link href="/booking">Book this style</Link>
                </Button>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
