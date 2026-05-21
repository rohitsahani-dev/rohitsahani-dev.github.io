"use client";

import { useQuery } from "@tanstack/react-query";

import { getSearchData } from "@/lib/api";

export function useSearchSuggestions(query: string) {
  return useQuery({
    queryKey: ["search-suggestions", query],
    queryFn: () => getSearchData({ q: query }),
    enabled: query.trim().length >= 2,
    staleTime: 60_000
  });
}
