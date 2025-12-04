
# BibiGPT

```text
  ____  _ _     _    ____ ____ _____ 
 | __ )(_) |__ (_)  / ___|  _ \_   _|
 |  _ \| | '_ \| | | |  _| |_) || |  
 | |_) | | |_) | | | |_| |  __/ | |  
 |____/|_|_.__/|_|  \____|_|    |_|  
                                     
```

**BibiGPT** is an *unofficial* Binance-inspired AI co‑pilot for crypto education.

- Frontend: **React + TypeScript + Vite**
- Backend: **Netlify Function** calling the **OpenAI Chat Completions API**
- Theme: Dark Binance / BIBI energy — neon, glow, and a friendly diamond‑mascot chat.

---

## 📁 Repo Map

```text
BibiGPT/
├─ netlify.toml                # Netlify config (build + functions)
├─ index.html                  # Vite entry HTML
├─ package.json                # Dependencies & scripts
├─ tsconfig.json               # TypeScript config
├─ vite.config.ts              # Vite config
├─ .gitignore
├─ src/
│  ├─ main.tsx                 # React entry
│  ├─ App.tsx                  # Page layout
│  ├─ styles.css               # Global styling (Binance / BIBI vibes)
│  └─ components/
│     ├─ Navbar.tsx
│     ├─ Hero.tsx
│     ├─ Features.tsx
│     ├─ ChatDemo.tsx
│     ├─ UseCases.tsx
│     ├─ Roadmap.tsx
│     ├─ FAQ.tsx
│     └─ Footer.tsx
└─ netlify/
   └─ functions/
      └─ bibigpt.js            # Serverless function -> OpenAI
```

---

## 🧠 How It Works (High‑Level)

### 1. Frontend chat flow

1. User types a message into the chat box.
2. `ChatDemo.tsx` keeps an array of messages in React state.
3. On submit, it calls `sendMessageToBiBiGPT()` with the message history.
4. The function makes a `POST` request to `/.netlify/functions/bibigpt`.
5. While waiting, the UI shows a "thinking" indicator.
6. When the reply comes back, the assistant message is appended to the chat.

```ts
// simplified call chain
userMessage -> ChatDemo.tsx state -> sendMessageToBiBiGPT()
           -> fetch("/.netlify/functions/bibigpt")
           -> Netlify function -> OpenAI -> JSON reply
           -> ChatDemo.tsx -> setMessages([...messages, reply])
```

### 2. Backend / OpenAI

The Netlify function:

1. Reads `OPENAI_API_KEY` from environment.
2. Parses `event.body` and validates the `messages` array.
3. Prepends the **system prompt** that defines BibiGPT's personality and rules.
4. Calls OpenAI's Chat Completions API via `fetch`.
5. Returns `{ reply: "..." }` to the frontend.

The system prompt enforces:

- Unofficial / not Binance.
- Educational only — no “buy/sell” advice.
- Friendly mascot tone.
- Clear, structured answers.

---

## 🚀 Getting Started (Local Dev)

### 1. Install dependencies

```bash
npm install
```

### 2. Set your OpenAI key

Create a file called `.env` in the project root:

```env
OPENAI_API_KEY=sk-your-real-key-here
```

> This file is **ignored by git** and will not be committed.

### 3. Run locally (Netlify dev)

Netlify will proxy the function route so your frontend and backend work together.

```bash
npm run dev:netlify
```

Then open the URL Netlify prints (usually `http://localhost:8888`).

---

## 🧪 Scripts

```bash
# Standard Vite dev server (front-end only)
npm run dev

# Vite production build
npm run build

# Preview built site
npm run preview

# Netlify dev (frontend + serverless functions)
npm run dev:netlify
```

---

## 🧩 Frontend Anatomy

### `src/main.tsx`

Mounts the React app and imports global styles.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `src/App.tsx`

Composes the full page sections.

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ChatDemo from "./components/ChatDemo";
import UseCases from "./components/UseCases";
import Roadmap from "./components/Roadmap";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

const App = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <section id="features"><Features /></section>
      <section id="demo"><ChatDemo /></section>
      <section id="usecases"><UseCases /></section>
      <section id="roadmap"><Roadmap /></section>
      <section id="faq"><FAQ /></section>
    </main>
    <Footer />
  </>
);

export default App;
```

### `src/styles.css`

Defines the overall Binance / BIBI theme.

- Dark gradient background
- Neon glows
- Sticky navbar
- Responsive layout
- Chat bubbles for user vs assistant

Key bits:

```css
:root {
  --bg: #05070b;
  --bg-alt: #070a12;
  --accent: #f3ba2f;
  --accent-soft: rgba(243, 186, 47, 0.15);
  --accent-strong: #f0b90b;
  --text: #f8fafc;
  --muted: #94a3b8;
  --border-subtle: rgba(148, 163, 184, 0.25);
  --danger: #f97373;
}

/* body, main layout, section spacing, buttons, etc... */
```

---

## 🗣️ Chat Demo Component

### `src/components/ChatDemo.tsx`

This is the heart of the app. It:

- Manages `messages` state.
- Renders user + assistant bubbles.
- Calls the Netlify function.
- Shows a typing indicator.
- Provides preset “example prompt” buttons.

```tsx
import React, { useState } from "react";

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
}

const EXAMPLES = [
  "Explain BNB’s current market structure like I’m new.",
  "Is this token high risk? What should I look at?",
  "Summarize today’s biggest crypto news in 3 bullet points.",
  "Teach me what funding rates are.",
];

async function sendMessageToBiBiGPT(messages: { role: string; content: string }[]) {
  const response = await fetch("/.netlify/functions/bibigpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("BiBiGPT request failed");
  }

  const data = await response.json();
  if (!data.reply) {
    throw new Error("No reply from BiBiGPT");
  }

  return data.reply as string;
}

const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey, I’m BibiGPT – an unofficial Binance‑inspired co‑pilot. I can explain crypto concepts and help you think about risk, but I can’t tell you what to buy or sell. What do you want to learn?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (prompt?: string) => {
    const text = (prompt ?? input).trim();
    if (!text || isThinking) return;

    const id = Date.now().toString();

    const nextMessages: Message[] = [
      ...messages,
      { id, role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setIsThinking(true);
    setError(null);

    try {
      const apiMessages = nextMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await sendMessageToBiBiGPT(apiMessages);

      setMessages((prev) => [
        ...prev,
        {
          id: `${id}-reply`,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong talking to BiBiGPT. Try again in a moment.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2>Try the BiBiGPT Demo</h2>
        <p className="section-subtitle">
          Ask anything about Binance‑style markets, risk, and crypto concepts. Educational only – no financial advice.
        </p>
      </div>

      <div className="chat-layout">
        <div className="chat-card">
          <div className="chat-messages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chat-row chat-row-${m.role}`}
              >
                <div className={`chat-bubble chat-bubble-${m.role}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="chat-row chat-row-assistant">
                <div className="chat-bubble chat-bubble-assistant chat-bubble-thinking">
                  BiBiGPT is thinking…
                </div>
              </div>
            )}
            {error && (
              <div className="chat-error">
                {error}
              </div>
            )}
          </div>

          <form
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask BiBiGPT anything about Binance, BNB, or crypto…"
            />
            <button type="submit" disabled={!input.trim() || isThinking}>
              Send
            </button>
          </form>
        </div>

        <aside className="chat-sidebar">
          <h3>Example questions</h3>
          <p className="section-subtitle">
            Click one to auto‑fill and send:
          </p>
          <div className="example-grid">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                className="example-pill"
                type="button"
                onClick={() => handleSend(ex)}
                disabled={isThinking}
              >
                {ex}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ChatDemo;
```

> The chat component is intentionally written in plain, readable TypeScript with no magic.  
> It should be easy to extend with features like message persistence, streaming tokens, or multi‑panel layouts.

---

## 🧾 Netlify Function (Backend)

### `netlify/functions/bibigpt.js`

This file implements the backend logic and the system prompt that defines BiBiGPT.

```js
const SYSTEM_PROMPT = `
You are BiBiGPT, an UNOFFICIAL Binance-themed AI assistant inspired by Binance's BiBi mascot.

Identity & Disclaimers:
- You are NOT an official Binance product and NOT affiliated with or endorsed by Binance.
- If users assume you are official, politely clarify that you are a fan-built educational tool.

What you can do:
- Explain crypto and Binance-style concepts in clear, simple language.
- Help users understand things like market cap, volume, liquidity, leverage, liquidation, slippage, LPs, perpetuals, staking, and funding rates.
- Turn market or token information PROVIDED BY THE USER into structured explanations, pros/cons, and risk factors.
- Give educational risk-awareness tips and remind users to double-check information on official platforms and price trackers.

What you cannot do:
- Do NOT give financial, investment, or trading advice.
- Do NOT tell users to buy, sell, or hold any asset.
- Do NOT promise returns, signals, or price predictions.
- If users ask for specific moves ("Should I buy this?" etc.), refuse politely and say you only provide education.

Style:
- Friendly and slightly playful, like a helpful mascot, but still clear and responsible.
- Use short paragraphs and bullet points when useful.
- Avoid heavy jargon; if you must use a technical term, explain it briefly.
- When you don't know something or lack data, say so honestly.

Always prioritise clarity, safety, and user education over hype.
`.trim();

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY");
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Server misconfiguration" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!messages.length) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing messages array" }),
      };
    }

    const finalMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content || ""),
      })),
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: finalMessages,
        temperature: 0.6,
        max_tokens: 700,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenAI error", response.status, text);
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "I couldn't generate a reply right now. Please try again.";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("Handler error", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Something went wrong talking to BiBiGPT. Try again later.",
      }),
    };
  }
};
```

---

## ⚙️ `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[dev]
  command = "npm run dev"
  port = 5173
  targetPort = 5173
  functionsPort = 9999
  framework = "vite"
```

> When you run `netlify dev`, it will:
> - Start Vite on 5173
> - Proxy `/.netlify/functions/*` to port 9999 (it manages that for you)

---

## 🧠 Extending BibiGPT

A few ideas to make this even wilder:

- Add conversation history saved in `localStorage`.
- Add a “Beginner / Advanced” toggle that changes how explanations are worded.
- Stream tokens from OpenAI for a typewriter effect.
- Add multi‑tab chats (like separate chats for Tokens / Concepts / Risk).

---

## ⚖️ License

You can ship this, fork it, modify it, or use it as a starting point for your own AI co‑pilot.

```text
MIT License – do what you want, just don’t pretend this is official Binance.
```
