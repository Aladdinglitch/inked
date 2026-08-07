import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/blog";
import { FadeUp } from "@/components/motion/FadeUp";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <FadeUp>
        <p className="text-xs text-muted-foreground">
          {formatDate(post.date)} · {post.readMinutes} min read
        </p>
        <h1 className="display mt-3 text-5xl text-foreground md:text-6xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      </FadeUp>
      <div className="mt-10 space-y-6 leading-relaxed text-muted-foreground">
        {post.body.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>
      <Button asChild variant="outline" className="mt-12">
        <Link href="/blog">← Back to blog</Link>
      </Button>
    </article>
  );
}
