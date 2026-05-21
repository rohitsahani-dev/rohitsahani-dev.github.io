import { getCategoryData } from "@/lib/api";
import { CategoryPage } from "@/components/anime/category-page";

export default async function LatestPage() {
  return <CategoryPage title="Latest Episodes" description="Newly dropped episodes and fresh seasonal additions, updated in a fast-scroll shelf." items={await getCategoryData("latest")} />;
}
