import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell className="section-shell flex min-h-[70vh] items-center justify-center pb-16">
      <div className="max-w-2xl rounded-[36px] border border-white/10 bg-white/[0.04] p-10 text-center shadow-card backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">404 Signal Lost</p>
        <h1 className="mt-4 font-display text-6xl font-semibold">Page Drifted Off Orbit</h1>
        <p className="mt-4 text-base leading-8 text-white/62">
          The route you requested does not exist in KaiStream’s map. Jump back into discovery and keep the binge alive.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
