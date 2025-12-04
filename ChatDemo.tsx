
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
  "Summarize today’s biggest crypto headlines in 3 bullet points.",
  "Teach me what funding rates are and why they matter.",
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
        <h2>Try the BibiGPT demo</h2>
        <p className="section-subtitle">
          Ask anything about Binance‑style markets, risk, and crypto concepts.
          BibiGPT is educational only – no signals, no financial advice.
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
                  BibiGPT is thinking…
                </div>
              </div>
            )}
            {error && <div className="chat-error">{error}</div>}
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
              placeholder="Ask BibiGPT anything about Binance, BNB, or crypto…"
            />
            <button type="submit" disabled={!input.trim() || isThinking}>
              Send
            </button>
          </form>
        </div>

        <aside className="chat-sidebar">
          <h3>Example questions</h3>
          <p className="section-subtitle">
            Click to auto‑fill and send:
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
