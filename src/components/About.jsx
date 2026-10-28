import { SectionWrapper } from "../hoc";
import { logohero } from "../assets";
import { useLanguage } from "../i18n/LanguageProvider";
import { portfolioConfig } from "../config/portfolio";
import SectionHeading from "./SectionHeading";

/**
 * Exibe o resumo profissional, a foto e os links do curriculo. Para trocar a
 * foto, use src/assets/index.js; para alterar o texto, use translations.js.
 * Os PDFs vem prontos do resume-kit (veja portfolioConfig.resume).
 */
const About = () => {
  const { t } = useLanguage();

  return (
    <>
      <SectionHeading id="about-title" title={t.about.title} hint={t.about.subtitle} />

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(200px,260px)_minmax(0,1fr)] md:gap-10">
        <div className="mx-auto w-full max-w-[260px] border-2 border-line bg-panel p-2 shadow-px-lg">
          <img
            src={logohero}
            alt={t.about.imageAlt}
            className="block aspect-[3/4] w-full object-cover object-top"
            loading="lazy"
          />
        </div>

        <div className="min-w-0">
          <p className="px-text m-0 text-[18px] text-accent">{t.about.greeting}</p>
          {t.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-[15px] leading-7 text-fg/90">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 flex flex-col gap-3 border-t-2 border-line pt-6">
            <p className="px-text m-0 text-[13px]">{t.about.resumeLabel}</p>
            <p className="m-0 text-[13px] text-muted">{t.about.resumeHint}</p>

            <div className="mt-1 flex flex-wrap gap-4">
              <a href={portfolioConfig.resume["pt-BR"]} className="btn-px">
                {t.about.resume} · {t.about.resumePt} <span aria-hidden="true">↓</span>
              </a>
              <a href={portfolioConfig.resume["en-US"]} className="btn-px btn-ghost">
                {t.about.resume} · {t.about.resumeEn} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
