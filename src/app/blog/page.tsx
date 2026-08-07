import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/blog";
import { FadeUp } from "@/components/motion/FadeUp";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tattoo tips, studio notes, and aftercare guidance.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Blog</p>
        <h1 className="display text-5xl text-foreground md:text-6xl">Studio journal</h1>
        <p className="mt-4 text-muted-foreground">
          Practical notes on first tattoos, healing, and how we work.
        </p>
      </FadeUp>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post, i) => (
          <FadeUp key={post.slug} delay={i * 0.06}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-3xl border border-border bg-card p-8 transition hover:border-primary/50"
            >
              <p className="text-xs text-muted-foreground">
                {formatDate(post.date)} · {post.readMinutes} min read
              </p>
              <h2 className="display mt-3 text-2xl text-foreground">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </Link>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
