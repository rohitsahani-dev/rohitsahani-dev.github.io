/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Play,
  Square,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  RohitBrandMark,
  LabNodeMiniIcon,
  MarqueeRibbonStrip,
  TechnicalBadgeSeal,
  EditorialPortraitCollage,
  ProjectArchitecturePreview,
  StaggeredLetters,
  ModernCustomCursor,
} from './components/PortfolioVisuals';
import {
  AboutCodeLiveBySection,
  SkillsInteractiveGridSection,
  HowIWorkAndCommunitySection,
  WorkTogetherInquirySection,
  ScrollTopProgressButton,
} from './components/PortfolioStudioSections';
import { ContactModal, ProjectDetailModal } from './components/PortfolioModals';
import {
  SectionId,
  PERSONAL_IDENTITY,
  SKILL_GROUPS,
  WORKFLOW_STAGES,
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  TourWaypoints,
  cycleIndex,
  formatProjectCounter,
  filterProjectsByCategory,
  formatScrambleText,
  computeTourState,
} from './utils/portfolioLogic';

const SCRAMBLE_LEFT_FRAMES = ['B1R 4T ?', 'N3P 4L 0', 'L0C : NP', 'B1RATNGR', 'BIRATNAGAR'];
const SCRAMBLE_RIGHT_FRAMES = ['09 26', 'A1 L4B', 'B1T 01', 'NP 26', 'NEPAL'];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>('dark');
  const [selectedFocus, setSelectedFocus] = useState<'AI' | 'SOFTWARE' | 'AUTOMATION' | null>(
    null
  );
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number>(0);
  const [activeSkillCategory, setActiveSkillCategory] = useState<
    'ALL' | 'PROGRAMMING' | 'AI & DEVELOPMENT' | 'TOOLS'
  >('ALL');
  const [selectedTechBadge, setSelectedTechBadge] = useState<string>('Python');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<
    'ALL' | 'AI & LLM' | 'WEB & SAAS'
  >('ALL');
  const [modalProject, setModalProject] = useState<PortfolioProject | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [contactInitialSubject, setContactInitialSubject] = useState<string>(
    'AI Application & LLM Integration'
  );
  const [lastSubmission, setLastSubmission] = useState<{
    ref: string;
    name: string;
    email: string;
    subject: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [scrambleProgress, setScrambleProgress] = useState<number>(1);
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(false);
  const [tourPercent, setTourPercent] = useState<number>(0);
  const [tourStageLabel, setTourStageLabel] = useState<string>('01 INTRO');
  const [replayKey, setReplayKey] = useState<number>(0);

  const tourRafRef = useRef<number | null>(null);
  const isTouringRef = useRef<boolean>(false);
  const heroCircleRef = useRef<HTMLDivElement | null>(null);
  const heroPortraitRef = useRef<HTMLDivElement | null>(null);
  const projectsHeadlineRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = {
    hero: useRef<HTMLElement | null>(null),
    about: useRef<HTMLElement | null>(null),
    projects: useRef<HTMLElement | null>(null),
    contact: useRef<HTMLElement | null>(null),
  };

  // RAF-throttled scroll observer: updates parallax & opacity directly on DOM without re-rendering App
  useEffect(() => {
    let rafId: number | null = null;
    let howIWorkEl: HTMLElement | null = null;
    let inquiryEl: HTMLElement | null = null;

    const updateOnScroll = () => {
      rafId = null;
      const currentScroll = window.scrollY;

      // Direct GPU-accelerated parallax transforms for Hero section
      if (currentScroll < 1100) {
        const portraitY = -Math.min(currentScroll * 0.2, 85);
        const circleY = -Math.min(currentScroll * 0.08, 38);
        if (heroPortraitRef.current) {
          heroPortraitRef.current.style.transform = `translate3d(0, ${portraitY.toFixed(1)}px, 0)`;
        }
        if (heroCircleRef.current) {
          heroCircleRef.current.style.transform = `translate3d(0, ${circleY.toFixed(1)}px, 0)`;
        }
      }

      if (!howIWorkEl) howIWorkEl = document.getElementById('how-i-work');
      if (!inquiryEl) inquiryEl = document.getElementById('inquiry-composer');

      const aboutRect = sectionRefs.about.current?.getBoundingClientRect();
      const projectsRect = sectionRefs.projects.current?.getBoundingClientRect();
      const contactRect = sectionRefs.contact.current?.getBoundingClientRect();
      const howIWorkRect = howIWorkEl?.getBoundingClientRect();
      const inquiryRect = inquiryEl?.getBoundingClientRect();

      // Check which section is directly passing under the sticky header (~68px)
      const headerY = 68;
      let isOverLightSection = false;

      if (inquiryRect && inquiryRect.top <= headerY && inquiryRect.bottom > headerY) {
        isOverLightSection = false;
      } else if (contactRect && contactRect.top <= headerY && contactRect.bottom > headerY) {
        isOverLightSection = true;
      } else if (howIWorkRect && howIWorkRect.top <= headerY && howIWorkRect.bottom > headerY) {
        isOverLightSection = false;
      } else if (projectsRect && projectsRect.top <= headerY && projectsRect.bottom > headerY) {
        isOverLightSection = true;
      } else {
        isOverLightSection = false;
      }

      const nextTheme: 'light' | 'dark' = isOverLightSection ? 'light' : 'dark';
      setHeaderTheme((prev) => (prev === nextTheme ? prev : nextTheme));

      // Smoothly fade IDEAS INTO REAL PRODUCTS directly on DOM
      if (projectsRect && projectsHeadlineRef.current) {
        const fade =
          projectsRect.top < -80
            ? Math.max(0.18, Math.min(1, 1 - (-80 - projectsRect.top) / 260))
            : 1;
        projectsHeadlineRef.current.style.opacity = fade.toFixed(2);
      }

      let nextSection: SectionId = 'hero';
      if (
        (inquiryRect && inquiryRect.top <= 340) ||
        (contactRect && contactRect.top <= 340)
      ) {
        nextSection = 'contact';
      } else if (
        (howIWorkRect && howIWorkRect.top <= 260) ||
        (projectsRect && projectsRect.top <= 260)
      ) {
        nextSection = 'projects';
      } else if (aboutRect && aboutRect.top <= 260) {
        nextSection = 'about';
      }

      setActiveSection((prev) => (prev === nextSection ? prev : nextSection));
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateOnScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateOnScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Trigger slot-scramble effect when entering Section 04 Contact
  const runScrambleAnimation = () => {
    setScrambleProgress(0);
    let frame = 0;
    const totalFrames = 16;
    const timer = window.setInterval(() => {
      frame += 1;
      setScrambleProgress(frame / totalFrames);
      if (frame >= totalFrames) {
        window.clearInterval(timer);
      }
    }, 65);
    return timer;
  };

  useEffect(() => {
    if (activeSection !== 'contact') return;
    const timer = runScrambleAnimation();
    return () => window.clearInterval(timer);
  }, [activeSection]);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    if (id === 'projects' || id === 'contact') {
      setHeaderTheme('light');
    } else {
      setHeaderTheme('dark');
    }
    const el = sectionRefs[id].current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCycleWorkflow = (delta: number) => {
    setActiveWorkflowIndex((prev) => cycleIndex(prev, WORKFLOW_STAGES.length, delta));
  };

  const handleCycleProject = (delta: number) => {
    setActiveProjectIndex((prev) => cycleIndex(prev, PORTFOLIO_PROJECTS.length, delta));
  };

  const handleCopyEmailInline = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_IDENTITY.emailPlaceholder).catch(() => {});
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Clean up any active tour RAF on unmount
  useEffect(() => {
    return () => {
      if (tourRafRef.current !== null) {
        window.cancelAnimationFrame(tourRafRef.current);
      }
    };
  }, []);

  const stopPortfolioTour = () => {
    isTouringRef.current = false;
    if (tourRafRef.current !== null) {
      window.cancelAnimationFrame(tourRafRef.current);
      tourRafRef.current = null;
    }
    setIsAutoTouring(false);
  };

  // Coordinated 10-second cinematic portfolio tour guiding visitors across all 4 sections
  const startPortfolioTour = () => {
    if (isTouringRef.current || isAutoTouring) {
      stopPortfolioTour();
      return;
    }

    // Close any open modals so the full showcase is visible
    setModalProject(null);
    setIsContactOpen(false);
    setProjectCategoryFilter('ALL');

    // Measure section top offsets relative to document top
    const getDocTop = (el: HTMLElement | null, fallbackRatio: number) => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      if (!el) return Math.round(maxScroll * fallbackRatio);
      const rect = el.getBoundingClientRect();
      return Math.max(0, Math.round(rect.top + window.scrollY - 68));
    };

    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const aboutTop = getDocTop(sectionRefs.about.current, 0.25);
    const projectsTop = getDocTop(sectionRefs.projects.current, 0.52);
    const contactTop = Math.min(maxScroll, getDocTop(sectionRefs.contact.current, 0.92));
    const projectsGridTop = Math.min(
      contactTop,
      Math.round(projectsTop + (contactTop - projectsTop) * 0.52)
    );

    const waypoints: TourWaypoints = {
      hero: 0,
      about: aboutTop,
      projects: projectsTop,
      projectsGrid: projectsGridTop,
      contact: maxScroll,
    };

    isTouringRef.current = true;
    setIsAutoTouring(true);
    setTourPercent(0);
    setTourStageLabel('01 INTRO');
    setActiveWorkflowIndex(0);
    setActiveProjectIndex(0);
    setReplayKey((prev) => prev + 1);

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;

    const durationMs = 10000;
    const startTime = performance.now();
    let lastWorkflowIdx = 0;
    let lastProjectIdx = 0;

    const step = (now: number) => {
      if (!isTouringRef.current) return;

      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const frameState = computeTourState(t, waypoints);

      window.scrollTo({ top: frameState.scrollY, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = frameState.scrollY;

      setTourPercent(frameState.percent);
      setTourStageLabel(frameState.stageLabel);

      if (frameState.workflowIndex !== lastWorkflowIdx) {
        lastWorkflowIdx = frameState.workflowIndex;
        setActiveWorkflowIndex(frameState.workflowIndex);
      }

      if (frameState.projectIndex !== lastProjectIdx) {
        lastProjectIdx = frameState.projectIndex;
        setActiveProjectIndex(frameState.projectIndex);
      }

      if (t < 1 && isTouringRef.current) {
        tourRafRef.current = window.requestAnimationFrame(step);
      } else {
        isTouringRef.current = false;
        tourRafRef.current = null;
        setIsAutoTouring(false);
      }
    };

    tourRafRef.current = window.requestAnimationFrame(step);
  };

  const activeWorkflow = WORKFLOW_STAGES[activeWorkflowIndex];
  const spotlightProject = PORTFOLIO_PROJECTS[activeProjectIndex];
  const leftProject =
    PORTFOLIO_PROJECTS[cycleIndex(activeProjectIndex, PORTFOLIO_PROJECTS.length, -1)];
  const rightProject =
    PORTFOLIO_PROJECTS[cycleIndex(activeProjectIndex, PORTFOLIO_PROJECTS.length, 1)];
  const visibleProjects = filterProjectsByCategory(
    PORTFOLIO_PROJECTS,
    projectCategoryFilter
  );

  const leftLocationDisplay = formatScrambleText(
    scrambleProgress,
    'BIRATNAGAR',
    SCRAMBLE_LEFT_FRAMES
  );
  const rightCountryDisplay = formatScrambleText(
    scrambleProgress,
    'NEPAL',
    SCRAMBLE_RIGHT_FRAMES
  );

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'hero', label: '01 INTRO' },
    { id: 'about', label: '02 FOUNDATION' },
    { id: 'projects', label: '03 PROJECTS' },
    { id: 'contact', label: '04 CONTACT' },
  ];

  const isLightHeader = headerTheme === 'light';

  return (
    <div className="min-h-screen bg-[#ded8d5] p-0 sm:p-3 md:p-5 flex justify-center">
      <ModernCustomCursor />
      {/* Main Framed Showcase Canvas preserving the original rounded cinema frame */}
      <div className="w-full max-w-[1360px] rounded-none sm:rounded-[34px] shadow-[0_32px_90px_rgba(0,0,0,0.35)] bg-[#f6f6f6] relative">
        {/* =====================================================================
            STICKY TOP BAR CONTRACT: BRAND WORDMARK | 4 NAV LINKS | PRIMARY ACTION
           ===================================================================== */}
        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`sticky top-0 z-40 sm:rounded-t-[34px] transition-colors duration-300 px-5 sm:px-8 md:px-12 py-4 flex items-center justify-between gap-8 border-b ${
            isLightHeader
              ? 'bg-[#f6f6f6]/95 text-[#09090b] border-black/[0.08] backdrop-blur-md'
              : 'bg-[#09090b]/95 text-white border-white/[0.08] backdrop-blur-md'
          }`}
        >
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="inline-flex items-center font-display text-2xl md:text-[28px] tracking-[-0.02em] leading-none whitespace-nowrap shrink-0"
          >
            <span>ROHIT</span>
            <RohitBrandMark className="w-5 h-5 mx-0.5" />
            <span>SAHANI</span>
          </a>

          {/* Zone 2: 4 Concise Single-Line Navigation Links with Animated Crimson Diamond */}
          <nav
            aria-label="Portfolio sections"
            className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.22em] font-medium uppercase"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? isLightHeader
                        ? 'text-[#09090b] font-semibold'
                        : 'text-white font-semibold'
                      : isLightHeader
                      ? 'text-neutral-500 hover:text-[#09090b]'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-diamond"
                      aria-hidden="true"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-2 text-[#c81e2b] text-[9px] leading-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
                      ♦
                    </motion.span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                setContactInitialSubject('AI Application & LLM Integration');
                setIsContactOpen(true);
              }}
              className={`px-4 py-2 rounded-full font-display text-xs md:text-sm tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isLightHeader
                  ? 'bg-[#09090b] text-white hover:bg-[#b81d2a]'
                  : 'bg-[#b81d2a] text-white hover:bg-[#d42232]'
              }`}
            >
              {lastSubmission ? `INQUIRY #${lastSubmission.ref}` : 'CONTACT ME'}
            </button>
          </div>
        </motion.header>

        {/* Mobile Quick Section Strip (visible only below md) */}
        <div
          className={`flex md:hidden items-center justify-between px-3 py-2 border-b text-[9px] tracking-[0.12em] uppercase ${
            isLightHeader
              ? 'bg-[#f6f6f6] text-[#09090b] border-black/10'
              : 'bg-[#09090b] text-white border-white/10'
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`py-1 px-1.5 whitespace-nowrap ${
                activeSection === item.id ? 'text-[#c81e2b] font-bold' : 'opacity-75'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <main>
          {/* =====================================================================
              DARK UPPER CONTAINER (SECTIONS 01 & 02) WITH CURVED BOTTOM EDGE
             ===================================================================== */}
          <div className="relative z-20 bg-[#09090b] text-white rounded-b-[46px] md:rounded-b-[56px] border-b-[3px] border-[#c81e2b] shadow-[0_16px_40px_rgba(200,30,43,0.18)]">
            {/* Subtle Animated Technical Laboratory Crosshair Grid & Rotating Target Circle */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/[0.06]" />
              <div className="absolute top-[95px] left-1/2 -translate-x-1/2 w-[480px] h-[480px] md:w-[640px] md:h-[640px] rounded-full border border-white/[0.07]" />
              <div className="absolute top-[125px] left-1/2 -translate-x-1/2 w-[360px] h-[360px] md:w-[500px] md:h-[500px] rounded-full border border-dashed border-[#c81e2b]/25 animate-spin-slow" />
              <div className="absolute top-[102px] left-0 right-0 h-px bg-white/[0.07]" />
            </div>

            {/* -----------------------------------------------------------------
                SECTION 01: HERO — PERSONAL INTRODUCTION & PORTRAIT
               ----------------------------------------------------------------- */}
            <section
              ref={sectionRefs.hero}
              id="hero"
              className="relative scroll-mt-16 pt-7 pb-8 px-5 sm:px-8 md:px-12 overflow-hidden"
            >
              {/* Row 1: Interactive Focus Mode Selector (Left) | AI Monogram (Center) | Availability Indicator (Right) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 }}
                className="relative z-20 flex flex-wrap items-center justify-between gap-3 mb-6 md:mb-7"
              >
                <div
                  className="flex items-center gap-1.5"
                  role="group"
                  aria-label="Filter introduction focus"
                >
                  {(['AI', 'SOFTWARE', 'AUTOMATION'] as const).map((domain) => {
                    const isSelected = selectedFocus === domain;
                    return (
                      <button
                        key={domain}
                        type="button"
                        onClick={() =>
                          setSelectedFocus((prev) => (prev === domain ? null : domain))
                        }
                        className={`px-3 py-1 rounded-full border text-[9px] md:text-[10px] font-condensed tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          isSelected
                            ? 'bg-[#b81d2a] border-[#b81d2a] text-white'
                            : 'border-white/35 text-white/85 hover:border-white/70'
                        }`}
                      >
                        {domain}
                      </button>
                    );
                  })}
                </div>

                {/* Centered Editorial Mark above the Crimson Sun Circle */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0.4 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:block absolute left-1/2 -translate-x-1/2 -top-1 font-display text-3xl md:text-4xl leading-none tracking-[-0.04em] text-white select-none origin-bottom"
                  aria-hidden="true"
                >
                  AI
                </motion.div>

                {/* Availability & Location Status Readout */}
                <div className="font-condensed text-[10px] md:text-xs tracking-[0.14em] uppercase text-white/90 whitespace-nowrap shrink-0 flex items-center gap-2">
                  <span className="text-[#e02432] font-bold">[OPEN FOR WORK]</span>
                  <span className="hidden sm:inline text-white/40">·</span>
                  <span className="hidden sm:inline">BIRATNAGAR, NEPAL</span>
                </div>
              </motion.div>

              {/* Row 2: Subtitle & Floating Technical Labels with Staggered Reveal */}
              <div className="relative z-20 flex flex-col items-center text-center mb-3 md:mb-4">
                <p className="text-[10px] sm:text-xs md:text-sm font-condensed tracking-[0.26em] uppercase text-[#ff5a67] font-semibold">
                  {PERSONAL_IDENTITY.subtitle}
                </p>

                {/* 4 Floating Technical Pillar Labels flanking the portrait */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 items-center pt-3">
                  <div className="flex items-center justify-between md:col-span-2 pr-4 md:pr-24 text-left">
                    <span className="font-display text-sm sm:text-lg md:text-xl tracking-wide uppercase text-white/90 whitespace-nowrap">
                      <StaggeredLetters
                        text="ROHIT SAHANI"
                        delayOffset={0.08}
                        stagger={0.025}
                        replayKey={replayKey}
                        once={true}
                      />
                    </span>
                    <span className="font-display text-sm sm:text-lg md:text-xl tracking-wide uppercase text-white/75 whitespace-nowrap">
                      <StaggeredLetters
                        text="BIT STUDENT"
                        delayOffset={0.16}
                        stagger={0.025}
                        replayKey={replayKey}
                        once={true}
                      />
                    </span>
                  </div>

                  <div className="flex items-center justify-between md:col-span-2 pl-4 md:pl-24 text-right">
                    <span className="font-display text-sm sm:text-lg md:text-xl tracking-wide uppercase text-white/75 whitespace-nowrap">
                      <StaggeredLetters
                        text="APPLIED AI LAB"
                        delayOffset={0.24}
                        stagger={0.025}
                        replayKey={replayKey}
                        once={true}
                      />
                    </span>
                    <span className="font-display text-sm sm:text-lg md:text-xl tracking-wide uppercase text-white/90 whitespace-nowrap">
                      <StaggeredLetters
                        text="WEB BUILDER"
                        delayOffset={0.32}
                        stagger={0.025}
                        replayKey={replayKey}
                        once={true}
                      />
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Oversized Main Headline "BUILDING THE FUTURE WITH AI." + Crimson Sun Circle + Dominant Rohit Portrait */}
              <div className="relative">
                <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[480px] flex items-center justify-center">
                  {/* Moving Crimson Sun Circle behind Rohit's Portrait */}
                  <div
                    ref={heroCircleRef}
                    className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[230px] h-[230px] sm:w-[320px] sm:h-[320px] md:w-[410px] md:h-[410px] rounded-full bg-[#b81d2a] pointer-events-none shadow-[0_0_80px_rgba(184,29,42,0.35)] will-change-transform"
                    aria-hidden="true"
                  />

                  {/* Oversized Editorial Headline Behind & Framing the Portrait */}
                  <div className="relative z-10 w-full flex flex-col items-center justify-center select-none pointer-events-none -mt-10 sm:-mt-14 lg:-mt-20">
                    <h1 className="w-full text-center font-display-tall uppercase text-white tracking-[-0.02em] leading-[0.84]">
                      <span className="block text-[15vw] sm:text-[13.5vw] xl:text-[184px]">
                        <StaggeredLetters
                          text="BUILDING THE"
                          delayOffset={0.04}
                          stagger={0.045}
                          replayKey={replayKey}
                          once={true}
                        />
                      </span>
                      <span className="block text-[15.5vw] sm:text-[14vw] xl:text-[192px] text-white/95 mt-1">
                        <StaggeredLetters
                          text="FUTURE WITH AI."
                          delayOffset={0.22}
                          stagger={0.042}
                          replayKey={replayKey}
                          once={true}
                        />
                      </span>
                    </h1>
                  </div>

                  {/* Vertically Rotated Identity Coordinate on Right Edge */}
                  <motion.span
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.55 }}
                    className="hidden sm:block writing-vertical rotate-180 font-display text-lg md:text-2xl tracking-[0.08em] text-white/85 absolute right-0 top-1/2 -translate-y-1/2 z-20 select-none"
                    aria-hidden="true"
                  >
                    [ROHIT SAHANI]
                  </motion.span>

                  {/* Scrolling Dark Marquee Strip Behind Lower Portrait: AI · SOFTWARE · AUTOMATION · DEVELOPMENT */}
                  <div className="absolute bottom-[42px] sm:bottom-[68px] lg:bottom-[92px] left-0 right-0 z-10 -rotate-[2.2deg]">
                    <MarqueeRibbonStrip variant="dark" mode="hero" />
                  </div>

                  {/* Dominant Personal Portrait of Rohit Sahani with Scroll Parallax */}
                  <div
                    ref={heroPortraitRef}
                    className="absolute inset-x-0 bottom-[-10px] lg:bottom-[-14px] z-20 flex justify-center pointer-events-none will-change-transform"
                  >
                    <img
                      src="/assets/rohit/rohit-portrait-hero.png"
                      alt="Rohit Sahani — AI Engineer in Progress and Software Developer"
                      referrerPolicy="no-referrer"
                      className="w-[210px] sm:w-[275px] md:w-[355px] h-auto object-contain select-none drop-shadow-[0_24px_42px_rgba(0,0,0,0.88)]"
                    />
                  </div>
                </div>

                {/* Bottom Row: Stacks cleanly below portrait on mobile/tablet; overlays bottom corners on desktop (lg+) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.42 }}
                  className="relative mt-4 lg:mt-0 lg:absolute lg:inset-x-0 lg:bottom-0 z-30 flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-4 pt-2 lg:pt-4"
                >
                  {/* Bottom Left: Personal Introduction with Dual-Portrait Studio Thumbnail */}
                  <div className="w-full lg:max-w-[385px] bg-[#121217]/95 lg:bg-[#09090b]/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <LabNodeMiniIcon size={15} />
                        <span className="text-[10px] tracking-[0.24em] uppercase text-white/90 font-semibold">
                          ROHIT SAHANI · INTRODUCTION
                        </span>
                      </div>
                      <img
                        src={PERSONAL_IDENTITY.portraits.suitEditorial}
                        alt="Rohit Sahani editorial portrait"
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover object-top border border-[#b81d2a] shrink-0"
                      />
                    </div>
                    <p className="text-[11px] sm:text-xs leading-[1.6] text-white/80">
                      <span className="text-[#e02432] font-semibold mr-2">
                        {selectedFocus ? `[${selectedFocus} FOCUS]` : 'ABOUT ME ·'}
                      </span>
                      {PERSONAL_IDENTITY.introQuote}
                    </p>
                  </div>

                  {/* Bottom Right: EXPLORE MY WORK + CONTACT ME + (01) Studio Seal */}
                  <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => scrollToSection('projects')}
                        className="px-4 sm:px-5 py-2.5 rounded-full bg-[#b81d2a] hover:bg-[#d42232] text-white font-display text-xs sm:text-sm md:text-base tracking-[0.08em] uppercase transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-lg"
                      >
                        <span>EXPLORE MY WORK</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setContactInitialSubject('AI Application & LLM Integration');
                          setIsContactOpen(true);
                        }}
                        className="px-4 sm:px-5 py-2.5 rounded-full border border-white/65 bg-[#09090b]/85 hover:bg-white hover:text-[#09090b] text-white font-display text-xs sm:text-sm md:text-base tracking-[0.08em] uppercase transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>CONTACT ME</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="hidden sm:block">
                      <TechnicalBadgeSeal
                        indexLabel="01"
                        theme="dark"
                        onClick={() => setReplayKey((k) => k + 1)}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                FULL-WIDTH ANGLED CRIMSON MARQUEE RIBBON DIVIDER
                (Horizontal Scrolling Technology Strip)
               ----------------------------------------------------------------- */}
            <div className="relative z-30 overflow-hidden py-4 -my-2">
              <div className="-rotate-[1.8deg]">
                <MarqueeRibbonStrip variant="crimson" mode="tech" />
              </div>
            </div>

            {/* -----------------------------------------------------------------
                SECTION 02: ABOUT / TECHNICAL FOUNDATION — BEHIND THE CODE.
               ----------------------------------------------------------------- */}
            <section
              ref={sectionRefs.about}
              id="about"
              className="relative scroll-mt-16 pt-10 pb-32 md:pb-36 px-5 sm:px-8 md:px-12"
            >
              {/* Subtle target circle behind workflow badges & portrait collage */}
              <div
                className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] md:w-[540px] md:h-[540px] rounded-full border border-white/[0.06]"
                aria-hidden="true"
              />

              {/* Top Row: Left Identity & Headline | Center 4 Workflow Circles | Right Philosophy Quote */}
              <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: SECTION 02 + BEHIND THE CODE. + (02) Indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-3 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <LabNodeMiniIcon size={15} />
                    <span className="text-[10px] tracking-[0.26em] uppercase text-white/80 font-medium">
                      TECHNICAL FOUNDATION
                    </span>
                  </div>

                  <h2 className="font-display text-4xl sm:text-5xl md:text-[54px] leading-[0.9] tracking-[-0.02em] uppercase text-white">
                    <StaggeredLetters
                      text="BEHIND THE CODE."
                      delayOffset={0.04}
                      stagger={0.035}
                      replayKey={replayKey}
                    />
                  </h2>

                  <p className="text-xs text-white/70 leading-relaxed pt-1">
                    Practical software and AI engineering skills developed through hands-on
                    application building, coursework in BIT, and continuous experimentation.
                  </p>

                  <div className="pt-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center font-display text-sm -rotate-12">
                      02
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-white/65">
                      STAGE: <span className="text-[#e02432]">{activeWorkflow.fullLabel}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Center Column: 01 — EXPERIMENT, 02 — BUILD, 03 — TEST, 04 — IMPROVE Tilted Circles */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  <div
                    className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5"
                    role="tablist"
                    aria-label="Engineering workflow stages"
                  >
                    {WORKFLOW_STAGES.map((stage, idx) => {
                      const isSelected = idx === activeWorkflowIndex;
                      const bgStyle =
                        stage.accent === 'light'
                          ? 'bg-white text-[#09090b]'
                          : stage.accent === 'crimson'
                          ? 'bg-[#b81d2a] text-white shadow-[0_10px_28px_rgba(184,29,42,0.45)]'
                          : stage.accent === 'dark'
                          ? 'bg-[#151519] border border-white/20 text-white'
                          : 'bg-[#101014] border border-[#b81d2a]/60 text-white';

                      return (
                        <motion.button
                          key={stage.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setActiveWorkflowIndex(idx)}
                          initial={{ opacity: 0, scale: 0.75, rotate: stage.rotation * 1.6 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: stage.rotation }}
                          whileHover={{ rotate: 0, scale: 1.07 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{
                            duration: 0.45,
                            delay: 0.05 + idx * 0.06,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`w-24 h-24 sm:w-28 sm:h-28 md:w-[116px] md:h-[116px] rounded-full flex flex-col items-center justify-center cursor-pointer shrink-0 transition-shadow ${bgStyle} ${
                            isSelected ? 'ring-2 ring-offset-2 ring-offset-[#09090b] ring-[#e02432]' : ''
                          }`}
                        >
                          <span className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-75">
                            {stage.number} —
                          </span>
                          <span className="font-display text-lg sm:text-xl md:text-[22px] leading-none tracking-wide uppercase mt-1">
                            {stage.title}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Active Workflow Stage Readout Card */}
                  <motion.div
                    key={activeWorkflow.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 max-w-lg w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 text-center"
                  >
                    <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#ff5a67]">
                      {activeWorkflow.fullLabel} · {activeWorkflow.deliverable}
                    </div>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">
                      {activeWorkflow.summary}
                    </p>
                  </motion.div>
                </div>

                {/* Right Column: Personal Builder Quote with Blur-to-Crisp Reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end"
                >
                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 max-w-[260px]">
                    <div className="text-[9px] font-mono tracking-[0.22em] uppercase text-[#e02432] mb-1">
                      ENGINEERING APPROACH
                    </div>
                    <p className="font-display text-sm md:text-[15px] leading-[1.4] tracking-[0.03em] uppercase text-white/95">
                      &ldquo; FOCUSED ON LEARNING CORE FUNDAMENTALS AND COMBINING LLM APIS WITH
                      CLEAN CODE TO SOLVE REAL PROBLEMS. &rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-6 self-end">
                    <a
                      href={PERSONAL_IDENTITY.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Rohit Sahani GitHub profile"
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#b81d2a] text-[10px] font-mono uppercase tracking-wider text-white transition-colors"
                    >
                      GH ↗
                    </a>
                    <a
                      href={PERSONAL_IDENTITY.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Rohit Sahani LinkedIn profile"
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#b81d2a] text-[10px] font-mono uppercase tracking-wider text-white transition-colors"
                    >
                      IN ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsContactOpen(true)}
                      aria-label="Open contact modal"
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#b81d2a] text-[10px] font-mono uppercase tracking-wider text-white transition-colors cursor-pointer"
                    >
                      MAIL
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Technical Skill Cards Grid (PROGRAMMING, AI & DEVELOPMENT, TOOLS) */}
              <div className="relative z-20 mt-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="text-[10px] font-mono tracking-[0.24em] uppercase text-white/60">
                    TECHNOLOGIES &amp; TOOLS WORKED WITH · CLICK ANY SKILL TO INSPECT
                  </div>
                  <div className="flex items-center gap-1.5">
                    {(['ALL', 'PROGRAMMING', 'AI & DEVELOPMENT', 'TOOLS'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveSkillCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                          activeSkillCategory === cat
                            ? 'bg-[#b81d2a] text-white'
                            : 'bg-white/[0.06] text-white/70 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {SKILL_GROUPS.filter(
                    (g) => activeSkillCategory === 'ALL' || g.id === activeSkillCategory
                  ).map((group) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.45 }}
                      className="rounded-2xl bg-[#121217] border border-white/10 p-5 flex flex-col justify-between hover:border-white/25 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-white/50 mb-2">
                          <span>{group.code}. CAPABILITY</span>
                          <span className="text-[#e02432]">{group.skills.length} SKILLS</span>
                        </div>
                        <h3 className="font-display text-2xl tracking-wide uppercase text-white mb-1.5">
                          {group.label}
                        </h3>
                        <p className="text-xs text-white/65 leading-relaxed mb-4">
                          {group.description}
                        </p>
                      </div>

                      {/* Interactive Technical Skill Buttons */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                        {group.skills.map((skill) => {
                          const isSelected = selectedTechBadge === skill;
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => setSelectedTechBadge(skill)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                                isSelected
                                  ? 'bg-[#b81d2a] text-white shadow-sm'
                                  : 'bg-white/[0.06] text-white/85 hover:bg-white/15'
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Studio Section 1: ABOUT ME — Turning Ideas Into Interactive Reality + Code I Live By */}
              <AboutCodeLiveBySection
                onMoreAboutMe={() => {
                  const target = document.getElementById('how-i-work');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              />

              {/* Studio Section 2: MY SKILLS — Technologies I Work With (10 Interactive Tech Tiles) */}
              <SkillsInteractiveGridSection
                onInquireWithSkill={(skill) => {
                  setContactInitialSubject(skill.inquireTopic);
                  const target = document.getElementById('inquiry-composer');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    setIsContactOpen(true);
                  }
                }}
              />

              {/* Center Editorial Portrait Collage straddling the dark-to-light curved border */}
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-24 md:-bottom-28 z-30 flex flex-col items-center"
              >
                <EditorialPortraitCollage
                  activeStageIndex={activeWorkflowIndex}
                  activeStageNumber={activeWorkflow.number}
                  activeStageTitle={activeWorkflow.title}
                  activeStageDeliverable={activeWorkflow.deliverable}
                  onClick={() => handleCycleWorkflow(1)}
                  onSelectCard={(cardIdx) => {
                    const currentFront = ((activeWorkflowIndex % 3) + 3) % 3;
                    if (cardIdx === currentFront) {
                      handleCycleWorkflow(1);
                    } else {
                      setActiveWorkflowIndex(cardIdx);
                    }
                  }}
                />
              </motion.div>

              {/* Left & Right Large Circular Prev/Next Workflow Buttons Straddling the Curved Bottom Edge */}
              <motion.button
                type="button"
                onClick={() => handleCycleWorkflow(-1)}
                aria-label="Previous workflow stage"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#b81d2a] hover:bg-[#d12231] active:bg-[#9e1622] text-white flex flex-col items-center justify-center shadow-xl absolute left-6 md:left-12 -bottom-8 md:-bottom-10 z-30 cursor-pointer select-none"
              >
                <span className="text-xs md:text-sm leading-none" aria-hidden="true">
                  ◀
                </span>
                <span className="text-[8px] font-mono tracking-widest uppercase text-white/80 mt-1">
                  PREV
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => handleCycleWorkflow(1)}
                aria-label="Next workflow stage"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-200 text-[#b81d2a] flex flex-col items-center justify-center shadow-xl border border-black/10 absolute right-6 md:right-12 -bottom-8 md:-bottom-10 z-30 cursor-pointer select-none"
              >
                <span className="text-xs md:text-sm leading-none" aria-hidden="true">
                  ▶
                </span>
                <span className="text-[8px] font-mono tracking-widest uppercase text-[#b81d2a]/85 mt-1">
                  NEXT
                </span>
              </motion.button>
            </section>
          </div>

          {/* =====================================================================
              LIGHT LOWER CONTAINER (SECTIONS 03 & 04)
             ===================================================================== */}
          <div className="relative z-10 bg-[#f6f6f6] text-[#0d0d0f] sm:rounded-b-[34px] overflow-hidden">
            {/* Subtle Technical Crosshairs on Light Canvas */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-black/[0.05]" />
              <div className="absolute top-[360px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] md:w-[660px] md:h-[660px] rounded-full border border-black/[0.05]" />
            </div>

            {/* -----------------------------------------------------------------
                SECTION 03: PROJECTS / SELECTED WORK — IDEAS INTO REAL PRODUCTS.
               ----------------------------------------------------------------- */}
            <section
              ref={sectionRefs.projects}
              id="projects"
              className="relative scroll-mt-16 pt-28 md:pt-32 pb-16 px-5 sm:px-8 md:px-12"
            >
              {/* Headline Block with Scroll-Driven Fade */}
              <div
                ref={projectsHeadlineRef}
                className="transition-opacity duration-200"
              >
                {/* Right Editorial Note above Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.45 }}
                  className="flex justify-end mb-2 md:mb-0"
                >
                  <div className="max-w-[380px] md:mr-8">
                    <div className="flex items-center gap-2 mb-1.5">
                      <LabNodeMiniIcon size={14} />
                      <span className="text-[10px] tracking-[0.26em] uppercase text-neutral-500 font-semibold">
                        SELECTED WORK ARCHIVE :
                      </span>
                    </div>
                    <p className="text-[11px] leading-[1.55] text-neutral-600">
                      <span className="text-[#0d0d0f] font-semibold mr-3">PORTFOLIO ·</span>
                      Seven hands-on AI and web projects built by Rohit Sahani—headlined by live
                      deployments of SENTRA AI and SS Interiors &amp; WallPapers alongside security,
                      SaaS, and API applications.
                    </p>
                  </div>
                </motion.div>

                {/* Giant Typography: IDEAS INTO REAL PRODUCTS. with Left-to-Right Staggered Reveal */}
                <div className="relative z-10 flex flex-wrap lg:flex-nowrap items-baseline justify-between gap-2 md:gap-4 mt-2">
                  <h2 className="font-display-tall text-[14vw] sm:text-[12vw] lg:text-[134px] font-bold uppercase text-[#0d0d0f] tracking-[-0.03em] leading-[0.84]">
                    <StaggeredLetters
                      text="IDEAS INTO"
                      delayOffset={0.02}
                      stagger={0.04}
                      replayKey={replayKey}
                    />
                  </h2>
                  <span className="font-display text-2xl sm:text-4xl lg:text-[48px] font-bold uppercase text-[#b81d2a] self-center px-1 md:px-2">
                    <StaggeredLetters
                      text="✦"
                      delayOffset={0.28}
                      stagger={0.04}
                      replayKey={replayKey}
                    />
                  </span>
                  <span className="font-display-tall text-[14vw] sm:text-[12vw] lg:text-[134px] font-bold uppercase text-[#0d0d0f] tracking-[-0.03em] leading-[0.84] lg:translate-y-3">
                    <StaggeredLetters
                      text="REAL PRODUCTS."
                      delayOffset={0.32}
                      stagger={0.04}
                      replayKey={replayKey}
                    />
                  </span>
                </div>

                {/* Counter & Interactive Project Cycler */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCycleProject(1)}
                    className="text-[10px] tracking-[0.28em] uppercase text-neutral-600 hover:text-[#b81d2a] font-semibold transition-colors cursor-pointer"
                  >
                    {formatProjectCounter(activeProjectIndex, PORTFOLIO_PROJECTS.length)} —{' '}
                    {spotlightProject.name}
                  </button>
                </div>
              </div>

              {/* Numbered Section Rule: 01  02  03  04 */}
              <div className="mt-8 pt-4 border-t border-black/10 grid grid-cols-4 text-sm md:text-base font-display text-[#0d0d0f]">
                <div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('hero')}
                    className="hover:text-[#b81d2a] cursor-pointer text-left"
                  >
                    <div>01</div>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('about')}
                    className="hover:text-[#b81d2a] cursor-pointer"
                  >
                    02
                  </button>
                </div>
                <div className="text-right pr-8 md:pr-20">
                  <button
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="text-[#b81d2a] font-bold cursor-pointer"
                  >
                    <div>03</div>
                    <div className="w-2.5 h-[1.5px] bg-[#b81d2a] mt-1 ml-auto" />
                  </button>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="hover:text-[#b81d2a] cursor-pointer"
                  >
                    04
                  </button>
                </div>
              </div>

              {/* Centered Subheadline + Project Navigation Strip + (03) Studio Seal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-center relative z-10"
              >
                <h3 className="font-display text-2xl sm:text-3xl md:text-[40px] leading-[1.1] tracking-[-0.01em] uppercase text-[#0d0d0f] max-w-2xl mx-auto">
                  PRACTICAL AI APPLICATIONS, SAAS CONCEPTS &amp; MODERN WEB INTERFACES
                </h3>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  {/* Left: Interactive Category Segmented Filter */}
                  <div
                    className="flex items-center gap-1 p-1 bg-black/[0.06] rounded-xl"
                    role="group"
                    aria-label="Filter projects by category"
                  >
                    {(['ALL', 'AI & LLM', 'WEB & SAAS'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setProjectCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                          projectCategoryFilter === cat
                            ? 'bg-[#09090b] text-white shadow-xs'
                            : 'text-neutral-600 hover:text-[#09090b]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Center: Stacked Crimson Right Arrow & Black Left Arrow */}
                  <div className="flex flex-col items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleCycleProject(1)}
                      aria-label="Spotlight next project"
                      className="text-[#b81d2a] hover:translate-x-1 transition-transform text-lg leading-none cursor-pointer ml-4"
                    >
                      ⟶
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCycleProject(-1)}
                      aria-label="Spotlight previous project"
                      className="text-[#0d0d0f] hover:-translate-x-1 transition-transform text-lg leading-none cursor-pointer -ml-4"
                    >
                      ⟵
                    </button>
                  </div>

                  {/* Right: (03) Technical Seal */}
                  <TechnicalBadgeSeal
                    indexLabel="03"
                    theme="light"
                    onClick={() => {
                      handleCycleProject(1);
                      setReplayKey((k) => k + 1);
                    }}
                  />
                </div>
              </motion.div>

              {/* Three-Column Interactive Spotlight (Preserving the Original Gallery Composition) */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left Column: Previous Project Context + Diagonal-Cropped Card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="lg:col-span-4 flex flex-col justify-between"
                >
                  <div className="max-w-[290px]">
                    <div className="flex items-center gap-2 mb-2">
                      <LabNodeMiniIcon size={14} />
                      <span className="text-[10px] tracking-[0.26em] uppercase text-neutral-600 font-semibold">
                        {leftProject.numberLabel} · {leftProject.name} :
                      </span>
                    </div>
                    <p className="text-xs leading-[1.6] text-neutral-600">
                      <span className="text-[#0d0d0f] font-semibold mr-2">ARCHITECTURE ·</span>
                      {leftProject.architectureSummary}
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setModalProject(leftProject)}
                      className="w-full max-w-[260px] h-44 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform duration-200 cursor-pointer block text-left border border-black/10"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)',
                      }}
                    >
                      <ProjectArchitecturePreview project={leftProject} compact />
                    </button>
                  </div>
                </motion.div>

                {/* Center Column: Interactive Dark Project Spotlight Card + Rohit Portrait Cutout */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-4 relative flex justify-center pb-14"
                >
                  <div className="w-[290px] sm:w-[310px] rounded-[30px] bg-[#111114] text-white p-5 pt-7 relative shadow-[0_24px_50px_rgba(0,0,0,0.28)]">
                    {/* Top Center Lab Emblem straddling card edge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full ring-4 ring-[#f6f6f6] bg-[#111114]">
                      <LabNodeMiniIcon size={30} />
                    </div>

                    <div className="text-center">
                      <div className="text-[9px] tracking-[0.32em] uppercase text-white/60">
                        SPOTLIGHT · {spotlightProject.numberLabel} / 0{PORTFOLIO_PROJECTS.length}
                      </div>
                      <h4 className="font-display text-2xl md:text-[28px] tracking-wide uppercase text-white mt-0.5">
                        {spotlightProject.name}
                      </h4>
                    </div>

                    {/* 2x2 Bento Grid inside the Dark Project Card */}
                    <div className="grid grid-cols-2 gap-2.5 mt-4">
                      {/* Preview Tile */}
                      <button
                        type="button"
                        onClick={() => setModalProject(spotlightProject)}
                        className="relative rounded-2xl overflow-hidden h-24 bg-[#1c1c21] group cursor-pointer text-left border border-white/10 p-2.5 flex flex-col justify-between"
                      >
                        <span className="text-[8px] font-mono uppercase tracking-wider text-[#ff5a67]">
                          {spotlightProject.category}
                        </span>
                        <span className="font-display text-xs uppercase text-white leading-tight line-clamp-2">
                          {spotlightProject.shortDescription}
                        </span>
                        <span className="text-[8px] tracking-[0.22em] uppercase text-white/60">
                          INSPECT ↗
                        </span>
                      </button>

                      {/* Project Selector Tile */}
                      <button
                        type="button"
                        onClick={() => handleCycleProject(1)}
                        className="rounded-2xl bg-[#1a1a1f] hover:bg-[#222229] p-2.5 h-24 flex flex-col items-center justify-center text-center transition-colors cursor-pointer border border-white/5"
                      >
                        <span className="text-[#c81e2b] text-[9px] leading-none mb-1">▼</span>
                        <span className="text-[8px] tracking-[0.22em] uppercase text-white/55">
                          SWITCH WORK :
                        </span>
                        <span className="font-display text-xs md:text-[13px] leading-tight tracking-wide uppercase text-white mt-1">
                          NEXT PROJECT ({((activeProjectIndex + 1) % PORTFOLIO_PROJECTS.length) + 1}
                          /{PORTFOLIO_PROJECTS.length})
                        </span>
                      </button>

                      {/* Stack Tile */}
                      <button
                        type="button"
                        onClick={() => setModalProject(spotlightProject)}
                        className="rounded-2xl bg-[#1a1a1f] hover:bg-[#222229] py-2.5 px-3 text-center transition-colors cursor-pointer"
                      >
                        <div className="text-[8px] tracking-[0.24em] uppercase text-white/55">
                          CORE STACK
                        </div>
                        <div className="font-display text-xs tracking-wide uppercase text-white mt-0.5 truncate">
                          {spotlightProject.technologies.slice(0, 2).join(' · ')}
                        </div>
                      </button>

                      {/* Live URL or GitHub Source Tile */}
                      <a
                        href={spotlightProject.liveUrl || spotlightProject.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl bg-[#1a1a1f] hover:bg-[#222229] py-2.5 px-3 text-center transition-colors block border border-white/5"
                      >
                        <div className="text-[8px] tracking-[0.24em] uppercase text-[#ff5a67]">
                          {spotlightProject.liveUrl ? 'VERCEL LIVE' : 'GITHUB'}
                        </div>
                        <div className="font-display text-xs tracking-wide uppercase text-white mt-0.5">
                          {spotlightProject.liveUrl ? 'LAUNCH APP ↗' : 'SOURCE ↗'}
                        </div>
                      </a>
                    </div>

                    {/* Inspect Case Study Button */}
                    <button
                      type="button"
                      onClick={() => setModalProject(spotlightProject)}
                      className="w-full mt-3 bg-[#b81d2a] hover:bg-[#d12231] text-white rounded-full py-2.5 px-5 flex items-center justify-between text-xs font-medium transition-colors cursor-pointer relative z-20"
                    >
                      <span>View Project Details</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>

                  {/* Overlapping Rohit Sahani Editorial Suit Portrait Badge on Bottom-Right of Spotlight Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 22, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                    className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl bg-[#09090b] border-2 border-[#b81d2a] overflow-hidden absolute -bottom-4 -right-2 sm:-right-6 z-30 shadow-2xl pointer-events-none select-none"
                  >
                    <img
                      src={PERSONAL_IDENTITY.portraits.suitEditorial}
                      alt="Rohit Sahani builder portrait in suit"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[center_35%] scale-115"
                    />
                  </motion.div>
                </motion.div>

                {/* Right Column: Next Project Context + Diagonal-Cropped Card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                  className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end"
                >
                  <div className="max-w-[290px]">
                    <div className="flex items-center gap-2 mb-2">
                      <LabNodeMiniIcon size={14} />
                      <span className="text-[10px] tracking-[0.26em] uppercase text-neutral-600 font-semibold">
                        {rightProject.numberLabel} · {rightProject.name} :
                      </span>
                    </div>
                    <p className="text-xs leading-[1.6] text-neutral-600">
                      <span className="text-[#0d0d0f] font-semibold mr-2">OVERVIEW ·</span>
                      {rightProject.architectureSummary}
                    </p>
                  </div>

                  <div className="mt-6 self-end">
                    <button
                      type="button"
                      onClick={() => setModalProject(rightProject)}
                      className="w-full max-w-[260px] h-44 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform duration-200 cursor-pointer block text-left border border-black/10"
                      style={{
                        clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)',
                      }}
                    >
                      <ProjectArchitecturePreview project={rightProject} compact />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Complete 7-Project Editorial Grid (All 7 Projects with Live Screenshots, Schematics & Links) */}
              <div className="mt-12 pt-8 border-t border-black/10 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.24em] uppercase text-neutral-500">
                      COMPLETE PROJECT INDEX (01 — 0{PORTFOLIO_PROJECTS.length})
                    </div>
                    <h4 className="font-display text-2xl md:text-3xl uppercase text-[#0d0d0f] mt-0.5">
                      SELECTED WORKS BY ROHIT SAHANI
                    </h4>
                  </div>
                  <a
                    href={PERSONAL_IDENTITY.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-display tracking-wider uppercase text-[#b81d2a] hover:text-[#0d0d0f] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GITHUB.COM/ROHITSAHANI-DEV</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleProjects.map((project, idx) => (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: idx * 0.05 }}
                      className={`group rounded-2xl bg-white border border-black/10 hover:border-[#b81d2a] overflow-hidden flex flex-col justify-between transition-all shadow-xs hover:shadow-xl ${
                        (idx === 0 || idx === 6) && projectCategoryFilter === 'ALL'
                          ? 'md:col-span-2 lg:col-span-2'
                          : ''
                      }`}
                    >
                      <div>
                        {/* Large Project Preview Area */}
                        <div
                          onClick={() => setModalProject(project)}
                          data-cursor="INSPECT"
                          className="h-52 sm:h-56 w-full overflow-hidden cursor-pointer relative"
                        >
                          <div className="w-full h-full group-hover:scale-[1.03] transition-transform duration-300">
                            <ProjectArchitecturePreview project={project} />
                          </div>
                        </div>

                        {/* Project Content Body */}
                        <div className="p-5">
                          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1.5">
                            <span className="font-mono font-semibold text-[#b81d2a]">
                              {project.numberLabel}. {project.category}
                            </span>
                            <span>
                              {project.liveUrl ? 'Live Deployment · Rohit Sahani' : 'Built by Rohit Sahani'}
                            </span>
                          </div>

                          <h5 className="font-display text-2xl tracking-wide uppercase text-[#0d0d0f] group-hover:text-[#b81d2a] transition-colors">
                            {project.numberLabel}. {project.name}
                          </h5>

                          <p className="text-xs text-neutral-700 font-medium mt-1">
                            {project.shortDescription}
                          </p>
                          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                            {project.architectureSummary}
                          </p>

                          {/* Unboxed Technology Metadata with · Separators */}
                          <div className="mt-4 pt-3 border-t border-black/[0.06] text-[11px] text-neutral-600 font-medium">
                            {project.technologies.join(' · ')}
                          </div>
                        </div>
                      </div>

                      {/* Interactive Card Footer: Inspect Details | Live URL or Placeholder | GitHub Source */}
                      <div className="px-5 py-3.5 bg-neutral-100/80 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setModalProject(project)}
                          className="font-display tracking-wider uppercase text-[#0d0d0f] hover:text-[#b81d2a] inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Inspect Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-3 text-[11px]">
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-[#b81d2a] hover:text-[#0d0d0f] inline-flex items-center gap-1"
                            >
                              <span>Live Demo</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          ) : (
                            <span
                              className="text-neutral-500 font-mono"
                              title="Replace with live deployment URL when hosted"
                            >
                              Demo: [Placeholder]
                            </span>
                          )}
                          <span aria-hidden="true" className="text-neutral-300">
                            ·
                          </span>
                          <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#0d0d0f] hover:text-[#b81d2a] inline-flex items-center gap-1"
                          >
                            <span>GitHub</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>

            {/* Studio Section 3: Interactive Rohit Sahani Projects Showcase + HOW I WORK (01–04) + Development Philosophy */}
            <HowIWorkAndCommunitySection
              onInspectProject={(project) => {
                setModalProject(project);
              }}
            />

            {/* -----------------------------------------------------------------
                SECTION 04: CONTACT / FINAL EXPERIENCE — LET'S BUILD SOMETHING MEANINGFUL.
               ----------------------------------------------------------------- */}
            <section
              ref={sectionRefs.contact}
              id="contact"
              className="relative scroll-mt-16 pt-10 md:pt-14 px-5 sm:px-8 md:px-12 overflow-hidden border-t border-black/[0.08]"
            >
              {/* Subtle Crosshair Circle & Horizontal Axis Line */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-[440px] h-[440px] md:w-[580px] md:h-[580px] rounded-full border border-black/[0.06]" />
                <div className="absolute left-0 right-0 top-1/2 h-px bg-black/[0.06]" />
              </div>

              <div className="relative z-10 text-center max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.45 }}
                  className="text-[10px] sm:text-xs tracking-[0.32em] uppercase text-[#b81d2a] font-semibold mb-2"
                >
                  {PERSONAL_IDENTITY.footerIdentity}
                </motion.div>

                {/* Giant Finale Headline: LET'S BUILD SOMETHING MEANINGFUL. */}
                <h2 className="font-display-tall text-[11.5vw] sm:text-[9.5vw] lg:text-[106px] font-bold uppercase text-[#0d0d0f] tracking-[-0.03em] leading-[0.86] select-none">
                  <span className="block">
                    <StaggeredLetters
                      text="LET'S BUILD"
                      delayOffset={0.04}
                      stagger={0.04}
                      replayKey={replayKey}
                    />
                  </span>
                  <span className="block mt-1">
                    <StaggeredLetters
                      text="SOMETHING MEANINGFUL."
                      delayOffset={0.22}
                      stagger={0.032}
                      replayKey={replayKey}
                    />
                  </span>
                </h2>

                {/* Left & Right Slot-Scramble Location & Identity Callouts */}
                <div className="flex items-center justify-between max-w-[660px] mx-auto mt-3 px-2 sm:px-6">
                  <button
                    type="button"
                    onClick={() => runScrambleAnimation()}
                    className="font-display text-xl sm:text-2xl md:text-[30px] text-[#0d0d0f] tracking-tight uppercase tabular-nums cursor-pointer hover:text-[#b81d2a] transition-colors"
                    title="Click to replay telemetry scramble"
                  >
                    {leftLocationDisplay}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsContactOpen(true)}
                    className="font-display text-xl sm:text-2xl md:text-[30px] text-[#b81d2a] tracking-tight uppercase tabular-nums cursor-pointer hover:text-[#0d0d0f] transition-colors"
                  >
                    {rightCountryDisplay}
                  </button>
                </div>

                {/* Interactive Contact CTA & Direct Links Bar */}
                <div className="relative z-30 mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setContactInitialSubject('AI Application & LLM Integration');
                      setIsContactOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#b81d2a] hover:bg-[#d42232] text-white font-display text-xs md:text-sm tracking-[0.1em] uppercase transition-all inline-flex items-center gap-2 shadow-lg cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>START A CONVERSATION</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyEmailInline}
                    className="px-4 py-2.5 rounded-full bg-[#09090b] hover:bg-neutral-800 text-white text-[11px] font-mono tracking-wider uppercase transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#ff5a67]" />
                        <span>COPIED: {PERSONAL_IDENTITY.emailPlaceholder}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-white/70" />
                        <span>EMAIL: {PERSONAL_IDENTITY.emailPlaceholder}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={PERSONAL_IDENTITY.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full border border-black/25 bg-white hover:border-[#b81d2a] text-[#09090b] text-xs font-display tracking-wider uppercase transition-all inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  <a
                    href={PERSONAL_IDENTITY.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full border border-black/25 bg-white hover:border-[#b81d2a] text-[#09090b] text-xs font-display tracking-wider uppercase transition-all inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#b81d2a]" />
                    <span>LINKEDIN</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Centered Dual Editorial Portrait Finale Showcase (Suit Portrait + Studio Cutout Badge) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 32 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-20 mt-5 pb-3 flex justify-center items-end"
                >
                  {/* Subtle Crimson Backdrop Circle behind Finale Portraits */}
                  <div
                    className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] rounded-full bg-[#b81d2a]/15 border border-[#b81d2a]/30"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-end justify-center">
                    {/* Left Overlapping Studio Portrait Card */}
                    <div
                      onClick={() => setIsContactOpen(true)}
                      data-cursor="PORTRAIT"
                      className="hidden sm:block relative z-10 w-[135px] md:w-[155px] h-[175px] md:h-[200px] rounded-2xl bg-[#111115] border-2 border-white overflow-hidden -rotate-6 -mr-7 mb-3 shadow-xl cursor-pointer hover:rotate-0 transition-transform duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#b81d2a]/25 via-transparent to-black/80" />
                      <img
                        src={PERSONAL_IDENTITY.portraits.cleanCutout}
                        alt="Rohit Sahani studio portrait"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top pt-2"
                      />
                      <div className="absolute bottom-1.5 inset-x-2 flex items-center justify-between text-[8px] font-mono uppercase tracking-wider text-white/90">
                        <span>STUDIO · 01</span>
                        <span className="text-[#ff5a67]">BIT</span>
                      </div>
                    </div>

                    {/* Primary Center Editorial Suit Portrait Frame */}
                    <div
                      onClick={() => setIsContactOpen(true)}
                      data-cursor="PORTRAIT"
                      className="relative z-20 w-[220px] sm:w-[250px] md:w-[275px] h-[285px] sm:h-[325px] md:h-[355px] rounded-t-[140px] rounded-b-3xl bg-[#0d0d11] border-4 border-white overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.28)] cursor-pointer group"
                    >
                      <img
                        src={PERSONAL_IDENTITY.portraits.suitEditorial}
                        alt="Rohit Sahani — AI Engineer in Progress, Biratnagar, Nepal"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-[center_42%] scale-115 group-hover:scale-120 transition-transform duration-500"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-left flex items-end justify-between">
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#ff5a67]">
                            BIRATNAGAR, NEPAL
                          </div>
                          <div className="font-display text-base sm:text-lg tracking-wider uppercase text-white leading-none mt-0.5">
                            ROHIT SAHANI
                          </div>
                        </div>
                        <span className="w-7 h-7 rounded-full bg-[#b81d2a] text-white flex items-center justify-center">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Minimal Animated Footer */}
              <footer className="relative z-30 border-t border-black/10 py-4 mt-1 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600 sm:pr-48">
                <div className="flex items-center gap-2 font-display tracking-wider uppercase text-[#09090b]">
                  <RohitBrandMark className="w-4 h-4" />
                  <span>{PERSONAL_IDENTITY.footerIdentity}</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
                  <span>{PERSONAL_IDENTITY.location}</span>
                  <span aria-hidden="true">·</span>
                  <a
                    href={PERSONAL_IDENTITY.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#b81d2a] font-medium"
                  >
                    github.com/rohitsahani-dev
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={PERSONAL_IDENTITY.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#b81d2a] font-medium"
                  >
                    linkedin.com/in/rohit-sahani-3804833b6
                  </a>
                </div>
              </footer>
            </section>

            {/* Studio Section 4 (Last Section): LET'S WORK TOGETHER — Project Inquiry Composer + Real Scannable Gmail QR */}
            <WorkTogetherInquirySection initialScopeTopic={contactInitialSubject} />
          </div>
        </main>

        {/* Floating Scroll-To-Top Button with Live Scroll Progress Indicator */}
        <ScrollTopProgressButton />

        {/* Interactive Modals */}
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          initialSubject={contactInitialSubject}
          onMessageSent={(submission) => {
            setLastSubmission(submission);
          }}
        />

        <ProjectDetailModal
          project={modalProject}
          onClose={() => setModalProject(null)}
          onPrevProject={() => {
            if (!modalProject) return;
            const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.id === modalProject.id);
            const prevIdx = cycleIndex(idx, PORTFOLIO_PROJECTS.length, -1);
            setModalProject(PORTFOLIO_PROJECTS[prevIdx]);
          }}
          onNextProject={() => {
            if (!modalProject) return;
            const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.id === modalProject.id);
            const nextIdx = cycleIndex(idx, PORTFOLIO_PROJECTS.length, 1);
            setModalProject(PORTFOLIO_PROJECTS[nextIdx]);
          }}
          onOpenContactForProject={(projectName) => {
            setContactInitialSubject(`Inquiry about ${projectName}`);
            setIsContactOpen(true);
          }}
        />
      </div>
    </div>
  );
}
