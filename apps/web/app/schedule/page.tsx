import { Clock3 } from "lucide-react";

import { getScheduleData } from "@/lib/api";
import { PageShell } from "@/components/page-shell";
import { RelativeCountdown } from "@/components/relative-countdown";

export default async function SchedulePage() {
  const schedule = await getScheduleData();

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section>
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Airing Calendar</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">Schedule</h1>
      </section>

      <div className="grid gap-5">
        {schedule.map((item) => (
          <div key={item.slug} className="grid gap-5 rounded-[30px] border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur-xl lg:grid-cols-[240px,1fr,220px] lg:items-center">
            <img src={item.bannerImage} alt={item.title} className="aspect-video w-full rounded-[24px] object-cover" />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-soft">{item.nextEpisodeLabel}</p>
              <h2 className="font-display text-3xl font-semibold">{item.title}</h2>
              <p className="max-w-2xl text-sm leading-7 text-white/62">{item.tagline}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 text-center">
              <Clock3 className="mx-auto size-6 text-accent-soft" />
              <p className="mt-4 text-sm uppercase tracking-[0.24em] text-white/45">Countdown</p>
              <p className="mt-2 font-display text-2xl font-semibold">
                <RelativeCountdown date={item.upcomingEpisodeAt!} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
