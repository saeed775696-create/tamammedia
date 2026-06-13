"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardNav() {
  return (
    <aside className="w-64 bg-white shadow p-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-4">Tamam Admin</h2>
      <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded">🏠 الرئيسية</Link>
      <Link href="/dashboard/contacts" className="p-2 hover:bg-gray-100 rounded">📧 الرسائل</Link>
      <Link href="/dashboard/portfolio" className="p-2 hover:bg-gray-100 rounded">🖼️ الأعمال</Link>
      <Link href="/dashboard/services" className="p-2 hover:bg-gray-100 rounded">⚙️ الخدمات</Link>
      <button
        onClick={() => signOut()}
        className="mt-auto p-2 text-red-500 hover:bg-gray-100 rounded"
      >
        🚪 تسجيل الخروج
      </button>
    </aside>
  );
}