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
  advpl,
  tlpp,
  oracle,
  mongodb,
  totvs,
} from "../assets";

// Este arquivo guarda somente conteudo. Comportamento visual fica em components
// e chamadas externas ficam em services, tornando atualizacoes mais seguras.
export const technologies = [
  { name: "SQL", icon: sql },
  { name: "Oracle", icon: oracle },
  { name: "MongoDB", icon: mongodb },
  { name: "Python", icon: python },
  { name: "C#", icon: sharp },
  { name: "ADVPL", icon: advpl },
  { name: "TLPP", icon: tlpp },
  { name: "TOTVS RM", icon: totvs },
  { name: "TOTVS Protheus", icon: totvs },
  { name: "React JS", icon: reactjs },
  { name: "JavaScript", icon: javascript },
  { name: "Git", icon: git },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
];

/** Cria links localizados para as secoes que recebem id por SectionWrapper. */
export const getNavLinks = (t) => [
  { id: "about", title: t.nav.about },
  { id: "work", title: t.nav.work },
  { id: "works", title: t.nav.works },
  { id: "contact", title: t.nav.contact },
];

/** Retorna experiencias no idioma ativo sem misturar texto com codigo visual. */
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
          "Desenvolvimento SQL: criação e otimização de consultas, Stored Procedures, Functions, Views e Transact-SQL para manipulação e extração de dados.",
          "Engenharia de Dados: desenvolvimento e manutenção de pipelines de dados, processos ETL/ELT e integrações entre sistemas utilizando SQL, MongoDB e PySpark. Criação e otimização de consultas, modelagem e transformação de dados, processamento de grandes volumes de informações, automação de cargas, consumo e disponibilização de APIs REST/SOAP.",
          "TOTVS Protheus: desenvolvimento de rotinas automatizadas e customizações com AdvPL, MVC e TL++, criação de Pontos de Entrada (Entry Points), Workflows, WebServices REST/SOAP, relatórios, etiquetas térmicas, integrações e manutenção evolutiva do ERP.",
          "TOTVS RM: desenvolvimento de automações, customizações, fórmulas, metadados, relatórios, gestão de permissões, manutenção do sistema e execução de deploys.",
          "Desenvolvimento de Relatórios: criação de relatórios personalizados no Protheus, RM e Smart View, além de dashboards e interfaces utilizando HTML, CSS e JavaScript.",
          "Python e C#: desenvolvimento de rotinas para automação de processos, integrações e otimização de atividades operacionais.",
          "Power BI: desenvolvimento de dashboards, KPIs, modelagem de dados, DAX e Power Query para apoio à tomada de decisão.",
          "Projetos e Sustentação: participação na implantação de novas tecnologias, melhorias contínuas, integrações, otimização de processos, suporte técnico e administração dos ambientes TOTVS.",
          "Versionamento: controle de versão de códigos, dashboards e projetos utilizando Git e GitHub, garantindo colaboração, rastreabilidade e qualidade nas entregas.",
        ],
      },
      {
        title: "Analista de Infraestrutura",
        company_name: "JOFEGE",
        icon: jofege,
        iconBg: "#FFFFFF",
        date: "Mai 2022 - Mai 2023",
        points: [
          "Responsável por fornecer suporte técnico e soluções para garantir o pleno funcionamento da infraestrutura de TI.",
          "Suporte ao usuário: atendimento e resolução de incidentes relacionados a hardware, software, redes e sistemas operacionais, assegurando produtividade e continuidade das operações.",
          "Administração de redes: configuração, monitoramento e manutenção de ambientes de rede, incluindo Active Directory, gerenciamento de usuários e permissões, políticas de segurança, VPNs, firewalls e resolução de problemas de conectividade.",
          "Gestão de ativos de TI: controle, inventário e gerenciamento do ciclo de vida de equipamentos, licenças de software e demais ativos tecnológicos.",
          "Backup e segurança da informação: implementação, monitoramento e administração de rotinas de backup, garantindo disponibilidade, integridade e proteção dos dados.",
          "Administração do Microsoft 365: gerenciamento de contas de usuários, grupos, permissões, políticas de acesso, segurança e suporte aos serviços da plataforma Microsoft 365.",
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
        "SQL Development: creation and optimization of queries, Stored Procedures, Functions, Views and Transact-SQL for data manipulation and extraction.",
        "Data Engineering: development and maintenance of data pipelines, ETL/ELT processes and system integrations using SQL, MongoDB and PySpark. Creation and optimization of queries, data modeling and transformation, processing of large volumes of information, automation of loads, consumption and publication of REST/SOAP APIs.",
        "TOTVS Protheus: development of automated routines and customizations with AdvPL, MVC and TL++, creation of Entry Points, Workflows, REST/SOAP WebServices, reports, thermal labels, integrations and evolutionary maintenance of the ERP.",
        "TOTVS RM: development of automations, customizations, formulas, metadata, reports, permission management, system maintenance and deployment execution.",
        "Report Development: creation of customized reports in Protheus, RM and Smart View, in addition to dashboards and interfaces using HTML, CSS and JavaScript.",
        "Python and C#: development of routines for automation of processes, integrations and optimization of operational activities.",
        "Power BI: development of dashboards, KPIs, data modeling, DAX and Power Query to support decision-making.",
        "Projects and Support: participation in the implementation of new technologies, continuous improvements, integrations, process optimization, technical support and administration of TOTVS environments.",
        "Versioning: version control of codes, dashboards and projects using Git and GitHub, ensuring collaboration, traceability and quality in deliveries.",
      ],
    },
    {
      title: "IT Infrastructure Analyst",
      company_name: "JOFEGE",
      icon: jofege,
      iconBg: "#FFFFFF",
      date: "May 2022 - May 2023",
      points: [
        "Responsible for providing technical support and solutions to ensure the proper functioning of IT infrastructure.",
        "User Support: troubleshooting hardware, software, network and operating system issues to ensure efficiency and productivity for internal users.",
        "Network Administration: configuration and maintenance of network environments, including Active Directory, implementation of security policies, and resolution of connectivity issues.",
        "Asset Management: tracking and controlling hardware and software assets.",
        "Backup and Security: implementation and management of backup solutions for data protection.",
        "Microsoft 365 Administration: management of user accounts, access controls and security policies.",
      ],
    },
  ];
};

// As chaves sao os nomes exatos dos repositorios no GitHub. Adicione uma entrada
// para definir imagem e tags quando os dados da API nao forem suficientes.
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

/** Projetos de reserva usados sem internet ou quando a API do GitHub falhar. */
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
