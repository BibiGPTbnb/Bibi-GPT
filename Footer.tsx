
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          BibiGPT is an independent, unofficial fan project inspired by
          Binance&apos;s BiBi mascot. It is not affiliated with or endorsed by Binance.
        </p>
        <div className="footer-links">
          <a href="#" target="_blank" rel="noreferrer">
            X / Twitter
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="mailto:hello@example.com">Contact</a>
        </div>
        <p>© {year} BibiGPT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
