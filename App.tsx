
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ChatDemo from "./components/ChatDemo";
import UseCases from "./components/UseCases";
import Roadmap from "./components/Roadmap";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section id="features">
          <Features />
        </section>
        <section id="demo">
          <ChatDemo />
        </section>
        <section id="usecases">
          <UseCases />
        </section>
        <section id="roadmap">
          <Roadmap />
        </section>
        <section id="faq">
          <FAQ />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default App;
