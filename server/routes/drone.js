/**
 * Drone-Link — UAV Telemetry Routes
 * ====================================
 * GET /api/drone        → All drones fleet status
 * GET /api/drone/:id    → Single drone telemetry snapshot
 * POST /api/drone/:id/ping → Update drone telemetry (from UAV firmware)
 */

import express from "express";
import DroneData from "../models/DroneData.js";

const router = express.Router();

// ─────────────────────────────────────────────
//  MOCK FLEET DATA
//  Represents a small farm cooperative's UAV fleet.
// ─────────────────────────────────────────────

const MOCK_FLEET = [
  {
    _id: "drone_doc_001",
    droneId: "PKN-001",
    droneName: "Bhumi-1",
    batteryPercent: 78,
    batteryVoltage: 22.1,
    currentCoordinates: { lat: 18.5204, lng: 73.8567, altitudeMeters: 45 },
    homeCoordinates: { lat: 18.5198, lng: 73.855, altitudeMeters: 0 },
    headingDegrees: 142,
    speedMps: 8.5,
    status: "in-flight",
    missionType: "crop_survey",
    missionEtaMinutes: 18,
    sensorReadings: { ndvi: 0.62, temperatureCelsius: 34, humidityPercent: 68, soilMoisturePercent: null },
    areaCoveredHectares: 3.2,
    totalFieldHectares: 8.5,
    signalStrengthDbm: -62,
    lastPingAt: new Date().toISOString(),
  },
  {
    _id: "drone_doc_002",
    droneId: "PKN-002",
    droneName: "Vayu-2",
    batteryPercent: 22,
    batteryVoltage: 19.8,
    currentCoordinates: { lat: 18.518, lng: 73.861, altitudeMeters: 0 },
    homeCoordinates: { lat: 18.518, lng: 73.861, altitudeMeters: 0 },
    headingDegrees: 0,
    speedMps: 0,
    status: "charging",
    missionType: "idle",
    missionEtaMinutes: null,
    sensorReadings: { ndvi: null, temperatureCelsius: null, humidityPercent: null, soilMoisturePercent: null },
    areaCoveredHectares: 0,
    totalFieldHectares: null,
    signalStrengthDbm: -45,
    lastPingAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    _id: "drone_doc_003",
    droneId: "PKN-003",
    droneName: "Agni-3",
    batteryPercent: 91,
    batteryVoltage: 23.8,
    currentCoordinates: { lat: 18.525, lng: 73.849, altitudeMeters: 30 },
    homeCoordinates: { lat: 18.523, lng: 73.848, altitudeMeters: 0 },
    headingDegrees: 270,
    speedMps: 5.2,
    status: "in-flight",
    missionType: "pesticide_spray",
    missionEtaMinutes: 7,
    sensorReadings: { ndvi: null, temperatureCelsius: 32, humidityPercent: 71, soilMoisturePercent: null },
    areaCoveredHectares: 1.8,
    totalFieldHectares: 2.5,
    signalStrengthDbm: -58,
    lastPingAt: new Date(Date.now() - 30 * 1000).toISOString(),
  },
];

// ─────────────────────────────────────────────
//  GET /api/drone
// ─────────────────────────────────────────────

router.get("/", async (_req, res) => {
  try {
    // TODO (GSSoC Contributor): Replace MOCK_FLEET with a live MongoDB query:
    //   const fleet = await DroneData.find({}).sort({ lastPingAt: -1 });
    //   Also implement WebSocket (Socket.io) for real-time telemetry push —
    //   polling every 5s is acceptable for MVP but WebSockets give sub-second
    //   updates needed for actual UAV flight control interfaces.

    res.json({
      success: true,
      count: MOCK_FLEET.length,
      activeCount: MOCK_FLEET.filter((d) => d.status === "in-flight").length,
      data: MOCK_FLEET,
      meta: { source: "mock", pollingIntervalMs: 5000 },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch fleet data." });
  }
});

// ─────────────────────────────────────────────
//  GET /api/drone/:id
// ─────────────────────────────────────────────

router.get("/:id", async (req, res) => {
  try {
    const drone = MOCK_FLEET.find((d) => d.droneId === req.params.id.toUpperCase());
    if (!drone) {
      return res.status(404).json({ success: false, message: `Drone ${req.params.id} not found.` });
    }
    res.json({ success: true, data: drone });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch drone data." });
  }
});

export default router;