import {
  javascript,
  html,
  css,
  reactjs,
  git,
  jofege,
  sharp,
  python,
  project1,
  project2,
  project3,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "Sobre Mim",
  },
  {
    id: "work",
    title: "Experiência",
  },
  {
    id: "contact",
    title: "Contato",
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Sharp",
    icon: sharp,
  },
  {
    name: "Python",
    icon: python,
  },
];

const experiences = [
  {
    title: "Analista de Sistemas",
    company_name: "JOFEGE",
    icon: jofege,
    iconBg: "#FFFFFF",
    date: "Jul 2023 - Presente",
    points: [
      "Desenvolvimento SQL: Criação de consultas SQL para manipulação de dados em bancos.",
      "Suporte a Projetos: Participação em projetos de TI, implementando tecnologias e atualizações.",
      "Desenvolvimento de Conceitos TOTVS RM: Automatizações conforme solicitação dos usuários.",
      "Desenvolvimento de Relatórios RM Reports: Criação de relatórios e painéis personalizados usando RM Reports.",
      "Manutenção TOTVS RM: Administração de permissões de acesso dentro do ambiente TOTVS RM. Identificação e resolução de problemas do dia a dia.",
      "Desenvolvimento de Fórmulas: Criação e personalização de fórmulas para atender requisitos específicos. Implementação de lógica personalizada para otimizar processos no TOTVS RM.",
      "Implantações no Sistema TOTVS RM: Realização de implantações e integrações no sistema TOTVS.",
      "Desenvolvimento TOTVS RM Avançado: Desenvolvimento de fórmulas e implementações. Desenvolvimento de metadados.",
      "Stored Procedures e Transact-SQL: Criação de stored procedures para lógica clara. Experiência sólida em Transact-SQL.",
      "Desenvolvimento de Relatórios com Power BI: Criação de relatórios e painéis personalizados usando Power BI.",
      "Versionamento de Dashboards POWER BI no GitHub: Versionamento de relatórios através do GitHub por método de esteira de produção, sendo realizado o ambiente de desenvolvimento e produção.",
    ],
  },
  {
    title: "Auxiliar de TI",
    company_name: "JOFEGE",
    icon: jofege,
    iconBg: "#FFFFFF",
    date: "Mai 2022 - Nov 2023",
    points: [
      "Suporte ao Usuário: Resolução de problemas de hardware, software, redes e sistemas operacionais.",
      "Administração de Rede: Configuração e manutenção de rede, incluindo Active Directory. Implementação de políticas de segurança e resolução de conectividade. Gerenciamento de dispositivos de rede como firewalls e VPNs.",
      "Gerenciamento de Ativos: Registro e controle de ativos de hardware e software.",
      "Backup e Segurança: Soluções de backup para proteção de dados.",
      "Administração Microsoft 365: Gerenciamento de contas de usuário e políticas de segurança.",
    ],
  },
];

const projects = [
  {
    name: "Agenda de Tarefas",
    description: "Aplicativo desenvolvido para agendar tarefas a serem realizadas.",
    tags: [
      {
        name: "C#",
        color: "blue-text-gradient",
      },
      {
        name: "HTML",
        color: "green-text-gradient",
      },
      {
        name: "CSS",
        color: "pink-text-gradient",
      },
      {
        name: ".NET5",
        color: "red-text-gradient",
      },
      {
        name: "SQL",
        color: "orange",
      },
    ],
    image: project1,
    source_code_link: "https://github.com/BrenoOl1veira/Agenda_De_Tarefas",
  },
  {
    name: "API XAUS",
    description: "API desenvolvida para realizar operações CRUD para uma aplicação de vendas.",
    tags: [
      {
        name: "JAVA",
        color: "blue-text-gradient",
      },
      {
        name: "SPRING BOOT",
        color: "green-text-gradient",
      },
      {
        name: "JPA",
        color: "pink-text-gradient",
      },
      {
        name: "POSTGRESQL",
        color: "red-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://github.com/BrenoOl1veira/XAUS-BACKEND",
  },
  {
    name: "Portfolio",
    description: "Portfolio desenvolvido.",
    tags: [
      {
        name: "HTML",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/BrenoOl1veira/BrenoPortfolio",
  },
  {
    name: "API de ordens de serviços",
    description: "API desenvolvida para ser consumida para o front-end.",
    tags: [
      {
        name: "C#",
        color: "pink-text-gradient",
      },
      {
        name: ".NET",
        color: "pink-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/BrenoOl1veira/CRUD-API-",
  },
];

export { technologies, experiences, projects };
