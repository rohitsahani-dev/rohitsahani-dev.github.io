import fs from "node:fs/promises";
import path from "node:path";

const catalog = [
  {
    slug: "neon-ronin-zero-eclipse",
    title: "Neon Ronin",
    subtitle: "Zero Eclipse",
    from: "#5b21b6",
    to: "#ef4444",
    glow: "#8b5cf6"
  },
  {
    slug: "celestial-drift-brigade",
    title: "Celestial Drift",
    subtitle: "Brigade",
    from: "#0f766e",
    to: "#2563eb",
    glow: "#67e8f9"
  },
  {
    slug: "ashen-bloom-requiem",
    title: "Ashen Bloom",
    subtitle: "Requiem",
    from: "#7c2d12",
    to: "#be185d",
    glow: "#fda4af"
  },
  {
    slug: "lumen-protocol-aegis",
    title: "Lumen Protocol",
    subtitle: "Aegis",
    from: "#1d4ed8",
    to: "#9333ea",
    glow: "#93c5fd"
  },
  {
    slug: "moonwire-sonata",
    title: "Moonwire",
    subtitle: "Sonata",
    from: "#312e81",
    to: "#c026d3",
    glow: "#ddd6fe"
  },
  {
    slug: "iron-fox-battalion",
    title: "Iron Fox",
    subtitle: "Battalion",
    from: "#78350f",
    to: "#dc2626",
    glow: "#fbbf24"
  },
  {
    slug: "nocturne-of-paper-cranes",
    title: "Nocturne of",
    subtitle: "Paper Cranes",
    from: "#14532d",
    to: "#7c3aed",
    glow: "#86efac"
  },
  {
    slug: "tidebreaker-leviathan-code",
    title: "Tidebreaker",
    subtitle: "Leviathan Code",
    from: "#0f172a",
    to: "#0f766e",
    glow: "#67e8f9"
  },
  {
    slug: "hollow-orbit-academy",
    title: "Hollow Orbit",
    subtitle: "Academy",
    from: "#1e293b",
    to: "#7c3aed",
    glow: "#c4b5fd"
  },
  {
    slug: "obsidian-hearts",
    title: "Obsidian",
    subtitle: "Hearts",
    from: "#431407",
    to: "#7f1d1d",
    glow: "#fb7185"
  },
  {
    slug: "starforge-kizuna",
    title: "Starforge",
    subtitle: "Kizuna",
    from: "#0f172a",
    to: "#f59e0b",
    glow: "#fcd34d"
  },
  {
    slug: "crimson-pulse-tokyo-2099",
    title: "Crimson Pulse",
    subtitle: "Tokyo 2099",
    from: "#450a0a",
    to: "#7c3aed",
    glow: "#f87171"
  },
  {
    slug: "aurora-breaker-the-movie",
    title: "Aurora Breaker",
    subtitle: "The Movie",
    from: "#0f172a",
    to: "#0ea5e9",
    glow: "#a5f3fc"
  }
];

const root = process.cwd();
const posterDir = path.join(root, "apps", "web", "public", "art", "posters");
const bannerDir = path.join(root, "apps", "web", "public", "art", "banners");
const brandDir = path.join(root, "apps", "web", "public", "brand");

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const buildPoster = ({ title, subtitle, from, to, glow }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="768" height="1080" viewBox="0 0 768 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="768" y2="1080" gradientUnits="userSpaceOnUse">
      <stop stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="orb" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(540 210) rotate(121) scale(440 440)">
      <stop stop-color="${glow}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="768" height="1080" rx="40" fill="#05060A"/>
  <rect x="18" y="18" width="732" height="1044" rx="34" fill="url(#bg)"/>
  <rect x="18" y="18" width="732" height="1044" rx="34" fill="url(#orb)"/>
  <path d="M106 932C190 756 386 778 430 592C464 449 336 380 358 240C377 120 501 84 662 110" stroke="rgba(255,255,255,0.18)" stroke-width="18" stroke-linecap="round"/>
  <path d="M144 1040C252 840 494 834 566 634C628 462 520 308 552 138" stroke="${glow}" stroke-opacity="0.42" stroke-width="10" stroke-linecap="round"/>
  <circle cx="576" cy="256" r="118" fill="${glow}" fill-opacity="0.12"/>
  <circle cx="576" cy="256" r="72" fill="${glow}" fill-opacity="0.18"/>
  <g filter="url(#shadow)">
    <text x="78" y="786" fill="white" font-family="Sora, Arial, sans-serif" font-size="68" font-weight="700">${escapeXml(title)}</text>
    <text x="78" y="864" fill="white" fill-opacity="0.88" font-family="Manrope, Arial, sans-serif" font-size="42" font-weight="600">${escapeXml(subtitle)}</text>
  </g>
  <text x="78" y="954" fill="white" fill-opacity="0.7" font-family="Manrope, Arial, sans-serif" font-size="24" letter-spacing="6">KAISTREAM ORIGINAL SELECTION</text>
  <defs>
    <filter id="shadow" x="0" y="0" width="768" height="1080" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="10" stdDeviation="24" flood-color="#02030A" flood-opacity="0.45"/>
    </filter>
  </defs>
</svg>
`;

const buildBanner = ({ title, subtitle, from, to, glow }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
      <stop stop-color="#05060A"/>
      <stop offset="0.55" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="halo" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1220 280) rotate(133) scale(560 560)">
      <stop stop-color="${glow}" stop-opacity="0.82"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" rx="40" fill="url(#bg)"/>
  <rect width="1600" height="900" rx="40" fill="url(#halo)"/>
  <path d="M112 782C342 610 458 652 614 514C770 376 716 168 990 114" stroke="rgba(255,255,255,0.12)" stroke-width="18" stroke-linecap="round"/>
  <path d="M972 168C1122 246 1252 394 1398 638" stroke="${glow}" stroke-opacity="0.45" stroke-width="12" stroke-linecap="round"/>
  <circle cx="1248" cy="252" r="170" fill="${glow}" fill-opacity="0.12"/>
  <circle cx="1248" cy="252" r="102" fill="${glow}" fill-opacity="0.18"/>
  <rect x="84" y="84" width="622" height="540" rx="34" fill="rgba(10,10,14,0.36)" stroke="rgba(255,255,255,0.12)"/>
  <text x="132" y="244" fill="white" font-family="Sora, Arial, sans-serif" font-size="88" font-weight="700">${escapeXml(title)}</text>
  <text x="132" y="334" fill="white" fill-opacity="0.92" font-family="Manrope, Arial, sans-serif" font-size="54" font-weight="600">${escapeXml(subtitle)}</text>
  <text x="132" y="430" fill="white" fill-opacity="0.78" font-family="Manrope, Arial, sans-serif" font-size="26" letter-spacing="7">STREAM IN 4K • DOLBY AUDIO • MULTI SUBTITLE</text>
  <rect x="132" y="492" width="174" height="54" rx="27" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)"/>
  <text x="175" y="527" fill="white" font-family="Manrope, Arial, sans-serif" font-size="22" font-weight="700">KAISTREAM</text>
</svg>
`;

const buildLogo = () => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" rx="64" fill="#0A0A0A"/>
  <rect x="20" y="20" width="216" height="216" rx="52" fill="url(#bg)" stroke="rgba(255,255,255,0.12)"/>
  <path d="M86 58H114V198H86V58ZM142 58H170L114 126L176 198H144L96 140L142 58Z" fill="white"/>
  <circle cx="178" cy="76" r="20" fill="#A855F7" fill-opacity="0.8"/>
  <defs>
    <linearGradient id="bg" x1="38" y1="24" x2="226" y2="240" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4C1D95"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
  </defs>
</svg>
`;

await fs.mkdir(posterDir, { recursive: true });
await fs.mkdir(bannerDir, { recursive: true });
await fs.mkdir(brandDir, { recursive: true });

await Promise.all(
  catalog.flatMap((entry) => [
    fs.writeFile(path.join(posterDir, `${entry.slug}.svg`), buildPoster(entry), "utf8"),
    fs.writeFile(path.join(bannerDir, `${entry.slug}.svg`), buildBanner(entry), "utf8")
  ])
);

await fs.writeFile(path.join(brandDir, "kaistream-mark.svg"), buildLogo(), "utf8");
