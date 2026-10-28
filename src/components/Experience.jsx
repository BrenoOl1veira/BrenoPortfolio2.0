import { getExperiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { useLanguage } from "../i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";

/** Cada card recebe uma experiencia ja traduzida e apenas cuida de apresenta-la. */
const ExperienceCard = ({ experience }) => (
  <li className="relative pl-8 sm:pl-10">
    {/* Marcador quadrado sobre a linha vertical da timeline. */}
    <span className="absolute left-[-7px] top-1 block h-3 w-3 bg-accent" aria-hidden="true" />

    <article className="panel">
      <div className="panel-bar">
        <span />
        <span />
        <span />
        <b>{experience.date}</b>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center" style={{ background: experience.iconBg }}>
            <img src={experience.icon} alt={experience.company_name} className="h-[70%] w-[70%] object-contain" />
          </div>
          <div className="min-w-0">
            <h3 className="px-text m-0 text-[18px] leading-tight sm:text-[22px]">{experience.title}</h3>
            <p className="px-text m-0 mt-1 text-[12px] text-soft">{experience.company_name}</p>
          </div>
        </div>

        <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
          {experience.points.map((point, index) => (
            <li key={`experience-point-${index}`} className="flex gap-3 text-[14px] leading-6 text-fg/90">
              <span className="text-accent" aria-hidden="true">
                ▸
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  </li>
);

/**
 * Linha do tempo profissional. Os cargos e descricoes ficam em constants para
 * que seja possivel atualiza-los sem alterar a apresentacao.
 */
const Experience = () => {
  const { locale, t } = useLanguage();
  const experiences = getExperiences(locale);

  return (
    <>
      <SectionHeading id="work-title" title={t.experience.title} hint={t.experience.subtitle} />

      <ol className="m-0 flex list-none flex-col gap-10 border-l-2 border-dashed border-line p-0">
        {experiences.map((experience, index) => (
          <ExperienceCard key={`experience-${index}`} experience={experience} />
        ))}
      </ol>
    </>
  );
};

export default SectionWrapper(Experience, "work");
