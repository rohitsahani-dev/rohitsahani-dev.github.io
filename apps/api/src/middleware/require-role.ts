import type { NextFunction, Request, Response } from "express";

import type { Role } from "@prisma/client";

export function requireRole(role: Role) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.auth) {
      return response.status(401).json({ message: "Authentication required" });
    }

    if (request.auth.role !== role) {
      return response.status(403).json({ message: "Insufficient permissions" });
    }

    return next();
  };
}
