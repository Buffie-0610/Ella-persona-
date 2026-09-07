# AI Persona 2026

AI Persona 2.0 is an interactive, stateful, agentic research participant for the Creative Industries Design graduate course.

The current repository begins with a deliberately minimal development exercise: establish a local Node.js environment and confirm an OpenAI API connection before adding Persona, memory, tools, or agentic actions.

For the current design baseline, see `AI_PERSONA_2026_DESIGN.md`.

## First local setup

### 1. Clone the repository

Clone this repository to your computer and open the project folder in VS Code.

### 2. Install Node.js dependencies

In the VS Code terminal, run:

```bash
npm install
```

### 3. Create a local `.env` file

Copy `.env.example` to a new file named `.env`.

The local `.env` file should contain:

```text
OPENAI_API_KEY=your_actual_openai_api_key
OPENAI_MODEL=gpt-5.6-luna
```

Replace the placeholder with your own OpenAI API key.

**Never commit `.env` or an API key to GitHub.** The repository `.gitignore` excludes local `.env` files.

### 4. Run the API connectivity test

In the terminal, run:

```bash
npm start
```

If the environment and API key are configured correctly, the program will send a minimal request to the OpenAI Responses API and print a short confirmation response.

## Current architecture

```text
Local computer
   ↓
VS Code
   ↓
Node.js
   ↓
.env → OPENAI_API_KEY
   ↓
OpenAI API
```

This first step is intentionally simple. Persona seeds, memory, tools, web interface, agent actions, and traces will be introduced incrementally after basic connectivity is verified.

## Security concept

The API key is a **secret**. `.env` is one way to supply that secret during local development.

Later deployment environments may use different secret-management mechanisms, such as GitHub Codespaces secrets or hosted environment variables. The secret should never be written directly into source code or committed to the repository.
