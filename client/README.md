# 🌱 PikNode — Agri-Tech Platform for Maharashtra Farmers

> **GSSoC 2026 Project** | Helping farmers reduce crop yield losses through AI, weather intelligence, and drone monitoring.

[![GSSoC 2026](https://img.shields.io/badge/GSSoC-2026-green?style=flat-square)](https://gssoc.girlscript.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev)

---

## 📦 Core Modules

| Module | Description | Status |
|--------|-------------|--------|
| 🎙️ **Maitra** | AI-powered voice & chat assistant for farmers | MVP (mock LLM) |
| ⛈️ **Ritu-Raksha** | Predictive weather alerts & environmental risk | MVP (mock data) |
| 🚁 **Drone-Link** | UAV telemetry & crop health monitoring | MVP (mock data) |

---

## 🏗️ Project Structure

```
piknode/
├── server/                     # Node.js + Express Backend
│   ├── server.js               # Entry point, CORS, MongoDB
│   ├── models/
│   │   ├── WeatherAlert.js     # Ritu-Raksha Mongoose schema
│   │   └── DroneData.js        # Drone-Link Mongoose schema
│   ├── routes/
│   │   ├── weather.js          # GET /api/weather
│   │   ├── maitra.js           # POST /api/maitra
│   │   └── drone.js            # GET /api/drone
│   ├── .env.example
│   └── package.json
│
└── client/                     # React + Vite Frontend
    ├── src/
    │   ├── main.jsx            # React Router entry
    │   ├── index.css           # Global styles + Tailwind
    │   ├── services/
    │   │   └── api.js          # Axios instance + endpoint wrappers
    │   ├── components/
    │   │   ├── DashboardLayout.jsx   # Sidebar shell
    │   │   ├── MaitraWidget.jsx      # AI chat component
    │   │   ├── WeatherAlerts.jsx     # Alert cards component
    │   │   └── DroneStatus.jsx       # UAV telemetry component
    │   └── pages/
    │       └── Dashboard.jsx         # Bento-box overview
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or [Atlas free tier](https://www.mongodb.com/atlas))

### 1. Clone & Install

```bash
git clone https://github.com/piknode/piknode.git
cd piknode

# Backend
cd server
npm install
cp .env.example .env     # Fill in your MongoDB URI

# Frontend
cd ../client
npm install
```

### 2. Run Development Servers

```bash
# Terminal 1 — Backend
cd server && npm run dev
# → http://localhost:5000

# Terminal 2 — Frontend
cd client && npm run dev
# → http://localhost:5173
```

### 3. Verify it's working

```bash
curl http://localhost:5000/api/health
# Should return: { "status": "ok", "db": "connected" }

curl http://localhost:5000/api/weather
# Should return: mock Maharashtra weather alerts

curl -X POST http://localhost:5000/api/maitra \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What pests affect soybean in Marathwada?"}'
# Should return: Maitra mock AI response
```

---

## 🎯 Good First Issues — GSSoC Contributors

All `// TODO (GSSoC Contributor):` tags in the codebase represent scoped, actionable issues. Here's a summary:

| # | File | Task | Difficulty |
|---|------|------|------------|
| 1 | `server/server.js` | Add Mongoose connection event listeners + Sentry error tracking | 🟢 Beginner |
| 2 | `server/models/WeatherAlert.js` | Add `descriptionHi` field + wire i18next on frontend | 🟡 Intermediate |
| 3 | `server/models/DroneData.js` | Create `Farm` model with GeoJSON boundaries | 🟡 Intermediate |
| 4 | `server/routes/weather.js` | Replace mock data with real MongoDB query + pagination | 🟢 Beginner |
| 5 | `server/routes/maitra.js` | Integrate OpenAI/Gemini/Ollama LLM API | 🔴 Advanced |
| 6 | `server/routes/maitra.js` | Build `MaitraSession` model for conversation persistence | 🟡 Intermediate |
| 7 | `client/src/services/api.js` | Implement JWT auth interceptor + token refresh | 🟡 Intermediate |
| 8 | `client/src/components/MaitraWidget.jsx` | Implement Web Speech API for voice input (Marathi support) | 🔴 Advanced |
| 9 | `client/src/components/WeatherAlerts.jsx` | Replace polling with WebSocket / SSE for real-time alerts | 🔴 Advanced |
| 10 | `client/src/components/DroneStatus.jsx` | Add React-Leaflet map view with NDVI heatmap overlay | 🔴 Advanced |
| 11 | `client/src/components/DashboardLayout.jsx` | Add user avatar/dropdown with auth state | 🟢 Beginner |
| 12 | `client/src/pages/Dashboard.jsx` | Integrate Panchang API for agricultural calendar data | 🟡 Intermediate |

> 💡 **New contributor?** Start with issues marked 🟢. Comment on the GitHub issue before starting work.

---

## 🛠️ Tech Stack

**Backend:** Node.js · Express · MongoDB · Mongoose  
**Frontend:** React 18 · Vite · Tailwind CSS · Framer Motion · Lucide React · Axios  
**Design:** Custom Agri-Tech palette (WCAG AA accessible) · Outfit + DM Sans fonts  
**Planned:** Socket.io · OpenAI / Gemini · React-Leaflet · i18next · JWT Auth

---

## 🌐 API Reference

### `GET /api/health`
Server & database health check.

### `GET /api/weather`
Returns active weather alerts. Query params: `district`, `severity`, `page`, `limit`.

### `POST /api/maitra`
```json
{
  "prompt": "string (required, max 1000 chars)",
  "language": "en | mr",
  "sessionId": "string (optional)"
}
```

### `GET /api/drone`
Returns full UAV fleet telemetry snapshot.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Commit with conventional commits: `git commit -m "feat: add X feature"`
4. Push and open a Pull Request with the issue number linked
5. Wait for review from a maintainer

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## 📄 License

MIT © PikNode — GSSoC 2026