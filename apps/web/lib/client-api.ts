import { patchJson, postJson } from "./api";

export function requestAuthMe() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api"}/auth/me`, {
    credentials: "include"
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error("Unauthenticated");
    }

    return response.json();
  });
}

export function login(body: { email: string; password: string }) {
  return postJson("/auth/login", body);
}

export function register(body: { name: string; email: string; password: string }) {
  return postJson("/auth/register", body);
}

export function forgotPassword(body: { email: string }) {
  return postJson<{ message: string; resetLink?: string }>("/auth/forgot-password", body);
}

export function resetPassword(body: { token: string; password: string }) {
  return postJson<{ message: string }>("/auth/reset-password", body);
}

export function updateSettings(body: {
  name?: string;
  preferredLanguage?: string;
  preferredAudio?: string;
  autoplayNext?: boolean;
  theaterMode?: boolean;
}) {
  return patchJson("/user/settings", body);
}
