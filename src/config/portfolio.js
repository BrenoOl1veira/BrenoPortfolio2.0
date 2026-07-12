/**
 * ARQUIVO DE CONFIGURACAO PRINCIPAL.
 *
 * Altere aqui os dados pessoais que aparecem em mais de um lugar no site,
 * como nome, e-mail, LinkedIn, GitHub e origem do curriculo. Centralizar esses
 * dados evita que um link seja atualizado em uma tela e esquecido em outra.
 *
 * IMPORTANTE: variaveis que comecam com VITE_ ficam visiveis para qualquer
 * visitante no navegador. Por isso, nunca coloque senhas, tokens privados ou
 * chaves secretas neste arquivo ou no arquivo .env.local.
 */
export const portfolioConfig = {
  ownerName: "Breno Oliveira",
  email: "brenooliveira.dev@gmail.com",
  githubUsername: "BrenoOl1veira",
  social: {
    github: "https://github.com/BrenoOl1veira",
    linkedin: "https://www.linkedin.com/in/brenool1veira/",
  },
  resume: {
    repositoryApi: "https://api.github.com/repos/BrenoOl1veira/resume-kit/contents",
    branch: "codex/resume-kit",
    locales: {
      "en-US": { path: "resumes/en/resume.tex", filename: "breno-oliveira-resume-en.pdf" },
      "pt-BR": { path: "resumes/pt-br/curriculo.tex", filename: "breno-oliveira-curriculo-pt-br.pdf" },
    },
  },
  emailJs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
  },
};

/**
 * Indica se o envio direto pelo EmailJS esta pronto. Quando faltar uma das
 * tres configuracoes, o formulario usa o aplicativo de e-mail do visitante.
 */
export const hasEmailJsConfiguration = Object.values(portfolioConfig.emailJs).every(Boolean);
