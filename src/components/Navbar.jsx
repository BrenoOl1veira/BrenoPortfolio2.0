import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { styles } from "../styles";
import { getNavLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { useLanguage } from "../i18n/LanguageProvider";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const navLinks = getNavLinks(t);

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
        backgroundColor: scrolled ? "rgba(5, 8, 22, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto gap-4">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <div className="flex flex-col">
            <p className="text-white text-[18px] font-bold cursor-pointer flex tracking-wide">
              Breno Oliveira
            </p>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.2em] text-white/45">
              {t.navbar.role}
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
            {["pt-BR", "en-US"].map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setLocale(language)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  locale === language
                    ? "bg-[#3b82f6] text-white"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {language === "pt-BR" ? "PT-BR" : "EN-US"}
              </button>
            ))}
          </div>

          <ul className="list-none flex flex-row gap-8">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer transition-colors`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>

          <div className="flex flex-row items-center gap-4">
            <a
              href="https://www.linkedin.com/in/brenool1veira/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.hero.linkedinLabel}
              className="text-white hover:text-[#915EFF] transition-colors duration-200"
            >
              <FiLinkedin className="text-2xl" />
            </a>
            <a
              href="https://github.com/BrenoOl1veira"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.hero.githubLabel}
              className="text-white hover:text-[#915EFF] transition-colors duration-200"
            >
              <FiGithub className="text-2xl" />
            </a>
          </div>
        </div>

        <div className="md:hidden flex flex-1 justify-end items-center gap-3">
          <button
            type="button"
            onClick={() => setLocale(locale === "pt-BR" ? "en-US" : "pt-BR")}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white"
          >
            {locale === "pt-BR" ? "EN-US" : "PT-BR"}
          </button>

          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-gradient-to-b from-gray-900 to-black absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl shadow-lg`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
