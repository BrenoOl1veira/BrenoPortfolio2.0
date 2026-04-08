import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { About, Contact, Experience, Hero, Navbar, Tech, Works } from "./components";
import { useEnhancedGraphics } from "./utils/performance";

const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  const enhancedGraphics = useEnhancedGraphics();

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary overflow-x-hidden">
        <Navbar />

        <section className="relative z-0 bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Hero />
          {enhancedGraphics && (
            <Suspense fallback={null}>
              <StarsCanvas />
            </Suspense>
          )}
        </section>

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
