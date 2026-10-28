import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import { getExperiences, socialLinks, technologies } from "../constants";
import { useLanguage } from "../i18n/LanguageProvider";
import { sendCritterCommand } from "../utils/critterBus";
import SectionHeading from "./SectionHeading";

// Comandos aceitos nos dois idiomas apontam para a mesma acao.
const ALIAS = {
  help: "ajuda",
  "?": "ajuda",
  about: "sobre",
  clear: "limpar",
  cls: "limpar",
  insta: "instagram",
  ig: "instagram",
  yt: "youtube",
  tt: "tiktok",
  gh: "github",
  mail: "email",
  "e-mail": "email",
  projects: "projetos",
  works: "projetos",
  contact: "contato",
  experience: "exp",
  "experiência": "exp",
  experiencia: "exp",
  lang: "idioma",
  language: "idioma",
  "mini-claude": "claude",
  oi: "claude",
  hi: "claude",
  dancar: "dance",
  "dançar": "dance",
  dormir: "sleep",
  nap: "sleep",
  carinho: "pet",
};

// Comandos que rolam a pagina ate uma secao.
const JUMPS = { projetos: "works", contato: "contact" };

// Comandos do terminal que viram ordens para o mini Claude no topo da pagina.
const CRITTER = { claude: "hello", dance: "dance", sleep: "sleep", bug: "bug", pet: "pet" };

/**
 * Terminal do hub adaptado ao portfolio. As linhas impressas ficam em estado
 * (texto, classe e link opcional); os textos vem de translations.terminal.
 */
const Terminal = () => {
  const { locale, setLocale, t } = useLanguage();
  const copy = t.terminal;
  const [lines, setLines] = useState(() => copy.intro.map((text) => ({ text })));
  const [value, setValue] = useState("");
  const outRef = useRef(null);
  const inputRef = useRef(null);

  // Mantem o fim da saida visivel a cada novo comando.
  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [lines]);

  const linkLine = (link) => ({ text: `${link.name.padEnd(10, " ")} `, link });

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const name = ALIAS[cmd] || cmd;
    const echo = { text: `guest ~ $ ${cmd}`, cls: "text-muted" };
    let output = [];

    const social = socialLinks.find((link) => link.key === name);
    if (social) output = [linkLine(social)];
    else if (JUMPS[name]) {
      output = [{ text: `${copy.goingTo} #${JUMPS[name]}...` }];
      document.getElementById(JUMPS[name])?.scrollIntoView({ behavior: "smooth" });
    }
    else if (CRITTER[name]) {
      sendCritterCommand(CRITTER[name]);
      output = [{ text: copy.critter[CRITTER[name]], cls: "text-soft" }];
    }
    else if (name === "ajuda") output = copy.help.map((text) => ({ text }));
    else if (name === "links") output = socialLinks.map(linkLine);
    else if (name === "skills") output = [{ text: technologies.map((tech) => tech.name).join(" · ") }];
    else if (name === "exp")
      output = getExperiences(locale).map((exp) => ({ text: `${exp.date.padEnd(20, " ")} ${exp.title} @ ${exp.company_name}` }));
    else if (name === "idioma") {
      setLocale(locale === "pt-BR" ? "en-US" : "pt-BR");
      output = [{ text: copy.langSwitched }];
    } else if (name === "limpar") {
      setLines([]);
      return;
    } else if (name === "whoami") output = [{ text: copy.whoami }];
    else if (name.startsWith("sudo")) output = [{ text: copy.sudo, cls: "text-accent" }];
    else if (name === "ls") output = [{ text: socialLinks.map((link) => `${link.key}/`).join("  ") }];
    else if (name === "sobre") output = copy.about.map((text) => ({ text }));
    else output = [{ text: `${copy.notFound} ${cmd}. ${copy.notFoundHint}`, cls: "text-accent" }];

    setLines((current) => [...current, echo, ...output]);
  };

  const buttons = [
    ["ajuda", copy.buttons.help],
    ["links", copy.buttons.links],
    ["sobre", copy.buttons.about],
    ["projetos", copy.buttons.projects],
  ];

  return (
    <>
      <SectionHeading id="terminal-title" title={copy.title} hint={copy.hint} />

      <div className="panel px-text text-[12px] tracking-[0.05em]">
        <div className="panel-bar">
          <span />
          <span />
          <span />
          <b>guest@obrenin.dev</b>
        </div>

        <div
          ref={outRef}
          className="term-out h-[220px] overflow-y-auto px-3 pb-1 pt-[14px] leading-[1.8]"
          onClick={(event) => {
            if (event.target === outRef.current) inputRef.current?.focus();
          }}
        >
          {/* aria-live faz leitores de tela anunciarem a resposta de cada comando. */}
          <div aria-live="polite">
            {lines.map((line, index) => (
              <p key={index} className={`m-0 whitespace-pre-wrap [overflow-wrap:anywhere] ${line.cls || ""}`}>
                {line.text}
                {line.link && (
                  <a
                    href={line.link.url}
                    target={line.link.key === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="normal-case text-accent"
                  >
                    {line.link.handle} ↗
                  </a>
                )}
              </p>
            ))}
          </div>

          <label className="flex items-center gap-2 pb-3 pt-[2px]" htmlFor="terminal-cmd">
            <span className="text-accent">guest</span>
            <span className="text-soft">~ $</span>
            <input
              ref={inputRef}
              id="terminal-cmd"
              type="text"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              enterKeyHint="send"
              placeholder={copy.placeholder}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  run(value);
                  setValue("");
                }
              }}
              className="min-w-0 flex-1 border-0 bg-transparent p-0 font-px text-[12px] uppercase tracking-[0.05em] text-fg outline-none placeholder:text-[#55584f]"
              style={{ caretColor: "var(--accent)" }}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2 border-t-2 border-line px-3 py-[10px]">
          {buttons.map(([cmd, label], index) => (
            <button
              key={cmd}
              type="button"
              onClick={() => run(cmd)}
              className={`px-text border-2 px-[10px] py-[6px] text-[12px] active:translate-x-px active:translate-y-px ${
                index === 0 ? "border-accent bg-accent text-bg" : "border-line text-fg hover:border-fg"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Terminal, "terminal");
