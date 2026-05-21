import type { NextFunction, Request, Response } from "express";

import { verifyToken } from "../lib/jwt.js";

function extractToken(request: Request) {
  const authHeader = request.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return request.cookies?.kaistream_token as string | undefined;
}

export function optionalAuth(request: Request, _response: Response, next: NextFunction) {
  const token = extractToken(request);

  if (!token) {
    return next();
  }

  try {
    request.auth = verifyToken(token);
  } catch {
    request.auth = undefined;
  }

  return next();
}

export function requireAuth(request: Request, response: Response, next: NextFunction) {
  const token = extractToken(request);

  if (!token) {
    return response.status(401).json({ message: "Authentication required" });
  }

  try {
    request.auth = verifyToken(token);
    return next();
  } catch {
    return response.status(401).json({ message: "Session is invalid or expired" });
  }
}
