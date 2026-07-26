import HomeContent, {
  HomeTeamMember,
  HomePartner,
} from "@/components/HomeContent";
import Hero from "@/components/Hero";
import { PrismaTeamRepository } from "@/lib/repositories/team.repository";
import { PrismaPartnerRepository } from "@/lib/repositories/partner.repository";
import { Suspense } from "react";

// البيانات تتغير من لوحة التحكم — نجلبها عند كل طلب بدل التخزين الثابت
export const dynamic = "force-dynamic";

const teamRepository = new PrismaTeamRepository();
const partnerRepository = new PrismaPartnerRepository();

function HomeContentFallback() {
  return (
    <section className="section-y bg-surface-50" aria-busy="true" aria-live="polite">
      <div className="container-site space-y-8">
        <div className="mx-auto h-8 w-48 animate-pulse rounded-full bg-surface-200" />
        <div className="mx-auto h-12 w-full max-w-2xl animate-pulse rounded-2xl bg-surface-200" />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-80 animate-pulse rounded-3xl bg-surface-200" />
          ))}
        </div>
      </div>
    </section>
  );
}

async function HomeDataContent() {
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
