
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
        error: "Something went wrong talking to BibiGPT. Try again later.",
      }),
    };
  }
};
