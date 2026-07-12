// Ingles e o idioma de reserva para navegadores sem preferencia suportada salva.
export const defaultLocale = "en-US";

/**
 * Todos os textos visiveis para visitantes ficam neste objeto. Ao criar um
 * novo idioma, copie a estrutura completa de "en-US" e traduza apenas os
 * valores. As mesmas chaves sao necessarias para a troca de idioma funcionar
 * sem condicoes extras dentro dos componentes.
 */
export const translations = {
  "en-US": {
    localeLabel: "EN",
    nav: {
      about: "About",
      work: "Experience",
      works: "Projects",
      contact: "Contact",
    },
    navbar: {
      role: "Data Engineer | Data Analyst",
    },
    hero: {
      badge: "Portfolio",
      titlePrefix: "Hello, I'm",
      primaryCta: "View Projects",
      secondaryCta: "Contact Me",
      linkedinLabel: "LinkedIn profile",
      githubLabel: "GitHub profile",
      emailLabel: "Send an email",
    },
    about: {
      subtitle: "Professional summary",
      title: "About Me",
      body:
        "Hello!\nI’m a Data Specialist with strong experience in Data Engineering, data pipelines, ETL/ELT processes, system integration, and data automation. My expertise includes SQL, Python, C#, REST and SOAP APIs, Data Warehousing, Power BI, as well as extensive experience with TOTVS Protheus and RM.\nIn addition to data engineering, I have solid expertise in developing automated routines and custom solutions within the TOTVS Protheus ERP. I have advanced knowledge of AdvPL, MVC, Workflow, REST and SOAP WebServices, SQL-PL, report development, thermal label generation, Entry Points (Pontos de Entrada), and general ERP customizations, delivering solutions that improve business processes, system integration, and operational efficiency.\nThroughout my career, I’ve delivered high-impact data and ERP solutions, including query and process optimizations that reduced execution time from 40 minutes to under 1 minute, significantly improving system performance, scalability, and data availability. I have designed, implemented, and maintained large-scale data pipelines and integration processes, ensuring reliability, data quality, and seamless communication across multiple systems.\nI’m also responsible for identifying inefficient data flows and transforming them into optimized, scalable, and well-structured architectures. By automating processes and improving integrations, I help reduce operational costs, increase system performance, and enable more efficient decision-making.\nMy experience spans critical business domains such as Finance, Accounting, Purchasing, Inventory, Human Resources, and Global Services, combining deep technical knowledge with a strong understanding of business processes.\nIn short, I’m a Data Engineer and ERP Solutions Specialist focused on transforming complex, slow, and manual processes into fast, reliable, automated, and scalable solutions that generate real business value through data and technology.",
      resume: "Resume",
      resumeLabel: "Download CV",
      resumeHint: "Choose the language of the generated PDF resume.",
      resumeEn: "English",
      resumePt: "Portuguese",
      resumePreparing: "Preparing CV...",
      resumeError: "I couldn't generate the resume PDF right now. Please try again in a moment.",
      imageAlt: "Profile image",
    },
    tech: {
      subtitle: "Tools and technologies",
      title: "Skills",
    },
    experience: {
      subtitle: "What I have been building",
      title: "Professional Experience",
    },
    works: {
      subtitle: "Featured work from GitHub",
      title: "Projects.",
      intro:
        "I highlight the 3 strongest and most recently active repositories first, then keep the rest available behind a secondary view.",
      viewAll: "View All on GitHub",
      loading: "Loading repositories from GitHub...",
      error: "Unable to load GitHub projects right now. Showing saved highlights.",
      viewMore: "View More Projects",
      viewLess: "Show Less Projects",
      sourceTag: "Source Code",
      fallbackDescription: "Public GitHub repository available in my portfolio feed.",
      repoLabel: "GitHub Repository",
      live: "Live",
      updated: "Updated",
      publicRepo: "Public repo",
      stars: "stars",
      forks: "forks",
    },
    contact: {
      banner:
        "Let's connect to talk about data engineering, analytics and automation opportunities.",
      subtitle: "Get in touch",
      title: "Contact.",
      helper:
        "The email service is not configured yet. The form will open your default email app with the message ready to send.",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      namePlaceholder: "What's your name?",
      emailPlaceholder: "What's your email address?",
      messagePlaceholder: "What do you want to say?",
      sending: "Sending...",
      send: "Send",
      openEmail: "Open Email App",
      success: "Message sent successfully!",
      error: "Oops! Something went wrong, please try again.",
      subjectPrefix: "Portfolio contact from",
    },
  },
  "pt-BR": {
    localeLabel: "PT",
    nav: {
      about: "Sobre",
      work: "Experiência",
      works: "Projetos",
      contact: "Contato",
    },
    navbar: {
      role: "Engenheiro de Dados | Analista de Dados",
    },
    hero: {
      badge: "Portfólio",
      titlePrefix: "Olá, Sou",
      primaryCta: "Ver Projetos",
      secondaryCta: "Falar Comigo",
      linkedinLabel: "Perfil no LinkedIn",
      githubLabel: "Perfil no GitHub",
      emailLabel: "Enviar um email",
    },
    about: {
      subtitle: "Resumo profissional",
      title: "Sobre Mim",
      body:
        "Olá!\nSou um Especialista em Dados com sólida experiência em Engenharia de Dados, pipelines de dados, processos de ETL/ELT, integração de sistemas e automação de dados. Tenho domínio de SQL, Python, C#, APIs REST e SOAP, Data Warehouse, Power BI, além de ampla experiência com os ERPs TOTVS Protheus e RM.\nAlém da Engenharia de Dados, possuo forte experiência no desenvolvimento de rotinas automatizadas e soluções personalizadas no ERP TOTVS Protheus. Tenho domínio de AdvPL, MVC, Workflow, WebServices REST e SOAP, SQL-PL, desenvolvimento de relatórios, etiquetas térmicas, Pontos de Entrada (Entry Points) e customizações em geral, entregando soluções que aprimoram processos de negócio, integrações entre sistemas e eficiência operacional.\nAo longo da minha carreira, desenvolvi soluções de alto impacto para dados e ERP, incluindo otimizações de consultas e processos que reduziram tempos de execução de 40 minutos para menos de 1 minuto, melhorando significativamente o desempenho, a escalabilidade e a disponibilidade das informações. Também projetei, implementei e mantive pipelines de dados e processos de integração em larga escala, garantindo confiabilidade, qualidade dos dados e comunicação eficiente entre múltiplos sistemas.\nAtuo na identificação de fluxos de dados ineficientes, transformando-os em arquiteturas otimizadas, escaláveis e bem estruturadas. Por meio da automação de processos e da melhoria das integrações, contribuo para a redução de custos operacionais, aumento da performance dos sistemas e suporte à tomada de decisões baseada em dados.\nMinha experiência abrange áreas críticas do negócio, como Financeiro, Contabilidade, Compras, Estoque, Recursos Humanos e Serviços Globais, combinando sólido conhecimento técnico com uma visão estratégica dos processos empresariais.\nEm resumo, sou um Engenheiro de Dados e Especialista em Soluções ERP focado em transformar processos complexos, lentos e manuais em soluções rápidas, confiáveis, automatizadas e escaláveis, gerando valor real para o negócio por meio de dados e tecnologia.",
      resume: "Currículo",
      resumeLabel: "Baixar CV",
      resumeHint: "Escolha o idioma do PDF gerado a partir do resume-kit.",
      resumeEn: "Inglês",
      resumePt: "Português",
      resumePreparing: "Preparando currículo...",
      resumeError: "Não consegui gerar o PDF do currículo agora. Tente novamente em instantes.",
      imageAlt: "Imagem de perfil",
    },
    tech: {
      subtitle: "Ferramentas e tecnologias",
      title: "Habilidades",
    },
    experience: {
      subtitle: "O que venho construindo",
      title: "Experiência Profissional",
    },
    works: {
      subtitle: "Projetos em destaque do GitHub",
      title: "Projetos.",
      intro:
        "Eu destaco primeiro os 3 repositórios mais fortes e mais atualizados, e deixo os demais acessíveis em uma visualização secundária.",
      viewAll: "Ver Tudo no GitHub",
      loading: "Carregando repositórios do GitHub...",
      error: "Não foi possível carregar os projetos do GitHub agora. Exibindo os destaques salvos.",
      viewMore: "Ver Mais Projetos",
      viewLess: "Ver Menos Projetos",
      sourceTag: "Código Fonte",
      fallbackDescription: "Repositório público do GitHub disponível no meu portfólio.",
      repoLabel: "Repositório GitHub",
      live: "Abrir",
      updated: "Atualizado",
      publicRepo: "Repositório público",
      stars: "stars",
      forks: "forks",
    },
    contact: {
      banner:
        "Vamos conversar sobre oportunidades em engenharia de dados, analytics e automação.",
      subtitle: "Entre em contato",
      title: "Contato.",
      helper:
        "O serviço de email ainda não está configurado. O formulário vai abrir o aplicativo de email padrão com a mensagem pronta para envio.",
      name: "Seu Nome",
      email: "Seu Email",
      message: "Sua Mensagem",
      namePlaceholder: "Qual é o seu nome?",
      emailPlaceholder: "Qual é o seu endereço de email?",
      messagePlaceholder: "O que você gostaria de dizer?",
      sending: "Enviando...",
      send: "Enviar",
      openEmail: "Abrir Email",
      success: "Mensagem enviada com sucesso!",
      error: "Ops! Algo deu errado, tente novamente.",
      subjectPrefix: "Contato do portfólio de",
    },
  },
};
