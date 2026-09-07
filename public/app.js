const form = document.querySelector("#chatForm");
const input = document.querySelector("#promptInput");
const sendButton = document.querySelector("#sendButton");
const conversation = document.querySelector("#conversation");
const portrait = document.querySelector("#personaPortrait");
const status = document.querySelector("#personaStatus");
const statusText = document.querySelector("#statusText");
const personaName = document.querySelector("#persona-name");
const personaMeta = document.querySelector("#personaMeta");
const personaSummary = document.querySelector("#personaSummary");
const initialAvatar = document.querySelector("#initialAvatar");
const initialAuthor = document.querySelector("#initialAuthor");
const initialMessage = document.querySelector("#initialMessage");

let persona = null;
let personaImage = "";

function scrollToLatest() {
  conversation.scrollTop = conversation.scrollHeight;
}

function resizeInput() {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 140)}px`;
}

function createMessage({ author, text, type, thinking = false }) {
  const row = document.createElement("article");
  row.className = `message-row ${type}-message-row`;

  if (type === "persona") {
    const avatar = document.createElement("img");
    avatar.className = "message-avatar";
    avatar.src = personaImage;
    avatar.alt = "";
    row.appendChild(avatar);
  }

  const block = document.createElement("div");
  block.className = "message-block";

  const authorLabel = document.createElement("span");
  authorLabel.className = "message-author";
  authorLabel.textContent = author;

  const bubble = document.createElement("div");
  bubble.className = `message-bubble ${type === "persona" ? "persona-bubble" : "user-bubble"}`;
  if (thinking) bubble.classList.add("thinking-bubble");
  bubble.textContent = text;

  block.append(authorLabel, bubble);
  row.appendChild(block);
  conversation.appendChild(row);
  scrollToLatest();

  return { row, bubble };
}

function setThinking(isThinking) {
  status.classList.toggle("is-thinking", isThinking);
  statusText.textContent = isThinking
    ? `${persona?.name || "Persona"} is thinking...`
    : "Ready to chat";
  input.disabled = isThinking;
  sendButton.disabled = isThinking;
}

async function loadPersona() {
  const response = await fetch("/api/persona");

  if (!response.ok) {
    throw new Error("Could not load persona profile.");
  }

  persona = await response.json();
  personaImage = persona.image;

  document.title = `AI Persona — ${persona.name}`;
  personaName.textContent = persona.name;
  personaMeta.textContent = `${persona.age} years old · ${persona.job}`;
  personaSummary.textContent = `${persona.personality}. Interests: ${persona.interests.join(", ")}.`;

  portrait.src = personaImage;
  portrait.alt = `Portrait of ${persona.name}`;
  initialAvatar.src = personaImage;
  initialAuthor.textContent = persona.name;
  initialMessage.textContent = `Hi, I’m ${persona.name}. Nice to meet you. What would you like to ask me?`;

  input.placeholder = `Ask ${persona.name} something...`;
  statusText.textContent = "Ready to chat";
  input.disabled = false;
  sendButton.disabled = false;
  input.focus();
}

async function submitPrompt() {
  const prompt = input.value.trim();
  if (!prompt || sendButton.disabled || !persona) return;

  createMessage({ author: "You", text: prompt, type: "user" });

  input.value = "";
  resizeInput();
  setThinking(true);

  const thinkingMessage = createMessage({
    author: persona.name,
    text: "Thinking...",
    type: "persona",
    thinking: true,
  });

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Chat request failed.");
    }

    thinkingMessage.bubble.classList.remove("thinking-bubble");
    thinkingMessage.bubble.textContent = data.response;
  } catch (error) {
    thinkingMessage.bubble.classList.remove("thinking-bubble");
    thinkingMessage.bubble.textContent = `Sorry, I couldn’t respond just now. ${error.message}`;
  } finally {
    setThinking(false);
    input.focus();
    scrollToLatest();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitPrompt();
});

input.addEventListener("input", resizeInput);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

input.disabled = true;
sendButton.disabled = true;

loadPersona().catch((error) => {
  statusText.textContent = "Persona unavailable";
  initialMessage.textContent = error.message;
});
