import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

// Componentes diretos
import Navbar from "./components/Navbar";

// Lazy loading para componentes pesados
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Tech = lazy(() => import("./components/Tech"));
const Experience = lazy(() => import("./components/Experience"));
const Works = lazy(() => import("./components/Works"));
const Contact = lazy(() => import("./components/Contact"));

// Loading components
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-primary">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-16 h-16 bg-tertiary rounded-full mb-4"></div>
      <div className="text-secondary text-lg">Carregando...</div>
    </div>
  </div>
);

const SectionFallback = () => (
  <div className="min-h-[50vh] bg-primary flex items-center justify-center">
    <div className="animate-pulse text-secondary">Carregando...</div>
  </div>
);

const App = () => {
  const [starsCanvasLoaded, setStarsCanvasLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Detecta dispositivo mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setStarsCanvasLoaded(false);
    };

    checkMobile();

    // Resize debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };

    // Carregamento inicial
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      setTimeout(handleLoad, 500);
    } else {
      window.addEventListener("load", handleLoad);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Carregamento StarsCanvas
  useEffect(() => {
    if (isMobile) return;

    let mounted = true;
    let timeoutId;

    const loadStars = () => {
      timeoutId = setTimeout(() => {
        if (mounted) setStarsCanvasLoaded(true);
      }, 1000);
    };

    const contentTimer = setTimeout(loadStars, 500);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      clearTimeout(contentTimer);
    };
  }, [isMobile]);

  const renderStarsCanvas = useCallback(() => {
    if (!starsCanvasLoaded || isMobile) return null;
    return (
      <Suspense fallback={null}>
        <StarsCanvas />
      </Suspense>
    );
  }, [starsCanvasLoaded, isMobile]);

  if (isLoading) return <LoadingFallback />;

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section
          className="relative z-0 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/src/assets/herobg.png')",
            minHeight: "100vh",
            backgroundSize: "cover",
          }}
        >
          <Suspense fallback={<SectionFallback />}>
            <Hero />
          </Suspense>
          {renderStarsCanvas()}
        </section>

        {/* Conteúdo principal */}
        <main className="relative z-10">
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Tech />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Experience />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Works />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>

        {/* Estilos globais */}
        <style>{`
          @media (max-width: 768px) {
            input, select, textarea { font-size: 16px !important; }
            * { -webkit-overflow-scrolling: touch; }
            .transform { will-change: transform; }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
};

export default App;
