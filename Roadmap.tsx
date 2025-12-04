
const steps = [
  {
    title: "Phase 1 – Core chat",
    body: "Ship the core demo: fast, responsive UI talking to OpenAI with the BibiGPT system prompt and clear disclaimers.",
  },
  {
    title: "Phase 2 – Token safety lens",
    body: "Add opt‑in prompts that highlight typical risk checks users should perform themselves: liquidity, supply, unlocks, and contract risk.",
  },
  {
    title: "Phase 3 – Portfolio views",
    body: "Let users paste holdings or screenshots and get plain‑language summaries of exposure, concentration, and scenarios.",
  },
  {
    title: "Phase 4 – Multi‑chain brain",
    body: "Expand beyond BNB culture and support narratives and explanations across more chains and ecosystems.",
  },
];

const Roadmap = () => {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Roadmap</h2>
        <p className="section-subtitle">
          BibiGPT starts as a focused demo and grows into a broader educational
          co‑pilot as more data, prompts, and tools are wired in.
        </p>
      </div>

      <div className="roadmap-shell">
        <ol className="roadmap-list">
          {steps.map((s) => (
            <li key={s.title} className="roadmap-item">
              <div className="roadmap-title">{s.title}</div>
              <p className="roadmap-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Roadmap;
