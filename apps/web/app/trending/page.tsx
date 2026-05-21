import { getCategoryData } from "@/lib/api";
import { CategoryPage } from "@/components/anime/category-page";

export default async function TrendingPage() {
  return <CategoryPage title="Trending" description="The titles dominating conversation, clicks, and watchlists right now." items={await getCategoryData("trending")} />;
}
