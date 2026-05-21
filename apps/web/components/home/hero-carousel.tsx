"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { AnimeSummary } from "@/lib/site-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroCarousel({ items }: { items: AnimeSummary[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length) {
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const active = items[index];

  if (!active) {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/40 shadow-card">
      <div className="absolute inset-0">
        <Image src={active.bannerImage} alt={active.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,12,0.92),rgba(8,8,12,0.52),rgba(8,8,12,0.18))]" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 grid min-h-[560px] gap-10 px-8 py-10 lg:grid-cols-[1.2fr,0.8fr] lg:px-12 lg:py-14"
        >
          <div className="flex flex-col justify-end">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="accent">Featured</Badge>
                <Badge>{active.quality}</Badge>
                <Badge>{active.dubStatus}</Badge>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.38em] text-accent-soft">{active.season} {active.releaseYear}</p>
                <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight text-white md:text-6xl">{active.title}</h1>
                <p className="max-w-2xl text-lg leading-8 text-white/72">{active.synopsis}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={`/watch/${active.slug}/episode/1`}>
                    <Play className="size-4" />
                    Watch Now
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/favorites">
                    <Heart className="size-4" />
                    Add to List
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden items-end justify-end lg:flex">
            <div className="w-full max-w-sm rounded-[32px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-2xl">
              <Image src={active.posterImage} alt={active.title} width={768} height={1080} className="rounded-[24px] object-cover" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIndex((current) => (current - 1 + items.length) % items.length)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-white/10"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setIndex((current) => (current + 1) % items.length)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-white/10"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
