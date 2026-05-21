"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getDashboardData } from "@/lib/api";
import { updateSettings } from "@/lib/client-api";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const schema = z.object({
  name: z.string().min(2),
  preferredLanguage: z.string().min(2),
  preferredAudio: z.string().min(3),
  autoplayNext: z.boolean(),
  theaterMode: z.boolean()
});

export function SettingsClient() {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      name: data?.profile.name ?? "",
      preferredLanguage: data?.profile.preferredLanguage ?? "en",
      preferredAudio: data?.profile.preferredAudio ?? "BOTH",
      autoplayNext: data?.profile.autoplayNext ?? true,
      theaterMode: data?.profile.theaterMode ?? false
    }
  });

  if (!data) {
    return null;
  }

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section>
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Profile Controls</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">Settings</h1>
      </section>

      <Card>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-white/65">Display name</span>
              <Input {...form.register("name")} />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/65">Preferred language</span>
              <Input {...form.register("preferredLanguage")} />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/65">Preferred audio</span>
              <Input {...form.register("preferredAudio")} />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div>
                <p className="font-semibold">Auto next episode</p>
                <p className="text-sm text-white/55">Move forward automatically when playback ends.</p>
              </div>
              <Switch checked={form.watch("autoplayNext")} onCheckedChange={(value) => form.setValue("autoplayNext", value)} />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div>
                <p className="font-semibold">Theater mode default</p>
                <p className="text-sm text-white/55">Open watch pages in wider cinematic layout.</p>
              </div>
              <Switch checked={form.watch("theaterMode")} onCheckedChange={(value) => form.setValue("theaterMode", value)} />
            </div>
          </div>

          <Button
            type="button"
            onClick={form.handleSubmit(async (values) => {
              await updateSettings(values);
            })}
          >
            Save settings
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
