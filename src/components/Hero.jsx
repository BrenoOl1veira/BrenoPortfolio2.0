import { styles } from "../styles";
import { useLanguage } from "../i18n/LanguageProvider";
import { portfolioConfig } from "../config/portfolio";
import Critter from "./Critter";

const HIGHLIGHT = { g: "text-accent", o: "text-soft" };

/**
 * Primeira secao visivel. Segue o hero do hub: nome grande em pixel, frase com
 * destaques sublinhados e cursor piscando, botoes e o bichinho no chao.
 */
const Hero = () => {
  const { t } = useLanguage();
  const [firstName, ...lastNames] = portfolioConfig.ownerName.split(" ");

  return (
    <div className={`${styles.wrap} flex flex-col gap-[22px] pt-12 sm:pt-20`}>
      <p className="hint">{"// "}{t.hero.role}</p>

      <h1 className="px-text text-shadow-px m-0 text-[clamp(40px,12vw,96px)] font-bold leading-[0.95] tracking-[0.02em]">
        {firstName}
        <br />
        <span className="text-accent">{lastNames.join(" ")}</span>
      </h1>

      <p className="px-text m-0 max-w-[640px] text-[clamp(14px,3.9vw,18px)] leading-[1.95]">
        {t.hero.bio.map(([text, hl], index) =>
          hl ? (
            <span key={index} className={`hl ${HIGHLIGHT[hl]}`}>
              {text}
            </span>
          ) : (
            <span key={index}>{text}</span>
          )
        )}
        <span
          className="blink-fast ml-1 inline-block h-[1em] w-[0.6em] bg-fg align-[-2px]"
          aria-hidden="true"
        />
      </p>

      <div className="flex flex-wrap gap-4">
        <a href="#works" className="btn-px">
          {t.hero.primaryCta} <span aria-hidden="true">↓</span>
        </a>
        <a href="#contact" className="btn-px btn-ghost">
          {t.hero.secondaryCta}
        </a>
      </div>

      <Critter copy={t.hero.critter} />
    </div>
  );
};

export default Hero;
