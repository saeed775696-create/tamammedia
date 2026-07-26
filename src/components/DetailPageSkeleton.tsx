interface DetailPageSkeletonProps {
  kind: "service" | "project";
}

export default function DetailPageSkeleton({ kind }: DetailPageSkeletonProps) {
  const label = kind === "service" ? "تفاصيل الخدمة" : "تفاصيل المشروع";

  return (
    <div className="min-h-screen bg-surface-50" aria-busy="true" aria-live="polite">
      <section className="relative min-h-[42vh] overflow-hidden bg-brand-900 px-4 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="absolute inset-0 bg-gradient-to-bl from-accent-500/15 via-transparent to-transparent" />
        <div className="container-site relative z-10 flex flex-col items-center text-center">
          <span className="mb-8 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white/90">
            {label}
          </span>
          <div className="h-12 w-full max-w-xl animate-pulse rounded-2xl bg-white/15 md:h-16" />
          <div className="mt-6 h-5 w-48 animate-pulse rounded-full bg-white/10" />
        </div>
      </section>

      <div className="container-site -mt-10 relative z-10 pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 rounded-3xl bg-white p-6 shadow-lg lg:col-span-2 md:p-10">
            <div className="aspect-video animate-pulse rounded-2xl bg-surface-200" />
            <div className="h-8 w-2/3 animate-pulse rounded-xl bg-surface-200" />
            <div className="h-28 animate-pulse rounded-2xl bg-surface-100" />
          </div>
          <div className="h-72 animate-pulse rounded-3xl bg-surface-200" />
        </div>
      </div>
    </div>
  );
}
