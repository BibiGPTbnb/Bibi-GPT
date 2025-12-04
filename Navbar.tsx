
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Navbar = () => {
  return (
    <header className="navbar-shell">
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-logo">
            <div className="nav-logo-face">
              <div className="nav-logo-mouth" />
            </div>
          </div>
          <div>
            <div className="nav-title">BibiGPT</div>
            <div className="nav-pill">Unofficial • Fan Project</div>
          </div>
        </div>

        <div className="nav-links">
          <a onClick={() => scrollToId("features")}>What it does</a>
          <a onClick={() => scrollToId("demo")}>Live demo</a>
          <a onClick={() => scrollToId("usecases")}>Use cases</a>
          <a onClick={() => scrollToId("roadmap")}>Roadmap</a>
          <a onClick={() => scrollToId("faq")}>FAQ</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
