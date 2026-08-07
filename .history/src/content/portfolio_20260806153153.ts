export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  artistId: string;
  image: string;
  height: "sm" | "md" | "lg";
};

const categories = ["blackwork", "fine-line", "traditional", "realism", "custom", "piercings"] as const;
const heights: PortfolioItem["height"][] = ["sm", "md", "lg"];

const fwcImages = [
  "/images/fwc1.jpg",
  "/images/fwc2.jpg",
  "/images/fwc3.jpg",
  "/images/fwc4.jpg",
  "/images/fwc5.jpg",
  "/images/fwc6.jpg",
];

export const portfolioItems: PortfolioItem[] = Array.from({ length: 30 }, (_, i) => {
  const n = i + 1;
  return {
    id: `p${n}`,
    title: `Studio Study ${n}`,
    category: categories[i % categories.length],
    artistId: `a${(i % 5) + 1}`,
    image: i < 6 ? fwcImages[i] : `/images/folio-${(i % 8) + 1}.svg`,
    height: heights[i % heights.length],
  };
});
