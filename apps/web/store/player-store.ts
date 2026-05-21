"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlayerState {
  autoNext: boolean;
  theaterMode: boolean;
  currentServer: string | null;
  setAutoNext: (value: boolean) => void;
  setTheaterMode: (value: boolean) => void;
  setCurrentServer: (value: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      autoNext: true,
      theaterMode: false,
      currentServer: null,
      setAutoNext: (value) => set({ autoNext: value }),
      setTheaterMode: (value) => set({ theaterMode: value }),
      setCurrentServer: (value) => set({ currentServer: value })
    }),
    {
      name: "kaistream-player"
    }
  )
);
