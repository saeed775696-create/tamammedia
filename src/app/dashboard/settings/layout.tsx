import { redirect } from "next/navigation";
import { getActiveUser } from "@/lib/api";

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const user = await getActiveUser();
  if (!user || user.role !== "admin") redirect("/dashboard");
  return children;
}
