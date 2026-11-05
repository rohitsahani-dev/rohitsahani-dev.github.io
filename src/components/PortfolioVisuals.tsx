import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ALL_TECHNOLOGIES,
  HERO_MARQUEE_ITEMS,
  PortfolioProject,
  CursorDescriptor,
  resolveCursorDescriptor,
  lerpPoint,
} from '../utils/portfolioLogic';

export function RohitBrandMark({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points="18,2 22,13 34,18 22,23 18,34 14,23 2,18 14,13"
        fill="#c81e2b"
      />
      <circle cx="18" cy="18" r="3.5" fill="#ffffff" />
    </svg>
  );
}

export function LabNodeMiniIcon({
  size = 16,
  variant = 'red',
  className = '',
}: {
  size?: number;
  variant?: 'red' | 'black' | 'light';
  className?: string;
}) {
  const outerFill =
    variant === 'black' ? '#09090b' : variant === 'light' ? '#f6f6f6' : '#c81e2b';
  const ringStroke = variant === 'light' ? '#09090b' : '#ffffff';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" fill={outerFill} />
      <circle cx="16" cy="16" r="9.5" stroke={ringStroke} strokeWidth="1.8" strokeOpacity="0.85" />
      <path d="M16 3.5V9M16 23V28.5M3.5 16H9M23 16H28.5" stroke={ringStroke} strokeWidth="1.8" />
      <circle cx="16" cy="16" r="2.6" fill={ringStroke} />
    </svg>
  );
}

export function MarqueeRibbonStrip({
  variant = 'crimson',
  mode = 'hero',
  className = '',
}: {
  variant?: 'crimson' | 'dark';
  mode?: 'hero' | 'tech';
  className?: string;
}) {
  const baseWords = mode === 'hero' ? HERO_MARQUEE_ITEMS : ALL_TECHNOLOGIES;
  const repeated = Array.from({ length: mode === 'hero' ? 12 : 4 }, () => baseWords).flat();
  const isCrimson = variant === 'crimson';

  return (
    <div
      className={`w-[120%] -ml-[10%] overflow-hidden select-none pointer-events-none flex items-center py-2 ${
        isCrimson
          ? 'bg-[#b81d2a] shadow-[0_6px_24px_rgba(184,29,42,0.42)]'
          : 'bg-[#121216]/95 border-y border-white/10'
      } ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex items-center gap-5 whitespace-nowrap ${
          isCrimson ? 'animate-ribbon-left' : 'animate-ribbon-right'
        }`}
      >
        {repeated.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span className="font-display text-xs md:text-sm tracking-[0.24em] uppercase text-white font-semibold">
              {word}
            </span>
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                isCrimson ? 'bg-[#09090b] text-white' : 'bg-[#b81d2a] text-white'
              }`}
            >
              <span className="text-[9px] leading-none">✦</span>
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function TechnicalBadgeSeal({
  indexLabel = '01',
  theme = 'dark',
  onClick,
}: {
  indexLabel?: string;
  theme?: 'dark' | 'light';
  onClick?: () => void;
}) {
  const isLight = theme === 'light';
  const [burstKey, setBurstKey] = useState<number>(0);
  const [isBursting, setIsBursting] = useState<boolean>(false);
  const [cycleGlyph, setCycleGlyph] = useState<'RS' | 'AI' | '✦'>('RS');

  const handleSealClick = () => {
    setBurstKey((prev) => prev + 1);
    setIsBursting(true);
    setCycleGlyph('✦');
    window.setTimeout(() => setCycleGlyph('AI'), 240);
    window.setTimeout(() => {
      setCycleGlyph('RS');
      setIsBursting(false);
    }, 850);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      data-cursor="SPIN ✦"
      aria-label={`Trigger creative seal animation ${indexLabel}`}
      onClick={handleSealClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSealClick();
        }
      }}
      className="relative flex items-center select-none cursor-pointer group focus:outline-none"
    >
      {/* Index Badge with 360-degree Spring Flip on Click */}
      <motion.span
        key={`idx-${burstKey}`}
        animate={
          burstKey > 0
            ? {
                rotate: [-12, 348],
                scale: [1, 1.32, 0.94, 1],
              }
            : { rotate: -12, scale: 1 }
        }
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={`w-9 h-9 rounded-full border flex items-center justify-center font-display text-xs tracking-wider -mr-2.5 relative z-10 tabular-nums transition-colors duration-300 ${
          isBursting
            ? 'border-[#e02432] bg-[#b81d2a] text-white shadow-[0_0_20px_rgba(224,36,50,0.7)]'
            : isLight
            ? 'border-black/45 bg-[#f6f6f6] text-[#09090b] group-hover:border-[#b81d2a]'
            : 'border-white/55 bg-[#09090b] text-white group-hover:border-[#e02432]'
        }`}
      >
        {indexLabel}
      </motion.span>

      {/* Main Circular Seal Container */}
      <motion.div
        key={`seal-${burstKey}`}
        animate={
          burstKey > 0
            ? {
                scale: [1, 1.24, 0.92, 1.06, 1],
                rotate: [0, 360],
              }
            : { scale: 1, rotate: 0 }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
        className={`w-16 h-16 md:w-[74px] md:h-[74px] rounded-full bg-[#111115] border-2 flex items-center justify-center relative transition-shadow duration-300 ${
          isBursting
            ? 'border-[#ff4d5a] shadow-[0_0_38px_rgba(224,36,50,0.85)]'
            : 'border-[#b81d2a] shadow-lg group-hover:shadow-[0_0_24px_rgba(184,29,42,0.5)]'
        }`}
      >
        {/* Expanding Crimson Shockwave Rings & Radial Sparks on Click */}
        {burstKey > 0 && (
          <>
            <motion.span
              key={`wave1-${burstKey}`}
              initial={{ scale: 0.85, opacity: 0.95 }}
              animate={{ scale: 2.35, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#e02432]"
              aria-hidden="true"
            />
            <motion.span
              key={`wave2-${burstKey}`}
              initial={{ scale: 0.9, opacity: 0.75 }}
              animate={{ scale: 1.85, opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-[#ff5a67]"
              aria-hidden="true"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const tx = Math.cos(rad) * 54;
              const ty = Math.sin(rad) * 54;
              return (
                <motion.span
                  key={`spark-${burstKey}-${deg}`}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: tx, y: ty, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute w-2 h-2 rotate-45 bg-[#e02432] shadow-[0_0_8px_#ff4d5a]"
                  aria-hidden="true"
                />
              );
            })}
          </>
        )}

        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full ${isBursting ? 'animate-spin' : 'animate-spin-slow'}`}
          aria-hidden="true"
        >
          <defs>
            <path
              id={`sealCircle-${indexLabel}-${theme}`}
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
          </defs>
          <text
            fill={isBursting ? '#ff6b78' : '#ffffff'}
            fontSize="9.5"
            fontWeight="700"
            letterSpacing="2.6px"
            fontFamily="Antonio, Oswald, sans-serif"
          >
            <textPath href={`#sealCircle-${indexLabel}-${theme}`}>
              ROHIT SAHANI · AI LAB ·
            </textPath>
          </text>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={`core-${burstKey}`}
            animate={
              burstKey > 0
                ? {
                    rotateY: [0, 180, 360],
                    scale: [1, 1.38, 1],
                  }
                : { rotateY: 0, scale: 1 }
            }
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`w-7 h-7 rounded-full text-white font-display text-xs tracking-wider flex items-center justify-center transition-colors ${
              isBursting
                ? 'bg-[#ff2a3c] ring-2 ring-white shadow-[0_0_16px_rgba(255,42,60,0.9)]'
                : 'bg-[#b81d2a] group-hover:bg-[#e02432]'
            }`}
          >
            {cycleGlyph}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function EditorialPortraitCollage({
  activeStageIndex = 0,
  activeStageNumber,
  activeStageTitle = 'EXPERIMENT',
  activeStageDeliverable = 'Prompt Prototype & API Proof-of-Concept',
  onClick,
  onSelectCard,
}: {
  activeStageIndex?: number;
  activeStageNumber: string;
  activeStageTitle?: string;
  activeStageDeliverable?: string;
  onClick?: () => void;
  onSelectCard?: (cardIdx: number) => void;
}) {
  const frontCardIdx = ((activeStageIndex % 3) + 3) % 3;

  const getSlotClasses = (cardIdx: number) => {
    const offset = (cardIdx - frontCardIdx + 3) % 3;
    if (offset === 0) {
      // Center dominant front slot
      return 'z-20 w-[152px] sm:w-[170px] h-[194px] sm:h-[214px] -rotate-[2deg] translate-x-0 translate-y-0 scale-105 ring-2 ring-white/90 shadow-[0_22px_44px_rgba(0,0,0,0.72)]';
    }
    if (offset === 1) {
      // Right tilted slot (+14deg)
      return 'z-10 w-[138px] sm:w-[152px] h-[176px] sm:h-[194px] rotate-[14deg] translate-x-12 sm:translate-x-16 translate-y-2 scale-95 opacity-95 hover:opacity-100 hover:translate-x-14 sm:hover:translate-x-18 shadow-xl';
    }
    // Left tilted slot (-16deg)
    return 'z-10 w-[138px] sm:w-[152px] h-[176px] sm:h-[194px] -rotate-[16deg] -translate-x-12 sm:-translate-x-16 translate-y-2 scale-95 opacity-95 hover:opacity-100 hover:-translate-x-14 sm:hover:-translate-x-18 shadow-xl';
  };

  const handleCardPress = (e: React.MouseEvent, cardIdx: number) => {
    e.stopPropagation();
    if (onSelectCard) {
      onSelectCard(cardIdx);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="PORTRAIT"
      aria-label="Inspect Rohit Sahani editorial portrait and workflow cards"
      className="relative w-[260px] sm:w-[300px] md:w-[320px] h-[235px] sm:h-[255px] flex items-center justify-center group cursor-pointer focus:outline-none select-none"
    >
      {/* Card 1: Studio Cutout Portrait + Technical Architecture Spec */}
      <div
        onClick={(e) => handleCardPress(e, 1)}
        className={`absolute rounded-2xl bg-[#141419] border border-white/25 p-3 flex flex-col justify-between text-left transition-all duration-300 ease-out overflow-hidden ${getSlotClasses(
          1
        )}`}
      >
        <div className="flex items-center justify-between text-[9px] font-mono text-white/70 relative z-10">
          <span>BIT · LAB</span>
          <span className="text-[#e02432] font-bold">{activeStageNumber}</span>
        </div>
        <div className="relative my-auto flex items-center gap-2 z-10">
          <img
            src="/assets/rohit/rohit-portrait-clean.png"
            alt="Rohit Sahani classic portrait"
            referrerPolicy="no-referrer"
            className="w-11 h-14 rounded-lg object-cover object-top bg-[#09090b] border border-white/15 shrink-0"
          />
          <div>
            <div className="font-display text-xs uppercase tracking-wide text-white leading-tight">
              PYTHON &amp; LLM
            </div>
            <div className="text-[8px] text-white/65 leading-snug mt-0.5">
              Prompt &amp; API workflows
            </div>
          </div>
        </div>
        <div className="text-[8px] font-mono tracking-widest uppercase text-white/55 relative z-10 flex items-center justify-between">
          <span>BIRATNAGAR · NP</span>
          <span className="text-[#e02432]">01/03</span>
        </div>
      </div>

      {/* Card 2: Crimson Systems & Stage Readout Card */}
      <div
        onClick={(e) => handleCardPress(e, 2)}
        className={`absolute rounded-2xl bg-[#b81d2a] border border-white/30 p-3 flex flex-col justify-between text-left transition-all duration-300 ease-out overflow-hidden ${getSlotClasses(
          2
        )}`}
      >
        <div className="flex items-center justify-between text-[9px] font-mono text-white/90">
          <span>{activeStageTitle}</span>
          <span>07 PROJECTS</span>
        </div>
        <div className="my-auto">
          <div className="font-display text-2xl leading-none text-white">AI + WEB</div>
          <div className="text-[9px] text-white/90 mt-1.5 leading-snug line-clamp-3">
            {activeStageDeliverable}
          </div>
        </div>
        <div className="text-[8px] font-mono tracking-widest uppercase text-white/85 flex items-center justify-between">
          <span>ROHIT SAHANI</span>
          <span>02/03</span>
        </div>
      </div>

      {/* Card 3: Rohit Sahani Editorial Suit Portrait */}
      <div
        onClick={(e) => handleCardPress(e, 0)}
        className={`absolute rounded-2xl bg-[#101014] border-2 border-white/90 overflow-hidden transition-all duration-300 ease-out ${getSlotClasses(
          0
        )}`}
      >
        <img
          src="/assets/rohit/rohit-portrait-suit.jpg"
          alt="Rohit Sahani editorial portrait in navy suit"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_38%] scale-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/85 pointer-events-none" />
        <div className="absolute top-2 left-2.5 right-2.5 flex items-center justify-between text-[8px] font-mono tracking-wider uppercase text-white/90 z-20 pointer-events-none">
          <span>ROHIT SAHANI</span>
          <span className="text-[#ff4d5a]">● {activeStageNumber}</span>
        </div>
        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black via-black/85 to-transparent z-20 text-left pointer-events-none">
          <div className="font-display text-xs tracking-wider uppercase text-white leading-none">
            {activeStageNumber} — {activeStageTitle}
          </div>
          <div className="text-[8px] font-mono text-white/75 truncate mt-0.5">
            CLICK TO CYCLE CARDS ↻
          </div>
        </div>
      </div>
    </button>
  );
}

export function ProjectArchitecturePreview({
  project,
  compact = false,
}: {
  project: PortfolioProject;
  compact?: boolean;
}) {
  if (project.screenshotUrl) {
    return (
      <div className="relative w-full h-full bg-[#0d0d11] text-white overflow-hidden select-none flex flex-col justify-between">
        <img
          src={project.screenshotUrl}
          alt={`${project.name} live interface screenshot`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/80"
          aria-hidden="true"
        />

        {/* Top header row inside screenshot preview */}
        <div
          className={`relative z-10 flex items-center justify-between gap-2 text-[8px] sm:text-[9px] font-mono tracking-[0.16em] uppercase text-white/95 ${
            compact ? 'px-5 pt-2.5 pb-0' : 'p-4 pb-0'
          }`}
        >
          <span className="bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/15 whitespace-nowrap shrink-0">
            {project.numberLabel} · {project.category}
          </span>
          <span className="bg-[#b81d2a] text-white px-2 py-0.5 rounded-md font-semibold whitespace-nowrap shrink-0">
            {compact ? 'LIVE ↗' : 'LIVE ON VERCEL ↗'}
          </span>
        </div>

        {/* Bottom tech row inside screenshot preview */}
        <div
          className={`relative z-10 flex items-center justify-between border-t border-white/15 bg-black/65 backdrop-blur-xs text-[9px] text-white/85 ${
            compact ? 'px-3 py-2' : 'px-4 py-2.5'
          }`}
        >
          <span className="truncate">{project.technologies.join(' · ')}</span>
          <span className="font-display text-xs text-white ml-2 shrink-0">↗</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full bg-[#0d0d11] text-white overflow-hidden select-none flex flex-col justify-between ${
        compact ? 'p-3.5' : 'p-5'
      }`}
    >
      {/* Subtle architectural grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 w-36 h-36 rounded-full bg-[#b81d2a]/25 blur-2xl"
        aria-hidden="true"
      />

      {/* Top header row inside preview */}
      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono tracking-[0.2em] uppercase text-white/60">
        <span>{project.numberLabel} · {project.category}</span>
        <span className="text-[#e02432]">{project.technologies[0]}</span>
      </div>

      {/* Center domain-specific schematic graphic */}
      <div className="relative z-10 my-auto py-3">
        {project.previewType === 'scamshield' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2">
              <span className="text-[10px] font-mono text-white/80">INPUT: PHISHING / SMS STREAM</span>
              <span className="text-[9px] font-mono text-[#ff5a67] uppercase">RISK SCAN</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="bg-[#b81d2a]/20 border border-[#b81d2a]/50 rounded-lg py-1.5 px-1">
                <div className="font-display text-xs text-white">INTENT</div>
                <div className="text-[8px] text-white/60">LLM Parser</div>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-lg py-1.5 px-1">
                <div className="font-display text-xs text-white">PATTERN</div>
                <div className="text-[8px] text-white/60">Urgency Check</div>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-lg py-1.5 px-1">
                <div className="font-display text-xs text-white">VERDICT</div>
                <div className="text-[8px] text-white/60">Safety Alert</div>
              </div>
            </div>
          </div>
        )}

        {project.previewType === 'marginiq' && (
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/[0.05] border border-white/10 rounded-xl p-2">
                <div className="text-[8px] font-mono text-white/50">UNIT COST</div>
                <div className="font-display text-base text-white mt-0.5">SQL + JS</div>
              </div>
              <div className="bg-[#b81d2a]/25 border border-[#b81d2a]/60 rounded-xl p-2">
                <div className="text-[8px] font-mono text-white/80">MARGIN IQ</div>
                <div className="font-display text-base text-white mt-0.5">ANALYTICS</div>
              </div>
              <div className="bg-white/[0.05] border border-white/10 rounded-xl p-2">
                <div className="text-[8px] font-mono text-white/50">PRICING</div>
                <div className="font-display text-base text-white mt-0.5">MODEL</div>
              </div>
            </div>
            <div className="h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-end p-1 gap-1.5">
              <div className="h-3 flex-1 bg-white/30 rounded-xs" />
              <div className="h-4 flex-1 bg-white/50 rounded-xs" />
              <div className="h-5 flex-1 bg-[#c81e2b] rounded-xs" />
              <div className="h-4 flex-1 bg-white/60 rounded-xs" />
              <div className="h-5 flex-1 bg-[#e02432] rounded-xs" />
            </div>
          </div>
        )}

        {project.previewType === 'himalayan' && (
          <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#1b1414] to-[#0d0d11] p-3 space-y-1.5">
            <div className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#ff6b76]">
              CULINARY DIGITAL EXPERIENCE
            </div>
            <div className="font-display text-lg tracking-wide uppercase text-white leading-none">
              HIMALAYAN KITCHEN
            </div>
            <div className="flex items-center gap-2 text-[9px] text-white/65 pt-1">
              <span>CURATED MENU</span>
              <span>·</span>
              <span>TABLE INQUIRY</span>
              <span>·</span>
              <span>RESPONSIVE UI</span>
            </div>
          </div>
        )}

        {project.previewType === 'mycroft' && (
          <div className="space-y-1.5">
            <div className="rounded-xl bg-white/[0.05] border border-white/10 px-3 py-1.5 text-[9px] text-white/75">
              <span className="text-[#e02432] font-mono mr-1.5">USER:</span>
              Summarize architecture &amp; generate Python helper
            </div>
            <div className="rounded-xl bg-[#b81d2a]/20 border border-[#b81d2a]/50 px-3 py-1.5 text-[9px] text-white">
              <span className="font-mono text-white/80 mr-1.5">MYCROFT AI:</span>
              Context parsed via LLM API integration. Ready.
            </div>
          </div>
        )}

        {project.previewType === 'weather' && (
          <div className="flex items-center justify-between bg-white/[0.05] border border-white/10 rounded-xl p-3">
            <div>
              <div className="text-[8px] font-mono uppercase text-white/55">LIVE REST API</div>
              <div className="font-display text-lg text-white leading-tight mt-0.5">
                FORECAST ENGINE
              </div>
              <div className="text-[9px] text-white/65">Temp · Humidity · Wind</div>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#b81d2a] text-white font-display text-sm flex items-center justify-center">
              API
            </div>
          </div>
        )}
      </div>

      {/* Bottom tech row */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2 text-[9px] text-white/65">
        <span className="truncate">{project.technologies.join(' · ')}</span>
        <span className="font-display text-xs text-white ml-2 shrink-0">↗</span>
      </div>
    </div>
  );
}

export function StaggeredLetters({
  text,
  className = '',
  delayOffset = 0,
  stagger = 0.045,
  replayKey = 0,
  once = false,
}: {
  text: string;
  className?: string;
  delayOffset?: number;
  stagger?: number;
  replayKey?: number;
  once?: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, replayKey]);

  const chars = Array.from(text);
  return (
    <span
      ref={containerRef}
      className={`inline-flex overflow-hidden ${className}`}
      aria-label={text}
    >
      {chars.map((ch, idx) => (
        <span
          key={`${replayKey}-${idx}`}
          aria-hidden="true"
          style={{
            opacity: inView ? 1 : 0.08,
            transform: inView
              ? 'translate3d(0, 0%, 0) scaleX(1)'
              : 'translate3d(0, 24%, 0) scaleX(0.72)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '0.42s',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: inView ? `${(delayOffset + idx * stagger).toFixed(3)}s` : '0s',
          }}
          className="inline-block origin-left"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

export function ModernCustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const [descriptor, setDescriptor] = useState<CursorDescriptor>({
    variant: 'default',
    label: '',
    ringSize: 36,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let hasInitialFix = false;
    let isVisible = false;
    let lastRawTarget: EventTarget | null = null;
    let rafId: number | null = null;

    const applyDotTransform = (x: number, y: number) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const applyRingTransform = (x: number, y: number) => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
          1
        )}px, 0) translate(-50%, -50%)`;
      }
    };

    const inspectHoverTarget = (rawTarget: EventTarget | null, x: number, y: number) => {
      const candidate =
        rawTarget && typeof (rawTarget as Element).closest === 'function'
          ? (rawTarget as Element)
          : document.elementFromPoint(x, y);

      if (!candidate || typeof candidate.closest !== 'function') {
        setDescriptor((prev) =>
          prev.variant === 'default' ? prev : { variant: 'default', label: '', ringSize: 36 }
        );
        return;
      }
      const interactive = candidate.closest(
        '[data-cursor], a, button, [role="button"], [role="tab"], input, textarea'
      );
      if (!interactive) {
        setDescriptor((prev) =>
          prev.variant === 'default' ? prev : { variant: 'default', label: '', ringSize: 36 }
        );
        return;
      }
      const nextDesc = resolveCursorDescriptor({
        dataCursor: interactive.getAttribute('data-cursor'),
        tagName: interactive.tagName,
        href: interactive.getAttribute('href'),
        role: interactive.getAttribute('role'),
      });
      setDescriptor((prev) =>
        prev.variant === nextDesc.variant &&
        prev.label === nextDesc.label &&
        prev.ringSize === nextDesc.ringSize
          ? prev
          : nextDesc
      );
    };

    const animateRing = () => {
      const next = lerpPoint(current, target, 0.68);
      current.x = next.x;
      current.y = next.y;
      applyRingTransform(current.x, current.y);

      const dist = Math.hypot(target.x - current.x, target.y - current.y);
      if (dist > 0.2) {
        rafId = window.requestAnimationFrame(animateRing);
      } else {
        current.x = target.x;
        current.y = target.y;
        applyRingTransform(current.x, current.y);
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!hasInitialFix) {
        hasInitialFix = true;
        current.x = target.x;
        current.y = target.y;
        applyRingTransform(current.x, current.y);
      }

      // Immediate zero-latency hardware update for the inner dot
      applyDotTransform(target.x, target.y);

      if (!isVisible) {
        isVisible = true;
        setVisible(true);
      }

      if (e.target !== lastRawTarget && e.target) {
        lastRawTarget = e.target;
        inspectHoverTarget(e.target, e.clientX, e.clientY);
      }

      if (rafId === null) {
        rafId = window.requestAnimationFrame(animateRing);
      }
    };

    const handleMouseDown = () => setPressed(true);
    const handleMouseUp = () => setPressed(false);
    const handleMouseLeave = () => {
      isVisible = false;
      setVisible(false);
    };
    const handleMouseEnter = () => {
      isVisible = true;
      setVisible(true);
    };

    window.addEventListener('pointermove', handleMouseMove as EventListener, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handleMouseMove as EventListener);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  const isExpandedBadge =
    descriptor.variant === 'project' ||
    descriptor.variant === 'external' ||
    descriptor.variant === 'portrait';
  const isAction = descriptor.variant === 'action';

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-100 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Ultra-Responsive Outer Reticle / Contextual Magnetic Lens */}
      <div
        ref={ringRef}
        data-testid="custom-cursor-ring"
        data-variant={descriptor.variant}
        style={{
          width: `${pressed ? descriptor.ringSize * 0.86 : descriptor.ringSize}px`,
          height: `${pressed ? descriptor.ringSize * 0.86 : descriptor.ringSize}px`,
        }}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-[width,height,background-color,border-color,box-shadow] duration-100 ease-out will-change-transform ${
          isExpandedBadge
            ? 'bg-[#b81d2a]/95 border-2 border-white/85 shadow-[0_12px_30px_rgba(184,29,42,0.5)]'
            : isAction
            ? 'bg-[#b81d2a]/18 border-[1.5px] border-[#e02432] shadow-[0_0_24px_rgba(224,36,50,0.35)]'
            : 'bg-black/15 border border-[#e02432]/75'
        }`}
      >
        {/* Subtle Corner Crosshair Ticks in Default & Action States */}
        {!isExpandedBadge && (
          <>
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 bg-[#e02432]" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 bg-[#e02432]" />
            <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-[1.5px] bg-[#e02432]" />
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-[1.5px] bg-[#e02432]" />
          </>
        )}

        {/* Contextual Editorial Badge Label inside Expanded Ring */}
        {isExpandedBadge && descriptor.label && (
          <span className="font-display text-[10px] tracking-[0.16em] uppercase text-white leading-none whitespace-nowrap px-1.5 select-none">
            {descriptor.label}
          </span>
        )}
      </div>

      {/* Zero-Latency Inner Precision Core Dot / Diamond (no CSS transition on transform!) */}
      <div
        ref={dotRef}
        data-testid="custom-cursor-dot"
        className="fixed top-0 left-0 will-change-transform"
      >
        <span
          className={`block transition-[width,height,transform,background-color,opacity] duration-100 ${
            isExpandedBadge
              ? 'w-1.5 h-1.5 rounded-full bg-white opacity-0'
              : isAction
              ? 'w-2.5 h-2.5 rotate-45 bg-[#e02432] ring-2 ring-white/90'
              : pressed
              ? 'w-3 h-3 rounded-full bg-[#ff4d5a] ring-2 ring-white'
              : 'w-2 h-2 rounded-full bg-[#e02432] ring-1 ring-white/90'
          }`}
        />
      </div>
    </div>
  );
}

