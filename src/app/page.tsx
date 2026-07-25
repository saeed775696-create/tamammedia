import HomeContent, {
  HomeTeamMember,
  HomePartner,
} from "@/components/HomeContent";
import { PrismaTeamRepository } from "@/lib/repositories/team.repository";
import { PrismaPartnerRepository } from "@/lib/repositories/partner.repository";

// البيانات تتغير من لوحة التحكم — نجلبها عند كل طلب بدل التخزين الثابت
export const dynamic = "force-dynamic";

const teamRepository = new PrismaTeamRepository();
const partnerRepository = new PrismaPartnerRepository();

export default async function HomePage() {
  // جلب البيانات من الخادم مباشرة — تظهر في HTML الأولي (أفضل لـ SEO وسرعة العرض)
  const [teamResult, partnersResult] = await Promise.all([
    teamRepository.findAll({ page: 1, skip: 0, limit: 12 }).catch(() => ({ items: [], total: 0 })),
    partnerRepository.findAll({ page: 1, skip: 0, limit: 20 }).catch(() => ({ items: [], total: 0 })),
  ]);

  // تبسيط البيانات المُرسلة للعميل (الحقول المستخدمة فقط — حمولة أخف)
  const team: HomeTeamMember[] = teamResult.items.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    bio: m.bio ?? undefined,
    imageUrl: m.imageUrl ?? undefined,
  }));

  const partners: HomePartner[] = partnersResult.items.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: p.imageUrl,
    website: p.website ?? undefined,
  }));

  return <HomeContent team={team} partners={partners} />;
}
