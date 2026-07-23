import { getAllContent } from "@/lib/content/service";
import Footer from "./Footer";

/**
 * يلف الفوتر.
 * يقرأ المحتوى من DB على الـ server ثم يمرره للـ Footer (client).
 */
export default async function LayoutFooter() {
  const content = await getAllContent();
  return <Footer content={content} />;
}
