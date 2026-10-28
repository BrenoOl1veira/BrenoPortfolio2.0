import { About, Contact, Experience, Footer, Hero, Navbar, Socials, Tech, Terminal, Works } from "./components";

/**
 * Monta a pagina principal na ordem em que as secoes aparecem ao visitante.
 * O visual segue o hub obrenin.dev: uma coluna central, fonte em pixel e
 * nenhum efeito 3D, o que deixa o site leve tambem no celular.
 */
const App = () => {
  return (
    // overflow-x-clip (e nao hidden) para nao quebrar o "sticky" da barra do topo.
    <div id="top" className="overflow-x-clip">
      <Navbar />

      <main>
        <Hero />
        <Socials />
        <About />
        <Tech />
        <Experience />
        <Works />
        <Terminal />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
