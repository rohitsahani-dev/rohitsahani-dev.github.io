"use client";

import { useMutation } from "@tanstack/react-query";

import { postJson } from "@/lib/api";

export function useSaveProgress() {
  return useMutation({
    mutationFn: (body: { animeSlug: string; episodeNumber: number; progress: number }) =>
      postJson("/user/history", body)
  });
}
