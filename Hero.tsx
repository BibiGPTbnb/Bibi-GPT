
const scrollToDemo = () => {
  const el = document.getElementById("demo");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const scrollToFeatures = () => {
  const el = document.getElementById("features");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Hero = () => {
  return (
    <section className="section">
      <div className="hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            UNOFFICIAL BINANCE‑INSPIRED AI
          </div>
          <h1 className="hero-title">
            Meet <span className="hero-gradient-text">BibiGPT</span>, your
            friendly crypto co‑pilot.
          </h1>
          <p className="hero-subtitle">
            Ask about markets, tokens, and on‑chain concepts in plain language.
            BibiGPT turns charts and chaos into clear, human‑readable stories.
          </p>

          <div className="hero-badges">
            <span className="hero-badge">Educational only • no financial advice</span>
            <span className="hero-badge">Powered by OpenAI</span>
          </div>

          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToDemo}>
              Start chatting
            </button>
            <button className="btn-secondary" onClick={scrollToFeatures}>
              See what it can do
            </button>
          </div>

          <p className="hero-disclaimer">
            BibiGPT is a fan project inspired by Binance&apos;s BiBi mascot. It is{" "}
            <strong>not</strong> affiliated with or endorsed by Binance and does not
            provide investment advice.
          </p>
        </div>

        <div className="hero-mascot-shell">
          <div className="hero-orb-ring" />
          <div className="hero-orb">
            <div className="hero-orb-face">
              <div className="hero-orb-mouth" />
            </div>
            <div className="hero-orb-star" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
