import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { logohero } from "../assets";
import { useLanguage } from "../i18n/LanguageProvider";
import { buildResumePdfUrl } from "../utils/resumeDownload";

/**
 * Exibe o resumo profissional, a foto e os botoes do curriculo. Para trocar a
 * foto, use src/assets/index.js; para alterar o texto, use translations.js.
 */
const About = () => {
  const { t } = useLanguage();
  const [loadingLocale, setLoadingLocale] = useState("");

  // O PDF vem da fonte LaTeX oficial. Isso evita manter copias diferentes do
  // curriculo neste repositorio e no repositorio dedicado ao curriculo.
  const handleResumeDownload = async (locale) => {
    try {
      setLoadingLocale(locale);
      const resumeUrl = await buildResumePdfUrl(locale);
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
      alert(t.about.resumeError);
    } finally {
      setLoadingLocale("");
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          {t.about.subtitle}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          {t.about.title}
        </h2>
      </motion.div>

      {/*
        A grade impede que um texto longo aumente ou desloque a coluna da foto.
        No celular os blocos ficam em uma coluna; a partir de lg a foto recebe
        uma largura previsivel e o texto ocupa somente o espaco restante.
      */}
      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 items-start gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] lg:gap-14">
        <div className="mx-auto w-full max-w-[280px] lg:max-w-[300px]">
          <img
            src={logohero}
            alt={t.about.imageAlt}
            className="aspect-square w-full rounded-[48px] object-cover shadow-card"
            loading="lazy"
          />
        </div>

        <div className="min-w-0">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="text-center text-[16px] leading-7 text-secondary sm:text-[17px] sm:leading-8 lg:text-left"
          >
            {t.about.body}
          </motion.p>

          <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              {t.about.resumeLabel}
            </p>
            <p className="text-center text-sm text-secondary lg:text-left">
              {t.about.resumeHint}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleResumeDownload("en-US")}
                disabled={loadingLocale !== ""}
                className="bg-blue-500 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded flex items-center transition-colors"
              >
                {loadingLocale === "en-US" ? t.about.resumePreparing : `${t.about.resume} · ${t.about.resumeEn}`}
              </button>

              <button
                type="button"
                onClick={() => handleResumeDownload("pt-BR")}
                disabled={loadingLocale !== ""}
                className="border border-white/20 hover:border-white/40 hover:bg-white/5 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded flex items-center transition-colors"
              >
                {loadingLocale === "pt-BR" ? t.about.resumePreparing : `${t.about.resume} · ${t.about.resumePt}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
