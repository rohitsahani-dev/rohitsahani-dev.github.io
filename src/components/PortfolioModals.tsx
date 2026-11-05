import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  MapPin,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import {
  PERSONAL_IDENTITY,
  PortfolioProject,
  validateContactForm,
} from '../utils/portfolioLogic';
import { LabNodeMiniIcon, ProjectArchitecturePreview } from './PortfolioVisuals';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  onMessageSent: (submission: {
    ref: string;
    name: string;
    email: string;
    subject: string;
  }) => void;
}

const INQUIRY_TOPICS = [
  'AI Application & LLM Integration',
  'Software / Web Development',
  'Internship & Project Collaboration',
];

export function ContactModal({
  isOpen,
  onClose,
  initialSubject = INQUIRY_TOPICS[0],
  onMessageSent,
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_IDENTITY.emailPlaceholder).catch(() => {});
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm({
      name,
      email,
      subject,
      message,
    });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const refCode = `RS-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedRef(refCode);
    onMessageSent({
      ref: refCode,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-[#111115] border border-white/15 text-white p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close contact dialog"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <img
            src={PERSONAL_IDENTITY.portraits.suitEditorial}
            alt="Rohit Sahani"
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full object-cover object-top border border-[#b81d2a]"
          />
          <div>
            <div className="flex items-center gap-2">
              <LabNodeMiniIcon size={15} />
              <span className="text-[11px] tracking-[0.25em] uppercase text-white/70">
                ROHIT SAHANI · DIRECT CONTACT
              </span>
            </div>
            <div className="text-[11px] text-white/50">
              {PERSONAL_IDENTITY.education} · {PERSONAL_IDENTITY.location}
            </div>
          </div>
        </div>

        <h2
          id="contact-modal-title"
          className="font-display text-3xl md:text-4xl tracking-wide uppercase text-white mb-2"
        >
          LET&apos;S BUILD SOMETHING MEANINGFUL
        </h2>
        <p className="text-xs text-white/65 mb-5">
          Based in {PERSONAL_IDENTITY.location} · Open to AI engineering projects, software
          development collaborations, and learning opportunities.
        </p>

        {/* Quick Direct Channels Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex items-center justify-between gap-2 rounded-xl bg-[#18181f] border border-white/10 hover:border-[#b81d2a] px-3 py-2.5 text-left transition-colors cursor-pointer"
          >
            <div className="min-w-0">
              <div className="text-[9px] font-mono uppercase tracking-wider text-white/50">
                DIRECT EMAIL
              </div>
              <div className="text-xs font-medium text-white truncate">
                {PERSONAL_IDENTITY.emailPlaceholder}
              </div>
            </div>
            {copiedEmail ? (
              <Check className="w-3.5 h-3.5 text-[#e02432] shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-white/50 shrink-0" />
            )}
          </button>

          <a
            href={PERSONAL_IDENTITY.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 rounded-xl bg-[#18181f] border border-white/10 hover:border-[#b81d2a] px-3 py-2.5 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-[9px] font-mono uppercase tracking-wider text-white/50">
                GITHUB PROFILE
              </div>
              <div className="text-xs font-medium text-white truncate">rohitsahani-dev</div>
            </div>
            <Github className="w-3.5 h-3.5 text-white/70 shrink-0" />
          </a>

          <a
            href={PERSONAL_IDENTITY.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 rounded-xl bg-[#18181f] border border-white/10 hover:border-[#b81d2a] px-3 py-2.5 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-[9px] font-mono uppercase tracking-wider text-white/50">
                LINKEDIN PROFILE
              </div>
              <div className="text-xs font-medium text-white truncate">
                {PERSONAL_IDENTITY.linkedinHandle}
              </div>
            </div>
            <Linkedin className="w-3.5 h-3.5 text-white/70 shrink-0" />
          </a>
        </div>

        {confirmedRef ? (
          <div className="rounded-2xl bg-[#18181f] border border-[#b81d2a]/50 p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#b81d2a]/20 text-[#e02432] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl tracking-wide uppercase">
              INQUIRY LOGGED · {confirmedRef}
            </h3>
            <p className="text-xs text-white/70 max-w-md mx-auto">
              Thank you, <span className="text-white font-semibold">{name}</span> ({email}). Your
              note regarding <span className="text-white font-semibold">{subject}</span> is ready.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`mailto:${PERSONAL_IDENTITY.emailPlaceholder}?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`}
                className="px-5 py-2 rounded-full bg-[#b81d2a] hover:bg-[#d12231] text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Email Client</span>
              </a>
              <button
                type="button"
                onClick={() => setConfirmedRef(null)}
                className="px-4 py-2 rounded-full border border-white/25 text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                Edit Message
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2">
                1. SELECT COLLABORATION TOPIC
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {INQUIRY_TOPICS.map((topic) => {
                  const active = subject === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        setSubject(topic);
                        if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                      }}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        active
                          ? 'bg-[#b81d2a]/20 border-[#b81d2a] text-white font-medium'
                          : 'bg-[#18181f] border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="contact-sender-name"
                  className="block text-[10px] tracking-[0.18em] uppercase text-white/60 mb-1"
                >
                  YOUR NAME
                </label>
                <input
                  id="contact-sender-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="Enter your name"
                  className="w-full rounded-xl bg-[#18181f] border border-white/15 px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#b81d2a]"
                />
                {errors.name && (
                  <p className="text-[11px] text-[#ff5a67] mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-sender-email"
                  className="block text-[10px] tracking-[0.18em] uppercase text-white/60 mb-1"
                >
                  YOUR EMAIL
                </label>
                <input
                  id="contact-sender-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-[#18181f] border border-white/15 px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#b81d2a]"
                />
                {errors.email && (
                  <p className="text-[11px] text-[#ff5a67] mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message-body"
                className="block text-[10px] tracking-[0.18em] uppercase text-white/60 mb-1"
              >
                PROJECT OR COLLABORATION DETAILS
              </label>
              <textarea
                id="contact-message-body"
                rows={3}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                }}
                placeholder="Tell me about the AI application, software project, or role you have in mind..."
                className="w-full rounded-xl bg-[#18181f] border border-white/15 px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#b81d2a]"
              />
              {errors.message && (
                <p className="text-[11px] text-[#ff5a67] mt-1" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                <MapPin className="w-3.5 h-3.5 text-[#c81e2b]" />
                <span>{PERSONAL_IDENTITY.location}</span>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#b81d2a] hover:bg-[#d42232] text-white font-display tracking-wider uppercase text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>SEND MESSAGE</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onPrevProject: () => void;
  onNextProject: () => void;
  onOpenContactForProject: (projectName: string) => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onPrevProject,
  onNextProject,
  onOpenContactForProject,
}: ProjectDetailModalProps) {
  React.useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevProject();
      } else if (e.key === 'ArrowRight') {
        onNextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onPrevProject, onNextProject]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0d0d11] border border-white/15 p-6 md:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <LabNodeMiniIcon size={18} />
            <span className="text-[11px] tracking-[0.24em] uppercase text-white/65">
              SELECTED WORK · {project.numberLabel} / 07 · {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevProject}
              aria-label="Previous project"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNextProject}
              aria-label="Next project"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h2
          id="project-modal-title"
          className="font-display text-3xl md:text-4xl tracking-wide uppercase text-white mb-2"
        >
          {project.numberLabel}. {project.name}
        </h2>
        <p className="text-sm text-white/80 mb-5">{project.shortDescription}</p>

        {/* Visual Architecture Preview */}
        <div className="rounded-2xl overflow-hidden border border-white/15 h-52 mb-5">
          <ProjectArchitecturePreview project={project} />
        </div>

        {/* Architecture Overview & Technical Highlights */}
        <div className="space-y-4">
          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-white/50 font-semibold mb-1.5">
              PROJECT OVERVIEW
            </div>
            <p className="text-xs leading-relaxed text-white/80">{project.architectureSummary}</p>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-white/50 font-semibold mb-1.5">
              KEY FOCUS AREAS
            </div>
            <ul className="space-y-1.5 text-xs text-white/75">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#e02432] font-mono">0{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-white/50 font-semibold mb-1.5">
              TECHNOLOGIES USED
            </div>
            <div className="text-xs text-white/85 font-medium">
              {project.technologies.join(' · ')}
            </div>
          </div>
        </div>

        {/* Links & Placeholders Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#b81d2a] hover:bg-[#d12231] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-colors shadow-lg"
              >
                <span>Launch Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span
                className="px-3.5 py-2 rounded-full border border-white/20 text-[11px] font-mono text-white/60"
                title="Replace with live deployment URL when hosted"
              >
                Live Demo: [URL Placeholder]
              </span>
            )}

            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white text-[#09090b] hover:bg-neutral-200 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Profile / Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenContactForProject(project.name);
            }}
            className="px-5 py-2 rounded-full bg-[#b81d2a] hover:bg-[#d12231] text-white text-xs font-display tracking-wider uppercase transition-colors cursor-pointer"
          >
            Discuss This Project ↗
          </button>
        </div>
      </div>
    </div>
  );
}
