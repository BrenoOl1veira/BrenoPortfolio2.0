import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from './components';

const App = () => {
  const [starsCanvasLoaded, setStarsCanvasLoaded] = useState(false);

  useEffect(() => {
    // Função que simula o carregamento do StarsCanvas
    const loadStarsCanvas = () => {
      // Simulando um processo de carregamento com setTimeout
      setTimeout(() => {
        // Quando estiver pronto, chame setStarsCanvasLoaded(true)
        setStarsCanvasLoaded(true);
      }, 2000); // Tempo de simulação de 2 segundos, ajuste conforme necessário
    };

    // Chame a função de carregamento aqui
    loadStarsCanvas();
  }, []); // O array vazio [] garante que este efeito é executado apenas uma vez, equivalente ao componentDidMount

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center relative z-0'>
          <Navbar />
          <Hero />
          {starsCanvasLoaded && <StarsCanvas />}
        </div>
        <div className='relative z-0'>
          <Navbar />
          <About />
          <Tech />
          <Experience />
          <Works />
        </div>

        <div className='relative z-0'>
          <Navbar />
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
