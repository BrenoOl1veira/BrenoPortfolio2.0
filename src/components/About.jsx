import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { logohero, curriculo } from "../assets";
import { useLanguage } from "../i18n/LanguageProvider";

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

          <div className="flex items-center justify-center mt-4">
            <a href={curriculo} download>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition-colors">
                {t.about.resume}
                <svg
                  className="ml-2"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  viewBox="0 0 17 17"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g></g>
                  <path d="M17 16v1h-17v-1h17zM13.354 8.854l-0.707-0.707-3.646 3.646v-11.793h-1v11.794l-3.647-3.648-0.708 0.708 4.854 4.853 4.854-4.853z"></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
