import { styles } from "../styles";
import { socialLinks } from "../constants";
import { useLanguage } from "../i18n/LanguageProvider";
import { portfolioConfig } from "../config/portfolio";
import PixelIcon from "./PixelIcon";

/** Rodape do hub com uma fileira compacta de redes sociais. */
const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className={`${styles.wrap} flex flex-col gap-6 pb-8 pt-20`}>
      <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
        {socialLinks.map((link) => (
          <li key={link.key}>
            <a
              href={link.url}
              target={link.key === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.name}
              title={link.name}
              className="flex h-10 w-10 items-center justify-center border-2 border-line text-fg transition-colors hover:border-accent hover:bg-accent hover:text-bg"
            >
              <PixelIcon rows={link.icon} className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>

      <div className="px-text flex flex-wrap justify-between gap-3 text-[12px] text-muted">
        <span>{t.footer.madeWith}</span>
        <span>
          © {new Date().getFullYear()} {portfolioConfig.ownerName}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
