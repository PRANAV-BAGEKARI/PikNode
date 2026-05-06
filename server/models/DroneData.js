/**
 * Drone-Link — UAV Telemetry Data Model
 * ========================================
 * Mongoose schema for storing real-time and historical drone telemetry.
 * Each document represents a telemetry snapshot from a UAV unit.
 *
 * Built to be compatible with MAVLink telemetry protocol fields.
 */

import mongoose from "mongoose";

// Drone operational status states
const DRONE_STATUS = [
  "idle",
  "pre-flight",
  "in-flight",
  "returning",
  "charging",
  "maintenance",
  "offline",
  "emergency",
];

// Mission types the drone can execute
const MISSION_TYPES = [
  "crop_survey",
  "pesticide_spray",
  "irrigation_check",
  "soil_sampling",
  "boundary_mapping",
  "idle",
];

const CoordinatesSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true, min: -90, max: 90 },
    lng: { type: Number, required: true, min: -180, max: 180 },
    altitudeMeters: { type: Number, default: 0 },
  },
  { _id: false }
);

const DroneDataSchema = new mongoose.Schema(
  {
    // ── Unit Identification ───────────────────────────────────────
    droneId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      // Convention: "PKN-001", "PKN-002" etc.
      match: [/^PKN-\d{3}$/, "droneId must follow the pattern PKN-XXX"],
    },

    droneName: {
      type: String,
      default: "",
      trim: true,
      // Human-readable name assigned by the farm operator
    },

    // ── Power System ──────────────────────────────────────────────
    batteryPercent: {
      type: Number,
      required: true,
      min: [0, "Battery cannot be below 0%."],
      max: [100, "Battery cannot exceed 100%."],
    },

    batteryVoltage: {
      type: Number,
      default: null,
      // Stored in Volts — useful for LiPo cell health diagnostics
    },

    // ── Position & Navigation ─────────────────────────────────────
    currentCoordinates: {
      type: CoordinatesSchema,
      required: true,
    },

    homeCoordinates: {
      type: CoordinatesSchema,
      default: null,
      // The launch/return point (farm origin)
    },

    headingDegrees: {
      type: Number,
      min: 0,
      max: 359,
      default: 0,
    },

    speedMps: {
      type: Number,
      default: 0,
      min: 0,
      // Speed in meters/second
    },

    // ── Operational State ─────────────────────────────────────────
    status: {
      type: String,
      enum: DRONE_STATUS,
      required: true,
      default: "idle",
      index: true,
    },

    missionType: {
      type: String,
      enum: MISSION_TYPES,
      default: "idle",
    },

    // Estimated time remaining for current mission (minutes)
    missionEtaMinutes: {
      type: Number,
      default: null,
    },

    // ── Environmental Sensors ─────────────────────────────────────
    // TODO (GSSoC Contributor): Expand this sub-document to store
    //   multispectral camera readings (NDVI, EVI indices) for crop
    //   health heatmap generation. Connect to the Drone-Link map view.
    sensorReadings: {
      ndvi: { type: Number, default: null, min: -1, max: 1 },
      temperatureCelsius: { type: Number, default: null },
      humidityPercent: { type: Number, default: null, min: 0, max: 100 },
      soilMoisturePercent: { type: Number, default: null, min: 0, max: 100 },
    },

    // ── Coverage & Progress ───────────────────────────────────────
    areaCoveredHectares: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalFieldHectares: {
      type: Number,
      default: null,
    },

    // ── Connectivity ──────────────────────────────────────────────
    signalStrengthDbm: {
      type: Number,
      default: null,
      // Typical range: -50 (excellent) to -120 (critical)
    },

    lastPingAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // Assigned farm / field reference
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      default: null,
      // TODO (GSSoC Contributor): Create a `Farm` model with geospatial
      //   field boundary data (GeoJSON) and link drones to specific farms.
      //   This enables multi-farm fleet management for FPOs.
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtuals ──────────────────────────────────────────────────────

DroneDataSchema.virtual("batteryStatus").get(function () {
  if (this.batteryPercent >= 60) return "healthy";
  if (this.batteryPercent >= 30) return "moderate";
  if (this.batteryPercent >= 15) return "low";
  return "critical";
});

DroneDataSchema.virtual("coveragePercent").get(function () {
  if (!this.totalFieldHectares || this.totalFieldHectares === 0) return 0;
  return Math.min(
    100,
    Math.round((this.areaCoveredHectares / this.totalFieldHectares) * 100)
  );
});

// ── Indexes ───────────────────────────────────────────────────────
DroneDataSchema.index({ droneId: 1, lastPingAt: -1 });
DroneDataSchema.index({ "currentCoordinates.lat": 1, "currentCoordinates.lng": 1 });

const DroneData = mongoose.model("DroneData", DroneDataSchema);

export default DroneData;