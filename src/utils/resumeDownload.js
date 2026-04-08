const RESUME_REPO_API = "https://api.github.com/repos/BrenoOl1veira/resume-kit/contents";
const RESUME_REF = "codex/resume-kit";

const resumeConfig = {
  "en-US": {
    path: "resumes/en/resume.tex",
    filename: "breno-oliveira-resume-en.pdf",
  },
  "pt-BR": {
    path: "resumes/pt-br/curriculo.tex",
    filename: "breno-oliveira-curriculo-pt-br.pdf",
  },
};

const decodeGitHubContent = (content) => {
  const cleanContent = content.replace(/\n/g, "");
  const binary = window.atob(cleanContent);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
};

const sanitizeResumeTex = (tex) => tex.replace(/\\usepackage\{xurl\}\r?\n/g, "");

export const buildResumePdfUrl = async (locale) => {
  const config = resumeConfig[locale];
  if (!config) {
    throw new Error(`Unsupported resume locale: ${locale}`);
  }

  const response = await fetch(
    `${RESUME_REPO_API}/${config.path}?ref=${encodeURIComponent(RESUME_REF)}`,
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
