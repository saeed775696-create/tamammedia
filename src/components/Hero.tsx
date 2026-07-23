import { getAllContent } from "@/lib/content/service";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const content = await getAllContent();
  return <HeroClient content={content} />;
}
