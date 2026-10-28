import { styles } from "../styles";

/**
 * Envolve cada secao principal com o espaco padrao e uma ancora que considera
 * a barra fixa. O idName deve ser igual ao id dos links criados em
 * constants/index.js para a navegacao por clique funcionar.
 */
const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section
        id={idName}
        aria-labelledby={`${idName}-title`}
        className={`${styles.wrap} ${styles.sectionGap} scroll-mt-20 flex flex-col gap-[18px]`}
      >
        <Component />
      </section>
    );
  };

export default SectionWrapper;
