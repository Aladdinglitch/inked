export type PortfolioItem = {
  id: string;
  title: string;
  category: "fine-line" | "traditional" | "realism" | "custom" | "piercings";
  artistId: string;
  image: string;
  height: "sm" | "md" | "lg";
};

const portfolioEntries: Omit<PortfolioItem, "id" | "artistId">[] = [
  { title: "Floral contour", category: "fine-line", image: "/images/folio-1.svg", height: "lg" },
  { title: "Piercing placement", category: "piercings", image: "/images/folio-2.svg", height: "md" },
  { title: "Botanical study", category: "fine-line", image: "/images/folio-3.svg", height: "lg" },
  { title: "Classic motif", category: "traditional", image: "/images/folio-4.svg", height: "sm" },
  { title: "Portrait study", category: "realism", image: "/images/folio-5.svg", height: "md" },
  { title: "Custom composition", category: "custom", image: "/images/folio-6.svg", height: "lg" },
  { title: "Ornamental linework", category: "fine-line", image: "/images/folio-7.svg", height: "sm" },
  { title: "Personal design", category: "custom", image: "/images/folio-8.svg", height: "md" },
];

export const portfolioItems: PortfolioItem[] = portfolioEntries.map((entry, index) => ({
  ...entry,
  id: `portfolio-${index + 1}`,
  artistId: "a1",
}));
