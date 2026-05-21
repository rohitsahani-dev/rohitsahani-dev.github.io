import type {
  AnimeSeed,
  CommentSeed,
  EpisodeSeed,
  GenreSeed,
  ReviewSeed,
  StreamSourceSeed,
  StudioSeed,
  SubtitleSeed,
  UserSeed,
} from "./types.js";

export const genres: GenreSeed[] = [
  { slug: "action", name: "Action", description: "High-impact battles, chase scenes, and relentless momentum." },
  { slug: "sci-fi", name: "Sci-Fi", description: "Futuristic settings, advanced tech, and speculative worlds." },
  { slug: "fantasy", name: "Fantasy", description: "Magic systems, mythic creatures, and alternate realms." },
  { slug: "drama", name: "Drama", description: "Character-first stories with emotional stakes and growth." },
  { slug: "mystery", name: "Mystery", description: "Conspiracies, secrets, and slow-burn revelations." },
  { slug: "romance", name: "Romance", description: "Relationships that shape both the plot and the heroes." },
  { slug: "thriller", name: "Thriller", description: "Tense narratives with danger, urgency, and sharp twists." },
  { slug: "mecha", name: "Mecha", description: "Mechanical warfare, giant frames, and tactical combat." },
  { slug: "sports", name: "Sports", description: "Competitive arcs driven by teamwork and grit." },
  { slug: "slice-of-life", name: "Slice of Life", description: "Everyday rhythms, friendships, and personal moments." }
];

export const studios: StudioSeed[] = [
  { slug: "studio-aurora", name: "Studio Aurora", country: "Japan" },
  { slug: "cradle-nova", name: "Cradle Nova", country: "Japan" },
  { slug: "inkline-works", name: "Inkline Works", country: "Japan" },
  { slug: "pulse-engine", name: "Pulse Engine", country: "Japan" },
  { slug: "meridian-frame", name: "Meridian Frame", country: "Japan" }
];

const streamSources: StreamSourceSeed[] = [
  {
    name: "Nebula One",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    quality: "1080p",
    region: "Global"
  },
  {
    name: "Orion Edge",
    url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    quality: "720p",
    region: "Global"
  },
  {
    name: "Mirage CDN",
    url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    quality: "Auto",
    region: "Asia"
  }
];

const subtitles: SubtitleSeed[] = [
  {
    label: "English",
    language: "en",
    url: "/subtitles/english.vtt",
    default: true
  },
  {
    label: "Japanese",
    language: "ja",
    url: "/subtitles/japanese.vtt"
  }
];

const poster = (slug: string) => `/art/posters/${slug}.svg`;
const banner = (slug: string) => `/art/banners/${slug}.svg`;

function buildReviews(title: string): ReviewSeed[] {
  return [
    {
      author: "Mika Rowan",
      avatar: "MR",
      rating: 9.4,
      headline: `A gorgeous hook for ${title}`,
      body: `${title} balances spectacle with character work, and every episode ends with a payoff that feels earned instead of manufactured.`,
      createdAt: "2026-04-27T10:30:00.000Z"
    },
    {
      author: "Kenji Vale",
      avatar: "KV",
      rating: 8.9,
      headline: "Stylish without losing heart",
      body: "The direction is sleek, but the emotional throughline keeps the futuristic setting from ever feeling cold.",
      createdAt: "2026-05-02T18:15:00.000Z"
    }
  ];
}

function buildComments(title: string): CommentSeed[] {
  return [
    {
      author: "Sana Ives",
      avatar: "SI",
      message: `The world-building in ${title} is absurdly good. I need the next episode immediately.`,
      likes: 184,
      createdAt: "2026-05-05T08:10:00.000Z"
    },
    {
      author: "Joel Hart",
      avatar: "JH",
      message: "That ending shot deserves wallpaper status. The soundtrack is carrying hard too.",
      likes: 97,
      createdAt: "2026-05-06T22:40:00.000Z"
    }
  ];
}

function buildEpisodes(
  slug: string,
  title: string,
  count: number,
  hook: string
): EpisodeSeed[] {
  return Array.from({ length: count }, (_, index) => {
    const episodeNumber = index + 1;

    return {
      number: episodeNumber,
      slug: `${slug}-episode-${episodeNumber}`,
      title: `Episode ${episodeNumber}: ${hook} ${episodeNumber}`,
      synopsis: `${title} pushes deeper into ${hook.toLowerCase()} as alliances shift, hidden motives surface, and the city answers with new danger.`,
      duration: 24,
      airDate: new Date(Date.UTC(2026, 1, 1 + index * 7, 15, 0)).toISOString(),
      introStart: 15,
      introEnd: 89,
      thumbnailImage: banner(slug),
      sources: streamSources,
      subtitles
    };
  });
}

export const animeCatalog: AnimeSeed[] = [
  {
    slug: "neon-ronin-zero-eclipse",
    title: "Neon Ronin: Zero Eclipse",
    japaneseTitle: "ネオン浪人 零蝕",
    tagline: "A blade-for-hire stands between a drowned megacity and the AI moon watching it.",
    synopsis: "When orbital debris knocks Tokyo Veil into permanent night, courier swordsman Ren Saito is hired to protect a mysterious girl whose memory shard can reboot the city grid or erase what remains of it. Neon Ronin pairs kinetic rooftop combat with a conspiracy that runs from back-alley server temples to a moon station beyond the weather wall.",
    releaseYear: 2026,
    season: "Spring",
    type: "TV",
    status: "ONGOING",
    dubStatus: "BOTH",
    maturityRating: "16+",
    duration: 24,
    totalEpisodes: 12,
    averageRating: 9.3,
    ratingCount: 13492,
    views: 4812032,
    quality: "4K",
    featured: true,
    trending: true,
    latest: true,
    topRated: true,
    popularWeek: true,
    recommended: true,
    movie: false,
    bannerImage: banner("neon-ronin-zero-eclipse"),
    posterImage: poster("neon-ronin-zero-eclipse"),
    trailerUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    trailerThumbnail: banner("neon-ronin-zero-eclipse"),
    upcomingEpisodeAt: "2026-05-11T15:30:00.000Z",
    studios: ["studio-aurora"],
    genres: ["action", "sci-fi", "thriller"],
    themes: ["Cyberpunk", "Mercenary Bonds", "Lost Memory"],
    relatedSlugs: ["crimson-pulse-tokyo-2099", "lumen-protocol-aegis"],
    recommendationSlugs: ["moonwire-sonata", "tidebreaker-leviathan-code"],
    characters: [
      {
        name: "Ren Saito",
        role: "Lead",
        summary: "A former peacekeeper turned courier swordsman who masks grief with dry humor."
      },
      {
        name: "Iria",
        role: "Catalyst",
        summary: "A synthetic archivist carrying the only intact lunar memory shard."
      },
      {
        name: "Warden Kuro",
        role: "Rival",
        summary: "An enforcer convinced that survival justifies total surveillance."
      }
    ],
    reviews: buildReviews("Neon Ronin: Zero Eclipse"),
    comments: buildComments("Neon Ronin: Zero Eclipse"),
    episodes: buildEpisodes("neon-ronin-zero-eclipse", "Neon Ronin: Zero Eclipse", 12, "The Eclipse Line")
  },
  {
    slug: "celestial-drift-brigade",
    title: "Celestial Drift Brigade",
    japaneseTitle: "星屑漂流旅団",
    tagline: "A ragtag salvage crew races the empire to recover a map hidden inside a singing comet.",
    synopsis: "The Drift Brigade survives one salvage run at a time until captain Yuna Morel intercepts a comet whose crystalline core contains an impossible star chart. Their prize draws empires, pirates, and cultists into a chase across fractured sectors where even gravity can be bought.",
    releaseYear: 2025,
    season: "Winter",
    type: "TV",
    status: "ONGOING",
    dubStatus: "BOTH",
    maturityRating: "13+",
    duration: 24,
    totalEpisodes: 13,
    averageRating: 9.0,
    ratingCount: 11187,
    views: 3609911,
    quality: "1080p",
    featured: true,
    trending: true,
    latest: false,
    topRated: true,
    popularWeek: true,
    recommended: true,
    movie: false,
    bannerImage: banner("celestial-drift-brigade"),
    posterImage: poster("celestial-drift-brigade"),
    trailerUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    trailerThumbnail: banner("celestial-drift-brigade"),
    upcomingEpisodeAt: "2026-05-13T18:00:00.000Z",
    studios: ["cradle-nova"],
    genres: ["sci-fi", "action", "drama"],
    themes: ["Found Family", "Space Salvage", "Imperial Pursuit"],
    relatedSlugs: ["starforge-kizuna", "tidebreaker-leviathan-code"],
    recommendationSlugs: ["iron-fox-battalion", "neon-ronin-zero-eclipse"],
    characters: [
      { name: "Yuna Morel", role: "Captain", summary: "A fearless pilot whose instincts are better than her finances." },
      { name: "Tavi Quinn", role: "Engineer", summary: "A mechanic who treats engines like musical instruments." },
      { name: "Bast", role: "Navigator", summary: "An ex-imperial tactician hiding behind perfect manners." }
    ],
    reviews: buildReviews("Celestial Drift Brigade"),
    comments: buildComments("Celestial Drift Brigade"),
    episodes: buildEpisodes("celestial-drift-brigade", "Celestial Drift Brigade", 13, "Comet Signal")
  },
  {
    slug: "ashen-bloom-requiem",
    title: "Ashen Bloom Requiem",
    japaneseTitle: "灰花鎮魂歌",
    tagline: "A shrine singer resurrects memories by stepping into the last moments of the dead.",
    synopsis: "In a kingdom where flowers bloom from graves, novice cantor Reiha is summoned to solve murders by singing herself into the final memories of the victims. Each ritual leaves part of those memories behind, forcing her to decide how much of herself she can trade for the truth.",
    releaseYear: 2024,
    season: "Autumn",
    type: "TV",
    status: "COMPLETED",
    dubStatus: "SUB",
    maturityRating: "16+",
    duration: 24,
    totalEpisodes: 24,
    averageRating: 9.6,
    ratingCount: 15980,
    views: 6204411,
    quality: "1080p",
    featured: true,
    trending: false,
    latest: false,
    topRated: true,
    popularWeek: false,
    recommended: true,
    movie: false,
    bannerImage: banner("ashen-bloom-requiem"),
    posterImage: poster("ashen-bloom-requiem"),
    trailerUrl: "https://www.youtube.com/watch?v=oUFJJNQGwhk",
    trailerThumbnail: banner("ashen-bloom-requiem"),
    studios: ["inkline-works"],
    genres: ["fantasy", "mystery", "drama"],
    themes: ["Memory Rituals", "Mourning", "Court Intrigue"],
    relatedSlugs: ["moonwire-sonata", "obsidian-hearts"],
    recommendationSlugs: ["nocturne-of-paper-cranes", "hollow-orbit-academy"],
    characters: [
      { name: "Reiha", role: "Lead", summary: "A gifted singer whose calm exterior hides deep fear of forgetting herself." },
      { name: "Lord Soren", role: "Patron", summary: "A nobleman investigating a chain of impossible deaths." },
      { name: "Mitsu", role: "Guardian", summary: "A battle priest who distrusts magic that remembers too much." }
    ],
    reviews: buildReviews("Ashen Bloom Requiem"),
    comments: buildComments("Ashen Bloom Requiem"),
    episodes: buildEpisodes("ashen-bloom-requiem", "Ashen Bloom Requiem", 24, "The Grave Bloom")
  },
  {
    slug: "lumen-protocol-aegis",
    title: "Lumen Protocol: Aegis",
    japaneseTitle: "ルーメン・プロトコル イージス",
    tagline: "Teen operatives pilot lightbound frames to stop a citywide blackout war.",
    synopsis: "After their metropolis is split into weaponized power districts, a class of elite cadets is drafted into the Aegis program and handed experimental mecha fueled by photonic cores. The machines amplify emotion, which means every battlefield victory risks exposing the pilots' worst impulses.",
    releaseYear: 2026,
    season: "Spring",
    type: "TV",
    status: "ONGOING",
    dubStatus: "BOTH",
    maturityRating: "13+",
    duration: 23,
    totalEpisodes: 12,
    averageRating: 8.8,
    ratingCount: 9821,
    views: 2710902,
    quality: "1080p",
    featured: false,
    trending: true,
    latest: true,
    topRated: false,
    popularWeek: true,
    recommended: true,
    movie: false,
    bannerImage: banner("lumen-protocol-aegis"),
    posterImage: poster("lumen-protocol-aegis"),
    trailerUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    trailerThumbnail: banner("lumen-protocol-aegis"),
    upcomingEpisodeAt: "2026-05-12T16:00:00.000Z",
    studios: ["pulse-engine"],
    genres: ["mecha", "action", "sci-fi"],
    themes: ["Academy Warfare", "Power Grids", "Emotional Sync"],
    relatedSlugs: ["iron-fox-battalion", "neon-ronin-zero-eclipse"],
    recommendationSlugs: ["starforge-kizuna", "celestial-drift-brigade"],
    characters: [
      { name: "Aya Rook", role: "Pilot", summary: "A scholarship cadet with reflexes too fast for regulation frames." },
      { name: "Nilo Voss", role: "Strategist", summary: "An honor student who can predict battles but not people." },
      { name: "Sera Flint", role: "Commander", summary: "A young handler willing to rewrite rules for one clean victory." }
    ],
    reviews: buildReviews("Lumen Protocol: Aegis"),
    comments: buildComments("Lumen Protocol: Aegis"),
    episodes: buildEpisodes("lumen-protocol-aegis", "Lumen Protocol: Aegis", 12, "Grid Resonance")
  },
  {
    slug: "moonwire-sonata",
    title: "Moonwire Sonata",
    japaneseTitle: "月線ソナタ",
    tagline: "A conservatory violinist hears future disasters hiding inside unfinished songs.",
    synopsis: "Every time Kaoru plays the silver strings hidden beneath the old conservatory, she hears fragments of events that have not happened yet. To prevent them, she forms a chamber ensemble whose performances can bend probability, provided they stay in tune with one another.",
    releaseYear: 2025,
    season: "Summer",
    type: "TV",
    status: "COMPLETED",
    dubStatus: "SUB",
    maturityRating: "13+",
    duration: 24,
    totalEpisodes: 12,
    averageRating: 9.1,
    ratingCount: 8471,
    views: 1920088,
    quality: "1080p",
    featured: false,
    trending: false,
    latest: false,
    topRated: true,
    popularWeek: false,
    recommended: true,
    movie: false,
    bannerImage: banner("moonwire-sonata"),
    posterImage: poster("moonwire-sonata"),
    trailerUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    trailerThumbnail: banner("moonwire-sonata"),
    studios: ["inkline-works"],
    genres: ["drama", "romance", "fantasy"],
    themes: ["Music Magic", "Premonition", "Tender Rivalry"],
    relatedSlugs: ["ashen-bloom-requiem", "obsidian-hearts"],
    recommendationSlugs: ["nocturne-of-paper-cranes", "hollow-orbit-academy"],
    characters: [
      { name: "Kaoru Shino", role: "Lead", summary: "A prodigy learning that perfection is not the same as harmony." },
      { name: "Emil Crest", role: "Rival", summary: "A pianist whose improvisation breaks every rule she trusts." },
      { name: "Nae", role: "Composer", summary: "A transfer student writing the one score no one should finish." }
    ],
    reviews: buildReviews("Moonwire Sonata"),
    comments: buildComments("Moonwire Sonata"),
    episodes: buildEpisodes("moonwire-sonata", "Moonwire Sonata", 12, "Futures in C Minor")
  },
  {
    slug: "iron-fox-battalion",
    title: "Iron Fox Battalion",
    japaneseTitle: "鋼狐大隊",
    tagline: "A disgraced tactician leads a misfit armor unit nobody expects to survive the season.",
    synopsis: "Banished to the frozen border, strategist Dae Hoshino is ordered to command the Iron Foxes, a forgotten battalion of under-equipped recruits and outdated walker tanks. Their only chance is turning unpredictability into doctrine before the empire's northern offensive arrives.",
    releaseYear: 2023,
    season: "Winter",
    type: "TV",
    status: "COMPLETED",
    dubStatus: "BOTH",
    maturityRating: "16+",
    duration: 24,
    totalEpisodes: 24,
    averageRating: 8.7,
    ratingCount: 7650,
    views: 1550503,
    quality: "1080p",
    featured: false,
    trending: false,
    latest: false,
    topRated: false,
    popularWeek: true,
    recommended: true,
    movie: false,
    bannerImage: banner("iron-fox-battalion"),
    posterImage: poster("iron-fox-battalion"),
    trailerUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    trailerThumbnail: banner("iron-fox-battalion"),
    studios: ["meridian-frame"],
    genres: ["action", "mecha", "drama"],
    themes: ["Military Strategy", "Underdogs", "Frozen Front"],
    relatedSlugs: ["lumen-protocol-aegis", "starforge-kizuna"],
    recommendationSlugs: ["celestial-drift-brigade", "neon-ronin-zero-eclipse"],
    characters: [
      { name: "Dae Hoshino", role: "Commander", summary: "A brilliant planner who now has to lead people instead of formations." },
      { name: "Mira Kett", role: "Ace Driver", summary: "A reckless pilot whose instincts terrify and impress in equal measure." },
      { name: "Voss Garran", role: "Quartermaster", summary: "A cynic who can find replacement parts in a blizzard." }
    ],
    reviews: buildReviews("Iron Fox Battalion"),
    comments: buildComments("Iron Fox Battalion"),
    episodes: buildEpisodes("iron-fox-battalion", "Iron Fox Battalion", 24, "Winter Doctrine")
  },
  {
    slug: "nocturne-of-paper-cranes",
    title: "Nocturne of Paper Cranes",
    japaneseTitle: "紙鶴ノクターン",
    tagline: "A courier girl delivers origami messages that only appear after midnight.",
    synopsis: "In the lantern district of Kyo-no-Mori, orphan courier Hana discovers a fold pattern that summons letters from futures that never happened. Each delivery changes the shape of the city, drawing her into a hidden war fought through promises, debt, and beautifully dangerous paper magic.",
    releaseYear: 2026,
    season: "Spring",
    type: "TV",
    status: "ONGOING",
    dubStatus: "SUB",
    maturityRating: "13+",
    duration: 24,
    totalEpisodes: 10,
    averageRating: 8.9,
    ratingCount: 6301,
    views: 1100444,
    quality: "1080p",
    featured: false,
    trending: true,
    latest: true,
    topRated: false,
    popularWeek: false,
    recommended: true,
    movie: false,
    bannerImage: banner("nocturne-of-paper-cranes"),
    posterImage: poster("nocturne-of-paper-cranes"),
    trailerUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    trailerThumbnail: banner("nocturne-of-paper-cranes"),
    upcomingEpisodeAt: "2026-05-15T14:00:00.000Z",
    studios: ["inkline-works"],
    genres: ["fantasy", "mystery", "slice-of-life"],
    themes: ["Midnight Letters", "Hidden Markets", "Chosen Family"],
    relatedSlugs: ["moonwire-sonata", "ashen-bloom-requiem"],
    recommendationSlugs: ["obsidian-hearts", "hollow-orbit-academy"],
    characters: [
      { name: "Hana", role: "Courier", summary: "A bright runner whose curiosity always outruns caution." },
      { name: "Eito", role: "Scribe", summary: "A quiet bookmaker keeping score of every changed timeline." },
      { name: "Lady Tsuru", role: "Broker", summary: "A powerful patron who can buy secrets with folded paper." }
    ],
    reviews: buildReviews("Nocturne of Paper Cranes"),
    comments: buildComments("Nocturne of Paper Cranes"),
    episodes: buildEpisodes("nocturne-of-paper-cranes", "Nocturne of Paper Cranes", 10, "The Folded Path")
  },
  {
    slug: "tidebreaker-leviathan-code",
    title: "Tidebreaker: Leviathan Code",
    japaneseTitle: "タイドブレイカー リヴァイアサン・コード",
    tagline: "Subsea divers decode a sleeping biomech before rival nations wake it first.",
    synopsis: "On a planet where the deepest trenches are mapped by song, marine engineer Sol Vega joins the Tidebreaker crew to decipher a machine-beast embedded in the ocean floor. The deeper they go, the more the Leviathan seems to be studying them in return.",
    releaseYear: 2025,
    season: "Autumn",
    type: "TV",
    status: "COMPLETED",
    dubStatus: "BOTH",
    maturityRating: "13+",
    duration: 24,
    totalEpisodes: 13,
    averageRating: 9.2,
    ratingCount: 10802,
    views: 2888770,
    quality: "4K",
    featured: true,
    trending: true,
    latest: false,
    topRated: true,
    popularWeek: true,
    recommended: true,
    movie: false,
    bannerImage: banner("tidebreaker-leviathan-code"),
    posterImage: poster("tidebreaker-leviathan-code"),
    trailerUrl: "https://www.youtube.com/watch?v=oUFJJNQGwhk",
    trailerThumbnail: banner("tidebreaker-leviathan-code"),
    studios: ["cradle-nova"],
    genres: ["sci-fi", "thriller", "action"],
    themes: ["Deep Sea Mystery", "Biomechs", "Diplomatic Tension"],
    relatedSlugs: ["celestial-drift-brigade", "neon-ronin-zero-eclipse"],
    recommendationSlugs: ["starforge-kizuna", "lumen-protocol-aegis"],
    characters: [
      { name: "Sol Vega", role: "Engineer", summary: "A diver who hears patterns in the pressure of the sea." },
      { name: "Captain Neris", role: "Commander", summary: "A veteran skipper balancing science, politics, and survival." },
      { name: "Ivo Marek", role: "Analyst", summary: "A cryptographer convinced the Leviathan is sending invitations." }
    ],
    reviews: buildReviews("Tidebreaker: Leviathan Code"),
    comments: buildComments("Tidebreaker: Leviathan Code"),
    episodes: buildEpisodes("tidebreaker-leviathan-code", "Tidebreaker: Leviathan Code", 13, "The Singing Trench")
  },
  {
    slug: "hollow-orbit-academy",
    title: "Hollow Orbit Academy",
    japaneseTitle: "ホロウオービット学園",
    tagline: "A transfer student discovers the school above Earth is training diplomats for parallel worlds.",
    synopsis: "Orbit Academy looks like a luxury boarding school until first-year Kael opens the wrong classroom and falls into an embassy for universes that should not be touching. The curriculum includes etiquette, portal physics, and surviving the politics of worlds that see Earth as unfinished.",
    releaseYear: 2026,
    season: "Spring",
    type: "ONA",
    status: "ONGOING",
    dubStatus: "BOTH",
    maturityRating: "13+",
    duration: 26,
    totalEpisodes: 8,
    averageRating: 8.5,
    ratingCount: 4102,
    views: 804110,
    quality: "1080p",
    featured: false,
    trending: true,
    latest: true,
    topRated: false,
    popularWeek: false,
    recommended: true,
    movie: false,
    bannerImage: banner("hollow-orbit-academy"),
    posterImage: poster("hollow-orbit-academy"),
    trailerUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    trailerThumbnail: banner("hollow-orbit-academy"),
    upcomingEpisodeAt: "2026-05-14T20:00:00.000Z",
    studios: ["studio-aurora"],
    genres: ["sci-fi", "fantasy", "drama"],
    themes: ["Parallel Worlds", "Diplomacy", "Secret Schools"],
    relatedSlugs: ["moonwire-sonata", "nocturne-of-paper-cranes"],
    recommendationSlugs: ["ashen-bloom-requiem", "obsidian-hearts"],
    characters: [
      { name: "Kael Arden", role: "Transfer", summary: "A curious student with a habit of walking through the wrong doors." },
      { name: "Mio Hase", role: "Guide", summary: "The top-ranked envoy who knows more about Earth than she should." },
      { name: "Dean Var", role: "Authority", summary: "An administrator who treats universes like chessboards." }
    ],
    reviews: buildReviews("Hollow Orbit Academy"),
    comments: buildComments("Hollow Orbit Academy"),
    episodes: buildEpisodes("hollow-orbit-academy", "Hollow Orbit Academy", 8, "Embassy Class")
  },
  {
    slug: "obsidian-hearts",
    title: "Obsidian Hearts",
    japaneseTitle: "黒曜の心",
    tagline: "Two heirs from rival houses can only use their magic when they trust each other.",
    synopsis: "The volcanic nation of Ardes survives on a bond magic that has all but vanished from the nobility. When Princess Liora and enemy heir Cassian discover that their powers only awaken together, they are forced into a political engagement that could either unite the realm or burn it down faster.",
    releaseYear: 2024,
    season: "Spring",
    type: "TV",
    status: "COMPLETED",
    dubStatus: "BOTH",
    maturityRating: "16+",
    duration: 24,
    totalEpisodes: 24,
    averageRating: 9.0,
    ratingCount: 12033,
    views: 3339011,
    quality: "1080p",
    featured: false,
    trending: false,
    latest: false,
    topRated: true,
    popularWeek: true,
    recommended: true,
    movie: false,
    bannerImage: banner("obsidian-hearts"),
    posterImage: poster("obsidian-hearts"),
    trailerUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    trailerThumbnail: banner("obsidian-hearts"),
    studios: ["pulse-engine"],
    genres: ["fantasy", "romance", "drama"],
    themes: ["Political Marriage", "Elemental Bonds", "Rival Houses"],
    relatedSlugs: ["ashen-bloom-requiem", "moonwire-sonata"],
    recommendationSlugs: ["nocturne-of-paper-cranes", "hollow-orbit-academy"],
    characters: [
      { name: "Liora Vale", role: "Princess", summary: "A poised heir learning how much of strength is vulnerability." },
      { name: "Cassian Rhys", role: "Rival Heir", summary: "A swordsman who trusts no alliance he cannot measure." },
      { name: "Matron Edda", role: "Advisor", summary: "The only court figure who wants peace more than power." }
    ],
    reviews: buildReviews("Obsidian Hearts"),
    comments: buildComments("Obsidian Hearts"),
    episodes: buildEpisodes("obsidian-hearts", "Obsidian Hearts", 24, "The Ember Pact")
  },
  {
    slug: "starforge-kizuna",
    title: "Starforge Kizuna",
    japaneseTitle: "星鍛絆",
    tagline: "Teen blacksmiths craft cosmic weapons from meteor hearts and old promises.",
    synopsis: "At the floating forge city of Tetsura, apprentices learn to shape fallen star metal into living weapons that bond to their makers. Rookie smith Jun is terrible at tradition but gifted at hearing what the metal wants, making him the academy's biggest risk and best chance in the tournament of makers.",
    releaseYear: 2025,
    season: "Spring",
    type: "TV",
    status: "COMPLETED",
    dubStatus: "DUB",
    maturityRating: "13+",
    duration: 23,
    totalEpisodes: 12,
    averageRating: 8.6,
    ratingCount: 5550,
    views: 1204331,
    quality: "1080p",
    featured: false,
    trending: false,
    latest: false,
    topRated: false,
    popularWeek: true,
    recommended: true,
    movie: false,
    bannerImage: banner("starforge-kizuna"),
    posterImage: poster("starforge-kizuna"),
    trailerUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    trailerThumbnail: banner("starforge-kizuna"),
    studios: ["meridian-frame"],
    genres: ["action", "fantasy", "sports"],
    themes: ["Forging Tournaments", "Craft Rivalries", "Meteor Steel"],
    relatedSlugs: ["iron-fox-battalion", "lumen-protocol-aegis"],
    recommendationSlugs: ["celestial-drift-brigade", "tidebreaker-leviathan-code"],
    characters: [
      { name: "Jun Kaji", role: "Apprentice", summary: "A chaotic smith who can hear fractures before they happen." },
      { name: "Reva Sol", role: "Champion", summary: "The academy's reigning duelist with a weapon no one can remake." },
      { name: "Master Garan", role: "Mentor", summary: "A stubborn instructor who sees potential hidden inside mistakes." }
    ],
    reviews: buildReviews("Starforge Kizuna"),
    comments: buildComments("Starforge Kizuna"),
    episodes: buildEpisodes("starforge-kizuna", "Starforge Kizuna", 12, "The Meteor Anvil")
  },
  {
    slug: "crimson-pulse-tokyo-2099",
    title: "Crimson Pulse: Tokyo 2099",
    japaneseTitle: "クリムゾンパルス東京2099",
    tagline: "Underground medics fight biotech gangs with blood-coded combat suits.",
    synopsis: "In a future where private clinics double as war zones, paramedic Rei Amamiya inherits a crimson suit keyed to her heartbeat. Each rescue mission puts her crew in the crosshairs of syndicates harvesting illegal augment tech from the city's forgotten districts.",
    releaseYear: 2026,
    season: "Spring",
    type: "TV",
    status: "ONGOING",
    dubStatus: "BOTH",
    maturityRating: "16+",
    duration: 24,
    totalEpisodes: 12,
    averageRating: 8.8,
    ratingCount: 7010,
    views: 1865320,
    quality: "4K",
    featured: true,
    trending: true,
    latest: true,
    topRated: false,
    popularWeek: true,
    recommended: true,
    movie: false,
    bannerImage: banner("crimson-pulse-tokyo-2099"),
    posterImage: poster("crimson-pulse-tokyo-2099"),
    trailerUrl: "https://www.youtube.com/watch?v=oUFJJNQGwhk",
    trailerThumbnail: banner("crimson-pulse-tokyo-2099"),
    upcomingEpisodeAt: "2026-05-10T19:30:00.000Z",
    studios: ["studio-aurora"],
    genres: ["action", "sci-fi", "drama"],
    themes: ["Street Medicine", "Biotech Crime", "Heartbeat Armor"],
    relatedSlugs: ["neon-ronin-zero-eclipse", "lumen-protocol-aegis"],
    recommendationSlugs: ["celestial-drift-brigade", "tidebreaker-leviathan-code"],
    characters: [
      { name: "Rei Amamiya", role: "Medic", summary: "A trauma responder who refuses to choose which lives deserve saving." },
      { name: "Toma Vane", role: "Driver", summary: "A getaway specialist with more loyalty than patience." },
      { name: "Dr. Ilya Soren", role: "Mentor", summary: "The surgeon who built the suit and buried its original purpose." }
    ],
    reviews: buildReviews("Crimson Pulse: Tokyo 2099"),
    comments: buildComments("Crimson Pulse: Tokyo 2099"),
    episodes: buildEpisodes("crimson-pulse-tokyo-2099", "Crimson Pulse: Tokyo 2099", 12, "Redline Rescue")
  },
  {
    slug: "aurora-breaker-the-movie",
    title: "Aurora Breaker: The Movie",
    japaneseTitle: "オーロラブレイカー 劇場版",
    tagline: "A skyboard prodigy must cross a lightning storm to deliver peace terms above the clouds.",
    synopsis: "Feature-length spectacle meets emotional road movie as courier ace Nami races across a chain of storm cities to stop a war before diplomats torch the only bridge between them. The film's aerial choreography and glowing weather systems make it KaiStream's signature movie showcase.",
    releaseYear: 2026,
    season: "Spring",
    type: "MOVIE",
    status: "COMPLETED",
    dubStatus: "BOTH",
    maturityRating: "13+",
    duration: 106,
    totalEpisodes: 1,
    averageRating: 9.4,
    ratingCount: 18210,
    views: 5099100,
    quality: "4K",
    featured: true,
    trending: true,
    latest: true,
    topRated: true,
    popularWeek: true,
    recommended: true,
    movie: true,
    bannerImage: banner("aurora-breaker-the-movie"),
    posterImage: poster("aurora-breaker-the-movie"),
    trailerUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    trailerThumbnail: banner("aurora-breaker-the-movie"),
    studios: ["cradle-nova"],
    genres: ["action", "fantasy", "drama"],
    themes: ["Skyboarding", "Peace Mission", "Storm Cities"],
    relatedSlugs: ["celestial-drift-brigade", "starforge-kizuna"],
    recommendationSlugs: ["crimson-pulse-tokyo-2099", "neon-ronin-zero-eclipse"],
    characters: [
      { name: "Nami Rhee", role: "Lead", summary: "A messenger whose courage is only matched by her speed." },
      { name: "Toren", role: "Companion", summary: "A mechanic carrying an engine that can outrun weather itself." },
      { name: "Minister Hale", role: "Statesman", summary: "A negotiator gambling everything on one impossible delivery." }
    ],
    reviews: buildReviews("Aurora Breaker: The Movie"),
    comments: buildComments("Aurora Breaker: The Movie"),
    episodes: [
      {
        number: 1,
        slug: "aurora-breaker-the-movie-episode-1",
        title: "Aurora Breaker: The Movie",
        synopsis: "Nami launches into a storm frontier where speed, diplomacy, and courage all break at the same altitude.",
        duration: 106,
        airDate: "2026-04-19T16:00:00.000Z",
        introStart: 0,
        introEnd: 86,
        thumbnailImage: banner("aurora-breaker-the-movie"),
        sources: streamSources,
        subtitles
      }
    ]
  }
];

export const sampleUsers: UserSeed[] = [
  {
    name: "Kai Demo",
    email: "demo@kaistream.dev",
    role: "USER",
    avatar: "KD",
    language: "en",
    favoriteSlugs: ["neon-ronin-zero-eclipse", "ashen-bloom-requiem", "aurora-breaker-the-movie"],
    history: [
      {
        animeSlug: "neon-ronin-zero-eclipse",
        episodeNumber: 6,
        progress: 0.72,
        updatedAt: "2026-05-08T12:15:00.000Z"
      },
      {
        animeSlug: "crimson-pulse-tokyo-2099",
        episodeNumber: 4,
        progress: 0.38,
        updatedAt: "2026-05-07T19:40:00.000Z"
      },
      {
        animeSlug: "aurora-breaker-the-movie",
        episodeNumber: 1,
        progress: 0.91,
        updatedAt: "2026-05-06T21:00:00.000Z"
      }
    ],
    notifications: [
      {
        id: "notif-airing-neon",
        title: "Neon Ronin airs in 1 day",
        body: "Episode 7 premieres Monday at 9:30 PM JST.",
        type: "AIRING",
        createdAt: "2026-05-09T07:00:00.000Z",
        read: false
      },
      {
        id: "notif-reco-tidebreaker",
        title: "Recommendation unlocked",
        body: "Because you watched Celestial Drift Brigade, Tidebreaker is now in your feed.",
        type: "RECOMMENDATION",
        createdAt: "2026-05-08T09:00:00.000Z",
        read: true
      }
    ]
  },
  {
    name: "Admin Kai",
    email: "admin@kaistream.dev",
    role: "ADMIN",
    avatar: "AK",
    language: "en",
    favoriteSlugs: ["aurora-breaker-the-movie", "tidebreaker-leviathan-code"],
    history: [],
    notifications: [
      {
        id: "notif-system-moderation",
        title: "Moderation queue updated",
        body: "Three new comments need review after today's release window.",
        type: "SYSTEM",
        createdAt: "2026-05-09T08:00:00.000Z",
        read: false
      }
    ]
  }
];

export function getAnimeBySlug(slug: string) {
  return animeCatalog.find((entry) => entry.slug === slug);
}

export function getGenreBySlug(slug: string) {
  return genres.find((entry) => entry.slug === slug);
}
