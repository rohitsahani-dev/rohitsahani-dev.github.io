"use client";

import { motion } from "framer-motion";
import { Heart, Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { AnimeSummary } from "@/lib/site-types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function AnimeCard({
  anime,
  progress,
  href
}: {
  anime: AnimeSummary;
  progress?: number;
  href?: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02, rotateX: 4, rotateY: -4 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="group relative min-w-[220px] max-w-[280px] flex-1 rounded-[28px] border border-white/10 bg-white/[0.04] p-3 shadow-card backdrop-blur-xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link href={href ?? `/anime/${anime.slug}`} className="block space-y-4">
        <div className="relative overflow-hidden rounded-[22px]">
          <Image
            src={anime.posterImage}
            alt={anime.title}
            width={768}
            height={1080}
            className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />

          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant="accent">{anime.quality}</Badge>
            <Badge>{anime.dubStatus}</Badge>
          </div>

          <button
            type="button"
            className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur-md transition hover:scale-105 hover:bg-accent/22"
          >
            <Heart className="size-4" />
          </button>

          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/75 backdrop-blur-md">
            <Play className="size-3.5" />
            Episode {anime.latestEpisodeNumber ?? anime.totalEpisodes}
          </div>
        </div>

        <div className="space-y-3 px-1 pb-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{anime.title}</h3>
              <p className="text-sm text-white/45">{anime.japaneseTitle}</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-amber-300">
              <Star className="size-3.5 fill-current" />
              {anime.averageRating.toFixed(1)}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {anime.genres.slice(0, 2).map((genre) => (
              <Badge key={genre.slug}>{genre.name}</Badge>
            ))}
          </div>

          <p className="line-clamp-2 text-sm leading-6 text-white/62">{anime.tagline}</p>

          {typeof progress === "number" && (
            <div className="space-y-2">
              <Progress value={progress * 100} />
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">{Math.round(progress * 100)}% complete</p>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
