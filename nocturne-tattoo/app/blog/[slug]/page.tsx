import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { InkArt } from "@/components/ink-art";
import { FadeUp } from "@/components/fade-up";
import { CtaBanner } from "@/components/cta-banner";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

const bodies: Record<string, string[]> = {
  "healing-week-by-week": [
    "The first three days are about protecting the piece, not admiring it. Expect some ooze, mild swelling, and a colour that looks slightly duller than it will end up — that's normal, and it settles as the top layer heals.",
    "Days four through fourteen bring the deep itch phase, usually alongside light peeling. Resist scratching; pat instead, and keep the area moisturised with a thin layer of fragrance-free lotion rather than a thick balm.",
    "By week three the surface looks healed, but the skin underneath is still repairing itself for up to six months. Sun exposure and chlorine are the two things most likely to dull colour during this stretch, so keep the piece covered when you can.",
  ],
  "choosing-a-placement": [
    "Ribs and inner-arm skin move and stretch more than most people expect, which affects how fine linework ages there compared to a flatter area like the outer forearm or calf.",
    "We talk clients through three questions before finalising placement: how much sun the area gets, how much it stretches over time, and how visible you want the piece to be day-to-day.",
    "There's no universally 'safe' placement — it depends on the design. A bold blackwork piece tolerates joints and curves better than a fine-line piece, which reads best on flatter, more stable skin.",
  ],
  "fine-line-longevity": [
    "Fine line doesn't fade faster than bold work because it's inherently weaker — it fades faster when it's placed somewhere that moves a lot, or when it's not given proper aftercare in the first month.",
    "The real variable is line spacing. Densely packed fine lines blur into each other over a decade; well-spaced ones hold their individual shape far longer.",
    "If longevity matters more to you than delicacy, we'll sometimes suggest a slightly heavier needle configuration — visually similar, but noticeably more durable at the twenty-year mark.",
  ],
  "first-tattoo-nerves": [
    "The most common question at the front desk isn't about pain — it's 'what if I regret the placement.' We always recommend starting somewhere you can cover easily if you're unsure, rather than somewhere permanent-feeling like a hand or neck.",
    "Eating a proper meal beforehand matters more than people expect. Low blood sugar during a long session is the single biggest cause of light-headedness in the chair.",
    "Bring headphones. A four-hour session goes faster with a podcast than with silence, and most artists are happy to work quietly if you'd rather not talk the whole time.",
  ],
  "inside-a-backpiece": [
    "A full backpiece starts on paper, not skin. Ren maps the composition across three or four consultations, adjusting flow and scale until the design works as one continuous piece rather than a collage of separate images.",
    "Sessions are paced deliberately — usually one full day per month, which lets the skin recover fully between sittings and keeps line quality consistent from session to session.",
    "The hardest part isn't any single panel, it's matching saturation across sessions spaced weeks apart, since healed skin behaves slightly differently than fresh skin during shading.",
  ],
  "sun-and-ink": [
    "UV exposure is the single biggest long-term threat to colour saturation — more than swimming, more than sweat, more than most skincare habits.",
    "A high-SPF, fragrance-free sunscreen applied consistently over the first two years does more for colour retention than any specific aftercare product used during initial healing.",
    "Chlorine doesn't fade ink directly, but it dries and irritates the skin, which indirectly stresses a piece that's still settling. Fully healed work tolerates it far better than fresh work.",
  ],
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  const paragraphs = bodies[post.slug] ?? [];

  return (
    <>
      <article className="pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="container max-w-2xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-gold">
            <ArrowLeft size={14} /> Back to Journal
          </Link>

          <FadeUp className="mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {post.category} &middot; {post.readTime}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-fg sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-sm text-muted">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-10 overflow-hidden rounded-xl2 border border-border">
            <div className="aspect-[16/9]">
              <InkArt seed={post.slug.length * 31} styleSlug="fine-line" className="h-full w-full" title={post.title} />
            </div>
          </FadeUp>

          <div className="prose-none mt-10 space-y-6">
            {paragraphs.map((p, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <p className="text-base leading-relaxed text-fg/85">{p}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </article>

      <CtaBanner
        title="Have a question this didn't cover?"
        description="The FAQ page rounds up what we hear most, or reach out directly."
        primaryHref="/faq"
        primaryLabel="Read the FAQ"
        secondaryHref="/contact"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
