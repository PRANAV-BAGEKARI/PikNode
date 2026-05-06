/**
 * PikNode — Agri-Tech Platform for Maharashtra Farmers
 * ======================================================
 * Main Express server entry point.
 *
 * Project Admin: GSSoC 2026 — PikNode
 * Modules: Maitra (AI Voice), Ritu-Raksha (Weather), Drone-Link (UAV)
 */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// --- Route Imports ---
import weatherRoutes from "./routes/weather.js";
import maitraRoutes from "./routes/maitra.js";
import droneRoutes from "./routes/drone.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/piknode";

// ─────────────────────────────────────────────
//  MIDDLEWARE
// ─────────────────────────────────────────────

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logger (lightweight — replace with Morgan in production)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─────────────────────────────────────────────
//  MONGODB CONNECTION
// ─────────────────────────────────────────────

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅  MongoDB connected — PikNode database ready.");
    // TODO (GSSoC Contributor): Add mongoose connection event listeners for
    //   'disconnected' and 'error' to trigger alerts or auto-reconnect logic.
    //   Consider integrating a health-check ping to MongoDB Atlas on startup.
  })
  .catch((err) => {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ─────────────────────────────────────────────
//  API ROUTES
// ─────────────────────────────────────────────

app.use("/api/weather", weatherRoutes);
app.use("/api/maitra", maitraRoutes);
app.use("/api/drone", droneRoutes);

// Health-check endpoint — useful for uptime monitors & CI pipelines
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    project: "PikNode",
    version: "1.0.0-alpha",
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// ─────────────────────────────────────────────
//  GLOBAL ERROR HANDLER
// ─────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("💥  Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    // TODO (GSSoC Contributor): Integrate a proper error-tracking service
    //   (e.g., Sentry) here. In production, never expose stack traces. Add
    //   different logging levels (warn, error) with a library like Winston.
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ─────────────────────────────────────────────
//  SERVER START
// ─────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`🚀  PikNode server running on http://localhost:${PORT}`);
  console.log(`📡  Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;