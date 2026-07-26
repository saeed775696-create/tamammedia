import { redirect } from "next/navigation";
import { getActiveUser } from "@/lib/api";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";

export default async function ChangePasswordPage() {
  const user = await getActiveUser();
  if (!user) redirect("/login");
  if (!user.mustChangePassword) redirect("/dashboard");

  return <ChangePasswordForm email={user.email} />;
}
