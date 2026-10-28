import React, { useEffect, useMemo, useState } from "react";

import { SectionWrapper } from "../hoc";
import { getProjectFallbacks, pixelIcons } from "../constants";
import { useLanguage } from "../i18n/LanguageProvider";
import { portfolioConfig } from "../config/portfolio";
import { getGitHubProjects } from "../services/github";
import PixelIcon from "./PixelIcon";
import SectionHeading from "./SectionHeading";

// Mantem a pagina inicial objetiva, mas permite acessar todos os projetos sem
// sair do portfolio.
const FEATURED_PROJECTS_LIMIT = 4;
const TAG_COLORS = ["text-accent", "text-soft", "text-muted"];

// React.memo evita redesenhar os cards quando apenas outro estado da secao
// (como abrir "ver mais") muda.
const ProjectCard = React.memo(
  ({ locale, copy, name, description, tags, image, source_code_link, homepage, updated_at, stargazers_count, forks_count }) => {
    const lastUpdate = updated_at ? new Date(updated_at).toLocaleDateString(locale) : null;
    // A API devolve tags como objetos; os projetos de reserva usam texto simples.
    const tagNames = tags.map((tag) => (typeof tag === "string" ? tag : tag.name));

    return (
      <article className="panel flex h-full flex-col transition-transform duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5">
        <div className="panel-bar">
          <span />
          <span />
          <span />
          <b>{copy.repoLabel}</b>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2 border-line">
          {image ? (
            <img src={image} alt={`${name} screenshot`} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full w-full flex-col justify-end bg-bg p-5 [background-image:radial-gradient(var(--dot)_1px,transparent_1.4px)] [background-size:12px_12px]">
              <PixelIcon rows={pixelIcons.github} className="mb-3 h-8 w-8 text-accent" />
              <p className="px-text m-0 text-[20px] leading-tight [overflow-wrap:anywhere]">{name}</p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="px-text m-0 text-[18px] leading-tight [overflow-wrap:anywhere]">{name}</h3>
          <p className="m-0 mt-2 flex-1 text-[14px] leading-6 text-fg/80">{description}</p>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {tagNames.map((tag, index) => (
              <span key={`${name}-${tag}`} className={`text-[13px] ${TAG_COLORS[index % TAG_COLORS.length]}`}>
                #{tag}
              </span>
            ))}
          </div>

          <div className="px-text mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
            <span>{lastUpdate ? `${copy.updated} ${lastUpdate}` : copy.publicRepo}</span>
            <span>
              ★ {stargazers_count} · ⑂ {forks_count}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name}: ${copy.sourceTag} (GitHub)`}
              className="btn-px px-3 py-2 text-[11px]"
            >
              {copy.sourceTag} <span aria-hidden="true">↗</span>
            </a>
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}: ${copy.live}`}
                className="btn-px btn-ghost px-3 py-[6px] text-[11px]"
              >
                {copy.live} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }
);

/**
 * Busca projetos no GitHub e mostra os itens cadastrados localmente se a rede
 * falhar. As regras da API e a conversao dos dados ficam em services/github.js.
 */
const Works = () => {
  const { locale, t } = useLanguage();
  // Guarda o resultado junto com o idioma da busca. Enquanto o idioma do
  // resultado for diferente do atual, a secao esta carregando e mostra os
  // projetos de reserva, sem precisar zerar estado dentro de um efeito.
  const [result, setResult] = useState({ locale: null, projects: [], failed: false });
  const [showAllProjects, setShowAllProjects] = useState(false);
  const loading = result.locale !== locale;

  useEffect(() => {
    // Impede que uma resposta antiga da API atualize a tela depois de trocar o
    // idioma ou sair desta secao, evitando avisos e informacoes inconsistentes.
    let ignore = false;

    getGitHubProjects({ fallbackDescription: t.works.fallbackDescription })
      .then((projects) => {
        if (!ignore) setResult({ locale, projects, failed: false });
      })
      .catch(() => {
        if (!ignore) setResult({ locale, projects: [], failed: true });
      });

    return () => {
      ignore = true;
    };
  }, [locale, t]);

  const projects = useMemo(
    () => (!loading && result.projects.length > 0 ? result.projects : getProjectFallbacks(locale)),
    [loading, result, locale]
  );
  const error = !loading && result.failed ? t.works.error : "";

  const featuredProjects = useMemo(() => projects.slice(0, FEATURED_PROJECTS_LIMIT), [projects]);
  const otherProjects = useMemo(() => projects.slice(FEATURED_PROJECTS_LIMIT), [projects]);
  const visibleProjects = showAllProjects ? projects : featuredProjects;

  return (
    <>
      <SectionHeading id="works-title" title={t.works.title} hint={t.works.subtitle} />

      <p className="m-0 max-w-[680px] text-[14px] leading-6 text-muted">{t.works.intro}</p>

      {(loading || error) && (
        <p className="px-text m-0 text-[12px] text-muted" role="status">
          {loading ? t.works.loading : error}
        </p>
      )}

      <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={`${project.source_code_link}-${index}`} locale={locale} copy={t.works} {...project} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {otherProjects.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAllProjects((current) => !current)}
            aria-expanded={showAllProjects}
            className="btn-px"
          >
            {showAllProjects ? t.works.viewLess : `${t.works.viewMore} (${otherProjects.length})`}
          </button>
        )}
        <a
          href={`${portfolioConfig.social.github.url}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-px btn-ghost"
        >
          {t.works.viewAll} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "works");
