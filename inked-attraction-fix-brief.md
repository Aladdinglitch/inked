# Inked Attraction — Site Remediation Brief

## Role & context

You are working in the production codebase for **Inked Attraction**, a real,
live tattoo & piercing studio in Lagos, Nigeria, currently deployed at
`capable-pithivier-3b3ee6.netlify.app`. The site was built on a Next.js (App
Router) + TypeScript + Tailwind + Framer Motion scaffold. Real business
content (photos, artist names, contact details) was layered onto that
scaffold, but demo/placeholder content was never fully swept out — some of
it is now live on a real business's public site.

Work through the fixes below **in priority order**. After each tier, run the
build and fix any errors before moving to the next. Do not invent real-world
facts you don't have — pricing, founding dates, addresses, testimonials. Where
a fix needs a fact only the studio owner can confirm, leave a clearly marked
`TODO(confirm-with-studio): ...` comment and use a neutral placeholder rather
than guessing.

## Ground rules

- Run `npm run build` after every priority tier; don't move on with a broken
  build.
- Preserve the existing design system (colors, type, motion) unless a fix
  specifically calls for a UI change.
- Don't remove or weaken existing accessibility features (skip link, aria
  attributes, keyboard navigation, focus states) while editing.
- One commit per numbered item below — small, reviewable diffs, not one
  giant sweep.
- If a fix genuinely can't be completed without stakeholder input, ship the
  `TODO` and move on rather than blocking the whole brief on it.

---

## Priority 0 — Trust / legal risk (fix first)

### 1. Fabricated testimonials labeled "Verified Client"

The homepage shows three testimonials — Chidera A., Femi O., Grace T. —
each tagged **"Verified Client."** These are placeholder names and quotes
inherited from an earlier demo build, not real client reviews. Presenting
fabricated reviews as verified is a real trust problem and a potential
advertising-standards issue, not a cosmetic one.

- Remove the "Verified Client" badge from any testimonial that isn't a
  confirmed real review from an actual client.
- Replace with one of: (a) real testimonials once the studio supplies them,
  (b) an embedded real Google/Instagram reviews widget, or (c) remove the
  testimonials section entirely until real reviews exist.
- Add `TODO(confirm-with-studio): replace with real, consented reviews`
  at the component or data source, so this doesn't quietly ship again.

---

## Priority 1 — Blocking issues

### 2. Mock artist URLs are live

`/artists/mock-artist-one` and `/artists/mock-artist-two` are public,
indexable URLs — for two artists (Ayo Morgan, Tomi Adeyemi) who have real
names but scaffold slugs.

- Rename slugs to real kebab-case names: `/artists/ayo-morgan`,
  `/artists/tomi-adeyemi`.
- Update every internal reference — artist listing cards, homepage
  "featured artists," the sitemap generator — to the new slugs.
- Add a redirect from the old mock slugs to the new ones (Next.js
  `redirects()` in `next.config.js`, or a Netlify `_redirects` rule) rather
  than letting them 404 — they may already be indexed.
- If real bios/portfolio pieces for these two aren't ready yet, either hold
  them off the public roster until they are, or label them clearly ("Guest
  Artist — profile coming soon") instead of shipping scaffold copy.

### 3. Contradictory facts

- **Founding date**: About page timeline header reads "Since 2015," but the
  first timeline entry says 2021. Pick one source of truth. Recommend using
  2021 (the more specific claim) and updating the header — unless neither
  date is actually confirmed, in which case flag both with
  `TODO(confirm-with-studio): correct founding year`.
- **Artist count**: Artists page says "Three artists," About page timeline
  claims the team "reaches four resident artists." Fix the root cause, not
  just the symptom — derive the number from the artists data array
  (`${artists.length} artists`) instead of hardcoding it in copy, so it
  can't drift out of sync again as the roster changes.

### 4. Leftover placeholder copy

Known instance: the "Break-neck project focus" bullet on the Studio Day
Rate pricing tier — demo filler language, not something written for a real
client. Do a full-text search across the codebase for similarly generic
phrasing that doesn't reference Inked Attraction, Elizabeth, or Lagos
specifically, and flag anything uncertain for review rather than deleting
silently.

### 5. Pricing needs confirmation, not correction

Current tiers (₦45,000 / ₦120,000 / ₦35,000-per-hour / ₦280,000-per-day)
match placeholder demo figures exactly. Do not adjust the numbers without
stakeholder sign-off — instead:

- Flag with `TODO(confirm-with-studio): verify these are Elizabeth's actual
  approved rates before this stays public.`
- If pricing isn't already centralized in one data file, move it there so
  future corrections are a single edit, not a scattered find-and-replace.

---

## Priority 2 — Structural / logic

### 6. Piercing booking flow reuses tattoo-shaped fields

The booking wizard forks Tattoo vs. Piercing at step 1, but both branches
appear to route through the same style/placement/size steps built for
tattoos.

- Branch the wizard after the service-type step. Tattoo continues through
  style → placement → size → budget. Piercing should ask piercing-specific
  questions instead, at minimum: piercing location (ear, nose, lip, navel,
  etc.), jewelry material, and gauge.
- Keep the steps that genuinely apply to both (preferred dates, reference
  upload, contact info, confirmation) shared.
- Update the success-confirmation summary to render the correct field set
  per service type — a piercing confirmation currently showing "Placement:
  Forearm" or a tattoo size range would be a visible bug.

### 7. Gallery captions don't fit real photography

Poetic invented titles ("Hollow Bloom," "Ash Field," "Split Oak") were
written for placeholder art, not real client photos.

- Replace with real, studio-approved captions — style + placement is
  usually enough ("Fine-line florals — forearm") — unless the studio
  specifically wants an artistic-title branding voice, in which case
  confirm real titles with them rather than shipping AI-placeholder ones.

---

## Priority 3 — SEO / technical

### 8. No LocalBusiness structured data

Add JSON-LD (`TattooParlor` or `LocalBusiness` schema) to the root layout
or homepage: name, address (once confirmed — see #9), telephone,
openingHours, `sameAs` (the Instagram/TikTok/Facebook URLs already in the
footer), and a representative image. This is what feeds Google Maps and
local-pack results — currently absent.

### 9. No street address

Contact page and footer only show "Lagos, Lagos State, Nigeria." Get the
real street address from the studio, add it to the Contact page and
footer, and embed a Google Maps iframe with directions.

### 10. Placeholder domain references

Audit `metadataBase`, canonical URLs, and the sitemap generator's base URL
— confirm none of them still point at a demo/placeholder domain. They
should resolve to the real production domain (see #12).

---

## Priority 4 — Conversion / design fit

### 11. Add WhatsApp as a booking channel

Add a `wa.me` click-to-chat button with a pre-filled message (e.g. "Hi,
I'd like to book a session at Inked Attraction") as a primary CTA alongside
or instead of the email contact form. For a Lagos-market audience this
will convert meaningfully better than a form.

### 12. Move off the Netlify subdomain

Before this is promoted anywhere publicly, put it on a real custom domain
and update all metadata, canonical, and sitemap references to match.

### 13. Tone pass on "resident roster" copy

Lines like "every artist books their own calendar and sets their own rate"
read like boilerplate written for a larger multi-artist studio. For a
3–4 person, founder-led team, consider a lighter, more personal tone —
consistent with the founder-voiced copy already on the About page.

---

## Verification checklist (run after all fixes)

- [ ] `npm run build` succeeds with no errors
- [ ] No link reachable from the nav or footer returns a 404
- [ ] No testimonial shows a "Verified Client" badge unless it's a
      confirmed real, consented review
- [ ] Artist count in copy matches the actual roster length everywhere
- [ ] Old mock artist slugs redirect to the new ones rather than 404ing
- [ ] JSON-LD validates in Google's Rich Results Test
- [ ] Contact page shows a real, confirmed street address and an embedded map
- [ ] Booking wizard's confirmation summary is correct for both the Tattoo
      and Piercing branches
- [ ] A full-text search of the repo for leftover demo strings (anything
      not referencing "Inked Attraction," "Elizabeth," or "Lagos") turns up
      nothing new
