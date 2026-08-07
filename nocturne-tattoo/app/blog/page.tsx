import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeUp } from "@/components/fade-up";
import { InkArt } from "@/components/ink-art";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles, aftercare guides, and tattoo advice from the Inked Attraction studio.",
};

export default function BlogPage() {
  return (
    <section className="pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="container">
        <SectionHeading
          eyebrow="Journal"
          title="Notes on healing, process, and craft."
          description="Written by the studio, not a copywriter — mostly aftercare guidance and honest process breakdowns."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <FadeUp key={post.slug} delay={(i % 3) * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl2 border border-border">
                  <div className="aspect-[16/10] transition-transform duration-700 group-hover:scale-110">
                    <InkArt seed={i * 19 + 11} styleSlug="fine-line" className="h-full w-full" title={post.title} />
                  </div>
                </div>
                <div className="mt-5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
                    {post.category} &middot; {post.readTime}
                  </p>
                  <h2 className="mt-3 flex items-start justify-between gap-3 font-display text-xl leading-snug text-fg">
                    {post.title}
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 text-muted transition-colors group-hover:text-gold"
                    />
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
