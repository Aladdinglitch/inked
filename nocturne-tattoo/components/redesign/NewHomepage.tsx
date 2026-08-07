"use client";
import dynamic from "next/dynamic";
import HeroSplit from "./HeroSplit";
import Marquee from "./Marquee";
import FeatureSpotlight from "./FeatureSpotlight";
import PortfolioShowcase from "./PortfolioShowcase";
import TestimonialsWall from "./TestimonialsWall";
import ScrollProgress from "./ScrollProgress";
import styles from "./redesign.module.css";

// Lazy load custom cursor to avoid hydration issues
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function NewHomepage() {
  return (
    <div className={`${styles.theme} min-h-screen antialiased`}>
      <CustomCursor />
      <ScrollProgress />
      {/* Note: <main> is provided by site-chrome.tsx — do not add another here */}
      <div>
        <HeroSplit />
        <Marquee />
        <FeatureSpotlight />
        <PortfolioShowcase />
        <TestimonialsWall />
      </div>
    </div>
  );
}
