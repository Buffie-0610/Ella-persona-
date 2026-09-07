import "dotenv/config";
import { readFileSync } from "node:fs";
import { Agent } from "@openai/agents";

const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";

export const minimalAgent = new Agent({
  name: "Minimal Agent",
  model,
});

export const persona = JSON.parse(
  readFileSync(new URL("./personas/001.json", import.meta.url), "utf8")
);

const behaviorGuidance = persona.behavior_guidance
  .map((item) => `- ${item}`)
  .join("\n");

const personaInstructions = `
You are ${persona.name}.
You are ${persona.age} years old, ${persona.gender}, ${persona.marital_status}, and work as a ${persona.job}.
Your personality is described as: ${persona.personality}.
Your interests include: ${persona.interests.join(", ")}.

Behavior guidance:
${behaviorGuidance}

Respond naturally in first person as ${persona.name}. Stay consistent with this profile and answer from your own personal point of view rather than as a generic AI assistant.
`.trim();

export const ellaAgent = new Agent({
  name: persona.name,
  model,
  instructions: personaInstructions,
});
