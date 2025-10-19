import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLinkedin, FiGithub } from "react-icons/fi"; // Mantido caso queira usar em outro lugar
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false); // Controla a visibilidade do menu mobile
  const [scrolled, setScrolled] = useState(false); // Controla o fundo do navbar

  // Efeito para adicionar/remover listener de scroll
  useEffect(() => {
    const handleScroll = () => {
      // Adiciona fundo se o scroll for maior que 20px
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    // Limpa o listener quando o componente desmonta
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Executa apenas uma vez ao montar

  return (
    <nav
      className={`${
        styles.paddingX // Padding horizontal definido em styles
      } w-full flex items-center py-5 fixed top-0 z-20 transition-colors duration-300`} // Estilos base + transição de cor
      style={{
        // Aplica fundo com transparência e blur se rolado
        backgroundColor: scrolled ? "rgba(5, 8, 22, 0.9)" : "transparent", // Usei uma cor escura com opacidade
        backdropFilter: scrolled ? "blur(10px)" : "none", // Aplica blur apenas quando rolado
      }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto"> {/* Container principal */}
        {/* LOGO E NOME */}
        <Link
          to="/"
          className="flex items-center gap-2" // Layout flexível para logo e texto
          onClick={() => {
            setActive(""); // Reseta o link ativo
            window.scrollTo(0, 0); // Rola para o topo da página
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" /> {/* Logo */}
          <p className="text-white text-[18px] font-bold cursor-pointer flex tracking-wide"> {/* Nome */}
            Breno Oliveira&nbsp; {/* Adicionado espaço sem quebra */}
            {/* <span className='sm:block hidden'>| Analista de Sistemas</span> Opcional: Título visível em telas maiores */}
          </p>
        </Link>

        {/* LINKS DE NAVEGAÇÃO DESKTOP */}
        <div className="hidden md:flex items-center gap-10"> {/* Container para links e ícones desktop */}
          <ul className="list-none flex flex-row gap-8"> {/* Lista de links */}
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary" // Muda cor do link ativo
                } hover:text-white text-[18px] font-medium cursor-pointer transition-colors`} // Estilos e hover
                onClick={() => setActive(nav.title)} // Define o link ativo ao clicar
              >
                <a href={`#${nav.id}`}>{nav.title}</a> {/* Link */}
              </li>
            ))}
          </ul>

          {/* ÍCONES SOCIAIS DESKTOP (mantidos aqui) */}
          <div className="flex flex-row items-center gap-4"> {/* Container dos ícones */}
            <a
              href="https://www.linkedin.com/in/brenool1veira/" // Link correto
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile" // Boa prática para acessibilidade
              className="text-white hover:text-[#915EFF] transition-colors duration-200" // Cor e hover
            >
              <FiLinkedin className="text-2xl" />
            </a>
            <a
              href="https://github.com/BrenoOl1veira" // Link correto
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile" // Boa prática para acessibilidade
              className="text-white hover:text-[#915EFF] transition-colors duration-200" // Cor e hover
            >
              <FiGithub className="text-2xl" />
            </a>
          </div>
        </div>


        {/* BOTÃO E MENU MOBILE */}
        <div className="md:hidden flex flex-1 justify-end items-center"> {/* Container visível apenas em mobile */}
          <img
            src={toggle ? close : menu} // Alterna ícone de menu/fechar
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer" // Tamanho e cursor
            onClick={() => setToggle(!toggle)} // Alterna o estado do menu ao clicar
          />

          {/* Dropdown Menu Mobile */}
          <div
            className={`${
              !toggle ? "hidden" : "flex" // Controla visibilidade com base no estado 'toggle'
            } p-6 bg-gradient-to-b from-gray-900 to-black absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-lg`} // Estilos do dropdown
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4"> {/* Lista de links mobile */}
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${ // Estilo dos links mobile
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle); // Fecha o menu ao clicar
                    setActive(nav.title); // Define o link ativo
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              {/* ÍCONES SOCIAIS FORAM REMOVIDOS DAQUI CONFORME SOLICITADO */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;