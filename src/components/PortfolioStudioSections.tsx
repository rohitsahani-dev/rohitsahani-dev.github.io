import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  Check,
  Code2,
  Copy,
  FileText,
  FolderGit2,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Rocket,
  Search,
  Send,
  Terminal,
} from 'lucide-react';
import { ProjectArchitecturePreview } from './PortfolioVisuals';
import {
  PERSONAL_IDENTITY,
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  cycleIndex,
  STUDIO_TECH_ITEMS,
  StudioTechItem,
  StudioTechTier,
  filterStudioTechItems,
  HOW_I_WORK_STEPS,
  QUICK_SCOPE_PRESETS,
  computeScrollProgressPercent,
  validateContactForm,
  generateEmailQrMatrix,
} from '../utils/portfolioLogic';

const CODE_I_LIVE_BY_SNIPPET = `const developer = {
  name: 'Rohit Sahani',
  role: 'Web Developer & BIT Student',
  location: 'Biratnagar, Nepal',
  skills: ['HTML5', 'CSS3', 'JavaScript',
           'Python', 'Git', 'GitHub'],
  passion: 'Building modern web experiences',
  focus: 'Clean Code & UI/UX'
};

console.log(developer);`;

const CODE_I_LIVE_BY_TOKENS: Array<{ text: string; className: string }> = [
  { text: 'const', className: 'text-[#60a5fa]' },
  { text: ' ', className: 'text-white/90' },
  { text: 'developer', className: 'text-[#f87171]' },
  { text: ' ', className: 'text-white/90' },
  { text: '= {', className: 'text-white' },
  { text: '\n  name: ', className: 'text-white/90' },
  { text: "'Rohit Sahani'", className: 'text-[#f87171]' },
  { text: ',\n  role: ', className: 'text-white/90' },
  { text: "'Web Developer & BIT Student'", className: 'text-[#4ade80]' },
  { text: ',\n  location: ', className: 'text-white/90' },
  { text: "'Biratnagar, Nepal'", className: 'text-[#4ade80]' },
  { text: ',\n  skills: [', className: 'text-white/90' },
  { text: "'HTML5'", className: 'text-[#4ade80]' },
  { text: ', ', className: 'text-white/90' },
  { text: "'CSS3'", className: 'text-[#4ade80]' },
  { text: ', ', className: 'text-white/90' },
  { text: "'JavaScript'", className: 'text-[#4ade80]' },
  { text: ',\n           ', className: 'text-white/90' },
  { text: "'Python'", className: 'text-[#4ade80]' },
  { text: ', ', className: 'text-white/90' },
  { text: "'Git'", className: 'text-[#4ade80]' },
  { text: ', ', className: 'text-white/90' },
  { text: "'GitHub'", className: 'text-[#4ade80]' },
  { text: '],\n  passion: ', className: 'text-white/90' },
  { text: "'Building modern web experiences'", className: 'text-[#4ade80]' },
  { text: ',\n  focus: ', className: 'text-white/90' },
  { text: "'Clean Code & UI/UX'", className: 'text-[#4ade80]' },
  { text: '\n', className: 'text-white/90' },
  { text: '};', className: 'text-white' },
  { text: '\n\n', className: 'text-white/90' },
  { text: 'console', className: 'text-[#fbbf24]' },
  { text: '.', className: 'text-white/90' },
  { text: 'log', className: 'text-[#4ade80]' },
  { text: '(developer);', className: 'text-white/90' },
];

const CODE_I_LIVE_BY_CHARS = (() => {
  const items: Array<{ char: string; className: string; delay: number }> = [];
  let cumulativeDelay = 0.06;
  for (const token of CODE_I_LIVE_BY_TOKENS) {
    for (const char of token.text) {
      items.push({
        char,
        className: token.className,
        delay: cumulativeDelay,
      });
      if (char === '\n') {
        cumulativeDelay += 0.028;
      } else if (char === ' ') {
        cumulativeDelay += 0.0025;
      } else {
        cumulativeDelay += 0.0105;
      }
    }
  }
  return items;
})();

function TechBadgeIcon({ id }: { id: string }) {
  switch (id) {
    case 'html5':
      return (
        <div className="w-9 h-9 rounded-md bg-[#e34f26] text-white font-display text-lg flex items-center justify-center shadow-sm">
          5
        </div>
      );
    case 'css3':
      return (
        <div className="w-9 h-9 rounded-md bg-[#1572b6] text-white font-display text-lg flex items-center justify-center shadow-sm">
          3
        </div>
      );
    case 'javascript':
      return (
        <div className="w-9 h-9 rounded-md bg-[#f7df1e] text-[#09090b] font-mono font-bold text-sm flex items-center justify-center shadow-sm">
          JS
        </div>
      );
    case 'python':
      return (
        <div className="w-9 h-9 rounded-md bg-[#101827] border border-[#38bdf8]/60 text-[#38bdf8] font-mono font-bold text-xs flex items-center justify-center">
          PY
        </div>
      );
    case 'react':
      return (
        <div className="w-9 h-9 rounded-md bg-[#0c1924] border border-[#38bdf8]/40 text-[#38bdf8] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </svg>
        </div>
      );
    case 'nextjs':
      return (
        <div className="w-9 h-9 rounded-md bg-[#141419] border border-white/25 text-white font-mono font-bold text-sm flex items-center justify-center">
          N
        </div>
      );
    case 'supabase':
      return (
        <div className="w-9 h-9 rounded-md bg-[#0b2419] border border-[#3ecf8e]/50 text-[#3ecf8e] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M13.5 2L5 13.5h6.5L10.5 22 19 10.5h-6.5L13.5 2z" />
          </svg>
        </div>
      );
    case 'vercel':
      return (
        <div className="w-9 h-9 rounded-md bg-[#141419] border border-white/25 text-white flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 4L21 20H3L12 4Z" />
          </svg>
        </div>
      );
    case 'git':
      return (
        <div className="w-9 h-9 rounded-md bg-[#f05032] text-white flex items-center justify-center rotate-45 scale-90">
          <svg viewBox="0 0 24 24" className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="7" cy="7" r="2" />
            <circle cx="17" cy="7" r="2" />
            <circle cx="17" cy="17" r="2" />
            <path d="M7 9v8M9 7h6M17 9v6" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-9 h-9 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </div>
      );
  }
}

export function AboutCodeLiveBySection({
  onMoreAboutMe,
}: {
  onMoreAboutMe: () => void;
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [codeInView, setCodeInView] = useState(false);
  const preRef = React.useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const el = preRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setCodeInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCodeInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(CODE_I_LIVE_BY_SNIPPET);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="relative z-20 pt-10 pb-8 border-t border-white/[0.08]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: ABOUT ME — Turning Ideas Into Interactive Reality */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 space-y-5"
        >
          <div className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#e63946] font-semibold">
            ABOUT ME
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight leading-[1.12] text-white">
            Turning Ideas Into
            <span className="block mt-1">
              <span className="text-[#e63946]">Interactive</span> Reality
            </span>
          </h3>

          <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed max-w-xl">
            I&apos;m a passionate website developer and BIT student building responsive,
            accessible, and performance-optimized websites and web applications. I love turning
            complex ideas into simple, clean, and intuitive digital experiences.
          </p>

          {/* 3-Column Metric Bar: BIT | 07 | NP */}
          <div className="grid grid-cols-3 border border-white/10 bg-[#0d0f14] divide-x divide-white/10 max-w-lg">
            <div className="p-3.5 sm:p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#e63946]/40 bg-[#e63946]/10 text-[#e63946] flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold text-[#e63946] leading-none">
                  BIT
                </div>
                <div className="text-[11px] text-white/60 mt-1">Degree Track</div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#e63946]/40 bg-[#e63946]/10 text-[#e63946] flex items-center justify-center shrink-0">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold text-[#e63946] leading-none">
                  07
                </div>
                <div className="text-[11px] text-white/60 mt-1">Featured Works</div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#e63946]/40 bg-[#e63946]/10 text-[#e63946] flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold text-[#e63946] leading-none">
                  NP
                </div>
                <div className="text-[11px] text-white/60 mt-1">Biratnagar Base</div>
              </div>
            </div>
          </div>

          {/* MORE ABOUT ME Button with Crimson Corner Accent */}
          <div className="pt-1">
            <button
              type="button"
              onClick={onMoreAboutMe}
              className="relative group inline-flex items-center gap-4 px-5 py-3 bg-[#0d0f14] border border-[#e63946]/40 hover:border-[#e63946] text-xs font-mono tracking-[0.2em] uppercase text-white transition-colors cursor-pointer"
            >
              <span>MORE ABOUT ME</span>
              <span className="text-[#e63946] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
              <span
                className="pointer-events-none absolute right-0.5 bottom-0.5 w-2 h-2 border-r-2 border-b-2 border-[#e63946]"
                aria-hidden="true"
              />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Interactive "Code I Live By" Editor Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="lg:col-span-6"
        >
          <div className="relative rounded-md bg-[#0d0f14] border border-white/10 p-5 sm:p-7 shadow-2xl overflow-hidden">
            {/* Top Bar: Code I Live By | >_ RUN LOG | COPY */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="font-mono text-xs italic text-white/55">Code I Live By</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLogOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-[11px] font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                    logOpen
                      ? 'bg-[#e63946] border-[#e63946] text-white'
                      : 'bg-white/[0.03] border-white/15 text-white/75 hover:border-white/35 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>{logOpen ? 'HIDE LOG' : 'RUN LOG'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.03] border border-white/15 hover:border-white/35 text-[11px] font-mono tracking-wider uppercase text-white/75 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Syntax-Highlighted Code Block with Smooth GPU Letter-by-Letter Scroll Reveal */}
            <pre
              ref={preRef}
              className="font-mono text-xs sm:text-[13px] leading-[1.75] overflow-x-auto text-white/90 select-all"
            >
              <code aria-label={CODE_I_LIVE_BY_SNIPPET}>
                {CODE_I_LIVE_BY_CHARS.map((item, idx) =>
                  item.char === '\n' ? (
                    '\n'
                  ) : (
                    <span
                      key={idx}
                      style={{
                        opacity: codeInView ? 1 : 0,
                        transform: codeInView ? 'translate3d(0,0,0)' : 'translate3d(0,3px,0)',
                        transitionProperty: 'opacity, transform',
                        transitionDuration: '0.22s',
                        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        transitionDelay: codeInView ? `${item.delay}s` : '0s',
                      }}
                      className={`${item.className} inline-block whitespace-pre`}
                    >
                      {item.char}
                    </span>
                  )
                )}
              </code>
            </pre>

            {/* Interactive Console Output Drawer when >_ RUN LOG is clicked */}
            <AnimatePresence>
              {logOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-3 border-t border-white/10 font-mono text-xs text-emerald-400"
                >
                  <div className="text-[10px] uppercase tracking-widest text-white/45 mb-1">
                    &gt; stdout · node v22.0.0
                  </div>
                  <div className="bg-black/50 rounded p-3 border border-emerald-500/25 text-[11px] leading-relaxed">
                    {`{ name: "Rohit Sahani", role: "Web Developer & BIT Student", location: "Biratnagar, Nepal", activeProjects: 7, status: "OPEN_FOR_COLLABORATION" }`}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Crimson Bottom-Right Triangle Corner Accent */}
            <span
              className="pointer-events-none absolute right-2 bottom-2 w-0 h-0 border-b-[11px] border-b-[#e63946] border-l-[11px] border-l-transparent"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function SkillsInteractiveGridSection({
  onInquireWithSkill,
}: {
  onInquireWithSkill: (skill: StudioTechItem) => void;
}) {
  const [tierFilter, setTierFilter] = useState<'ALL' | StudioTechTier>('ALL');
  const [selectedTechId, setSelectedTechId] = useState<string>('html5');
  const [pulseWaveKey, setPulseWaveKey] = useState<number>(0);
  const [clickedOriginIdx, setClickedOriginIdx] = useState<number>(0);

  const visibleItems = filterStudioTechItems(tierFilter);
  const selectedItem =
    STUDIO_TECH_ITEMS.find((item) => item.id === selectedTechId) || STUDIO_TECH_ITEMS[0];
  const selectedVisibleIdx = Math.max(
    0,
    visibleItems.findIndex((item) => item.id === selectedItem.id)
  );

  const handleTierChange = (nextTier: 'ALL' | StudioTechTier) => {
    setTierFilter(nextTier);
    const nextList = filterStudioTechItems(nextTier);
    if (nextList.length > 0 && !nextList.some((i) => i.id === selectedTechId)) {
      setSelectedTechId(nextList[0].id);
    }
    setClickedOriginIdx(0);
    setPulseWaveKey((prev) => prev + 1);
  };

  const handleSelectTile = (id: string, idx: number) => {
    setSelectedTechId(id);
    setClickedOriginIdx(idx);
    setPulseWaveKey((prev) => prev + 1);
  };

  return (
    <div className="relative z-20 pt-10 pb-8 border-t border-white/[0.08]">
      {/* Header Row: MY SKILLS / Technologies I Work With | ALL (10) CORE (7) EXPLORING (3) */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
        <div>
          <div className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#e63946] font-semibold mb-1.5">
            MY SKILLS
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Technologies I Work With
          </h3>
        </div>

        <div
          className="inline-flex items-center bg-[#0d0f14] border border-white/10 p-1 rounded"
          role="tablist"
          aria-label="Filter technologies by proficiency tier"
        >
          {(
            [
              { id: 'ALL', label: 'ALL (10)' },
              { id: 'CORE', label: 'CORE (7)' },
              { id: 'EXPLORING', label: 'EXPLORING (3)' },
            ] as const
          ).map((tab) => {
            const active = tierFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleTierChange(tab.id)}
                className={`px-3.5 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded-xs transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#b81d2a] text-white font-semibold'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 10-Tile Interactive Technology Grid with 3D Cascade, Laser Scan & Radial Neighbor Wave */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 perspective-[1000px]">
        {visibleItems.map((item, idx) => {
          const isSelected = item.id === selectedItem.id;
          const distanceFromOrigin = Math.abs(idx - clickedOriginIdx);
          const waveDelay = distanceFromOrigin * 0.045;

          return (
            <motion.button
              key={`${tierFilter}-${item.id}`}
              type="button"
              onClick={() => handleSelectTile(item.id, idx)}
              initial={{ opacity: 0, y: 24, rotateX: -22, rotateY: -14, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                y: -6,
                scale: 1.04,
                transition: { duration: 0.18, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative group h-[132px] bg-[#0d0f14] border flex flex-col items-center justify-center p-3 text-center transition-colors cursor-pointer overflow-hidden ${
                isSelected
                  ? 'border-[#e63946] bg-[#141722] shadow-[0_0_30px_rgba(230,57,70,0.28)]'
                  : 'border-white/10 hover:border-[#e63946]/55'
              }`}
            >
              {/* Animated Shared Laser Frame on Selected Tile */}
              {isSelected && (
                <motion.span
                  layoutId="active-tech-tile-glow"
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  className="pointer-events-none absolute inset-0 border border-[#e63946] bg-gradient-to-b from-[#e63946]/15 via-transparent to-[#e63946]/10"
                  aria-hidden="true"
                />
              )}

              {/* Radial Energy Ripple propagating across tiles when clicked */}
              {pulseWaveKey > 0 && (
                <motion.span
                  key={`wave-${pulseWaveKey}-${item.id}`}
                  initial={{ opacity: isSelected ? 0.85 : 0.45, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 1.75 }}
                  transition={{
                    duration: 0.65,
                    delay: waveDelay,
                    ease: 'easeOut',
                  }}
                  className="pointer-events-none absolute inset-0 rounded-sm border border-[#e63946]"
                  aria-hidden="true"
                />
              )}

              {/* 3D Animated Badge Icon */}
              <motion.div
                key={`icon-${isSelected ? pulseWaveKey : 0}`}
                animate={
                  isSelected && pulseWaveKey > 0
                    ? {
                        rotateY: [0, 360],
                        scale: [1, 1.24, 1],
                      }
                    : { rotateY: 0, scale: 1 }
                }
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative z-10 group-hover:scale-110 transition-transform duration-300"
              >
                <TechBadgeIcon id={item.id} />
              </motion.div>

              <div className="relative z-10 font-medium text-xs text-white mt-3 group-hover:text-white transition-colors">
                {item.name}
              </div>

              <div className="relative z-10 font-mono text-[9px] tracking-[0.18em] uppercase text-[#e63946] mt-1">
                {item.tier}
              </div>

              {/* Index Coordinate Watermark on Hover / Selection */}
              <span
                className={`pointer-events-none absolute top-1.5 right-2 font-mono text-[8px] transition-opacity ${
                  isSelected ? 'opacity-80 text-[#e63946]' : 'opacity-0 group-hover:opacity-45 text-white'
                }`}
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              {isSelected && (
                <span
                  className="pointer-events-none absolute right-1 bottom-1 w-0 h-0 border-b-[6px] border-b-[#e63946] border-l-[6px] border-l-transparent"
                  aria-hidden="true"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Interactive Selected Skill Detail & Inquiry Bar */}
      <motion.div
        key={selectedItem.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-5 bg-[#0d0f14] border border-white/10 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 overflow-hidden"
      >
        {/* Animated Top Crimson Telemetry Progress Sweep */}
        <motion.span
          key={`bar-${selectedItem.id}-${pulseWaveKey}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: `${((selectedVisibleIdx + 1) / Math.max(1, visibleItems.length)) * 100}%`,
          }}
          className="pointer-events-none absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#b81d2a] via-[#e63946] to-[#ff7582] origin-left"
          aria-hidden="true"
        />

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="font-bold text-white">{selectedItem.name}</span>
            <span className="text-[#e63946]" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs text-[#e63946]">{selectedItem.specialty}</span>
            <span className="text-white/35" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs text-white/60">{selectedItem.stackLabel}</span>
          </div>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            {selectedItem.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onInquireWithSkill(selectedItem)}
          className="shrink-0 inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#09090b] border border-[#e63946]/45 hover:border-[#e63946] hover:bg-[#b81d2a] text-[11px] font-mono tracking-[0.16em] uppercase text-white transition-colors cursor-pointer"
        >
          <span>INQUIRE WITH {selectedItem.name.toUpperCase()}</span>
          <span className="text-[#e63946] group-hover:text-white">↗</span>
        </button>
      </motion.div>
    </div>
  );
}

export function HowIWorkAndCommunitySection({
  onInspectProject,
}: {
  onInspectProject: (project: PortfolioProject) => void;
}) {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [showcaseIdx, setShowcaseIdx] = useState<number>(0);

  const activeProject = PORTFOLIO_PROJECTS[showcaseIdx] || PORTFOLIO_PROJECTS[0];

  const handleCycleShowcase = (delta: number) => {
    setShowcaseIdx((prev) => cycleIndex(prev, PORTFOLIO_PROJECTS.length, delta));
  };

  const renderStepIcon = (iconType: string) => {
    switch (iconType) {
      case 'discover':
        return <Search className="w-3.5 h-3.5" />;
      case 'define':
        return <FileText className="w-3.5 h-3.5" />;
      case 'develop':
        return <Code2 className="w-3.5 h-3.5" />;
      default:
        return <Rocket className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section
      id="how-i-work"
      className="relative bg-[#07080c] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column (5 cols): Rohit Sahani Interactive Featured Projects Showcase (01 — 07) */}
        <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
          <div>
            {/* Project Switcher Tabs (01 — 07) */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Select featured project">
                {PORTFOLIO_PROJECTS.map((proj, idx) => {
                  const isCurrent = idx === showcaseIdx;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      onClick={() => setShowcaseIdx(idx)}
                      className={`px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase border transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#b81d2a] border-[#e63946] text-white font-semibold'
                          : 'bg-[#0d0f14] border-white/10 text-white/60 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {proj.numberLabel}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCycleShowcase(-1)}
                  aria-label="Previous showcase project"
                  className="w-7 h-7 rounded border border-white/15 hover:border-[#e63946] flex items-center justify-center text-white/75 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCycleShowcase(1)}
                  aria-label="Next showcase project"
                  className="w-7 h-7 rounded border border-white/15 hover:border-[#e63946] flex items-center justify-center text-white/75 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Live Project Preview Frame */}
            <div
              onClick={() => onInspectProject(activeProject)}
              data-cursor="INSPECT"
              className="group relative h-[250px] sm:h-[280px] rounded-md bg-[#0d0f14] border border-white/15 overflow-hidden cursor-pointer hover:border-[#e63946]/70 transition-all shadow-2xl"
            >
              <ProjectArchitecturePreview project={activeProject} />
            </div>
          </div>

          {/* Caption & Metadata Below Card */}
          <div className="pt-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[#e63946]">{activeProject.category}</span>
              <span className="text-white/40" aria-hidden="true">
                ·
              </span>
              <span className="text-white/75">
                {activeProject.liveUrl
                  ? 'Live Vercel Production Deployment'
                  : 'Rohit Sahani Project Showcase'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl sm:text-4xl text-[#e63946] font-light">
                  {activeProject.numberLabel}
                </span>
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl tracking-wide uppercase text-white">
                    {activeProject.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 mt-1">
                    {activeProject.liveUrl ? (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.2em] uppercase text-[#e63946] hover:text-white transition-colors"
                      >
                        <span>VIEW LIVE PROJECT</span>
                        <span>↗</span>
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => onInspectProject(activeProject)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.2em] uppercase text-white/70 hover:text-[#e63946] cursor-pointer transition-colors"
                    >
                      <span>INSPECT DETAILS</span>
                      <span>↗</span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCycleShowcase(1)}
                aria-label="Switch to next project in showcase"
                className="w-9 h-9 rounded-full border border-white/15 hover:border-[#e63946] flex items-center justify-center text-white/75 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
              {activeProject.architectureSummary}
            </p>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 font-mono text-xs text-white/70">
              {activeProject.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  {idx > 0 && (
                    <span className="text-[#e63946]" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span>{tech}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column (4 cols): HOW I WORK — 01 DISCOVER to 04 DELIVER */}
        <div className="lg:col-span-4 p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-baseline justify-between gap-2 mb-8">
            <h3 className="font-display text-3xl sm:text-4xl tracking-wide uppercase text-white">
              HOW I WORK
            </h3>
            <span className="font-mono text-[11px] tracking-[0.26em] uppercase text-white/55">
              WORK PROCESS
            </span>
          </div>

          <div className="space-y-7 relative">
            {HOW_I_WORK_STEPS.map((step, idx) => {
              const isSelected = activeStepIdx === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStepIdx(idx)}
                  className="group relative flex items-start gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
                    <span className="font-mono text-base text-[#e63946] font-semibold">
                      {step.number}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#e63946] bg-[#e63946]/15 text-[#e63946]'
                          : 'border-white/15 bg-white/[0.03] text-white/70 group-hover:border-white/35'
                      }`}
                    >
                      {renderStepIcon(step.iconType)}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-display text-lg tracking-wider uppercase text-[#e63946]">
                      {step.code}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      {step.subtitle}
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (3 cols): Deep Crimson Philosophy Panel */}
        <div className="lg:col-span-3 p-6 sm:p-8 md:p-10 bg-gradient-to-b from-[#3d0a14] via-[#26070d] to-[#120407] flex flex-col justify-between">
          <div>
            <div
              className="font-display text-5xl text-[#e63946] leading-none select-none mb-4"
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <blockquote className="text-lg sm:text-xl md:text-[22px] font-medium text-white/95 leading-[1.45]">
              Good development blends robust engineering with aesthetic precision.
            </blockquote>
          </div>

          <div className="pt-8 mt-8 border-t border-white/15">
            <div className="font-serif italic text-2xl text-white">Rohit Sahani</div>
            <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-white/65 mt-1">
              DEVELOPMENT PHILOSOPHY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkTogetherInquirySection({
  initialScopeTopic,
}: {
  initialScopeTopic?: string;
}) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('business');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(initialScopeTopic || 'WEBSITE DEVELOPMENT');
  const [details, setDetails] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);

  useEffect(() => {
    if (initialScopeTopic) {
      setTopic(initialScopeTopic);
    }
  }, [initialScopeTopic]);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = QUICK_SCOPE_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setTopic(found.topic);
      setDetails(found.detailsTemplate);
      setPreparedMailto(null);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_IDENTITY.emailPlaceholder);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm({
      name,
      email,
      subject: topic,
      message: details,
    });
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedMailto(null);
      return;
    }
    setErrors({});
    const subjectEncoded = encodeURIComponent(`[${topic}] Project Inquiry from ${name.trim()}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\nService / Topic: ${topic}\n\nProject Details:\n${details.trim()}`
    );
    setPreparedMailto(
      `mailto:${PERSONAL_IDENTITY.emailPlaceholder}?subject=${subjectEncoded}&body=${bodyEncoded}`
    );
  };

  const qrMatrix = React.useMemo(
    () => generateEmailQrMatrix(PERSONAL_IDENTITY.emailPlaceholder),
    []
  );
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PERSONAL_IDENTITY.emailPlaceholder
  )}`;

  return (
    <section
      id="inquiry-composer"
      className="relative bg-[#07080c] text-white border-t border-white/10 py-14 px-5 sm:px-8 md:px-12 overflow-hidden sm:rounded-b-[34px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column (4 cols): LET'S WORK TOGETHER & Channels */}
        <div className="lg:col-span-4 space-y-5">
          <div>
            <h3 className="font-display text-4xl sm:text-5xl tracking-wide uppercase text-white leading-none">
              LET&apos;S WORK TOGETHER
            </h3>
            <div className="font-mono text-xs tracking-[0.26em] uppercase text-[#e63946] mt-2">
              COLLABORATE &amp; INQUIRE
            </div>
          </div>

          <p className="text-sm text-white/70 leading-relaxed">
            Have an idea, a business, or a project in mind? Let&apos;s create something meaningful
            together.
          </p>

          <div className="space-y-3 pt-1">
            {/* Email Copy Box */}
            <div className="bg-[#0d0f14] border border-white/10 px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Mail className="w-4 h-4 text-[#e63946] shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-white truncate">
                  {PERSONAL_IDENTITY.emailPlaceholder}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] border border-white/15 hover:border-white/35 text-[10px] font-mono uppercase tracking-wider text-white/80 hover:text-white cursor-pointer transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Location Box */}
            <div className="bg-[#0d0f14] border border-white/10 px-4 py-3 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#e63946] shrink-0" />
              <span className="text-xs sm:text-sm text-white/85">{PERSONAL_IDENTITY.location}</span>
            </div>
          </div>

          {/* Professional Channels */}
          <div className="pt-2 space-y-2.5">
            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/55">
              PROFESSIONAL CHANNELS
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_IDENTITY.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0d0f14] border border-white/10 hover:border-[#e63946]/60 p-4 flex flex-col justify-between transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg tracking-wide uppercase text-white">
                    GITHUB
                  </span>
                  <span className="text-[#e63946] text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </div>
                <div className="text-[11px] font-mono text-white/55 mt-2">
                  Request Repository Access
                </div>
              </a>

              <a
                href={PERSONAL_IDENTITY.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0d0f14] border border-white/10 hover:border-[#e63946]/60 p-4 flex flex-col justify-between transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg tracking-wide uppercase text-white">
                    LINKEDIN
                  </span>
                  <span className="text-[#e63946] text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </div>
                <div className="text-[11px] font-mono text-white/55 mt-2">
                  Connect via Direct Inquiry
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Center Column (5 cols): PROJECT INQUIRY COMPOSER */}
        <div className="lg:col-span-5 bg-[#0d0f14] border border-white/10 p-6 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-white/10">
            <h4 className="font-display text-2xl sm:text-[26px] tracking-wide uppercase text-white">
              PROJECT INQUIRY COMPOSER
            </h4>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/55">
              DIRECT EMAIL DISPATCH
            </span>
          </div>

          <form onSubmit={handleSubmitInquiry} className="space-y-4 pt-4" noValidate>
            {/* QUICK SCOPE STARTER */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2">
                QUICK SCOPE STARTER:
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_SCOPE_PRESETS.map((preset) => {
                  const active = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`px-3 py-1.5 text-[10px] font-mono tracking-[0.16em] uppercase border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#b81d2a]/25 border-[#e63946] text-white'
                          : 'bg-[#090b10] border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label
                  htmlFor="composer-name"
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white/65 mb-1.5"
                >
                  YOUR NAME *
                </label>
                <input
                  id="composer-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-[#090b10] border border-white/12 focus:border-[#e63946] px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none"
                />
                {errors.name && (
                  <p className="text-[11px] text-[#ff5a67] mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="composer-email"
                  className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white/65 mb-1.5"
                >
                  YOUR EMAIL *
                </label>
                <input
                  id="composer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#090b10] border border-white/12 focus:border-[#e63946] px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-[11px] text-[#ff5a67] mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* SERVICE / TOPIC */}
            <div>
              <label
                htmlFor="composer-topic"
                className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white/65 mb-1.5"
              >
                SERVICE / TOPIC *
              </label>
              <select
                id="composer-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#090b10] border border-white/12 focus:border-[#e63946] px-3.5 py-2.5 text-xs font-mono uppercase text-white focus:outline-none"
              >
                {!['WEBSITE DEVELOPMENT', 'AI & LLM APPLICATION', 'RESTAURANT / HOSPITALITY SITE', 'LANDING PAGE & UI REDESIGN', 'GENERAL COLLABORATION'].includes(topic) && (
                  <option value={topic}>{topic}</option>
                )}
                <option value="WEBSITE DEVELOPMENT">WEBSITE DEVELOPMENT</option>
                <option value="AI & LLM APPLICATION">AI &amp; LLM APPLICATION</option>
                <option value="RESTAURANT / HOSPITALITY SITE">
                  RESTAURANT / HOSPITALITY SITE
                </option>
                <option value="LANDING PAGE & UI REDESIGN">LANDING PAGE &amp; UI REDESIGN</option>
                <option value="GENERAL COLLABORATION">GENERAL COLLABORATION</option>
              </select>
            </div>

            {/* PROJECT DETAILS */}
            <div>
              <label
                htmlFor="composer-details"
                className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white/65 mb-1.5"
              >
                PROJECT DETAILS *
              </label>
              <textarea
                id="composer-details"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Tell me about your website goals, timeline, or collaboration idea..."
                className="w-full bg-[#090b10] border border-white/12 focus:border-[#e63946] p-3.5 text-xs text-white placeholder:text-white/30 focus:outline-none resize-y"
              />
              {errors.message && (
                <p className="text-[11px] text-[#ff5a67] mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#b81d2a] hover:bg-[#d12231] text-white font-mono text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>PREPARE DIRECT INQUIRY</span>
            </button>

            {preparedMailto && (
              <div className="mt-3 p-3.5 bg-emerald-950/40 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-emerald-300 font-mono">
                  ✓ Direct inquiry ready for {PERSONAL_IDENTITY.emailPlaceholder}
                </div>
                <a
                  href={preparedMailto}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-black font-mono text-[11px] font-bold uppercase tracking-wider"
                >
                  <span>DISPATCH EMAIL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </form>
        </div>

        {/* Right Column (3 cols): Editorial Statement + Real Scannable Gmail QR Card */}
        <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-8">
          <div className="pl-5 border-l border-[#e63946]/45 space-y-2">
            <div className="text-[#e63946] text-lg leading-none" aria-hidden="true">
              ✦
            </div>
            <div className="font-display text-3xl sm:text-4xl leading-[0.96] tracking-wide uppercase text-white">
              DESIGNING
              <span className="block">EXPERIENCES.</span>
              <span className="block">BUILDING</span>
              <span className="block">CONNECTIONS.</span>
              <span className="block text-[#b81d2a] mt-1">ROHIT SAHANI.</span>
            </div>
          </div>

          {/* QUICK CONNECT Real Scannable QR Card */}
          <div className="bg-[#0d0f14] border border-white/10 hover:border-[#e63946]/60 p-4 flex items-center gap-4 transition-colors">
            <a
              href={qrMatrix.payload}
              aria-label={`Scan or click QR code to email ${PERSONAL_IDENTITY.emailPlaceholder}`}
              title={`Scan with phone camera or click to email ${PERSONAL_IDENTITY.emailPlaceholder}`}
              className="w-24 h-24 bg-white p-1.5 rounded-xs shrink-0 flex items-center justify-center relative shadow-md hover:scale-105 transition-transform"
            >
              {/* Real ISO/IEC 18004 Level-H QR Matrix for mailto:rohit.sahani.dev@gmail.com */}
              <svg
                data-testid="gmail-qr-code"
                viewBox={`0 0 ${qrMatrix.size + 2} ${qrMatrix.size + 2}`}
                shapeRendering="crispEdges"
                className="w-full h-full text-black"
                role="img"
                aria-label={`QR Code for ${PERSONAL_IDENTITY.emailPlaceholder}`}
              >
                <rect width={qrMatrix.size + 2} height={qrMatrix.size + 2} fill="#ffffff" />
                {qrMatrix.cells.map((row, rIdx) =>
                  row.map((isDark, cIdx) =>
                    isDark ? (
                      <rect
                        key={`${rIdx}-${cIdx}`}
                        x={cIdx + 1}
                        y={rIdx + 1}
                        width={1}
                        height={1}
                        fill="#000000"
                      />
                    ) : null
                  )
                )}
              </svg>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="px-1 py-0.5 bg-black text-white border border-white font-mono text-[7px] leading-none font-bold tracking-tighter">
                  RS
                </span>
              </div>
            </a>

            <div className="min-w-0 space-y-1">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#e63946]">
                QUICK CONNECT
              </div>
              <div className="text-xs font-bold text-white">Direct Gmail Inquiry</div>
              <div className="text-[11px] text-white/60 break-all leading-snug">
                Destination: {PERSONAL_IDENTITY.emailPlaceholder}
              </div>
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#e63946] hover:text-white transition-colors"
                >
                  <span>OPEN GMAIL</span>
                  <span>↗</span>
                </a>
                <span className="text-white/25 text-[10px]" aria-hidden="true">
                  ·
                </span>
                <a
                  href={qrMatrix.payload}
                  className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                >
                  <span>MAIL APP</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ScrollTopProgressButton() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let rafId: number | null = null;

    const computeNow = () => {
      rafId = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll =
        Math.max(
          document.documentElement.scrollHeight,
          document.body ? document.body.scrollHeight : 0
        ) - window.innerHeight;
      const next = computeScrollProgressPercent(scrollTop, maxScroll);
      setProgress((prev) => (prev === next ? prev : next));
    };

    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(computeNow);
      }
    };

    computeNow();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label={`Scroll to top (${progress}% scrolled)`}
        className="group relative bg-[#0c0e14]/95 hover:bg-[#131620] text-white border border-white/15 hover:border-[#e63946]/60 px-4 py-2.5 flex items-center gap-3 shadow-[0_12px_32px_rgba(0,0,0,0.65)] backdrop-blur-md transition-colors cursor-pointer overflow-hidden"
      >
        {/* Top Edge Live Scroll Progress Bar */}
        <span
          className="pointer-events-none absolute top-0 left-0 right-0 h-[2.5px] bg-white/10"
          aria-hidden="true"
        >
          <span
            data-testid="scroll-top-progress-bar"
            style={{ width: `${progress}%` }}
            className="block h-full bg-[#e63946] transition-[width] duration-75"
          />
        </span>

        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/90">
          TOP
        </span>

        <span className="font-mono text-[10px] text-[#e63946] min-w-[28px] text-right">
          {progress}%
        </span>

        <span className="h-3.5 w-px bg-white/15" aria-hidden="true" />

        <span className="w-6 h-6 border border-[#e63946]/45 group-hover:border-[#e63946] group-hover:bg-[#e63946] text-[#e63946] group-hover:text-white flex items-center justify-center transition-colors">
          <ArrowUp className="w-3.5 h-3.5" />
        </span>
      </button>
    </div>
  );
}
