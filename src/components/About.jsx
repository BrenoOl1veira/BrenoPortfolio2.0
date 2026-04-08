import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { logohero } from "../assets";
import { useLanguage } from "../i18n/LanguageProvider";
import { buildResumePdfUrl } from "../utils/resumeDownload";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "72rem",
  margin: "0 auto",
  marginTop: "10px",
  flexWrap: "wrap",
};

const imageStyle = {
  width: "300px",
  height: "300px",
  marginRight: "20px",
  borderRadius: "80px",
  overflow: "hidden",
  flexShrink: 0,
};

const textContainerStyle = {
  padding: "20px",
};

const About = () => {
  const { t } = useLanguage();
  const [loadingLocale, setLoadingLocale] = useState("");

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

      <br />

      <div className="flex-auto" style={containerStyle}>
        <div className="w-full md:w-auto flex justify-center" style={imageStyle}>
          <img
            src={logohero}
            alt={t.about.imageAlt}
            style={{ width: "100%", height: "100%" }}
            loading="lazy"
          />
        </div>

        <div className="w-full md:flex-1" style={textContainerStyle}>
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="text-secondary text-[17px] leading-[30px]"
          >
            {t.about.body}
          </motion.p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              {t.about.resumeLabel}
            </p>
            <p className="text-center text-sm text-secondary">
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
