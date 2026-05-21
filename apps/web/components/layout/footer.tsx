"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="mt-24 border-t border-white/6 bg-[#08080b]/92">
      <div className="section-shell grid gap-10 py-16 lg:grid-cols-[1.3fr,1fr,1fr]">
        <div className="space-y-4">
          <p className="font-display text-3xl font-bold">KaiStream</p>
          <p className="max-w-xl text-sm leading-7 text-white/62">
            A dark premium anime streaming platform designed for immersive discovery, cinematic watch sessions, and a polished full-stack deployment story.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-white/35">
            Streaming links in seed data are demo-compatible HLS sources for development and verification.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Explore</p>
          <div className="grid gap-2 text-sm text-white/70">
            <Link href="/browse">Browse Anime</Link>
            <Link href="/schedule">Airing Schedule</Link>
            <Link href="/top-rated">Top Rated</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Newsletter</p>
          <p className="text-sm text-white/60">Get fresh simulcast drops, editorial picks, and release countdown alerts.</p>
          <div className="flex gap-3">
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
            <Button
              type="button"
              onClick={() => {
                if (email.trim()) {
                  setSubmitted(true);
                  setEmail("");
                }
              }}
            >
              Join
            </Button>
          </div>
          {submitted && <p className="text-sm text-emerald-300">You’re on the pulse list.</p>}
        </div>
      </div>
    </footer>
  );
}
