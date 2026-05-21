import { getCategoryData } from "@/lib/api";
import { CategoryPage } from "@/components/anime/category-page";

export default async function TopRatedPage() {
  return <CategoryPage title="Top Rated" description="Highest-scoring productions across the KaiStream catalog." items={await getCategoryData("top-rated")} />;
}
