export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "first-tattoo-checklist",
    title: "Your first tattoo checklist",
    excerpt: "A calm, practical list so your first session feels intentional—not rushed.",
    date: "2026-05-12",
    readMinutes: 4,
    body: [
      "Choose a placement you can live with publicly and privately. Visibility changes how a piece ages in your daily life.",
      "Bring clear references and an open mind. The strongest designs are collaborations, not photocopies.",
      "Plan recovery like part of the appointment: loose clothing, gentle soap, and time away from pools and sun.",
    ],
  },
  {
    slug: "fine-line-longevity",
    title: "How fine line ages well",
    excerpt: "Spacing, skin, and aftercare matter as much as the needle choice.",
    date: "2026-06-02",
    readMinutes: 5,
    body: [
      "Fine line thrives when negative space is respected. Crowding thin lines is what makes pieces blur early.",
      "Artist technique and your aftercare both protect crisp edges. Moisturize lightly—never drown the skin.",
      "Sun is the long game. SPF on healed work keeps contrast from washing out.",
    ],
  },
  {
    slug: "cover-up-truths",
    title: "Cover-up truths before you book",
    excerpt: "Coverage is design problem-solving, not magic erasure.",
    date: "2026-07-18",
    readMinutes: 6,
    body: [
      "Dark existing ink limits palette and composition. Expect a larger or denser redesign in most cases.",
      "Healed photos of the current tattoo help more than descriptions. Bring them to the consult.",
      "Sometimes a rework or partial blast-over is wiser than a full cover. We’ll say so honestly.",
    ],
  },
  {
    slug: "studio-hygiene-standard",
    title: "Our hygiene standard, explained",
    excerpt: "What “clean studio” should mean in practice.",
    date: "2026-08-01",
    readMinutes: 3,
    body: [
      "Single-use needles, barriers on machines, and fresh gloves for setup and tattooing are non-negotiable.",
      "Surfaces are disinfected between clients, and ink caps are never reused.",
      "Ask questions. A studio that welcomes them usually runs a tighter ship.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
