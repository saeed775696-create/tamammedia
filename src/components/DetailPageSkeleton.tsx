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
          <div className="skeleton skeleton-dark h-12 w-full max-w-xl rounded-2xl md:h-16" />
          <div className="skeleton skeleton-dark mt-6 h-5 w-48 rounded-full" />
        </div>
      </section>

      <div className="container-site -mt-10 relative z-10 pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 rounded-3xl bg-white p-6 shadow-lg lg:col-span-2 md:p-10">
            <div className="skeleton aspect-video rounded-2xl" />
            <div className="skeleton h-8 w-2/3 rounded-xl" />
            <div className="skeleton h-28 rounded-2xl" />
          </div>
          <div className="skeleton h-72 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
