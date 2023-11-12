import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLinkedin, FiGithub } from "react-icons/fi"; // Importe ícones do React Feather (você pode usar outros ícones ou imagens)

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
    className={`${
      styles.paddingX
    } w-full flex items-center py-5 fixed top-0 z-20`}
    style={{
      backgroundColor: scrolled ? "rgba(0, 0, 25)" : "bg-primary",
    }}
  >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-xl font-bold cursor-pointer">
            Breno Oliveira
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-8">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-lg font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="list-none hidden sm:flex flex-row items-center">
          <a
            href="https://www.linkedin.com/in/brenool1veira/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin className="text-white text-2xl mr-4" />
          </a>
          <a
            href="https://github.com/BrenoOl1veira"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="text-white text-2xl" />
          </a>
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-8 h-8 object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-lg ${
                    active === nav.title ? "text-white" : "text-white"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <div className="list-none flex justify-end items-start flex-1 flex-row gap-4">
                <a
                  href="https://www.linkedin.com/in/brenool1veira/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiLinkedin className="text-white text-2xl" />
                </a>
                <a
                  href="https://github.com/BrenoOl1veira"
                  target="_blank"
                  rel="noopener noreferrer"
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
