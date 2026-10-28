import { useState } from "react";
import { SectionWrapper } from "../hoc";
import { logohero } from "../assets";
import { useLanguage } from "../i18n/LanguageProvider";
import { buildResumePdfUrl } from "../utils/resumeDownload";
import SectionHeading from "./SectionHeading";

/**
 * Exibe o resumo profissional, a foto e os botoes do curriculo. Para trocar a
 * foto, use src/assets/index.js; para alterar o texto, use translations.js.
 */
const About = () => {
  const { t } = useLanguage();
  const [loadingLocale, setLoadingLocale] = useState("");
  const [resumeError, setResumeError] = useState(false);

  // O PDF vem da fonte LaTeX oficial. Isso evita manter copias diferentes do
  // curriculo neste repositorio e no repositorio dedicado ao curriculo.
  const handleResumeDownload = async (locale) => {
    try {
      setResumeError(false);
      setLoadingLocale(locale);
      const resumeUrl = await buildResumePdfUrl(locale);
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
      setResumeError(true);
    } finally {
      setLoadingLocale("");
    }
  };

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
              <button
                type="button"
                onClick={() => handleResumeDownload("pt-BR")}
                disabled={loadingLocale !== ""}
                className="btn-px"
              >
                {loadingLocale === "pt-BR" ? t.about.resumePreparing : `${t.about.resume} · ${t.about.resumePt}`}
              </button>
              <button
                type="button"
                onClick={() => handleResumeDownload("en-US")}
                disabled={loadingLocale !== ""}
                className="btn-px btn-ghost"
              >
                {loadingLocale === "en-US" ? t.about.resumePreparing : `${t.about.resume} · ${t.about.resumeEn}`}
              </button>
            </div>

            {resumeError && (
              <p role="alert" className="m-0 text-[13px] text-accent">
                {t.about.resumeError}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
