"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import { z } from "zod";

import { forgotPassword, login, register, resetPassword } from "@/lib/client-api";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2)
});

const forgotSchema = z.object({
  email: z.string().email()
});

const resetSchema = z.object({
  password: z.string().min(8)
});

export function LoginClient() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "demo@kaistream.dev",
      password: "KaiStreamDemo123!"
    }
  });

  return (
    <AuthShell title="Login" subtitle="Sign in to resume progress, sync favorites, and unlock your personal feed.">
      <label className="space-y-2">
        <span className="text-sm text-white/65">Email</span>
        <Input {...form.register("email")} />
      </label>
      <label className="space-y-2">
        <span className="text-sm text-white/65">Password</span>
        <Input type="password" {...form.register("password")} />
      </label>
      <Button
        type="button"
        onClick={form.handleSubmit(async (values) => {
          await login(values);
          router.push("/dashboard");
        })}
      >
        Sign In
      </Button>
      <div className="flex items-center justify-between text-sm text-white/60">
        <Link href="/forgot-password">Forgot password?</Link>
        <Link href="/register">Create account</Link>
      </div>
    </AuthShell>
  );
}

export function RegisterClient() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  return (
    <AuthShell title="Register" subtitle="Create your KaiStream profile and start tracking every episode in sync.">
      <label className="space-y-2">
        <span className="text-sm text-white/65">Name</span>
        <Input {...form.register("name")} />
      </label>
      <label className="space-y-2">
        <span className="text-sm text-white/65">Email</span>
        <Input {...form.register("email")} />
      </label>
      <label className="space-y-2">
        <span className="text-sm text-white/65">Password</span>
        <Input type="password" {...form.register("password")} />
      </label>
      <Button
        type="button"
        onClick={form.handleSubmit(async (values) => {
          await register(values);
          router.push("/dashboard");
        })}
      >
        Create Account
      </Button>
      <p className="text-sm text-white/60">
        Already have an account? <Link href="/login">Login here</Link>
      </p>
    </AuthShell>
  );
}

export function ForgotPasswordClient() {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema)
  });
  const router = useRouter();

  return (
    <AuthShell title="Reset Access" subtitle="Generate a secure reset link for your KaiStream account.">
      <label className="space-y-2">
        <span className="text-sm text-white/65">Email</span>
        <Input {...form.register("email")} />
      </label>
      <Button
        type="button"
        onClick={form.handleSubmit(async (values) => {
          const result = await forgotPassword(values);
          if (result.resetLink) {
            router.push(result.resetLink.replace(/^https?:\/\/[^/]+/, ""));
          }
        })}
      >
        Send Reset Link
      </Button>
    </AuthShell>
  );
}

export function ResetPasswordClient() {
  const params = useSearchParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema)
  });

  return (
    <AuthShell title="Set New Password" subtitle="Finish the reset and get back to your watch queue.">
      <label className="space-y-2">
        <span className="text-sm text-white/65">New password</span>
        <Input type="password" {...form.register("password")} />
      </label>
      <Button
        type="button"
        onClick={form.handleSubmit(async (values) => {
          await resetPassword({
            token: params.get("token") ?? "",
            password: values.password
          });
          router.push("/login");
        })}
      >
        Update Password
      </Button>
    </AuthShell>
  );
}

function AuthShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <PageShell className="section-shell flex min-h-[70vh] items-center justify-center pb-16">
      <Card className="w-full max-w-xl">
        <CardContent className="space-y-6 p-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">KaiStream Account</p>
            <h1 className="font-display text-4xl font-semibold">{title}</h1>
            <p className="text-white/60">{subtitle}</p>
          </div>
          <div className="space-y-4">{children}</div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
