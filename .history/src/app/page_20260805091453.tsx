import NewHomepage from "@/components/redesign/NewHomepage";

export default function HomePage() {
  return <NewHomepage />;
        <FadeUp>
          <p className="eyebrow mb-4">The Ink Attraction approach</p>
          <p className="display text-4xl leading-[.96] text-foreground md:text-5xl">A tattoo should feel like it was always meant to be there.</p>
        </FadeUp>
        <FadeUp delay={0.1} className="max-w-xl md:justify-self-end">
          <p className="text-base leading-8 text-muted-foreground">We make space for curiosity, collaboration, and careful decisions. Every appointment begins with your idea and ends with a piece that feels unmistakably your own.</p>
          <div className="mt-7 flex items-center gap-3 text-sm text-primary">
            <span className="size-2 bg-primary" /> Consultation-led, artist-matched, and made with care.
          </div>
        </FadeUp>
      </section>
      <StylesPreview />
      <FeaturedArtists />
      <RecentPortfolio />
      <CtaBanner
        title="Your next piece begins with a conversation."
        subtitle="Tell us about your idea, placement, and references. We’ll thoughtfully match you with the right artist."
        label="Request a consultation"
      />
      <Testimonials />
      <InstagramFeed />
    </>
  );
}
