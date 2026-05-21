import { PageShell } from "@/components/page-shell";
import { AnimeGrid } from "@/components/anime/anime-grid";
import type { AnimeSummary } from "@/lib/site-types";

export function CategoryPage({
  title,
  description,
  items
}: {
  title: string;
  description: string;
  items: AnimeSummary[];
}) {
  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-card backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Curated Shelf</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-white">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/65">{description}</p>
      </section>

      <AnimeGrid items={items} />
    </PageShell>
  );
}
