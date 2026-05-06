/**
 * PikNode — API Service Layer
 * =============================
 * Centralized Axios instance and typed endpoint wrappers.
 * All frontend components import from here — never call fetch() directly.
 *
 * Base URL: http://localhost:5000/api (dev)
 * Production URL: set VITE_API_BASE_URL in .env
 */

import axios from "axios";

// ─────────────────────────────────────────────
//  AXIOS INSTANCE CONFIGURATION
// ─────────────────────────────────────────────

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 15000, // 15s — accounts for slow rural network conditions
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// ── Request Interceptor ──────────────────────────────────────────
// Attach JWT auth token when authentication is implemented
api.interceptors.request.use(
  (config) => {
    // TODO (GSSoC Contributor): Implement JWT authentication.
    //   Retrieve the token from localStorage or a Zustand/Context auth store
    //   and attach it to every request. Example:
    //   const token = localStorage.getItem("piknode_token");
    //   if (token) config.headers.Authorization = `Bearer ${token}`;
    //   Also consider token refresh logic for expired tokens.
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // TODO (GSSoC Contributor): Handle session expiry — redirect to login page
      //   or trigger a token refresh. Clear local auth state here.
      console.warn("[PikNode API] Unauthorized — check authentication.");
    }

    if (status === 429) {
      console.warn("[PikNode API] Rate limit hit — implement exponential backoff.");
    }

    // Normalize error for consistent handling in components
    const normalizedError = {
      message: error.response?.data?.message || error.message || "Network error",
      status: status || 0,
      data: error.response?.data || null,
    };

    return Promise.reject(normalizedError);
  }
);

// ─────────────────────────────────────────────
//  RITU-RAKSHA — WEATHER API ENDPOINTS
// ─────────────────────────────────────────────

export const weatherApi = {
  /**
   * Fetch all active weather alerts.
   * @param {Object} params - Optional filters: { district, severity, page, limit }
   */
  getAlerts: (params = {}) =>
    api.get("/weather", { params }),

  /**
   * Fetch a single weather alert by ID.
   * @param {string} alertId
   */
  getAlertById: (alertId) =>
    api.get(`/weather/${alertId}`),
};

// ─────────────────────────────────────────────
//  MAITRA — AI ASSISTANT ENDPOINTS
// ─────────────────────────────────────────────

export const maitraApi = {
  /**
   * Send a farmer's prompt to Maitra AI.
   * @param {Object} payload - { prompt: string, language: string, sessionId?: string }
   */
  chat: (payload) =>
    api.post("/maitra", payload),

  /**
   * Fetch conversation history for a session.
   * @param {string} sessionId
   */
  getHistory: (sessionId) =>
    api.get("/maitra/history", { params: { sessionId } }),
};

// ─────────────────────────────────────────────
//  DRONE-LINK — UAV TELEMETRY ENDPOINTS
// ─────────────────────────────────────────────

export const droneApi = {
  /**
   * Fetch the full drone fleet status.
   */
  getFleet: () =>
    api.get("/drone"),

  /**
   * Fetch telemetry for a specific drone.
   * @param {string} droneId - e.g., "PKN-001"
   */
  getDrone: (droneId) =>
    api.get(`/drone/${droneId}`),
};

// ─────────────────────────────────────────────
//  SYSTEM ENDPOINTS
// ─────────────────────────────────────────────

export const systemApi = {
  healthCheck: () => api.get("/health"),
};

export default api;