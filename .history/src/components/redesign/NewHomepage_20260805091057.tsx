"use client";
import HeroSplit from "./HeroSplit";
import Marquee from "./Marquee";
import FeatureSpotlight from "./FeatureSpotlight";
import PortfolioShowcase from "./PortfolioShowcase";
import TestimonialsWall from "./TestimonialsWall";
import FooterPremium from "./FooterPremium";
import styles from "./redesign.module.css";

export default function NewHomepage() {
  return (
    <div className={`${styles.theme} min-h-screen antialiased`}>
      <main>
        <HeroSplit />
        <Marquee />
        <FeatureSpotlight />
        <PortfolioShowcase />
        <TestimonialsWall />
        <FooterPremium />
      </main>
    </div>
  );
}
