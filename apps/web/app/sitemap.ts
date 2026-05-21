import type { MetadataRoute } from "next";
import { animeCatalog } from "@kaistream/shared";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const routes = [
    "",
    "/browse",
    "/search",
    "/schedule",
    "/genres",
    "/trending",
    "/movies",
    "/dubbed",
    "/top-rated",
    "/latest",
    "/dashboard",
    "/history",
    "/favorites",
    "/login",
    "/register",
    "/settings",
    "/admin"
  ];

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date()
    })),
    ...animeCatalog.map((anime) => ({
      url: `${baseUrl}/anime/${anime.slug}`,
      lastModified: new Date()
    }))
  ];
}
