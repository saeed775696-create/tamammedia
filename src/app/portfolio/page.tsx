import PortfolioContent, {
  PortfolioItemData,
} from "@/components/PortfolioContent";
import { PrismaPortfolioRepository } from "@/lib/repositories/portfolio.repository";

// البيانات تتغير من لوحة التحكم — نجلبها عند كل طلب
export const dynamic = "force-dynamic";

const portfolioRepository = new PrismaPortfolioRepository();

export default async function PortfolioPage() {
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

  return <PortfolioContent items={data} />;
}
