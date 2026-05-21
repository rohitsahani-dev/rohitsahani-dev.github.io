import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { animeRouter } from "./routes/anime.js";
import { authRouter } from "./routes/auth.js";
import { healthRouter } from "./routes/health.js";
import { userRouter } from "./routes/user.js";
import { adminRouter } from "./routes/admin.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";
import { optionalAuth } from "./middleware/auth.js";

export const app = express();

app.use(
  cors({
    origin: [env.APP_URL, "http://localhost:3000"],
    credentials: true
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(optionalAuth);
app.use(
  "/api",
  rateLimit({
    windowMs: 60_000,
    limit: 150,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/anime", animeRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use(notFoundHandler);
app.use(errorHandler);
