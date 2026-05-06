/**
 * Ritu-Raksha — Weather Alert Model
 * ====================================
 * Mongoose schema for predictive weather alerts generated for
 * Maharashtra farming districts.
 *
 * "Ritu-Raksha" = Season Protection (Marathi/Sanskrit compound)
 */

import mongoose from "mongoose";

// Enum for alert severity — maps directly to UI badge colors in WeatherAlerts.jsx
const SEVERITY_LEVELS = ["low", "moderate", "high", "critical"];

// Enum for alert types relevant to Indian agri-meteorology
const ALERT_TYPES = [
  "cyclone",
  "drought",
  "flood",
  "hailstorm",
  "frost",
  "heatwave",
  "pest_outbreak", // Cross-module: links with Maitra advisory
  "unseasonal_rain",
];

const WeatherAlertSchema = new mongoose.Schema(
  {
    // ── Core Alert Data ──────────────────────────────────────────
    title: {
      type: String,
      required: [true, "Alert title is required."],
      trim: true,
      maxlength: [120, "Title must be under 120 characters."],
    },

    alertType: {
      type: String,
      enum: ALERT_TYPES,
      required: true,
      index: true, // Frequently queried for filtering by type
    },

    severity: {
      type: String,
      enum: SEVERITY_LEVELS,
      required: true,
      default: "moderate",
      index: true,
    },

    // Marathi description for in-app localization
    // TODO (GSSoC Contributor): Add a `descriptionHi` field for Hindi
    //   and wire up i18next on the frontend for full multi-language support.
    //   This will directly benefit non-English-speaking farmers in rural Maharashtra.
    descriptionEn: {
      type: String,
      required: true,
      maxlength: [500, "Description must be under 500 characters."],
    },
    descriptionMr: {
      type: String,
      default: "",
      maxlength: [500, "Marathi description must be under 500 characters."],
    },

    // ── Geographic Targeting ──────────────────────────────────────
    affectedDistricts: {
      type: [String],
      default: [],
      // e.g. ["Pune", "Nashik", "Ahmednagar", "Solapur"]
    },

    affectedCrops: {
      type: [String],
      default: [],
      // e.g. ["Sugarcane", "Soybean", "Cotton", "Onion"]
    },

    // ── Temporal Window ───────────────────────────────────────────
    validFrom: {
      type: Date,
      required: true,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: true,
    },

    // ── Actionable Advisory ───────────────────────────────────────
    mitigationTips: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 10,
        message: "Maximum 10 mitigation tips per alert.",
      },
    },

    // ── Data Provenance ───────────────────────────────────────────
    source: {
      type: String,
      default: "IMD", // India Meteorological Department
      // TODO (GSSoC Contributor): Extend this to support multiple weather
      //   API sources (OpenWeatherMap, Skymet, NASA POWER API for agri data).
      //   Add a `confidence` score (0–1) from ensemble model predictions.
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true, // Adds createdAt + updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtuals ──────────────────────────────────────────────────────

// Computed: Is this alert still within its valid window?
WeatherAlertSchema.virtual("isCurrentlyActive").get(function () {
  const now = new Date();
  return this.isActive && now >= this.validFrom && now <= this.validUntil;
});

// ── Indexes ───────────────────────────────────────────────────────
WeatherAlertSchema.index({ validFrom: 1, validUntil: 1 });
WeatherAlertSchema.index({ affectedDistricts: 1, severity: 1 });

const WeatherAlert = mongoose.model("WeatherAlert", WeatherAlertSchema);

export default WeatherAlert;