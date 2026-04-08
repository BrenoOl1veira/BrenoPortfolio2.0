import React, { useEffect, useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import {
  githubUsername,
  getProjectFallbacks,
  projectOverrides,
} from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../i18n/LanguageProvider";

const FEATURED_PROJECTS_LIMIT = 3;
const tagColorPalette = [
  "blue-text-gradient",
  "green-text-gradient",
  "pink-text-gradient",
  "red-text-gradient",
];

const formatRepoName = (repoName) =>
  repoName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getTagColor = (index) => tagColorPalette[index % tagColorPalette.length];

const getProjectScore = (repo) => {
  const updatedAt = new Date(repo.updated_at).getTime();
  const recentBoost = Number.isFinite(updatedAt) ? updatedAt / 100000000000 : 0;

  return (
    (repo.stargazers_count || 0) * 10 +
    (repo.forks_count || 0) * 6 +
    recentBoost
  );
};

const ProjectCard = React.memo(
  ({
    index,
    locale,
    copy,
    name,
    description,
    tags,
    image,
    source_code_link,
    homepage,
    updated_at,
    stargazers_count,
    forks_count,
  }) => {
    const lastUpdate = updated_at
      ? new Date(updated_at).toLocaleDateString(locale)
      : null;

    return (
      <motion.div
        variants={fadeIn("up", "spring", index * 0.12, 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <Tilt
          tiltMaxAngleX={12}
          tiltMaxAngleY={12}
          perspective={1000}
          scale={1.02}
          transitionSpeed={400}
          gyroscope={true}
          className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-white/5"
          tiltEnable={typeof window !== "undefined" && window.innerWidth >= 640}
        >
          <div className="flex flex-col h-full">
            <div className="relative w-full h-[230px] rounded-2xl overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={`${name} screenshot`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full flex-col justify-end bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.45),_transparent_45%),linear-gradient(135deg,#0f172a_0%,#111827_45%,#1e293b_100%)] p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {copy.repoLabel}
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white">{name}</h3>
                </div>
              )}

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-3 right-3 flex gap-2 pointer-events-auto">
                  {homepage && (
                    <button
                      onClick={() =>
                        window.open(homepage, "_blank", "noopener,noreferrer")
                      }
                      aria-label={`Open ${name} live project`}
                      className="bg-white/10 px-3 py-2 rounded-full text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      {copy.live}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      window.open(source_code_link, "_blank", "noopener,noreferrer")
                    }
                    aria-label={`Open ${name} project source code on GitHub`}
                    className="bg-black/60 w-10 h-10 rounded-full flex justify-center items-center backdrop-blur-sm hover:scale-105 transition-transform"
                  >
                    <img
                      src={github}
                      alt="github icon"
                      className="w-5 h-5 object-contain"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 flex-1 flex flex-col">
              <h3 className="text-white font-bold text-[20px] sm:text-[24px]">
                {name}
              </h3>

              <p className="mt-2 text-secondary text-[14px] leading-relaxed min-h-[56px]">
                {description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={`${name}-${tag.name}`}
                    className={`text-[13px] ${tag.color} bg-transparent`}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-white/50">
                <span>{lastUpdate ? `${copy.updated} ${lastUpdate}` : copy.publicRepo}</span>
                <span>
                  {stargazers_count} {copy.stars} • {forks_count} {copy.forks}
                </span>
              </div>
            </div>
          </div>
        </Tilt>
      </motion.div>
    );
  }
);

const Works = () => {
  const { locale, t } = useLanguage();
  const [projects, setProjects] = useState(getProjectFallbacks(locale));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    setProjects(getProjectFallbacks(locale));
  }, [locale]);

  useEffect(() => {
    let ignore = false;

    const normalizeTags = (repo, override) => {
      const overrideTags = override?.tags || [];
      const derivedTags = [repo.language, t.works.sourceTag].filter(Boolean);
      const merged = [...overrideTags, ...derivedTags];

      return [...new Set(merged)].slice(0, 5).map((tag, index) => ({
        name: tag,
        color: getTagColor(index),
      }));
    };

    const normalizeRepo = (repo) => {
      const override = projectOverrides[repo.name];

      return {
        name: formatRepoName(repo.name),
        description: repo.description || t.works.fallbackDescription,
        tags: normalizeTags(repo, override),
        image: override?.image || "",
        source_code_link: repo.html_url,
        homepage: repo.homepage || "",
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count || 0,
        forks_count: repo.forks_count || 0,
        score: getProjectScore(repo),
      };
    };

    const loadProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`);
        }

        const repositories = await response.json();
        const normalizedProjects = repositories
          .filter((repo) => !repo.fork)
          .map(normalizeRepo)
          .sort((a, b) => b.score - a.score);

        if (!ignore && normalizedProjects.length > 0) {
          setProjects(normalizedProjects);
          setError("");
        }
      } catch {
        if (!ignore) {
          setError(t.works.error);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    loadProjects();

    return () => {
      ignore = true;
    };
  }, [locale, t]);

  const featuredProjects = useMemo(
    () => projects.slice(0, FEATURED_PROJECTS_LIMIT),
    [projects]
  );
  const otherProjects = useMemo(
    () => projects.slice(FEATURED_PROJECTS_LIMIT),
    [projects]
  );

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          {t.works.subtitle}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>{t.works.title}</h2>
      </motion.div>

      <div className="w-full flex justify-center">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] text-center"
        >
          {t.works.intro}
        </motion.p>
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href={`https://github.com/${githubUsername}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
        >
          {t.works.viewAll}
        </a>
      </div>

      {loading && (
        <p className="mt-8 text-center text-sm text-secondary">
          {t.works.loading}
        </p>
      )}

      {!loading && error && (
        <p className="mt-8 text-center text-sm text-secondary">{error}</p>
      )}

      <div className="mt-16 flex flex-wrap gap-7 justify-center">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={`${project.source_code_link}-${index}`}
            index={index}
            locale={locale}
            copy={t.works}
            {...project}
          />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="mt-12 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setShowAllProjects((current) => !current)}
            className="rounded-full bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2563eb]"
          >
            {showAllProjects
              ? t.works.viewLess
              : `${t.works.viewMore} (${otherProjects.length})`}
          </button>

          {showAllProjects && (
            <div className="mt-10 flex flex-wrap gap-7 justify-center">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.source_code_link}-extra-${index}`}
                  index={index}
                  locale={locale}
                  copy={t.works}
                  {...project}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Works, "works");
