import { randomBytes } from "node:crypto";

import { DubStatus, Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";

import { env, isProduction } from "../config/env.js";
import { signToken } from "../lib/jwt.js";
import { prisma } from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { initials } from "../utils/text.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const forgotSchema = z.object({
  email: z.string().email()
});

const resetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8)
});

function authCookie(token: string) {
  return {
    name: "kaistream_token",
    value: token,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  };
}

authRouter.post("/register", async (request, response) => {
  const input = registerSchema.parse(request.body);

  const existing = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() }
  });

  if (existing) {
    return response.status(409).json({ message: "An account already exists for this email" });
  }

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      passwordHash: await hashPassword(input.password),
      avatar: initials(input.name),
      role: Role.USER,
      preferredAudio: DubStatus.BOTH
    }
  });

  const token = signToken({
    sub: user.id,
    email: user.email,
    role: user.role
  });

  const cookie = authCookie(token);
  response.cookie(cookie.name, cookie.value, cookie.options);

  return response.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role
    }
  });
});

authRouter.post("/login", async (request, response) => {
  const input = loginSchema.parse(request.body);

  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() }
  });

  if (!user?.passwordHash) {
    return response.status(401).json({ message: "Invalid email or password" });
  }

  const passwordMatches = await verifyPassword(input.password, user.passwordHash);

  if (!passwordMatches) {
    return response.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken({
    sub: user.id,
    email: user.email,
    role: user.role
  });

  const cookie = authCookie(token);
  response.cookie(cookie.name, cookie.value, cookie.options);

  return response.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role
    }
  });
});

authRouter.post("/logout", (_request, response) => {
  response.clearCookie("kaistream_token");
  response.status(204).send();
});

authRouter.get("/me", requireAuth, async (request, response) => {
  const user = await prisma.user.findUnique({
    where: { id: request.auth!.sub },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      preferredLanguage: true,
      preferredAudio: true,
      autoplayNext: true,
      theaterMode: true
    }
  });

  return response.json(user);
});

authRouter.post("/forgot-password", async (request, response) => {
  const input = forgotSchema.parse(request.body);

  const user = await prisma.user.findUnique({
    where: {
      email: input.email.toLowerCase()
    }
  });

  if (!user) {
    return response.json({
      message: "If that account exists, a reset link has been generated."
    });
  }

  const token = randomBytes(24).toString("hex");

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30)
    }
  });

  const resetLink = `${env.APP_URL}/reset-password?token=${token}`;

  return response.json({
    message: "If that account exists, a reset link has been generated.",
    resetLink: isProduction ? undefined : resetLink
  });
});

authRouter.post("/reset-password", async (request, response) => {
  const input = resetSchema.parse(request.body);

  const tokenRecord = await prisma.passwordResetToken.findUnique({
    where: { token: input.token },
    include: { user: true }
  });

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return response.status(400).json({ message: "Reset token is invalid or expired" });
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: tokenRecord.userId },
      data: {
        passwordHash: await hashPassword(input.password)
      }
    }),
    prisma.passwordResetToken.delete({
      where: { id: tokenRecord.id }
    })
  ]);

  return response.json({
    message: "Password updated successfully"
  });
});

authRouter.get("/google/url", (_request, response) => {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    return response.status(400).json({
      message: "Google OAuth is not configured"
    });
  }

  const query = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: env.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent"
  });

  return response.json({
    url: `https://accounts.google.com/o/oauth2/v2/auth?${query.toString()}`
  });
});

authRouter.get("/google/callback", async (request, response) => {
  const code = z.string().parse(request.query.code);

  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    return response.redirect(`${env.APP_URL}/login?error=oauth_not_configured`);
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code"
    })
  });

  if (!tokenResponse.ok) {
    return response.redirect(`${env.APP_URL}/login?error=oauth_exchange_failed`);
  }

  const tokenPayload = (await tokenResponse.json()) as { access_token: string };
  const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenPayload.access_token}`
    }
  });

  const profile = (await profileResponse.json()) as {
    id: string;
    email: string;
    name: string;
    verified_email: boolean;
  };

  const user = await prisma.user.upsert({
    where: { email: profile.email.toLowerCase() },
    create: {
      email: profile.email.toLowerCase(),
      name: profile.name,
      avatar: initials(profile.name),
      googleId: profile.id,
      emailVerified: profile.verified_email
    },
    update: {
      googleId: profile.id,
      name: profile.name,
      emailVerified: profile.verified_email
    }
  });

  const token = signToken({
    sub: user.id,
    email: user.email,
    role: user.role
  });

  const cookie = authCookie(token);
  response.cookie(cookie.name, cookie.value, cookie.options);

  return response.redirect(`${env.APP_URL}/dashboard?auth=success`);
});
