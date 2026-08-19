export type Style = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  image: string;
};

export const styles: Style[] = [
  {
    id: "s1",
    slug: "custom-tattoos",
    name: "Custom Tattoos",
    summary: "One-of-one designs tailored to your story, placement, and long-term impact.",
    image: "/images/style-custom.svg",
  },
  {
    id: "s2",
    slug: "fine-line",
    name: "Fine Line",
    summary: "Delicate single-needle detail for ornamental and botanical work.",
    image: "/images/style-fineline.svg",
  },
  {
    id: "s3",
    slug: "traditional",
    name: "Traditional",
    summary: "Bold outlines, saturated color, and classic motif language.",
    image: "/images/style-traditional.svg",
  },
  {
    id: "s4",
    slug: "realism",
    name: "Realism",
    summary: "Soft gradients and texture for portraits, flora, and wildlife.",
    image: "/images/style-realism.svg",
  },
  {
    id: "s5",
    slug: "custom",
    name: "Custom Design",
    summary: "One-of-one compositions drawn around your idea and placement.",
    image: "/images/style-custom.svg",
  },
  {
    id: "s6",
    slug: "piercings",
    name: "Piercings",
    summary: "Precision piercings with curated jewelry and attentive aftercare guidance.",
    image: "/images/folio-2.svg",
  },
];
