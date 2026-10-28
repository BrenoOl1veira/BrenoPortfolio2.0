import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { useLanguage } from "../i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";

/**
 * Mostra as tecnologias cadastradas em constants/index.js como blocos com
 * borda grossa. Para adicionar uma habilidade, inclua o icone nos assets e um
 * item na lista technologies.
 */
const Tech = () => {
  const { t } = useLanguage();

  return (
    <>
      <SectionHeading id="tech-title" title={t.tech.title} hint={t.tech.subtitle} />

      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
        {technologies.map((technology) => (
          <li
            key={technology.name}
            className="flex flex-col items-center gap-3 border-2 border-line bg-panel px-2 py-4 text-center transition-transform duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-px"
          >
            <img src={technology.icon} alt="" className="h-11 w-11 object-contain" loading="lazy" />
            <span className="px-text text-[11px] leading-tight">{technology.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
