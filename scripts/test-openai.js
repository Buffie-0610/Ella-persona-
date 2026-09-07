import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";

if (!apiKey) {
    console.error("Missing OPENAI_API_KEY.");
    console.error("Copy .env.example to .env and add your OpenAI API key.");
    process.exit(1);
}

const client = new OpenAI({ apiKey });

try {
    console.log(`Testing OpenAI API connection with model: ${model}`);

    const response = await client.responses.create({
        model,
        input:
            "Reply with one short sentence confirming that the OpenAI API connection is working.",
    });

    console.log("\nOpenAI response:");
    console.log(response.output_text);
} catch (error) {
    console.error("\nOpenAI API request failed.");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
}
