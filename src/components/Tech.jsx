import React, { lazy, Suspense } from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { useEnhancedGraphics } from "../utils/performance";
import { useLanguage } from "../i18n/LanguageProvider";

const BallCanvas = lazy(() => import("./canvas/Ball"));

const Tech = () => {
  const enhancedGraphics = useEnhancedGraphics();
  const { t } = useLanguage();

  return (
    <section className="w-full text-center">
      <div className="mb-10">
        <p className={`${styles.sectionSubText} text-center`}>
          {t.tech.subtitle}
        </p>

        <h2 className={`${styles.sectionHeadText} text-center`}>{t.tech.title}</h2>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-10 max-w-5xl mx-auto">
        {technologies.map((technology) => (
          <div
            key={technology.name}
            className="flex flex-col items-center justify-center w-28 h-28"
          >
            {enhancedGraphics ? (
              <Suspense
                fallback={
                  <img
                    src={technology.icon}
                    alt={`${technology.name} icon`}
                    className="h-20 w-20 object-contain"
                    loading="lazy"
                  />
                }
              >
                <BallCanvas icon={technology.icon} />
              </Suspense>
            ) : (
              <img
                src={technology.icon}
                alt={`${technology.name} icon`}
                className="h-20 w-20 object-contain"
                loading="lazy"
              />
            )}

            <p
              className="text-sm text-white/80 mt-2 font-medium tracking-wide"
              aria-label={`Technology: ${technology.name}`}
            >
              {technology.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "tech");
