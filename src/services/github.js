import { portfolioConfig } from "../config/portfolio";
import { projectOverrides } from "../constants";

/**
 * CAMADA DE INTEGRACAO COM O GITHUB.
 *
 * Componentes visuais nao devem saber como a API do GitHub funciona. Este
 * arquivo busca os dados e os converte para o formato que a tela de projetos
 * entende. Caso a API mude, a manutencao fica concentrada aqui.
 */
const TAG_COLOR_PALETTE = [
  "blue-text-gradient",
  "green-text-gradient",
  "pink-text-gradient",
  "red-text-gradient",
];

const formatRepositoryName = (repositoryName) =>
  repositoryName.replace(/[-_]+/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());

const getProjectScore = ({ updated_at: updatedAt, stargazers_count: stars, forks_count: forks }) => {
  const timestamp = new Date(updatedAt).getTime();
  const recency = Number.isFinite(timestamp) ? timestamp / 100000000000 : 0;

  return (stars || 0) * 10 + (forks || 0) * 6 + recency;
};

/**
 * Converte um repositorio retornado pelo GitHub para o formato usado no card.
 * `fallbackDescription` e usada quando o repositorio nao possui descricao.
 * `sourceTag` identifica que aquela tecnologia veio da leitura da API.
 */
const toProject = (repository, fallbackDescription, sourceTag) => {
  const override = projectOverrides[repository.name];
  const tags = [...new Set([...(override?.tags || []), repository.language, sourceTag].filter(Boolean))]
    .slice(0, 5)
    .map((name, index) => ({ name, color: TAG_COLOR_PALETTE[index % TAG_COLOR_PALETTE.length] }));

  return {
    name: formatRepositoryName(repository.name),
    description: repository.description || fallbackDescription,
    tags,
    image: override?.image || "",
    source_code_link: repository.html_url,
    homepage: repository.homepage || "",
    updated_at: repository.updated_at,
    stargazers_count: repository.stargazers_count || 0,
    forks_count: repository.forks_count || 0,
    score: getProjectScore(repository),
  };
};

/**
 * Busca apenas repositorios publicos que nao sao forks e os ordena para
 * mostrar primeiro os mais relevantes. A pontuacao considera estrelas, forks
 * e data de atualizacao; ela nao altera nenhum dado no GitHub.
 */
export const getGitHubProjects = async ({ fallbackDescription, sourceTag }) => {
  const response = await fetch(
    `https://api.github.com/users/${portfolioConfig.githubUsername}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github+json" } }
  );

  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

  const repositories = await response.json();
  return repositories
    .filter((repository) => !repository.fork)
    .map((repository) => toProject(repository, fallbackDescription, sourceTag))
    .sort((first, second) => second.score - first.score);
};
