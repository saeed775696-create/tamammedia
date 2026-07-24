# تمام ميديا | Tamam Media

وكالة تسويق رقمي يمنية متخصصة في بناء العلامات التجارية وحلول الويب المتكاملة.

## 🛠️ التقنيات المستخدمة

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL (على Supabase) عبر Prisma 5
- **Auth**: NextAuth.js 4 (Credentials provider)
- **Storage**: Supabase Storage (لرفع الصور)
- **Validation**: Zod 4
- **Icons**: lucide-react

## 🚀 البدء السريع

### 1. المتطلبات

- Node.js 18+
- npm أو pnpm

### 2. التثبيت

```bash
git clone https://github.com/saeed775696-create/tamammedia.git
cd tamammedia
npm install
```

### 3. إعداد متغيرات البيئة

```bash
cp .env.example .env.local
```

عدّل `.env.local` (أو `.env`) وأدخل القيم الفعلية:

```env
# قاعدة بيانات Supabase PostgreSQL
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:5432/postgres?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 4. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
npm run db:generate

# دفع المخطط إلى PostgreSQL (ينشئ الجداول + الفهارس)
npm run db:push
```

### 5. إنشاء حساب المسؤول

```bash
npm run create-admin
```

سيطلب البريد وكلمة المرور تفاعليًا.

> **ملاحظة**: إذا كان لديك admin موجود مسبقًا بكلمة مرور قديمة (مثل `admin123`)،
> استخدم `npx tsx scripts/createAdmin.ts` لتحديثه بـ `upsert` آمن.

### 6. تشغيل المشروع

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

- الموقع العام: `/`
- لوحة التحكم: `/dashboard` (يتطلب تسجيل دخول)
- تسجيل الدخول: `/login`

## 📜 الأوامر المتاحة

| الأمر | الوصف |
|---|---|
| `npm run dev` | تشغيل خادم التطوير |
| `npm run build` | بناء نسخة الإنتاج |
| `npm run start` | تشغيل نسخة الإنتاج |
| `npm run lint` | فحص ESLint |
| `npm run typecheck` | فحص أنواع TypeScript |
| `npm run db:generate` | توليد Prisma Client |
| `npm run db:push` | دفع المخطط إلى DB |
| `npm run db:migrate` | إنشاء ترحيل جديد |
| `npm run db:studio` | فتح Prisma Studio |
| `npm run create-admin` | إنشاء/تحديث حساب admin |

## 📁 هيكل المشروع

```
src/
├── app/                      # Next.js App Router
│   ├── (public pages)/       # الصفحات العامة
│   ├── dashboard/            # لوحة التحكم (تتطلب auth)
│   ├── api/                  # API Routes
│   ├── layout.tsx            # الـ Layout الجذري
│   ├── page.tsx              # الصفحة الرئيسية
│   ├── sitemap.ts            # خريطة الموقع
│   └── robots.ts             # robots.txt
├── components/               # مكوّنات React
│   ├── dashboard/            # مكوّنات لوحة التحكم
│   └── ui/                   # Design System
├── config/                   # إعدادات التطبيق
├── context/                  # React Contexts
├── lib/                      # منطق الأعمال
│   ├── api/                  # أدوات API
│   ├── repositories/         # طبقة الوصول للبيانات
│   ├── services/             # طبقة الخدمات
│   ├── validations/          # مخططات Zod
│   └── providers/            # مزودات خارجية
├── i18n/                     # الترجمات
└── types/                    # تعريفات الأنواع
```

## 🔒 الأمان

- جميع APIs الإدارة محمية بـ `getServerSession`
- التحقق من الدور `admin` قبل الوصول للوحة التحكم
- Honeypot على نموذج الاتصال
- Rate limiting على `/api/track/whatsapp`
- فحص نوع وحجم الملفات المرفوعة
- كوكيز `Secure` و `HttpOnly` في الإنتاج

## 🌐 النشر

### Vercel (موصى به)

1. ارفع المستودع إلى GitHub
2. اربطه بـ Vercel: https://vercel.com/new
3. **أضف متغيرات البيئة** في Vercel Project Settings → Environment Variables:

   | المتغير | القيمة |
   |---|---|
   | `DATABASE_URL` | `postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true` |
   | `DIRECT_URL` | `postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:5432/postgres?sslmode=require` |
   | `NEXTAUTH_SECRET` | اضغط "Generate" أو `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | `https://your-app.vercel.app` (رابط Vercel النهائي) |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://PROJECT_REF.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | مفتاح anon من Supabase Dashboard |
   | `SUPABASE_SERVICE_ROLE_KEY` | مفتاح service role من Supabase Dashboard |

4. انشر — Vercel سيبني المشروع تلقائيًا

> ⚠️ **تنبيه**: تأكد أن `NEXTAUTH_URL` يطابق رابط Vercel الفعلي (`https://your-app.vercel.app`) وليس `localhost`.
> أضف المتغيرات لكل البيئات (Production, Preview, Development).

### Docker / Self-hosted

```bash
npm run build
npm run start
```

### حل مشكلات النشر الشائعة

#### "Application error: a client-side exception has occurred"

هذا الخطأ يحدث عادةً بسبب:
1. **نقص متغيرات البيئة** على Vercel — راجع القائمة أعلاه
2. **`NEXTAUTH_URL` خاطئ** — يجب أن يطابق رابط Vercel
3. **`NEXTAUTH_SECRET` غير مضبوط** في الإنتاج

#### صفحة بيضاء بعد تسجيل الدخول

تأكد أن:
- `NEXTAUTH_URL` يطابق الرابط الفعلي
- `DATABASE_URL` و `DIRECT_URL` صحيحان (اختبرهما من Supabase Dashboard)
- المتغيرات مضبوطة لـ Production environment (وليس Preview فقط)

## 📝 الترخيص

جميع الحقوق محفوظة © تمام ميديا

---

**تصميم وتطوير**: سعيد الشدادي | +967 736 458 132
