# AI Persona 2026 — Student Demo

This repository is the student starter version of **AI Persona 2026** for the Creative Product Design course.

The project demonstrates how a simple AI Persona can be built from structured data, an OpenAI Agent, and a web interface. The current demo uses one Persona, **Ella**, as an example.

The goal is not only to use an AI chatbot, but to understand how different parts of an AI service are connected:

```text
Persona data
    ↓
Agent instructions
    ↓
OpenAI Agent
    ↓
Express web service
    ↓
Web interface
```

The current demo is intentionally simple. More advanced capabilities such as memory, tools, multimodal input, and agentic actions may be added later during the course.

## What is included

```text
public/
  index.html          Web interface
  style.css           Interface styling
  app.js              Front-end interaction
  assets/             Persona images

src/
  index.js            Express web server and API routes
  agent.js            OpenAI Agent setup
  personas/
    001.json           Example Persona data

scripts/
  test-openai.js       Basic OpenAI API connectivity test
  prompt-openai.js     Direct prompt / response experiment
  prompt-agent.js      Minimal Agent experiment

.env.example           Environment-variable example
package.json           Node.js project configuration
```

## First setup

### 1. Clone the repository

Clone this repository to your computer and open the project folder in VS Code.

### 2. Install Node.js dependencies

In the VS Code terminal, run:

```bash
npm install
```

You normally only need to run `npm install` again when the project dependencies change.

### 3. Create a local `.env` file

Copy `.env.example` and rename the copy to:

```text
.env
```

Add your own OpenAI API key:

```text
OPENAI_API_KEY=your_actual_openai_api_key
OPENAI_MODEL=gpt-5.6-luna
```

**Never upload your `.env` file or API key to GitHub.**

The repository already excludes `.env` through `.gitignore`.

## Run the AI Persona web demo

Start the local web service:

```bash
npm start
```

If the server starts successfully, the terminal should display something similar to:

```text
AI Persona web service running at http://localhost:3000
```

Then open the following address in a browser:

```text
http://localhost:3000
```

You should see the Ella Persona interface and be able to send questions to the Agent.

## Persona data

The example Persona is stored as structured JSON data in:

```text
src/personas/001.json
```

This file contains basic identity, interests, personality description, behavior guidance, and the Persona image path.

The JSON structure in this demo is only an example. You may later design your own Persona attributes and data structure according to the needs of your project.

## Current limitation: no memory yet

The current demo is intentionally **stateless**.

For example:

```text
Question 1: Do you have pets?
Question 2: What is its name?
```

At this stage, the second request does not automatically include the previous conversation as memory.

This limitation is intentional. Memory will be introduced as a separate system capability so that its effect can be observed and evaluated.

## Optional experiments

### Test the OpenAI API connection

```bash
node scripts/test-openai.js
```

### Send a prompt directly to the model

```bash
node scripts/prompt-openai.js
```

### Test the minimal Agent

```bash
npm run prompt:agent
```

These scripts help compare a direct model API call with an Agent-based implementation.

## API key security

The OpenAI API key is a secret.

Keep it only in your local `.env` file or in a secure environment-variable system when deploying the project. Never place the key directly inside JavaScript, JSON, HTML, or any file committed to GitHub.

## Course development direction

This starter project provides a working baseline. During the course, the system can be extended step by step toward capabilities such as:

- multiple Personas
- conversation context and memory
- persistent Persona information
- tool use
- artifact inspection
- prototype interaction
- observable agent activity

The purpose is to understand how an AI service is designed as a system, and how its capabilities, data, behavior, and boundaries can be deliberately specified and evaluated.
