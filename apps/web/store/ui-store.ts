"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Language } from "@/lib/i18n";

interface UiState {
  language: Language;
  recentSearches: string[];
  setLanguage: (language: Language) => void;
  addRecentSearch: (query: string) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      language: "en",
      recentSearches: [],
      setLanguage: (language) => set({ language }),
      addRecentSearch: (query) =>
        set((state) => ({
          recentSearches: [query, ...state.recentSearches.filter((entry) => entry !== query)].slice(0, 6)
        }))
    }),
    {
      name: "kaistream-ui"
    }
  )
);
