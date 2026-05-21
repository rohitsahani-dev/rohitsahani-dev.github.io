"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getBrowseData } from "@/lib/api";

export function useInfiniteBrowse(filters: Record<string, string | number | boolean | null | undefined>) {
  return useInfiniteQuery({
    queryKey: ["browse", filters],
    queryFn: ({ pageParam }) =>
      getBrowseData({
        ...filters,
        page: pageParam,
        limit: 12
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined)
  });
}
