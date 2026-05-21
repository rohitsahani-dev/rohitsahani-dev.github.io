import Link from "next/link";

import { getGenreDirectory } from "@/lib/api";
import { PageShell } from "@/components/page-shell";

export default async function GenresPage() {
  const directory = await getGenreDirectory();

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section>
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Genre Atlas</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">Genres</h1>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        {directory.map((genre) => (
          <section key={genre.slug} id={genre.slug} className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-accent-soft">{genre.count} titles</p>
                <h2 className="mt-2 font-display text-3xl font-semibold">{genre.name}</h2>
              </div>
              <Link href={`/browse?genre=${genre.slug}`} className="text-sm text-white/65 transition hover:text-white">
                Explore
              </Link>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/62">{genre.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {genre.featuredAnime.map((anime) => (
                <Link key={anime.slug} href={`/anime/${anime.slug}`} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-3 transition hover:bg-white/[0.06]">
                  <img src={anime.posterImage} alt={anime.title} className="aspect-[3/4] w-full rounded-2xl object-cover" />
                  <p className="mt-3 font-semibold">{anime.title}</p>
                  <p className="mt-1 text-sm text-white/58">{anime.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
