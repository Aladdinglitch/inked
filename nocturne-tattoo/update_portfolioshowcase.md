# SELECTED WORK — PREMIUM DM HOVER INTERACTION

Redesign ONLY the interaction behavior of the Selected Work portfolio
cards.

Do not redesign the entire section or change its existing layout,
content structure, typography, or overall design language.

The goal is to create a sophisticated "discover the reaction" interaction
that feels inspired by modern messaging interfaces while remaining
original to Inked Attraction.

============================================================
CARD DEFAULT STATE
============================================================

When the portfolio card is idle:

- Display the artwork prominently.
- Keep the image clean and unobstructed.
- Keep the portfolio title visible in its existing position.
- DO NOT display the caption.
- DO NOT display the DM bubble.
- DO NOT add unnecessary icons or interface elements.
- Preserve the premium editorial appearance.

The image must remain the visual focus.

============================================================
HOVER / FOCUS STATE
============================================================

When the user hovers over the card or focuses it using the keyboard:

1. Apply a very subtle image scale:

   scale: 1 → 1.025

2. Add a subtle cinematic gradient overlay.

3. Reveal the caption as a small floating DM-style message.

4. Animate the message from slightly below its final position:

   opacity: 0 → 1
   y: 12px → 0
   scale: 0.97 → 1

5. Use a smooth premium ease-out transition.

6. Do not use bounce effects.

7. Do not make the animation feel exaggerated.

The entire interaction should feel like one coordinated motion.

============================================================
DM BUBBLE POSITION
============================================================

Position the message near the:

BOTTOM-LEFT

of the image.

Keep it visually separated from the card edges using comfortable
padding.

The bubble should remain relatively small.

Do not allow it to cover the artwork's important focal point.

The portfolio image remains dominant.

============================================================
DM BUBBLE STYLE
============================================================

Create an original premium messaging bubble inspired by modern
Instagram/Apple messaging interfaces.

DO NOT copy Instagram's interface exactly.

Do not use the Instagram logo.

Do not use Instagram branding.

Use:

- translucent glass surface
- subtle backdrop blur
- soft border
- low-opacity highlight
- refined shadow
- rounded corners
- slightly asymmetric chat-bubble geometry
- bright, highly readable text

Suggested visual characteristics:

background:
rgba(255,255,255,0.08–0.14)

backdrop-filter:
blur(12px–18px)

border:
1px solid rgba(255,255,255,0.12–0.18)

shadow:
subtle and diffused

Keep the effect elegant.

Do not make the bubble look like a generic glassmorphism component.

============================================================
MESSAGE CONTENT
============================================================

Use the existing caption values.

Example:

"The details are unbelievably clean. I'm obsessed."

"The contrast and depth are just perfect. 🔥"

"You captured every expression beautifully."

"It feels personal, timeless, and exactly like me."

"This came out even better than I imagined."

"Absolutely beautiful. Every detail feels intentional."

These should be treated as interface copy unless they are confirmed
real testimonials.

Do NOT add fake sender names, avatars, timestamps, read receipts,
verification badges, or fabricated conversation history.

============================================================
MESSAGE TYPOGRAPHY
============================================================

The caption should use:

- small-to-medium text
- strong readability
- comfortable line height
- restrained letter spacing
- no excessive font weight

The bubble should feel like a short personal reaction rather than a
large marketing statement.

============================================================
IMAGE OVERLAY
============================================================

On hover/focus:

Add a subtle gradient primarily toward the bottom-left where the bubble
appears.

The overlay should improve readability without destroying the
photography.

Example conceptual gradient:

transparent
→
very subtle dark/translucent gradient
→
slightly stronger near the bottom-left

Do not permanently darken the image.

============================================================
TITLE BEHAVIOR
============================================================

The portfolio title should remain clean and stable.

Do not make the title disappear simply because the DM bubble appears.

The hierarchy should be:

1. Artwork
2. Portfolio title
3. DM reaction

The reaction is a discovery layer, not the primary content.

============================================================
MOUSE LEAVE
============================================================

When the cursor leaves:

- DM bubble fades out
- DM bubble moves slightly downward
- overlay fades away
- image returns smoothly to scale 1
- card returns to its default state

Do not abruptly remove the bubble.

============================================================
KEYBOARD ACCESSIBILITY
============================================================

The same interaction must work when the portfolio card receives
keyboard focus.

Use:

focus-visible

to provide a clear but elegant focus indication.

Do not make keyboard users dependent on mouse hover.

============================================================
MOBILE / TOUCH
============================================================

Hover does not reliably exist on mobile.

Implement an appropriate touch/focus behavior.

The caption must remain discoverable and accessible without requiring
a mouse.

Do not create accidental navigation or interaction conflicts.

The interaction must work naturally on:

- desktop
- tablet
- mobile

============================================================
REDUCED MOTION
============================================================

Respect:

prefers-reduced-motion: reduce

When reduced motion is enabled:

- disable image scaling
- disable sliding motion
- disable unnecessary transform animation
- use a simple opacity transition or static reveal

Never compromise accessibility for visual effects.

============================================================
PERFORMANCE
============================================================

The interaction must be lightweight.

Do NOT:

- introduce another animation library
- add unnecessary JavaScript
- trigger expensive re-renders
- manipulate layout dimensions
- cause layout shifts
- preload unnecessary assets
- interfere with image lazy-loading
- degrade scrolling performance

Use the project's existing:

Framer Motion
Tailwind CSS
Next.js

implementation patterns.

Prefer transform and opacity animations because they are GPU-friendly.

============================================================
RESPONSIVE BEHAVIOR
============================================================

Desktop:

Elegant hover discovery.

Tablet:

Support focus/touch interaction.

Mobile:

Ensure the message can be discovered without hover.

The card must remain visually clean at all breakpoints.

The DM bubble must never overflow outside the image/card container.

============================================================
FINAL EXPERIENCE
============================================================

The final interaction should feel like:

A premium tattoo photograph
+
editorial portfolio presentation
+
subtle Apple-style glass
+
modern private-message interaction
+
cinematic micro-animation

The user should initially see:

beautiful artwork + title

Then, when they interact:

the image subtly breathes
→
the atmosphere darkens slightly
→
a small translucent message rises from the lower-left
→
the viewer discovers a short reaction

Keep the effect sophisticated, restrained, fast, and expensive-looking.

Do not make it flashy.

Do not make it look like a template.

Do not redesign the rest of the Selected Work section.


# INKED ATTRACTION — SELECTED WORK PREMIUM INTERACTION

Redesign ONLY the interaction behavior of the Selected Work portfolio
cards.

Do not redesign the entire section or change its existing layout,
content structure, typography, or overall design language.

The goal is to create a sophisticated "discover the reaction"
interaction combining premium tattoo editorial presentation with a
modern private-message-inspired interface.

============================================================
SELECTED WORK CONTENT
============================================================

Replace the existing generic titles:

Portfolio image 01
Portfolio image 02
Portfolio image 03
Portfolio image 04
Portfolio image 05
Portfolio image 06

with the following approved titles and captions.

------------------------------------------------------------
01
------------------------------------------------------------

Title:

Fine Line Precision

Caption:

"The details are unbelievably clean. I'm obsessed."

------------------------------------------------------------
02
------------------------------------------------------------

Title:

Blackwork Study

Caption:

"The contrast and depth are just perfect. 🔥"

------------------------------------------------------------
03
------------------------------------------------------------

Title:

Portrait in Ink

Caption:

"You captured every expression beautifully."

------------------------------------------------------------
04
------------------------------------------------------------

Title:

A Story in Ink

Caption:

"It feels personal, timeless, and exactly like me."

------------------------------------------------------------
05
------------------------------------------------------------

Title:

Bold Expression

Caption:

"This came out even better than I imagined."

------------------------------------------------------------
06
------------------------------------------------------------

Title:

Timeless Work

Caption:

"Absolutely beautiful. Every detail feels intentional."

IMPORTANT:

These captions should be treated as UI/editorial reaction copy unless
they are independently confirmed as real client testimonials.

Do NOT attribute them to named clients.

Do NOT add:

- fake profile names
- fake avatars
- fake timestamps
- fake read receipts
- fake verification badges
- fake review platforms
- fake ratings

============================================================
DEFAULT CARD STATE
============================================================

When the card is idle:

- Display the artwork prominently.
- Display the title.
- Keep the image clean and unobstructed.
- Hide the caption completely.
- Do not display the DM bubble.
- Do not add unnecessary UI.
- Preserve the premium editorial aesthetic.

The artwork remains the primary visual element.

============================================================
HOVER / FOCUS INTERACTION
============================================================

When the user hovers over the card OR focuses it using the keyboard:

IMAGE:

Animate subtly:

scale:
1 → 1.025

Do not over-zoom.

OVERLAY:

Introduce a subtle cinematic gradient overlay.

CAPTION:

Reveal the caption as a floating DM-inspired message bubble.

Animation:

opacity:
0 → 1

y:
12px → 0

scale:
0.97 → 1

Use Framer Motion and a refined ease-out curve.

Suggested duration:

0.35s–0.5s

The animation must feel:

- smooth
- elegant
- fast
- cinematic
- premium

============================================================
DM MESSAGE BUBBLE
============================================================

Position:

Bottom-left of the image.

The bubble should appear to emerge naturally from the lower portion of
the composition.

Style it as an ORIGINAL premium messaging component inspired by modern
DM interfaces.

Do NOT copy Instagram's interface.

Do NOT use the Instagram logo or branding.

Use:

- translucent glass
- subtle backdrop blur
- refined border
- soft shadow
- rounded corners
- slightly asymmetric chat-bubble geometry
- high-contrast text
- restrained spacing

Suggested visual treatment:

background:
rgba(255,255,255,0.08–0.14)

backdrop-filter:
blur(12px–18px)

border:
1px solid rgba(255,255,255,0.12–0.18)

shadow:
soft, diffused shadow

The bubble should feel luxurious and understated.

============================================================
CAPTION TYPOGRAPHY
============================================================

Keep the message relatively small.

The caption should feel like a personal reaction rather than a
marketing headline.

Use:

- excellent contrast
- comfortable line-height
- medium/regular weight
- restrained letter spacing
- appropriate max-width

The bubble should never overpower the artwork.

============================================================
IMAGE OVERLAY
============================================================

On hover/focus, introduce a subtle gradient primarily toward the
bottom-left.

The gradient should make the caption readable while preserving the
photograph.

Do not make the entire image significantly darker.

When interaction ends, smoothly remove the overlay.

============================================================
TITLE BEHAVIOR
============================================================

The title remains visible during the entire interaction.

Do NOT replace the title with the caption.

Hierarchy:

1. Artwork
2. Title
3. DM-style reaction

The title should remain stable while the caption becomes the interactive
discovery layer.

============================================================
MOUSE LEAVE
============================================================

When the cursor leaves:

- caption fades out
- caption moves subtly downward
- bubble scale returns toward 0.97
- overlay fades out
- image returns from 1.025 → 1
- card returns to its original state

Everything should transition smoothly.

Do not abruptly remove elements.

============================================================
MOBILE / TOUCH
============================================================

Do not rely exclusively on hover.

Mobile devices do not consistently support hover.

Support:

- touch
- focus
- keyboard interaction

The caption must remain accessible and discoverable on mobile.

Do not create interaction conflicts with links or buttons.

============================================================
ACCESSIBILITY
============================================================

Maintain all existing accessibility features.

Ensure:

- keyboard focus works
- focus-visible styling remains clear
- screen readers can access the title and caption
- sufficient color contrast
- no essential information depends solely on hover
- reduced-motion users receive an accessible alternative

Respect:

prefers-reduced-motion: reduce

When reduced motion is enabled:

- remove image scaling
- remove sliding transforms
- minimize animation
- use a subtle opacity transition or static reveal

============================================================
PERFORMANCE
============================================================

The interaction must not negatively affect scrolling performance.

Use the existing:

- Next.js
- Framer Motion
- Tailwind CSS

architecture.

Do NOT introduce another animation library.

Use transform and opacity for animation wherever possible.

Avoid:

- layout-triggering animations
- unnecessary re-renders
- expensive scroll listeners
- excessive JavaScript
- image duplication
- unnecessary asset loading

The portfolio must remain fast and smooth.

============================================================
FINAL VISUAL EXPERIENCE
============================================================

The final experience should feel like:

Luxury tattoo editorial
+
cinematic photography
+
Apple-inspired glass
+
modern private-message interaction
+
subtle micro-animation

DEFAULT:

Beautiful artwork
+
refined title

INTERACTION:

Artwork subtly breathes
→
overlay gently appears
→
DM-style message rises from the lower-left
→
caption becomes visible
→
user feels like they discovered a private reaction to the artwork

The interaction must feel sophisticated, restrained, original, and
custom-designed specifically for Inked Attraction.

Do not make it flashy.

Do not make it feel like a generic template.

Do not redesign the rest of the Selected Work section.

============================================================
FINAL DATA STRUCTURE
============================================================

Use this content structure for the six portfolio items:

01:
title: "Fine Line Precision"
caption: "The details are unbelievably clean. I'm obsessed."

02:
title: "Blackwork Study"
caption: "The contrast and depth are just perfect. 🔥"

03:
title: "Portrait in Ink"
caption: "You captured every expression beautifully."

04:
title: "A Story in Ink"
caption: "It feels personal, timeless, and exactly like me."

05:
title: "Bold Expression"
caption: "This came out even better than I imagined."

06:
title: "Timeless Work"
caption: "Absolutely beautiful. Every detail feels intentional."

Implement the title and caption from the portfolio data rather than
hardcoding them inside the visual component.

This keeps the component reusable and allows future portfolio items to
use the same interaction system.