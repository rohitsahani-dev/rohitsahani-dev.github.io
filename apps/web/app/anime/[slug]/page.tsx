import type { Metadata } from "next";
import { Heart, Play, Share2, Download } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { getAnimeDetail } from "@/lib/api";
import { DetailTabs } from "@/components/anime/detail-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const anime = await getAnimeDetail(slug);

  if (!anime) {
    return {};
  }

  return {
    title: anime.title,
    description: anime.synopsis,
    openGraph: {
      title: anime.title,
      description: anime.synopsis,
      images: [anime.bannerImage]
    }
  };
}

export default async function AnimeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const anime = await getAnimeDetail(slug);

  if (!anime) {
    notFound();
  }

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section className="relative overflow-hidden rounded-[40px] border border-white/10 shadow-card">
        <img src={anime.bannerImage} alt={anime.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,12,0.95),rgba(8,8,12,0.7),rgba(8,8,12,0.35))]" />
        <div className="relative z-10 grid gap-8 p-8 lg:grid-cols-[300px,1fr] lg:p-10">
          <img src={anime.posterImage} alt={anime.title} className="w-full max-w-[300px] rounded-[32px] object-cover" />
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="accent">{anime.quality}</Badge>
              <Badge>{anime.dubStatus}</Badge>
              <Badge>{anime.status}</Badge>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">{anime.japaneseTitle}</p>
              <h1 className="mt-3 font-display text-5xl font-semibold leading-tight">{anime.title}</h1>
              <p className="mt-4 max-w-4xl text-base leading-8 text-white/68">{anime.synopsis}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <MetaItem label="Studios" value={anime.studios.map((studio) => studio.name).join(", ")} />
              <MetaItem label="Release" value={`${anime.season} ${anime.releaseYear}`} />
              <MetaItem label="Episodes" value={`${anime.totalEpisodes}`} />
              <MetaItem label="Views" value={anime.views.toLocaleString()} />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/watch/${anime.slug}/episode/1`}>
                  <Play className="size-4" />
                  Watch Now
                </Link>
              </Button>
              <Button size="lg" variant="secondary">
                <Heart className="size-4" />
                Add to Favorites
              </Button>
              <Button size="lg" variant="secondary">
                <Share2 className="size-4" />
                Share
              </Button>
              <Button size="lg" variant="secondary">
                <Download className="size-4" />
                Download
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <Badge key={genre.slug}>{genre.name}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TVSeries",
            name: anime.title,
            description: anime.synopsis,
            image: anime.posterImage,
            genre: anime.genres.map((genre) => genre.name)
          })
        }}
      />

      <DetailTabs anime={anime} />
    </PageShell>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/78">{value}</p>
    </div>
  );
}
