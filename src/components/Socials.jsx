import { SectionWrapper } from "../hoc";
import { socialLinks } from "../constants";
import { useLanguage } from "../i18n/LanguageProvider";
import PixelIcon from "./PixelIcon";
import SectionHeading from "./SectionHeading";

/**
 * Lista de redes igual a do hub: icone em pixel, nome grande e o @ abaixo.
 * Para incluir uma rede, adicione-a em portfolioConfig.social e um icone em
 * constants/pixelIcons com a mesma chave.
 */
const Socials = () => {
  const { t } = useLanguage();

  return (
    <>
      <SectionHeading id="links-title" title={t.socials.title} hint={t.socials.hint} />

      <ul className="m-0 grid list-none grid-cols-1 p-0 md:grid-cols-2 md:gap-x-6">
        {socialLinks.map((link, index) => (
          <li key={link.key}>
            <a
              href={link.url}
              target={link.key === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={
                link.key === "email"
                  ? `${link.name} ${link.handle}`
                  : `${link.name} ${link.handle} (${t.socials.opensNewTab})`
              }
              className={`row-link ${index === 0 ? "border-t-2" : ""} ${index === 1 ? "md:border-t-2" : ""}`}
            >
              <PixelIcon rows={link.icon} />
              <span className="flex min-w-0 flex-col gap-[6px]">
                <span className="px-text text-[clamp(20px,6vw,26px)] leading-none">{link.name}</span>
                <span className="muted-on-row px-text text-[12px] normal-case text-muted [overflow-wrap:anywhere]">
                  {link.handle}
                </span>
              </span>
              <span className="go" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SectionWrapper(Socials, "links");
