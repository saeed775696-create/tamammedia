import { getAllContent } from "@/lib/content/service";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
  const content = await getAllContent();
  return <AboutClient content={content} />;
}
