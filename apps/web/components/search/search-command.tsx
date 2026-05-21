"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useDeferredValue, useEffect, useRef, useState } from "react";

import { useSearchSuggestions } from "@/hooks/use-search";
import { useUiStore } from "@/store/ui-store";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function SearchCommand() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const { recentSearches, addRecentSearch } = useUiStore();
  const { data } = useSearchSuggestions(deferredQuery);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const handleSubmit = (value: string) => {
    if (!value.trim()) {
      return;
    }

    addRecentSearch(value.trim());
    setOpen(false);

    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    });
  };

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
        <Input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSubmit(query);
            }
          }}
          placeholder="Search titles, genres, seasons..."
          className="pl-11 pr-4"
        />
      </div>

      {open && (
        <div className="absolute inset-x-0 top-[calc(100%+12px)] z-50 rounded-[28px] border border-white/10 bg-[#11111a]/96 p-4 shadow-card backdrop-blur-2xl">
          {data?.suggestions?.length ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/45">
                <span>Instant Results</span>
                <button className="text-white/70" onClick={() => handleSubmit(query)}>
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {data.suggestions.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/anime/${item.slug}`}
                    onClick={() => {
                      addRecentSearch(item.title);
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-transparent bg-white/[0.03] px-3 py-3 transition hover:border-white/10 hover:bg-white/[0.06]"
                  >
                    <img src={item.posterImage} alt={item.title} className="h-14 w-10 rounded-xl object-cover" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.genres.slice(0, 2).map((genre) => (
                          <Badge key={genre.slug}>{genre.name}</Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm text-white/55">
              Start typing to search KaiStream’s catalog.
            </div>
          )}

          {recentSearches.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">Recent</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setQuery(item);
                      handleSubmit(item);
                    }}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/75 transition hover:bg-white/[0.08]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
