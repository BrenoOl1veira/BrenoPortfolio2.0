/**
 * Titulo de secao no estilo do hub: nome em pixel com sombra e uma dica curta
 * abaixo. O id precisa seguir o padrao "<secao>-title" usado em SectionWrapper.
 */
const SectionHeading = ({ id, title, hint }) => (
  <div className="flex flex-col gap-3">
    <h2 id={id} className="h-section">
      {title}
    </h2>
    {hint && <p className="hint">{hint}</p>}
  </div>
);

export default SectionHeading;
