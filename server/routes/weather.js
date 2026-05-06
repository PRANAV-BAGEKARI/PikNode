/**
 * Ritu-Raksha — Weather Alert Routes
 * =====================================
 * GET  /api/weather         → All active alerts (paginated)
 * GET  /api/weather/:id     → Single alert detail
 * POST /api/weather         → Create new alert (admin only, future)
 *
 * Currently returns rich mock data so the frontend
 * works end-to-end without a live IMD API key.
 */

import express from "express";
import WeatherAlert from "../models/WeatherAlert.js";

const router = express.Router();

// ─────────────────────────────────────────────
//  MOCK SEED DATA
//  (Realistic Maharashtra agri-weather alerts)
// ─────────────────────────────────────────────

const MOCK_ALERTS = [
  {
    _id: "alert_001",
    title: "Heavy Rainfall Warning — Konkan Coast",
    alertType: "unseasonal_rain",
    severity: "high",
    descriptionEn:
      "IMD predicts 120–150mm of rainfall over the next 48 hours across coastal Maharashtra. Farmers in low-lying areas should prepare for waterlogging.",
    descriptionMr:
      "पुढील ४८ तासांत कोकण किनारपट्टीवर १२०–१५० मिमी पाऊस अपेक्षित आहे.",
    affectedDistricts: ["Ratnagiri", "Raigad", "Sindhudurg", "Thane"],
    affectedCrops: ["Rice", "Mango", "Cashew"],
    validFrom: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 45 * 60 * 60 * 1000).toISOString(),
    mitigationTips: [
      "Ensure field drainage channels are clear of debris before rain onset.",
      "Avoid pesticide spraying 24 hours before predicted rainfall.",
      "Move harvested produce to covered storage immediately.",
      "Check bunds and embankments around paddy fields for breaches.",
    ],
    source: "IMD",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "alert_002",
    title: "Heatwave Advisory — Vidarbha Region",
    alertType: "heatwave",
    severity: "critical",
    descriptionEn:
      "Maximum temperatures are expected to reach 44–46°C in Vidarbha. Cotton and soybean crops are at high risk of thermal stress during flowering stage.",
    descriptionMr:
      "विदर्भात तापमान ४४–४६°C पर्यंत पोहोचण्याची शक्यता आहे.",
    affectedDistricts: ["Nagpur", "Amravati", "Yavatmal", "Wardha", "Akola"],
    affectedCrops: ["Cotton", "Soybean", "Orange"],
    validFrom: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    mitigationTips: [
      "Schedule irrigation in early morning (5–7 AM) to reduce evapotranspiration loss.",
      "Apply kaolin clay spray on cotton to reduce leaf surface temperature.",
      "Avoid field work between 12 PM and 4 PM.",
      "Mulch around plant bases to retain soil moisture.",
    ],
    source: "IMD",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "alert_003",
    title: "Pest Outbreak Risk — Whitefly on Soybean",
    alertType: "pest_outbreak",
    severity: "moderate",
    descriptionEn:
      "Post-monsoon humidity levels are creating favorable conditions for whitefly and aphid outbreaks on soybean crops in Marathwada.",
    descriptionMr:
      "मराठवाड्यात सोयाबीनवर पांढरी माशी व मावा किडीचा प्रादुर्भाव होण्याची शक्यता.",
    affectedDistricts: ["Aurangabad", "Latur", "Osmanabad", "Nanded"],
    affectedCrops: ["Soybean", "Pigeonpea"],
    validFrom: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
    mitigationTips: [
      "Install yellow sticky traps at 5 per acre to monitor whitefly population.",
      "Spray neem-based biopesticide (Azadirachtin 0.03%) as a first line of defense.",
      "Monitor leaf undersides daily for egg clusters during morning hours.",
    ],
    source: "ICAR",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

// ─────────────────────────────────────────────
//  GET /api/weather
//  Returns all active weather alerts.
//  In production: queries MongoDB with filters.
// ─────────────────────────────────────────────

router.get("/", async (req, res) => {
  try {
    const { district, severity, limit = 10, page = 1 } = req.query;

    // TODO (GSSoC Contributor): Replace the MOCK_ALERTS array with a real
    //   MongoDB query using the WeatherAlert model. Implement filtering by
    //   `district` (use $in on affectedDistricts) and `severity`. Add
    //   pagination using .skip() and .limit(). Example:
    //
    //   const query = { isActive: true };
    //   if (district) query.affectedDistricts = { $in: [district] };
    //   if (severity) query.severity = severity;
    //   const alerts = await WeatherAlert.find(query)
    //     .sort({ createdAt: -1 })
    //     .skip((page - 1) * limit)
    //     .limit(Number(limit));

    // --- MOCK RESPONSE (remove once DB integration is complete) ---
    let filtered = [...MOCK_ALERTS];
    if (district) {
      filtered = filtered.filter((a) =>
        a.affectedDistricts.some((d) =>
          d.toLowerCase().includes(district.toLowerCase())
        )
      );
    }
    if (severity) {
      filtered = filtered.filter((a) => a.severity === severity);
    }

    res.json({
      success: true,
      count: filtered.length,
      page: Number(page),
      data: filtered,
      meta: {
        source: "mock", // Change to "mongodb" when live
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("[Ritu-Raksha] GET /api/weather error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch weather alerts." });
  }
});

// ─────────────────────────────────────────────
//  GET /api/weather/:id
// ─────────────────────────────────────────────

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const alert = MOCK_ALERTS.find((a) => a._id === id);

    if (!alert) {
      return res.status(404).json({ success: false, message: "Alert not found." });
    }

    res.json({ success: true, data: alert });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch alert." });
  }
});

export default router;