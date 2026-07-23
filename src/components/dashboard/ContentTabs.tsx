"use client";

import { LayoutDashboard, Users, Phone, Search, Settings } from "lucide-react";

type Tab = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const tabs: Tab[] = [
  { id: "hero", label: "الرئيسية", icon: LayoutDashboard },
  { id: "about", label: "من نحن", icon: Users },
  { id: "contact", label: "التواصل", icon: Phone },
  { id: "seo", label: "SEO", icon: Search },
  { id: "general", label: "عام", icon: Settings },
];

type Props = {
  active: string;
  onChange: (id: string) => void;
};

/** Tabs للمحتوى — أفقي على الديسكتوب، أفقي قابل للتمرير على الموبايل */
export default function ContentTabs({ active, onChange }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-1.5 flex gap-1 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
              isActive
                ? "bg-[#21214f] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Icon size={14} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
