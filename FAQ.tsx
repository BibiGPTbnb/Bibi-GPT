
const FAQ = () => {
  return (
    <section className="section">
      <div className="section-header">
        <h2>FAQ</h2>
        <p className="section-subtitle">
          If you only read one part of this page, make it this one.
        </p>
      </div>

      <div className="faq-shell">
        <details>
          <summary>Is BibiGPT an official Binance product?</summary>
          <p>
            No. BibiGPT is an independent fan project inspired by Binance&apos;s
            BiBi mascot and overall culture. It is not affiliated with, endorsed
            by, or sponsored by Binance in any way.
          </p>
        </details>

        <details>
          <summary>Does BibiGPT give financial or trading advice?</summary>
          <p>
            No. BibiGPT only provides educational explanations and general
            information. It does not tell you what to buy, sell, or hold, and it
            does not offer signals, predictions, or guaranteed outcomes.
          </p>
        </details>

        <details>
          <summary>Where does BibiGPT get its data?</summary>
          <p>
            The current demo uses language models to work with the context you
            provide in chat. It does not have live market data wired in. When
            numbers matter, you should double‑check them on official exchanges
            or price trackers.
          </p>
        </details>

        <details>
          <summary>Will my chats be stored?</summary>
          <p>
            This demo does not include persistent storage. Your messages live in
            your browser state while the page is open. If you extend the
            project, you can wire up your own backend or database and adjust the
            privacy model.
          </p>
        </details>

        <details>
          <summary>Can I fork or reuse this project?</summary>
          <p>
            Yes. The code is intentionally simple and MIT‑licensed. You can fork
            it, re‑theme it, and plug it into your own backend or prompts – just
            don&apos;t claim it is official Binance.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;
