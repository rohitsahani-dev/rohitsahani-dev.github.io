import { getCategoryData } from "@/lib/api";
import { CategoryPage } from "@/components/anime/category-page";

export default async function DubbedPage() {
  return <CategoryPage title="Dubbed" description="English-ready releases for lean-back bingeing with zero subtitle friction." items={await getCategoryData("dubbed")} />;
}
