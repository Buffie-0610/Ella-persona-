import "dotenv/config";
import { run } from "@openai/agents";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { minimalAgent } from "../src/agent.js";

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY.");
  console.error("Create a local .env file and add your OpenAI API key.");
  process.exit(1);
}

const rl = createInterface({ input, output });

try {
  console.log("Minimal Agent (Agents SDK)");
  console.log("Enter the same prompt you used with the raw API test.\n");

  const prompt = (await rl.question("Prompt: ")).trim();

  if (!prompt) {
    console.error("Prompt cannot be empty.");
    process.exitCode = 1;
  } else {
    const result = await run(minimalAgent, prompt);

    console.log("\nAgent response:\n");
    console.log(result.finalOutput);
  }
} catch (error) {
  console.error("\nAgent run failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  rl.close();
}
