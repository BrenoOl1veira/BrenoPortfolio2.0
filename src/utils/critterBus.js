// Canal simples entre o terminal e o mini Claude. Usa um evento do navegador
// para que os dois componentes nao precisem se conhecer nem dividir estado.
const EVENT = "critter:command";

/** Comandos aceitos: "hello", "dance", "sleep", "bug" e "pet". */
export const sendCritterCommand = (command) => {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: command }));
};

/** Escuta comandos e devolve a funcao que cancela a escuta. */
export const onCritterCommand = (handler) => {
  const listener = (event) => handler(event.detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
};
