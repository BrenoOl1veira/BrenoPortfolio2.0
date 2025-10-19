import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

const App = () => {
  const [starsCanvasLoaded, setStarsCanvasLoaded] = useState(false);

  useEffect(() => {
    // Simula carregamento do StarsCanvas (você pode remover ou substituir por lógica real)
    const timer = setTimeout(() => setStarsCanvasLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary overflow-x-hidden">
        {/* Navbar fixa e única */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative z-0 bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Hero />
          {starsCanvasLoaded && <StarsCanvas />}
        </section>

        {/* Conteúdo principal */}
        <main className="relative z-10">
          <About />
          <Tech />
          <Experience />
          <Works />
          <Contact />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
