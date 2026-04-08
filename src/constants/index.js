import {
  javascript,
  html,
  css,
  reactjs,
  git,
  jofege,
  sharp,
  sql,
  python,
  project1,
  project2,
  project3,
} from "../assets";

export const githubUsername = "BrenoOl1veira";

export const technologies = [
  { name: "SQL", icon: sql },
  { name: "Python", icon: python },
  { name: "C#", icon: sharp },
  { name: "React JS", icon: reactjs },
  { name: "JavaScript", icon: javascript },
  { name: "Git", icon: git },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
];

export const getNavLinks = (t) => [
  { id: "about", title: t.nav.about },
  { id: "work", title: t.nav.work },
  { id: "works", title: t.nav.works },
  { id: "contact", title: t.nav.contact },
];

export const getExperiences = (locale) => {
  if (locale === "pt-BR") {
    return [
      {
        title: "Analista de Sistemas",
        company_name: "JOFEGE",
        icon: jofege,
        iconBg: "#FFFFFF",
        date: "Jul 2023 - Atual",
        points: [
          "Desenvolvimento de queries, stored procedures e rotinas SQL para extração, tratamento e validação de dados de negócio.",
          "Criação de automações com Python e C# para reduzir tarefas manuais e aumentar a confiabilidade de processos internos.",
          "Construção de relatórios, dashboards e indicadores para apoiar áreas financeiras, RH, suprimentos e operação.",
          "Atuação com TOTVS RM e Protheus na implementação de regras, fórmulas, metadados e melhorias orientadas a dados.",
          "Integração entre sistemas, suporte a deploys e evolução de rotinas que aumentam governança e rastreabilidade da informação.",
          "Apoio à tomada de decisão por meio de modelagem de dados, qualidade da informação e visão analítica do negócio.",
        ],
      },
      {
        title: "Estagiário de TI",
        company_name: "JOFEGE",
        icon: jofege,
        iconBg: "#FFFFFF",
        date: "Mai 2022 - Nov 2023",
        points: [
          "Suporte técnico a usuários, infraestrutura e sistemas corporativos com foco em continuidade operacional.",
          "Administração de ambientes de rede, Active Directory, backups e segurança básica da informação.",
          "Mapeamento de ativos, controle de acesso e suporte à operação de ferramentas Microsoft 365.",
          "Base prática em processos, infraestrutura e necessidades de usuários que depois sustentou minha evolução para a área de dados.",
        ],
      },
    ];
  }

  return [
    {
      title: "System Analyst",
      company_name: "JOFEGE",
      icon: jofege,
      iconBg: "#FFFFFF",
      date: "Jul 2023 - Present",
      points: [
        "Built SQL queries, stored procedures and data routines for extraction, validation and business reporting.",
        "Developed Python and C# automations to reduce manual work and improve process reliability.",
        "Delivered reports, dashboards and KPIs for finance, accounting, procurement, HR and operational teams.",
        "Worked across TOTVS RM and Protheus to implement business rules, formulas, metadata and data-oriented improvements.",
        "Supported integrations, deployments and internal solutions with stronger data governance and traceability.",
        "Translated business needs into analytics assets and operational insights that improve decision making.",
      ],
    },
    {
      title: "IT Intern",
      company_name: "JOFEGE",
      icon: jofege,
      iconBg: "#FFFFFF",
      date: "May 2022 - Nov 2023",
      points: [
        "Provided technical support for users, infrastructure and internal systems with a focus on operational continuity.",
        "Managed network environments, Active Directory, backups and basic information security routines.",
        "Handled asset tracking, access control and Microsoft 365 support for internal teams.",
        "Built the operational and business context that later supported my transition into data-focused work.",
      ],
    },
  ];
};

export const projectOverrides = {
  Agenda_De_Tarefas: {
    image: project1,
    tags: ["C#", "HTML", "CSS", ".NET5", "SQL"],
  },
  "XAUS-BACKEND": {
    image: project2,
    tags: ["Java", "Spring Boot", "JPA", "PostgreSQL"],
  },
  BrenoPortfolio: {
    image: project3,
    tags: ["HTML", "CSS", "JavaScript"],
  },
  "CRUD-API-": {
    image: project3,
    tags: ["C#", ".NET"],
  },
};

export const getProjectFallbacks = (locale) => {
  if (locale === "pt-BR") {
    return [
      {
        name: "Task Scheduler",
        description: "Aplicação desenvolvida para agendamento e acompanhamento de tarefas.",
        tags: ["C#", "HTML", "CSS", ".NET5", "SQL"],
        image: project1,
        source_code_link: "https://github.com/BrenoOl1veira/Agenda_De_Tarefas",
        homepage: "",
        updated_at: "2024-01-01T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0,
        language: "C#",
      },
      {
        name: "XAUS API",
        description: "API criada para operações CRUD em uma aplicação de vendas.",
        tags: ["Java", "Spring Boot", "JPA", "PostgreSQL"],
        image: project2,
        source_code_link: "https://github.com/BrenoOl1veira/XAUS-BACKEND",
        homepage: "",
        updated_at: "2024-01-01T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0,
        language: "Java",
      },
      {
        name: "Portfolio",
        description: "Portfólio pessoal criado para apresentar projetos, habilidades e experiência.",
        tags: ["HTML", "CSS", "JavaScript"],
        image: project3,
        source_code_link: "https://github.com/BrenoOl1veira/BrenoPortfolio",
        homepage: "",
        updated_at: "2024-01-01T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0,
        language: "JavaScript",
      },
      {
        name: "Service Orders API",
        description: "API para ser consumida por aplicações front-end de ordens de serviço.",
        tags: ["C#", ".NET"],
        image: project3,
        source_code_link: "https://github.com/BrenoOl1veira/CRUD-API-",
        homepage: "",
        updated_at: "2024-01-01T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0,
        language: "C#",
      },
    ];
  }

  return [
    {
      name: "Task Scheduler",
      description: "Application developed to schedule and track tasks.",
      tags: ["C#", "HTML", "CSS", ".NET5", "SQL"],
      image: project1,
      source_code_link: "https://github.com/BrenoOl1veira/Agenda_De_Tarefas",
      homepage: "",
      updated_at: "2024-01-01T00:00:00Z",
      stargazers_count: 0,
      forks_count: 0,
      language: "C#",
    },
    {
      name: "XAUS API",
      description: "API created to perform CRUD operations for a sales application.",
      tags: ["Java", "Spring Boot", "JPA", "PostgreSQL"],
      image: project2,
      source_code_link: "https://github.com/BrenoOl1veira/XAUS-BACKEND",
      homepage: "",
      updated_at: "2024-01-01T00:00:00Z",
      stargazers_count: 0,
      forks_count: 0,
      language: "Java",
    },
    {
      name: "Portfolio",
      description: "Personal portfolio designed to showcase projects, skills and experience.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: project3,
      source_code_link: "https://github.com/BrenoOl1veira/BrenoPortfolio",
      homepage: "",
      updated_at: "2024-01-01T00:00:00Z",
      stargazers_count: 0,
      forks_count: 0,
      language: "JavaScript",
    },
    {
      name: "Service Orders API",
      description: "API built to be consumed by front-end service order applications.",
      tags: ["C#", ".NET"],
      image: project3,
      source_code_link: "https://github.com/BrenoOl1veira/CRUD-API-",
      homepage: "",
      updated_at: "2024-01-01T00:00:00Z",
      stargazers_count: 0,
      forks_count: 0,
      language: "C#",
    },
  ];
};
