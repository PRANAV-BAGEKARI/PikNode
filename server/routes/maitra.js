/**
 * Maitra — AI Agricultural Voice Assistant Routes
 * ==================================================
 * POST /api/maitra         → Process a farmer's query, return AI advisory
 * GET  /api/maitra/history → Fetch conversation history (future feature)
 *
 * "Maitra" = Friend/Companion (Sanskrit) — an AI guide for farmers.
 *
 * LLM Integration Status: SCAFFOLDED (mock responses active)
 * Ready for: OpenAI GPT-4o, Google Gemini, or local Ollama integration.
 */

import express from "express";

const router = express.Router();

// ─────────────────────────────────────────────
//  AGRI KNOWLEDGE SYSTEM PROMPT
//  This is the personality and knowledge scope
//  injected into the LLM on every request.
// ─────────────────────────────────────────────

const MAITRA_SYSTEM_PROMPT = `
You are Maitra, an expert AI agricultural advisor for farmers in Maharashtra, India.
You specialize in Kharif and Rabi crops common to the Deccan Plateau and Konkan region,
including Soybean, Cotton, Sugarcane, Jowar, Bajra, Wheat, Onion, and Grapes.

Your communication style:
- Always respond in the same language the farmer uses (Marathi or English).
- Keep advice practical, actionable, and grounded in Indian agricultural science.
- Cite local best practices from ICAR, KVK (Krishi Vigyan Kendra), and IMD data.
- When uncertain, recommend visiting the nearest KVK center.
- Never recommend pesticides without mentioning PHI (Pre-Harvest Interval).
- Always consider the current season (Kharif: June–Oct, Rabi: Oct–March, Zaid: March–June).

Response format: Concise paragraphs. Bullet points for step-by-step advice.
Maximum response length: 300 words.
`;

// ─────────────────────────────────────────────
//  MOCK AI RESPONSES
//  Keyed by intent keywords for realistic demo.
//  Remove this block when LLM is integrated.
// ─────────────────────────────────────────────

const MOCK_RESPONSES = {
  pest: {
    intent: "pest_management",
    response:
      "मावा किंवा पांढरी माशीसाठी (Whitefly/Aphid): प्रथम निम अर्काचा (Azadirachtin 0.03%) फवारा करा. जर प्रादुर्भाव जास्त असेल तर Imidacloprid 17.8% SL (0.3 ml/liter) वापरा — पण फुलोऱ्याच्या वेळी टाळा. पिवळे चिकट सापळे एकरी 5 लावा.",
    confidence: 0.87,
    sources: ["ICAR Crop Protection Manual", "KVK Pune Advisory 2024"],
  },
  weather: {
    intent: "weather_query",
    response:
      "Based on IMD's latest data for your region, light to moderate rainfall (40–60mm) is expected over the next 3 days. Postpone any top-dressing fertilizer application until after the rain. Ensure your field bunds are intact to prevent nutrient runoff. Check the Ritu-Raksha panel for district-specific alerts.",
    confidence: 0.92,
    sources: ["IMD Pune Regional Center", "Ritu-Raksha Module"],
  },
  sowing: {
    intent: "sowing_advice",
    response:
      "Soybean sowing in Marathwada is best done when: (1) Cumulative rainfall has crossed 100mm, (2) Soil temperature is 25–30°C, (3) Minimum 2 consecutive rainy days are recorded. Use certified MAUS-71 or JS-335 seed varieties. Seed treatment with Rhizobium + PSB + Trichoderma (5g each per kg seed) is highly recommended before sowing.",
    confidence: 0.89,
    sources: ["MAFSU Soybean Cultivation Guide", "KVK Latur 2024 Advisory"],
  },
  default: {
    intent: "general_advisory",
    response:
      "Namaskar! I am Maitra, your AI farming assistant. I can help you with crop management, pest control, weather interpretation, market prices, and government scheme information. Please describe your crop, district, and the specific problem you're facing for precise advice.",
    confidence: 1.0,
    sources: [],
  },
};

// Simple keyword-based intent router for mock responses
function getMockResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  if (/(pest|aphid|insect|bug|whitefly|माशी|किडी|मावा)/.test(lowerPrompt)) {
    return MOCK_RESPONSES.pest;
  }
  if (/(weather|rain|monsoon|पाऊस|हवामान|flood|drought)/.test(lowerPrompt)) {
    return MOCK_RESPONSES.weather;
  }
  if (/(sow|planting|seed|पेरणी|बियाणे|crop start)/.test(lowerPrompt)) {
    return MOCK_RESPONSES.sowing;
  }
  return MOCK_RESPONSES.default;
}

// ─────────────────────────────────────────────
//  POST /api/maitra
//  Main conversational endpoint.
// ─────────────────────────────────────────────

router.post("/", async (req, res) => {
  try {
    const { prompt, language = "en", sessionId, conversationHistory = [] } = req.body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "A non-empty `prompt` string is required in the request body.",
      });
    }

    if (prompt.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Prompt exceeds maximum length of 1000 characters.",
      });
    }

    // ── LLM Integration Point ──────────────────────────────────────
    // TODO (GSSoC Contributor): Replace the mock response block below
    //   with a real LLM API call. The scaffolding is ready — just add
    //   your API key to .env and implement one of these options:
    //
    //   OPTION A — OpenAI GPT-4o:
    //   import OpenAI from "openai";
    //   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    //   const completion = await openai.chat.completions.create({
    //     model: "gpt-4o",
    //     messages: [
    //       { role: "system", content: MAITRA_SYSTEM_PROMPT },
    //       ...conversationHistory,
    //       { role: "user", content: prompt }
    //     ],
    //     max_tokens: 400,
    //     temperature: 0.7,
    //   });
    //   const aiText = completion.choices[0].message.content;
    //
    //   OPTION B — Google Gemini 1.5 Pro:
    //   Use @google/generative-ai SDK with the system prompt above.
    //
    //   OPTION C — Local Ollama (llama3, mistral):
    //   POST to http://localhost:11434/api/chat with model: "llama3"
    //   Great for offline/rural deployment scenarios.
    //
    //   After integrating, remove MOCK_RESPONSES and getMockResponse().

    // --- MOCK RESPONSE (active until LLM is integrated) ---
    const mockData = getMockResponse(prompt.trim());

    // Simulate network latency for realistic frontend UX development
    await new Promise((resolve) => setTimeout(resolve, 600));

    res.json({
      success: true,
      data: {
        sessionId: sessionId || `session_${Date.now()}`,
        userPrompt: prompt.trim(),
        language,
        intent: mockData.intent,
        response: mockData.response,
        confidence: mockData.confidence,
        sources: mockData.sources,
        responseMode: "mock", // Change to "llm" when integrated
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("[Maitra] POST /api/maitra error:", error);
    res.status(500).json({
      success: false,
      message: "Maitra is currently unavailable. Please try again.",
    });
  }
});

// ─────────────────────────────────────────────
//  GET /api/maitra/history
//  Future: Retrieve past conversations by sessionId
// ─────────────────────────────────────────────

router.get("/history", async (req, res) => {
  // TODO (GSSoC Contributor): Implement conversation persistence using a
  //   `MaitraSession` MongoDB model. Store messages keyed by sessionId
  //   (or userId once auth is implemented). This enables farmers to
  //   review past AI advice and enables model fine-tuning on agri queries.
  res.json({
    success: true,
    message: "Conversation history endpoint — implementation pending.",
    data: [],
  });
});

export default router;