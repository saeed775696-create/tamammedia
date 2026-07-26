import PortfolioContent from "@/components/PortfolioContent";
import PortfolioHero from "@/components/PortfolioHero";
import { getPortfolioList } from "@/lib/public-content.server";
import { Suspense } from "react";

function PortfolioGridFallback() {
  return (
    <section className="section-y bg-slate-50" aria-busy="true" aria-live="polite">
      <div className="container-site">
        <div className="skeleton mx-auto mb-12 h-12 w-full max-w-xl rounded-full" />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="skeleton aspect-card rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

async function PortfolioData() {
  const data = await getPortfolioList().catch(() => []);

  return <PortfolioContent items={data} showHero={false} />;
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PortfolioHero />
      <Suspense fallback={<PortfolioGridFallback />}>
        <PortfolioData />
      </Suspense>
    </div>
  );
}
