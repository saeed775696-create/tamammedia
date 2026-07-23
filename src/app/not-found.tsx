import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl font-black text-[#da8827] mb-4">404</div>
        <h1 className="text-2xl font-bold text-[#21214f] mb-2">
          الصفحة غير موجودة
        </h1>
        <p className="text-gray-500 mb-6 leading-relaxed">
          عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#da8827] text-white font-medium rounded-xl hover:bg-[#b8701e] transition-colors"
        >
          <Home size={18} />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
