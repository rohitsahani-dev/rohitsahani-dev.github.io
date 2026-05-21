import { getCategoryData } from "@/lib/api";
import { CategoryPage } from "@/components/anime/category-page";

export default async function MoviesPage() {
  return <CategoryPage title="Movies" description="Feature-length anime events, polished for premium living-room sessions." items={await getCategoryData("movies")} />;
}
