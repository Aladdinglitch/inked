import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse the custom tattoo and piercing portfolio of Inked Attraction Tattoo & Piercing Studio.",
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
