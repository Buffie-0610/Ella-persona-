import "dotenv/config";
import OpenAI from "openai";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";

if (!apiKey) {
  console.error("Missing OPENAI_API_KEY.");
  console.error("Create a local .env file and add your OpenAI API key.");
  process.exit(1);
}

const client = new OpenAI({ apiKey });
const rl = createInterface({ input, output });

try {
  console.log(`Model: ${model}`);
  console.log("Enter a prompt to send directly to the OpenAI model.\n");

  const prompt = (await rl.question("Prompt: ")).trim();

  if (!prompt) {
    console.error("Prompt cannot be empty.");
    process.exitCode = 1;
  } else {
    const response = await client.responses.create({
      model,
      input: prompt,
    });

    console.log("\nModel response:\n");
    console.log(response.output_text);
  }
} catch (error) {
  console.error("\nOpenAI API request failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  rl.close();
}
