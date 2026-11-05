export type SectionId = 'hero' | 'about' | 'projects' | 'contact';
import QRCode from 'qrcode';

export type SkillCategoryKey = 'ALL' | 'PROGRAMMING' | 'AI & DEVELOPMENT' | 'TOOLS';

export interface SkillGroup {
  id: 'PROGRAMMING' | 'AI & DEVELOPMENT' | 'TOOLS';
  label: string;
  code: string;
  description: string;
  skills: string[];
}

export interface WorkflowStage {
  id: string;
  number: string;
  title: string;
  fullLabel: string;
  rotation: number;
  accent: 'light' | 'crimson' | 'dark' | 'outline';
  summary: string;
  deliverable: string;
}

export interface PortfolioProject {
  id: string;
  index: number;
  numberLabel: string;
  name: string;
  category: 'AI & LLM' | 'WEB & SAAS';
  shortDescription: string;
  architectureSummary: string;
  highlights: string[];
  technologies: string[];
  liveUrl?: string;
  screenshotUrl?: string;
  liveUrlPlaceholder: string;
  sourceUrl: string;
  sourceNote: string;
  accentColor: string;
  previewType:
    | 'sentra'
    | 'ss-interiors'
    | 'scamshield'
    | 'marginiq'
    | 'himalayan'
    | 'mycroft'
    | 'weather';
}

export const PERSONAL_IDENTITY = {
  name: 'ROHIT SAHANI',
  profession: 'AI ENGINEER | SOFTWARE DEVELOPER | CREATIVE BUILDER',
  subtitle: 'AI ENGINEER IN PROGRESS · SOFTWARE DEVELOPER · CREATIVE BUILDER',
  heroHeadlineLines: ['BUILDING', 'THE FUTURE', 'WITH AI.'],
  introQuote:
    "I'm a BIT student and aspiring AI engineer focused on building practical AI-powered applications, useful software, and digital products. I enjoy experimenting with emerging technologies and turning ideas into working projects.",
  location: 'Biratnagar, Nepal',
  education: 'Bachelor in Information Technology (BIT) Student',
  availability: 'Available for AI & Software Projects · Collaborations',
  githubUrl: 'https://github.com/rohitsahani-dev',
  linkedinUrl: 'https://www.linkedin.com/in/rohit-sahani-3804833b6',
  linkedinPlaceholder: 'https://www.linkedin.com/in/rohit-sahani-3804833b6',
  linkedinHandle: 'rohit-sahani-3804833b6',
  emailPlaceholder: 'rohit.sahani.dev@gmail.com',
  footerIdentity: 'ROHIT SAHANI — AI ENGINEER IN PROGRESS',
  portraits: {
    heroCutout: '/assets/rohit/rohit-portrait-hero.png',
    cleanCutout: '/assets/rohit/rohit-portrait-clean.png',
    suitEditorial: '/assets/rohit/rohit-portrait-suit.jpg',
  },
};

export const HERO_MARQUEE_ITEMS = ['AI', 'SOFTWARE', 'AUTOMATION', 'DEVELOPMENT'];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'PROGRAMMING',
    label: 'PROGRAMMING',
    code: '01',
    description:
      'Core languages used for writing application logic, structuring web interfaces, and querying relational data.',
    skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    id: 'AI & DEVELOPMENT',
    label: 'AI & DEVELOPMENT',
    code: '02',
    description:
      'Practical integration of large language models, structured prompt workflows, and external REST APIs into working web software.',
    skills: [
      'AI Application Development',
      'LLM Integration',
      'Prompt Engineering',
      'API Integration',
    ],
  },
  {
    id: 'TOOLS',
    label: 'TOOLS',
    code: '03',
    description:
      'Daily development environment, version control, and AI prototyping studio used to build, test, and iterate on projects.',
    skills: ['Git', 'GitHub', 'VS Code', 'Google AI Studio'],
  },
];

export const ALL_TECHNOLOGIES: string[] = [
  'Python',
  'JavaScript',
  'HTML',
  'CSS',
  'SQL',
  'AI Application Development',
  'LLM Integration',
  'Prompt Engineering',
  'API Integration',
  'Git',
  'GitHub',
  'VS Code',
  'Google AI Studio',
];

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'experiment',
    number: '01',
    title: 'EXPERIMENT',
    fullLabel: '01 — EXPERIMENT',
    rotation: -11,
    accent: 'light',
    summary:
      'Explore emerging LLM capabilities, test prompt structures in Google AI Studio, and validate core technical feasibility with rapid Python and JavaScript prototypes.',
    deliverable: 'Prompt Prototype & API Proof-of-Concept',
  },
  {
    id: 'build',
    number: '02',
    title: 'BUILD',
    fullLabel: '02 — BUILD',
    rotation: 7,
    accent: 'crimson',
    summary:
      'Translate validated concepts into clean, modular applications combining Python/JavaScript logic, responsive HTML/CSS interfaces, and structured API integrations.',
    deliverable: 'Working End-to-End Application',
  },
  {
    id: 'test',
    number: '03',
    title: 'TEST',
    fullLabel: '03 — TEST',
    rotation: -6,
    accent: 'dark',
    summary:
      'Verify edge cases, prompt reliability, input validation, and responsive behavior across desktop and mobile viewports before release.',
    deliverable: 'Verified Flows & Edge-Case Handling',
  },
  {
    id: 'improve',
    number: '04',
    title: 'IMPROVE',
    fullLabel: '04 — IMPROVE',
    rotation: 10,
    accent: 'outline',
    summary:
      'Refine UI clarity, optimize API latency and prompt accuracy, and iterate on features based on real usage and code review.',
    deliverable: 'Refined Production Iteration',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'sentra-ai',
    index: 1,
    numberLabel: '01',
    name: 'SENTRA AI',
    category: 'AI & LLM',
    shortDescription:
      'Personal AI operating assistant with natural language control, multi-model chat, and workstation automation.',
    architectureSummary:
      'A full-featured AI operating assistant web application (PWA) integrating Gemini LLM models, real-time Google Search grounding, Reality Mode, Image Studio, Voice & Camera input, and a Desktop Agent sandbox.',
    highlights: [
      'Natural language workspace command bar (Ctrl+K) to control settings, switch LLM models, and dispatch desktop actions',
      'Multi-modal AI workspace featuring Chat, Reality Mode, Image Studio, Voice & Camera, and Files & Knowledge',
      'Installable Progressive Web App (PWA) deployed live on Vercel with workstation quick actions',
    ],
    technologies: [
      'Python',
      'JavaScript',
      'AI Application Development',
      'LLM Integration',
      'Prompt Engineering',
      'Google AI Studio',
    ],
    liveUrl: 'https://sentra-personal-ai.vercel.app/',
    screenshotUrl: '/assets/aistudio/image_cdc421ed.png',
    liveUrlPlaceholder: 'https://sentra-personal-ai.vercel.app/',
    sourceUrl: 'https://github.com/rohitsahani-dev',
    sourceNote: 'Live on Vercel · sentra-personal-ai.vercel.app',
    accentColor: '#c81e2b',
    previewType: 'sentra',
  },
  {
    id: 'ss-interiors-wallpapers',
    index: 2,
    numberLabel: '02',
    name: 'SS INTERIORS & WALLPAPERS',
    category: 'WEB & SAAS',
    shortDescription:
      'Modern interior design & premium wallpaper catalog web application with live inventory and pricing.',
    architectureSummary:
      'A responsive e-commerce and digital catalog platform built for SS Interiors & WallPapers, showcasing curated luxury, marble, and modern wallpaper collections with real-time roll stock counts, NPR pricing, wishlist/cart controls, and direct customer inquiry.',
    highlights: [
      'Curated product showcase featuring Luxury, Marble, and Modern wallpaper collections with per-roll NPR pricing and live stock tracking',
      'Interactive storefront with theme toggle, favorites wishlist, shopping bag, and instant WhatsApp customer chat integration',
      'Responsive editorial layout deployed live on Vercel for seamless browsing across desktop and mobile',
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'API Integration'],
    liveUrl: 'https://ss-interiors-wall-papers.vercel.app/',
    screenshotUrl: '/assets/aistudio/image_3c0ce623.png',
    liveUrlPlaceholder: 'https://ss-interiors-wall-papers.vercel.app/',
    sourceUrl: 'https://github.com/rohitsahani-dev',
    sourceNote: 'Live on Vercel · ss-interiors-wall-papers.vercel.app',
    accentColor: '#e02432',
    previewType: 'ss-interiors',
  },
  {
    id: 'scamshield-ai',
    index: 3,
    numberLabel: '03',
    name: 'SCAMSHIELD AI',
    category: 'AI & LLM',
    shortDescription: 'AI-powered scam detection concept.',
    architectureSummary:
      'An AI-assisted security concept designed to inspect suspicious messages, links, and social-engineering patterns using LLM prompt pipelines and risk classification.',
    highlights: [
      'Analyzes message intent, urgency triggers, and deceptive phrasing patterns',
      'Structures LLM responses into clear risk explanations and safety recommendations',
      'Built to explore practical AI safety and consumer protection workflows',
    ],
    technologies: ['Python', 'AI Application Development', 'LLM Integration', 'Prompt Engineering'],
    liveUrlPlaceholder: 'placeholder://scamshield-ai-demo-url',
    sourceUrl: 'https://github.com/rohitsahani-dev',
    sourceNote: 'GitHub profile link (replace with direct repo URL when published)',
    accentColor: '#c81e2b',
    previewType: 'scamshield',
  },
  {
    id: 'marginiq',
    index: 4,
    numberLabel: '04',
    name: 'MARGINIQ',
    category: 'WEB & SAAS',
    shortDescription: 'A SaaS project focused on business margin intelligence.',
    architectureSummary:
      'A business intelligence web application concept focused on helping operators understand unit economics, cost structures, and gross margin breakdowns clearly.',
    highlights: [
      'Structured cost-to-margin breakdown views for product and service lines',
      'Clean tabular financial layout designed for rapid decision-making',
      'Combines relational data modeling concepts with interactive frontend calculations',
    ],
    technologies: ['JavaScript', 'SQL', 'HTML', 'CSS'],
    liveUrlPlaceholder: 'placeholder://marginiq-live-demo-url',
    sourceUrl: 'https://github.com/rohitsahani-dev',
    sourceNote: 'GitHub profile link (replace with direct repo URL when published)',
    accentColor: '#e02432',
    previewType: 'marginiq',
  },
  {
    id: 'himalayan-kitchen',
    index: 5,
    numberLabel: '05',
    name: 'HIMALAYAN KITCHEN',
    category: 'WEB & SAAS',
    shortDescription: 'A modern restaurant website demonstration.',
    architectureSummary:
      'A responsive hospitality and dining web demonstration showcasing modern editorial typography, curated menu presentation, and interactive guest inquiry flows.',
    highlights: [
      'Editorial food and menu presentation with category filtering',
      'Responsive layout crafted for mobile diners and desktop visitors alike',
      'Clean semantic HTML, custom CSS styling, and interactive JavaScript states',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrlPlaceholder: 'placeholder://himalayan-kitchen-demo-url',
    sourceUrl: 'https://github.com/rohitsahani-dev',
    sourceNote: 'GitHub profile link (replace with direct repo URL when published)',
    accentColor: '#b81d2a',
    previewType: 'himalayan',
  },
  {
    id: 'mycroft-ai',
    index: 6,
    numberLabel: '06',
    name: 'MYCROFT AI',
    category: 'AI & LLM',
    shortDescription: 'An AI assistant application.',
    architectureSummary:
      'An interactive AI assistant application built to support daily developer queries, text summarization, and structured problem-solving through LLM API integration.',
    highlights: [
      'Integrates large language model APIs with context-aware system prompts',
      'Clean conversational interface focused on clarity and fast responses',
      'Prototyped and refined using Google AI Studio and modern web technologies',
    ],
    technologies: [
      'Python',
      'JavaScript',
      'LLM Integration',
      'API Integration',
      'Google AI Studio',
    ],
    liveUrlPlaceholder: 'placeholder://mycroft-ai-demo-url',
    sourceUrl: 'https://github.com/rohitsahani-dev',
    sourceNote: 'GitHub profile link (replace with direct repo URL when published)',
    accentColor: '#c81e2b',
    previewType: 'mycroft',
  },
  {
    id: 'weather-application',
    index: 7,
    numberLabel: '07',
    name: 'WEATHER APPLICATION',
    category: 'WEB & SAAS',
    shortDescription: 'A weather application built using web technologies.',
    architectureSummary:
      'A web application that fetches and displays live meteorological conditions by integrating external weather APIs with a clean, responsive dashboard interface.',
    highlights: [
      'Asynchronous API integration for city-by-city weather lookup',
      'Displays temperature, humidity, wind speed, and atmospheric conditions clearly',
      'Built with vanilla web fundamentals (JavaScript, HTML, CSS, REST APIs)',
    ],
    technologies: ['JavaScript', 'API Integration', 'HTML', 'CSS'],
    liveUrlPlaceholder: 'placeholder://weather-app-demo-url',
    sourceUrl: 'https://github.com/rohitsahani-dev',
    sourceNote: 'GitHub profile link (replace with direct repo URL when published)',
    accentColor: '#d12231',
    previewType: 'weather',
  },
];

export function cycleIndex(current: number, total: number, delta: number): number {
  if (total <= 0) return 0;
  return (((current + delta) % total) + total) % total;
}

export function formatProjectCounter(activeIndex: number, total = PORTFOLIO_PROJECTS.length): string {
  const safeTotal = Math.max(1, total);
  const num = (((activeIndex % safeTotal) + safeTotal) % safeTotal) + 1;
  return `PROJECT ${String(num).padStart(2, '0')}/${String(safeTotal).padStart(2, '0')}`;
}

export function filterProjectsByCategory(
  projects: PortfolioProject[],
  category: 'ALL' | 'AI & LLM' | 'WEB & SAAS',
  searchQuery = ''
): PortfolioProject[] {
  const q = searchQuery.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory = category === 'ALL' || project.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [
      project.name,
      project.shortDescription,
      project.architectureSummary,
      ...project.technologies,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function formatScrambleText(
  progress: number,
  targetText: string,
  scrambleStates: string[]
): string {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped >= 0.92 || scrambleStates.length === 0) {
    return targetText;
  }
  const idx = Math.min(
    scrambleStates.length - 1,
    Math.floor(clamped * scrambleStates.length)
  );
  return scrambleStates[idx];
}

export function validateContactForm(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedSubject = input.subject.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName || trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!trimmedSubject || trimmedSubject.length < 3) {
    errors.subject = 'Please specify a brief project or inquiry topic.';
  }
  if (!trimmedMessage || trimmedMessage.length < 10) {
    errors.message = 'Please include a short message (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface TourWaypoints {
  hero: number;
  about: number;
  projects: number;
  projectsGrid: number;
  contact: number;
}

export interface TourFrameState {
  scrollY: number;
  stageId: SectionId;
  stageLabel: string;
  workflowIndex: number;
  projectIndex: number;
  percent: number;
}

function easeInOutCubic(x: number): number {
  const clamped = Math.max(0, Math.min(1, x));
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

export function computeTourState(t: number, waypoints: TourWaypoints): TourFrameState {
  const p = Math.max(0, Math.min(1, t));
  const percent = Math.round(p * 100);

  // Keyframe schedule (0..1):
  // 0.00 - 0.12: Hold on Section 01 Hero (01 INTRO)
  // 0.12 - 0.28: Glide from Hero to Section 02 About (02 FOUNDATION)
  // 0.28 - 0.42: Hold on Section 02 while cycling workflow stages (01 -> 02 -> 03 -> 04)
  // 0.42 - 0.56: Glide across curved border into Section 03 Projects Spotlight (03 PROJECTS)
  // 0.56 - 0.76: Glide through 5-Project Bento Grid while cycling spotlight project
  // 0.76 - 0.90: Glide into Section 04 Contact Finale (04 CONTACT)
  // 0.90 - 1.00: Hold on Section 04 Finale
  let scrollY = waypoints.hero;
  let stageId: SectionId = 'hero';
  let stageLabel = '01 INTRO';
  let workflowIndex = 0;
  let projectIndex = 0;

  if (p < 0.12) {
    scrollY = waypoints.hero;
    stageId = 'hero';
    stageLabel = '01 INTRO';
  } else if (p < 0.28) {
    const localT = easeInOutCubic((p - 0.12) / 0.16);
    scrollY = waypoints.hero + (waypoints.about - waypoints.hero) * localT;
    stageId = localT > 0.5 ? 'about' : 'hero';
    stageLabel = localT > 0.5 ? '02 FOUNDATION' : '01 INTRO';
  } else if (p < 0.42) {
    const localT = (p - 0.28) / 0.14;
    scrollY = waypoints.about + localT * 60;
    stageId = 'about';
    stageLabel = '02 FOUNDATION';
    workflowIndex = Math.min(3, Math.floor(localT * 4));
  } else if (p < 0.56) {
    const localT = easeInOutCubic((p - 0.42) / 0.14);
    scrollY = waypoints.about + 60 + (waypoints.projects - (waypoints.about + 60)) * localT;
    stageId = localT > 0.4 ? 'projects' : 'about';
    stageLabel = localT > 0.4 ? '03 PROJECTS' : '02 FOUNDATION';
    workflowIndex = 3;
  } else if (p < 0.76) {
    const localT = easeInOutCubic((p - 0.56) / 0.2);
    scrollY = waypoints.projects + (waypoints.projectsGrid - waypoints.projects) * localT;
    stageId = 'projects';
    stageLabel = '03 PROJECTS';
    workflowIndex = 3;
    projectIndex = Math.min(4, Math.floor(localT * 5));
  } else if (p < 0.9) {
    const localT = easeInOutCubic((p - 0.76) / 0.14);
    scrollY = waypoints.projectsGrid + (waypoints.contact - waypoints.projectsGrid) * localT;
    stageId = localT > 0.45 ? 'contact' : 'projects';
    stageLabel = localT > 0.45 ? '04 CONTACT' : '03 PROJECTS';
    workflowIndex = 3;
    projectIndex = 4;
  } else {
    scrollY = waypoints.contact;
    stageId = 'contact';
    stageLabel = '04 CONTACT';
    workflowIndex = 3;
    projectIndex = 0;
  }

  return {
    scrollY: Math.round(scrollY),
    stageId,
    stageLabel,
    workflowIndex,
    projectIndex,
    percent,
  };
}

export type CursorVariant = 'default' | 'action' | 'project' | 'external' | 'portrait';

export interface CursorDescriptor {
  variant: CursorVariant;
  label: string;
  ringSize: number;
}

export function resolveCursorDescriptor(meta: {
  dataCursor?: string | null;
  tagName?: string | null;
  href?: string | null;
  role?: string | null;
}): CursorDescriptor {
  const custom = (meta.dataCursor || '').trim().toUpperCase();
  if (custom === 'PORTRAIT') {
    return { variant: 'portrait', label: 'PORTRAIT', ringSize: 72 };
  }
  if (custom === 'INSPECT' || custom === 'PROJECT') {
    return { variant: 'project', label: 'INSPECT ↗', ringSize: 74 };
  }
  if (custom) {
    return { variant: 'project', label: custom, ringSize: 72 };
  }

  const tag = (meta.tagName || '').toUpperCase();
  const href = meta.href || '';

  if (tag === 'A' && /^https?:\/\//i.test(href)) {
    const isVercel = href.includes('vercel.app');
    return {
      variant: 'external',
      label: isVercel ? 'LIVE ↗' : 'OPEN ↗',
      ringSize: 68,
    };
  }

  if (
    tag === 'BUTTON' ||
    tag === 'A' ||
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    meta.role === 'button' ||
    meta.role === 'tab'
  ) {
    return { variant: 'action', label: '', ringSize: 52 };
  }

  return { variant: 'default', label: '', ringSize: 36 };
}

export function lerpPoint(
  current: { x: number; y: number },
  target: { x: number; y: number },
  factor: number
): { x: number; y: number } {
  const f = Math.max(0.01, Math.min(1, factor));
  return {
    x: current.x + (target.x - current.x) * f,
    y: current.y + (target.y - current.y) * f,
  };
}

export type StudioTechTier = 'CORE' | 'EXPLORING';

export interface StudioTechItem {
  id: string;
  name: string;
  tier: StudioTechTier;
  specialty: string;
  stackLabel: string;
  description: string;
  inquireTopic: string;
}

export const STUDIO_TECH_ITEMS: StudioTechItem[] = [
  {
    id: 'html5',
    name: 'HTML5',
    tier: 'CORE',
    specialty: 'Semantic Markup & Accessibility',
    stackLabel: 'Core Production Stack',
    description:
      'Architecting accessible document hierarchies, landmark regions, and SEO-ready semantic markup.',
    inquireTopic: 'WEBSITE DEVELOPMENT',
  },
  {
    id: 'css3',
    name: 'CSS3',
    tier: 'CORE',
    specialty: 'Responsive Layouts & Motion Systems',
    stackLabel: 'Core Production Stack',
    description:
      'Crafting fluid editorial grid systems, custom keyframe transitions, and responsive multi-device layouts.',
    inquireTopic: 'WEBSITE DEVELOPMENT',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    tier: 'CORE',
    specialty: 'Interactive UI & Async Logic',
    stackLabel: 'Core Production Stack',
    description:
      'Building dynamic client-side state, interactive DOM choreography, and REST API integrations.',
    inquireTopic: 'WEBSITE DEVELOPMENT',
  },
  {
    id: 'python',
    name: 'Python',
    tier: 'CORE',
    specialty: 'AI Pipelines & Backend Scripting',
    stackLabel: 'Core Production Stack',
    description:
      'Developing LLM integration workflows, prompt pipelines, automation scripts, and backend utilities.',
    inquireTopic: 'AI & LLM APPLICATION',
  },
  {
    id: 'react',
    name: 'React',
    tier: 'EXPLORING',
    specialty: 'Component Architecture & Hooks',
    stackLabel: 'Exploring & Building',
    description:
      'Building modular single-page interfaces with reusable functional components, hooks, and interactive state.',
    inquireTopic: 'WEBSITE DEVELOPMENT',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    tier: 'EXPLORING',
    specialty: 'Full-Stack React Framework',
    stackLabel: 'Exploring & Building',
    description:
      'Exploring modern server-rendered React routing, hybrid rendering patterns, and full-stack web architecture.',
    inquireTopic: 'WEBSITE DEVELOPMENT',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    tier: 'EXPLORING',
    specialty: 'Postgres Backend & Realtime Auth',
    stackLabel: 'Exploring & Building',
    description:
      'Experimenting with cloud PostgreSQL databases, user authentication flows, and instant API backends.',
    inquireTopic: 'AI & LLM APPLICATION',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    tier: 'CORE',
    specialty: 'Cloud Edge Deployment & CI/CD',
    stackLabel: 'Core Production Stack',
    description:
      'Deploying production web applications and PWAs like SENTRA AI and SS Interiors with instant preview pipelines.',
    inquireTopic: 'WEBSITE DEVELOPMENT',
  },
  {
    id: 'git',
    name: 'Git',
    tier: 'CORE',
    specialty: 'Distributed Version Control',
    stackLabel: 'Core Production Stack',
    description:
      'Managing clean commit histories, feature branching, and structured code workflows across all projects.',
    inquireTopic: 'WEBSITE DEVELOPMENT',
  },
  {
    id: 'github',
    name: 'GitHub',
    tier: 'CORE',
    specialty: 'Open Source & Repository Hosting',
    stackLabel: 'Core Production Stack',
    description:
      'Hosting project repositories, documentation, and versioned releases at github.com/rohitsahani-dev.',
    inquireTopic: 'WEBSITE DEVELOPMENT',
  },
];

export function filterStudioTechItems(tier: 'ALL' | StudioTechTier): StudioTechItem[] {
  if (tier === 'ALL') return STUDIO_TECH_ITEMS;
  return STUDIO_TECH_ITEMS.filter((item) => item.tier === tier);
}

export interface WorkProcessStep {
  number: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'discover' | 'define' | 'develop' | 'deliver';
}

export const HOW_I_WORK_STEPS: WorkProcessStep[] = [
  {
    number: '01',
    code: '01 — DISCOVER',
    title: 'DISCOVER',
    subtitle: 'Understanding goals and requirements.',
    description:
      'Every project begins by clarifying the purpose, target audience, core content, and practical goals so the website solves the right problem.',
    iconType: 'discover',
  },
  {
    number: '02',
    code: '02 — DEFINE',
    title: 'DEFINE',
    subtitle: 'Planning layout, structure, and user experience.',
    description:
      'Establishing the information architecture, section hierarchy, typographic scale, and wireframes before writing implementation code.',
    iconType: 'define',
  },
  {
    number: '03',
    code: '03 — DEVELOP',
    title: 'DEVELOP',
    subtitle: 'Building the website with modern technologies.',
    description:
      'Translating the visual direction into clean, semantic HTML, responsive CSS, and interactive JavaScript with maintainable structure.',
    iconType: 'develop',
  },
  {
    number: '04',
    code: '04 — DELIVER',
    title: 'DELIVER',
    subtitle: 'Testing responsiveness, refining details, and deploying the website.',
    description:
      'Verifying layout behavior across desktop and mobile viewports, polishing transitions, checking accessibility, and preparing for launch.',
    iconType: 'deliver',
  },
];

export interface QuickScopePreset {
  id: string;
  label: string;
  topic: string;
  detailsTemplate: string;
}

export const QUICK_SCOPE_PRESETS: QuickScopePreset[] = [
  {
    id: 'business',
    label: 'BUSINESS SITE',
    topic: 'WEBSITE DEVELOPMENT',
    detailsTemplate:
      'Hi Rohit, I need a modern, responsive business website to showcase our services, brand identity, and customer inquiry flow.',
  },
  {
    id: 'restaurant',
    label: 'RESTAURANT SITE',
    topic: 'RESTAURANT / HOSPITALITY SITE',
    detailsTemplate:
      'Hi Rohit, I am looking for an interactive restaurant website with a curated digital menu, gallery showcase, and table reservation inquiry.',
  },
  {
    id: 'landing',
    label: 'LANDING PAGE',
    topic: 'LANDING PAGE & UI REDESIGN',
    detailsTemplate:
      'Hi Rohit, we are launching a new digital product and need a high-converting landing page with smooth animations and clean typography.',
  },
  {
    id: 'redesign',
    label: 'REDESIGN',
    topic: 'LANDING PAGE & UI REDESIGN',
    detailsTemplate:
      'Hi Rohit, we want to modernize our existing website with a cleaner UI/UX layout, faster performance, and mobile responsiveness.',
  },
];

export function computeScrollProgressPercent(scrollTop: number, maxScroll: number): number {
  if (maxScroll <= 0) return 0;
  const raw = (scrollTop / maxScroll) * 100;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export interface EmailQrMatrix {
  payload: string;
  size: number;
  cells: boolean[][];
}

export function generateEmailQrMatrix(
  emailAddress: string = PERSONAL_IDENTITY.emailPlaceholder
): EmailQrMatrix {
  const cleanEmail = emailAddress.trim() || PERSONAL_IDENTITY.emailPlaceholder;
  const payload = cleanEmail.startsWith('mailto:') ? cleanEmail : `mailto:${cleanEmail}`;
  const qr = QRCode.create(payload, { errorCorrectionLevel: 'H' });
  const size = qr.modules.size;
  const cells: boolean[][] = [];
  for (let r = 0; r < size; r += 1) {
    const row: boolean[] = [];
    for (let c = 0; c < size; c += 1) {
      row.push(Boolean(qr.modules.get(r, c)));
    }
    cells.push(row);
  }
  return { payload, size, cells };
}




