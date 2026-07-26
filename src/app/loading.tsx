import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-surface-50" aria-busy="true" aria-live="polite">
      <section className="section-bg-brand px-4 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="container-site flex flex-col items-center text-center">
          <Loader2 size={32} className="mb-6 animate-spin text-accent-300" />
          <div className="skeleton skeleton-dark h-12 w-full max-w-xl rounded-2xl md:h-16" />
          <div className="skeleton skeleton-dark mt-5 h-5 w-2/3 max-w-md rounded-full" />
        </div>
      </section>
      <div className="container-site -mt-10 relative z-10">
        <div className="skeleton h-64 rounded-3xl bg-white shadow-lg" />
      </div>
    </div>
  );
}
