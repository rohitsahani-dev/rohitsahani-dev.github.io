"use client";

import { ChevronDown, Clock3, Flame, Globe2, LayoutGrid, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navBrowseLinks, navGenreLinks } from "@/lib/constants";
import { useUiStore } from "@/store/ui-store";
import { useAuth } from "@/hooks/use-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SearchCommand } from "@/components/search/search-command";

export function Navbar() {
  const pathname = usePathname();
  const { data: auth } = useAuth();
  const { language, setLanguage } = useUiStore();

  const linkClass = (href: string) =>
    `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${
      pathname === href ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/6 hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-[#09090d]/78 backdrop-blur-2xl">
      <div className="section-shell">
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/brand/kaistream-mark.svg" alt="KaiStream" width={44} height={44} className="h-11 w-11" />
              <div>
                <p className="font-display text-xl font-bold tracking-[0.18em] text-white">KAISTREAM</p>
                <p className="text-xs uppercase tracking-[0.32em] text-white/45">Neon anime cinema</p>
              </div>
            </Link>
          </div>

          <div className="order-3 flex flex-wrap items-center gap-2 lg:order-none">
            <DropdownMenu>
              <DropdownMenuTrigger className={linkClass("/browse")}>
                <LayoutGrid className="size-4" />
                Browse
                <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {navBrowseLinks.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={linkClass("/genres")}>
                Genres
                <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {navGenreLinks.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/schedule" className={linkClass("/schedule")}>
              <Clock3 className="size-4" />
              Schedule
            </Link>
            <Link href="/trending" className={linkClass("/trending")}>
              <Flame className="size-4" />
              Trending
            </Link>
          </div>

          <div className="order-2 flex flex-1 items-center gap-3 lg:order-none lg:justify-end">
            <SearchCommand />

            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "ja" : "en")}
              className="hidden h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/80 transition hover:bg-white/[0.08] md:inline-flex"
            >
              <Globe2 className="size-4" />
              {language.toUpperCase()}
            </button>

            <Link
              href={auth ? "/dashboard" : "/login"}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-accent/25 bg-accent/14 px-4 text-sm font-semibold text-white shadow-glow transition hover:bg-accent/22"
            >
              <UserRound className="size-4" />
              {auth ? auth.name : "Login"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
