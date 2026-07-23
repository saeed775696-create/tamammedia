import { getAllContent } from "@/lib/content/service";
import LayoutHeaderClient from "./LayoutHeaderClient";

/**
 * يلف الـ Navbar والـ FloatingWhatsApp.
 * يقرأ المحتوى من DB على الـ server.
 */
export default async function LayoutHeader() {
  const content = await getAllContent();
  return <LayoutHeaderClient content={content} />;
}
