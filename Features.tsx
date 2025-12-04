
const features = [
  {
    tag: "Summaries",
    title: "Market moves in plain English",
    body: "Turn messy candles, volume spikes, and funding flips into a short narrative you can actually read without five monitors.",
    footer: "Great for catching up after missing a session.",
  },
  {
    tag: "Token deep dives",
    title: "Quick token breakdowns",
    body: "Paste what you know about a token and BibiGPT will outline utility, tokenomics, and main risk flags in human terms.",
    footer: "For education only – no buy or sell calls.",
  },
  {
    tag: "Concept coaching",
    title: "Explain the weird stuff",
    body: "Ask about liquidity pools, perp funding, liquidation cascades, or slippage. BibiGPT explains it like you’re a fast learner, not an idiot.",
    footer: "Beginner‑friendly, but still technically grounded.",
  },
];

const Features = () => {
  return (
    <section className="section">
      <div className="section-header">
        <h2>What BibiGPT can help you with</h2>
        <p className="section-subtitle">
          Built to sit between raw data and human brains. No alpha groups, no
          signals – just context, explanations, and risk awareness.
        </p>
      </div>

      <div className="features-grid">
        {features.map((f) => (
          <article key={f.title} className="feature-card">
            <div className="feature-tag">{f.tag}</div>
            <div className="feature-title">{f.title}</div>
            <p className="feature-body">{f.body}</p>
            <div className="feature-footer">{f.footer}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Features;
