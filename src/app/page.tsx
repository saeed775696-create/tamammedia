import HomeContent from "@/components/HomeContent";
import Hero from "@/components/Hero";
import { getHomepageContent } from "@/lib/homepage-content.server";
import { Suspense } from "react";

function HomeContentFallback() {
  return (
    <section className="section-y bg-surface-50" aria-busy="true" aria-live="polite">
      <div className="container-site space-y-8">
        <div className="skeleton mx-auto h-8 w-48 rounded-full" />
        <div className="skeleton mx-auto h-12 w-full max-w-2xl rounded-2xl" />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="skeleton h-80 rounded-3xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

async function HomeDataContent() {
  // This data is cached and tagged for instant invalidation from the dashboard.
  // It streams independently so a slow database never hides the hero.
  const { team, partners } = await getHomepageContent().catch(() => ({
    team: [],
    partners: [],
  }));

  return <HomeContent team={team} partners={partners} includeHero={false} />;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<HomeContentFallback />}>
        <HomeDataContent />
      </Suspense>
    </>
  );
}
