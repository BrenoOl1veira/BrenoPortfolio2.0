import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLinkedin, FiGithub } from "react-icons/fi"; // Ícones de redes sociais
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

/**
 * Componente Navbar
 * ----------------------------------------
 * Navbar fixa no topo da página com:
 * - Destaque do link ativo
 * - Menu responsivo (desktop e mobile)
 * - Ícones de redes sociais
 * - Fundo que muda ao rolar a página
 */
const Navbar = () => {
  // Guarda qual link está ativo para destacar no menu
  const [active, setActive] = useState("");

  // Controla se o menu mobile está aberto (true) ou fechado (false)
  const [toggle, setToggle] = useState(false);

  // Controla se a navbar deve ter fundo ao rolar a página
  const [scrolled, setScrolled] = useState(false);

  /**
   * useEffect para monitorar scroll
   * - Se o usuário rolar mais de 20px, ativa o fundo
   * - Remove o listener ao desmontar o componente
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-colors duration-300`}
      style={{
        // Fundo translúcido que muda ao rolar
        backgroundColor: scrolled ? "rgba(0, 0, 25, 0.85)" : "transparent",
        backdropFilter: "blur(10px)", // efeito glassmorphism
      }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        
        {/* ==================== LOGO ==================== */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");          // Reseta link ativo ao clicar no logo
            window.scrollTo(0, 0);  // Scroll para o topo
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-xl font-bold cursor-pointer tracking-wide">
            Breno Oliveira
          </p>
        </Link>

        {/* ==================== MENU DESKTOP ==================== */}
        <ul className="list-none hidden md:flex flex-row gap-8">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-lg font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* ==================== ÍCONES DE REDES SOCIAIS (DESKTOP) ==================== */}
        <div className="hidden sm:flex flex-row items-center gap-4">
          <a
            href="https://www.linkedin.com/in/brenool1veira/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <FiLinkedin className="text-white text-2xl" />
          </a>
          <a
            href="https://github.com/BrenoOl1veira"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <FiGithub className="text-white text-2xl" />
          </a>
        </div>

        {/* ==================== MENU MOBILE ==================== */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          {/* Ícone para abrir/fechar o menu */}
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-8 h-8 object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          {/* Dropdown do menu mobile */}
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 black-gradient absolute top-20 right-4 min-w-[160px] z-10 rounded-xl flex-col gap-4 shadow-lg`}
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium text-lg ${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white cursor-pointer`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false); // Fecha menu ao clicar
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}

              {/* Ícones de redes sociais no menu mobile */}
              <div className="flex flex-row gap-4 pt-2 border-t border-gray-600 mt-2">
                <a
                  href="https://www.linkedin.com/in/brenool1veira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <FiLinkedin className="text-white text-2xl" />
                </a>
                <a
                  href="https://github.com/BrenoOl1veira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <FiGithub className="text-white text-2xl" />
                </a>
              </div>
            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
