// Este utilitario faz a ponte entre o repositorio do curriculo em LaTeX e o
// servico que o transforma em PDF. Os caminhos editaveis ficam em portfolioConfig.
import { portfolioConfig } from "../config/portfolio";

const decodeGitHubContent = (content) => {
  const cleanContent = content.replace(/\n/g, "");
  const binary = window.atob(cleanContent);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
};

const sanitizeResumeTex = (tex) => tex.replace(/\\usepackage\{xurl\}\r?\n/g, "");

/**
 * Baixa o texto LaTeX do curriculo no idioma solicitado e monta uma URL de
 * compilacao do PDF. Esta funcao nao baixa o PDF: ela devolve o endereco que
 * sera aberto pelo navegador na funcao de clique do componente About.
 */
export const buildResumePdfUrl = async (locale) => {
  const config = portfolioConfig.resume.locales[locale];
  if (!config) {
    throw new Error(`Unsupported resume locale: ${locale}`);
  }

  const response = await fetch(
    `${portfolioConfig.resume.repositoryApi}/${config.path}?ref=${encodeURIComponent(portfolioConfig.resume.branch)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const payload = await response.json();
  const tex = sanitizeResumeTex(decodeGitHubContent(payload.content));

  return `https://latexonline.cc/compile?text=${encodeURIComponent(
    tex
  )}&command=pdflatex&download=${encodeURIComponent(config.filename)}`;
};
