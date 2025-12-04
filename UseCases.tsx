
const cards = [
  {
    title: "New traders",
    body: "You’re still figuring out what a funding rate is and why everyone panics at 3x open interest. BibiGPT can walk you through the basics without talking down to you.",
    badges: ["Clarify jargon", "Learn faster", "Ask anything"],
  },
  {
    title: "On‑chain diggers",
    body: "You already stare at DEX dashboards, but you want a second brain to narrate what you’re seeing. Paste data or context, get clean summaries and risk angles.",
    badges: ["Connect dots", "Spot narratives", "Stay skeptical"],
  },
  {
    title: "Builders & teams",
    body: "You run a project or tool and need documentation turned into human language. BibiGPT can help you draft explainers for users and new community members.",
    badges: ["Explain features", "Reduce support load", "Better docs"],
  },
];

const UseCases = () => {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Who BibiGPT is built for</h2>
        <p className="section-subtitle">
          Anyone who has touched Binance, BNB, or crypto and thought: “Can
          someone just explain this like a normal person?”
        </p>
      </div>

      <div className="usecase-grid">
        {cards.map((card) => (
          <article key={card.title} className="usecase-card">
            <div className="usecase-title">{card.title}</div>
            <p className="usecase-body">{card.body}</p>
            <div className="badge-row">
              {card.badges.map((b) => (
                <span className="badge" key={b}>
                  {b}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
