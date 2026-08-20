# Inked Attraction

A Lagos tattoo and piercing studio website built around custom work, precision, and premium client care. This project uses original branding, copy, and artwork to showcase the studio experience.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS ·
Framer Motion · Lucide React · shadcn/ui-style primitives (hand-rolled,
no CLI dependency)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires network access to
`fonts.googleapis.com` on first build (Fraunces / Inter / JetBrains Mono
via `next/font/google`) — after the first successful build these are
cached locally by Next.js.

```bash
npm run build   # production build, statically prerenders all 27 routes
npm run start   # serve the production build
npm run lint    # ESLint (next/core-web-vitals ruleset) — currently clean
```

## Design system

- **Palette**: matte black (`#0a0908`), warm off-white foreground
  (`#f5f1e8` — never pure white), antique gold accent (`#c9a24b` /
  `#e3c374` bright), oxblood used sparingly for rare emphasis
  (`#7a1f1f`). Tokens live in `tailwind.config.ts`.
- **Type**: Fraunces (display serif) for headlines, Inter for body/UI,
  JetBrains Mono for eyebrow labels and utility text.
- **Signature motif**: `components/needle-line.tsx` — a single
  continuous line that draws itself on scroll via Framer Motion's
  `pathLength`, standing in for one unbroken tattoo pass. Used as a
  section divider instead of a plain rule.

## Artwork and content status

No stock photography or external imagery is used anywhere in the
project. `components/ink-art.tsx` is a small deterministic generator
(seeded PRNG) that produces original SVG "linework" studies, styled
per tattoo category (blackwork, fine line, ornamental, etc.). Same
seed always produces the same art, so a given artist/piece looks
consistent across pages. This keeps the project fully original and
copyright-clean, and is used only where no approved studio image is available. Replace generated artwork with approved studio assets before publishing those surfaces.

If you want to swap in real photography later, replace `<InkArt />`
usages with `next/image` and add your image host to
`images.remotePatterns` in `next.config.js`.

## Pages

Home · Artists · Artist Profile (`/artists/[slug]`) · Tattoo Styles ·
Portfolio Gallery · Booking · Pricing · About · FAQ · Contact ·
Journal/Blog (`/blog`, `/blog/[slug]`)

## Notable interactions

- **Gallery** (`/gallery`): CSS-columns masonry, style filter pills,
  live search, favorites (persisted to `localStorage`), infinite
  scroll via `IntersectionObserver`, and a keyboard-navigable lightbox
  (Esc / ←/→).
- **Booking** (`/booking`): Separate tattoo and piercing flows with animated step transitions, per-step validation, confirmation summaries, and Netlify Forms submission.
- **Contact form**: Uses the `contact-inquiry` Netlify Form.

## SEO / performance notes

- Per-page `metadata` exports (title templates, descriptions, OG/Twitter
  tags) throughout `app/**/page.tsx`.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and
  `/robots.txt` automatically.
- All content is statically generated at build time (`○`/`●` in the
  build output) — no server-side data fetching on the critical path.
- All artwork is inline SVG (no image requests, no layout shift).
- `prefers-reduced-motion` is respected globally in `app/globals.css`.
- Semantic landmarks, skip-to-content link, `aria-*` attributes on
  interactive controls (accordion, lightbox, filters, nav) throughout.

Run Lighthouse against a deployed build (or `npm run build && npm run
start` locally) to get real Core Web Vitals numbers — scores aren't
meaningful against `next dev`.

## Deploying

The production origin is configured with `NEXT_PUBLIC_SITE_URL` when available. Keep that value aligned with the deployed site before publishing canonical URLs.

---

Remaining stakeholder confirmations:

- TODO(confirm-with-studio): Confirm official production domain.
- TODO(confirm-with-studio): Confirm complete public street address.
- TODO(confirm-with-studio): Confirm public artist experience and approved social profile details.
- TODO(confirm-with-studio): Confirm exact deposit, payment, cancellation, refund, and rescheduling policy details.
