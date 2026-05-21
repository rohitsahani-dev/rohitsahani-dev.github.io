import Link from "next/link";

import type { AnimeSummary } from "@/lib/site-types";
import { AnimeCard } from "./anime-card";

export function AnimeRow({
  title,
  eyebrow,
  href,
  items
}: {
  title: string;
  eyebrow?: string;
  href?: string;
  items: AnimeSummary[];
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow && <p className="text-xs uppercase tracking-[0.28em] text-accent-soft">{eyebrow}</p>}
          <h2 className="mt-2 font-display text-3xl font-semibold text-white">{title}</h2>
        </div>
        {href && (
          <Link href={href} className="text-sm font-semibold text-white/70 transition hover:text-white">
            View all
          </Link>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((anime) => (
          <AnimeCard key={anime.slug} anime={anime} />
        ))}
      </div>
    </section>
  );
}
