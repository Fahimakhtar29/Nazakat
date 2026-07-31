import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Scent Advisor & Natural Language Fragrance Search API
app.post("/api/ai/scent-advisor", async (req, res) => {
  try {
    const { prompt, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is missing. Please ensure GEMINI_API_KEY is configured in Secrets.",
      });
    }

    const systemInstruction = `You are the Head Sommelier & Olfactory Master of MAISON DE L'ÉLIXIR (haute parfumerie luxury fragrance house).
You provide ultra-sophisticated, poetic yet highly precise advice on fragrance selection, notes layering, sillage, occasion pairing, and bespoke scent matching.
Your language should feel opulent, majestic, refined, and deeply knowledgeable about Cambodian Oud, Grasse Rose, Mysore Sandalwood, Iris Butter, Ambergris, and rare artisanal attars.

Respond in structured JSON format matching this schema:
{
  "recommendationTitle": "string",
  "poeticAnalysis": "string (a lavish 2-3 sentence description of why this scent profile fits the request)",
  "recommendedNotes": ["string", "string"],
  "fragranceFamily": "string",
  "layeringSuggestion": {
    "base": "string",
    "accent": "string",
    "effect": "string"
  },
  "suggestedProducts": ["Oud Impérial", "Royal Amber Solace", "Santal Impérial", "Velvet Rose Nocturne", "Citrus Nectar Royal"],
  "masterTip": "string"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Client query: "${prompt}". Context/Event/Mood: "${context || 'General Consultation'}". Provide a luxury haute parfumerie consultation.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json({ success: true, advice: data });
  } catch (error: any) {
    console.error("Error in AI Scent Advisor:", error);
    return res.status(500).json({
      error: "Failed to generate AI scent consultation",
      details: error.message || String(error),
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ MAISON DE L'ÉLIXIR Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
