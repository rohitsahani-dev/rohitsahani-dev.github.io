export const supportedLanguages = ["en", "ja"] as const;

export type Language = (typeof supportedLanguages)[number];

const dictionary = {
  en: {
    browse: "Browse",
    trending: "Trending",
    schedule: "Schedule",
    watchNow: "Watch Now",
    addToList: "Add to List",
    latestEpisodes: "Latest Episodes",
    topRated: "Top Rated"
  },
  ja: {
    browse: "ブラウズ",
    trending: "トレンド",
    schedule: "スケジュール",
    watchNow: "視聴する",
    addToList: "リストに追加",
    latestEpisodes: "最新話",
    topRated: "高評価"
  }
} as const;

export function t(language: Language, key: keyof (typeof dictionary)["en"]) {
  return dictionary[language][key];
}
