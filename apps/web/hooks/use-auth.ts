"use client";

import { useQuery } from "@tanstack/react-query";

import { requestAuthMe } from "@/lib/client-api";

export function useAuth() {
  return useQuery({
    queryKey: ["auth-me"],
    queryFn: requestAuthMe,
    retry: false
  });
}
