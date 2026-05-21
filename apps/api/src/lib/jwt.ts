import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

export interface JwtPayload {
  sub: string;
  email: string;
  role: "USER" | "ADMIN";
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
