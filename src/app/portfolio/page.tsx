import PortfolioContent, {
  PortfolioItemData,
} from "@/components/PortfolioContent";
import PortfolioHero from "@/components/PortfolioHero";
import { PrismaPortfolioRepository } from "@/lib/repositories/portfolio.repository";
import { Suspense } from "react";

// البيانات تتغير من لوحة التحكم — نجلبها عند كل طلب
export const dynamic = "force-dynamic";

const portfolioRepository = new PrismaPortfolioRepository();

function PortfolioGridFallback() {
  return (
    <section className="section-y bg-slate-50" aria-busy="true" aria-live="polite">
      <div className="container-site">
        <div className="mx-auto mb-12 h-12 w-full max-w-xl animate-pulse rounded-full bg-surface-200" />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="aspect-card animate-pulse rounded-2xl bg-surface-200" />
          ))}
        </div>
      </div>
    </section>
  );
}

async function PortfolioData() {
  // جلب البيانات من الخادم مباشرة — تظهر في HTML الأولي (أفضل لـ SEO)
  const { items } = await portfolioRepository
    .findAll({ page: 1, skip: 0, limit: 60 })
    .catch(() => ({ items: [], total: 0 }));

  // تبسيط البيانات المُرسلة للعميل (الحقول المستخدمة فقط)
  const data: PortfolioItemData[] = items.map((item) => ({
    id: item.id,
    titleEn: item.titleEn,
    titleAr: item.titleAr,
    descriptionEn: item.descriptionEn ?? undefined,
    descriptionAr: item.descriptionAr ?? undefined,
    imageUrl: item.imageUrl,
    category: item.category,
    clientName: item.clientName ?? undefined,
    featured: item.featured,
  }));

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
