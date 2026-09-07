import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { run } from "@openai/agents";
import { ellaAgent, persona } from "./agent.js";

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY.");
  console.error("Create a local .env file and add your OpenAI API key.");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");

app.use(express.json());
app.use(express.static(publicDir));

app.get("/api/persona", (_req, res) => {
  const { behavior_guidance, ...publicPersona } = persona;
  res.json(publicPersona);
});

app.post("/api/chat", async (req, res) => {
  const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";

  if (!prompt) {
    return res.status(400).json({ error: "Prompt cannot be empty." });
  }

  try {
    const result = await run(ellaAgent, prompt);
    return res.json({ response: result.finalOutput });
  } catch (error) {
    console.error("Agent run failed:", error);
    return res.status(500).json({ error: "Agent request failed." });
  }
});

app.listen(port, () => {
  console.log(`AI Persona web service running at http://localhost:${port}`);
});
