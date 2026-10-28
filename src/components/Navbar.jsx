import { useEffect, useState } from "react";
import { styles } from "../styles";
import { getNavLinks } from "../constants";
import { useLanguage } from "../i18n/LanguageProvider";
import { portfolioConfig } from "../config/portfolio";

/**
 * Barra fixa no topo, inspirada no cabecalho do hub: nome a esquerda e
 * seletor de idioma a direita. Os links das secoes ficam numa linha
 * propria no celular para nao precisar de menu hamburguer.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const navLinks = getNavLinks(t);

  useEffect(() => {
    // A borda inferior so aparece depois de rolar, separando a barra do conteudo.
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 bg-bg/95 transition-colors ${
        scrolled ? "border-b-2 border-line" : "border-b-2 border-transparent"
      }`}
    >
      <div className={`${styles.wrap} flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4`}>
        <a
          href="#top"
          className="px-text text-[13px] tracking-[0.08em] text-fg no-underline"
          onClick={() => window.scrollTo(0, 0)}
        >
          {portfolioConfig.ownerName}
        </a>

        <nav aria-label={t.nav.label} className="order-3 w-full md:order-none md:w-auto">
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <a
                  href={`#${nav.id}`}
                  className="px-text text-[12px] text-muted no-underline transition-colors hover:text-accent"
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center">
          <div role="group" aria-label={t.nav.language} className="flex border-2 border-line">
            {["pt-BR", "en-US"].map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setLocale(language)}
                aria-pressed={locale === language}
                className={`px-text px-2 py-1 text-[11px] ${
                  locale === language ? "bg-accent text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {language === "pt-BR" ? "PT" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
