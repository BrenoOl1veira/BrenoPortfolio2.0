import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center relative z-0'>
          <Navbar />
          <Hero />
          <StarsCanvas />
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
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;