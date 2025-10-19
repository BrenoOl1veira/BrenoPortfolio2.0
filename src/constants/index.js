import {
  javascript,
  // html,
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

/**
 * navLinks
 * ----------------------------------------
 * Array que define os links de navegação do site.
 * - id: usado para âncoras na página (#about, #work, #contact)
 * - title: texto exibido no menu (pode ser traduzido se desejar)
 */
export const navLinks = [
  {
    id: "about",
    title: "About Me",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

/**
 * technologies
 * ----------------------------------------
 * Array com as tecnologias/habilidades do desenvolvedor.
 * Cada objeto contém:
 * - name: nome da tecnologia
 * - icon: caminho para o ícone da tecnologia (SVG ou imagem)
 */
const technologies = [
  // { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "React JS", icon: reactjs },
  { name: "Git", icon: git },
  { name: "C#", icon: sharp },
  { name: "Python", icon: python },
  { name: "SQL", icon: sql },
];

/**
 * experiences
 * ----------------------------------------
 * Array de experiências profissionais.
 * Cada experiência contém:
 * - title: cargo/função
 * - company_name: nome da empresa
 * - icon: ícone da empresa
 * - iconBg: cor de fundo do ícone
 * - date: período de atuação
 * - points: lista de responsabilidades e conquistas (em inglês)
 */
const experiences = [
  {
    title: "System Analyst",
    company_name: "JOFEGE",
    icon: jofege,
    iconBg: "#FFFFFF",
    date: "Jul 2023 - Present",
    points: [
      "SQL Development: Creation of queries for data manipulation and extraction.",
      "Project Support: Participation in the implementation of new technologies and IT updates.",
      "TOTVS RM Concepts Development: Automation of processes according to user requirements.",
      "RM Reports Development: Design and implementation of customized reports and dashboards.",
      "Protheus and RM Reports Development: Development and maintenance of personalized reports for both systems.",
      "Smart View Reports Development: Creation of advanced analytical reports using Smart View.",
      "HTML, CSS, and JavaScript Reports Development: Building custom and interactive reports and dashboards.",
      "Python and C# Routine Development: Automation and optimization of internal business processes.",
      "TOTVS RM Maintenance: Management of permissions and resolution of daily system issues.",
      "Formulas and Metadata Development in TOTVS RM: Creation and customization of advanced formulas and metadata implementations.",
      "TOTVS RM System Deployments: Execution of system deployments and integrations.",
      "Stored Procedures and Transact-SQL: Development of complex procedures and advanced queries.",
      "Power BI Reports Development: Design of interactive dashboards and business indicators.",
      "Power BI Dashboard Version Control on GitHub: Version management and deployment pipelines for BI projects.",
    ],
  },
  {
    title: "IT Intern",
    company_name: "JOFEGE",
    icon: jofege,
    iconBg: "#FFFFFF",
    date: "May 2022 - Nov 2023",
    points: [
      "Responsible for providing technical support and solutions to ensure the proper functioning of IT infrastructure.",
      "User Support: Troubleshooting hardware, software, network, and operating system issues. Ensuring efficiency and productivity for internal users.",
      "Network Administration: Configuration and maintenance of network environments, including Active Directory. Implementation of security policies and resolution of connectivity issues. Management of network devices such as firewalls and VPNs.",
      "Asset Management: Tracking and controlling hardware and software assets.",
      "Backup and Security: Implementation and management of backup solutions for data protection.",
      "Microsoft 365 Administration: Management of user accounts, access controls, and security policies.",
    ],
  },
];

/**
 * projects
 * ----------------------------------------
 * Array de projetos realizados.
 * Cada projeto contém:
 * - name: nome do projeto
 * - description: breve descrição do projeto (em inglês)
 * - tags: lista de tecnologias usadas, com cores para destaque visual
 * - image: imagem ou thumbnail do projeto
 * - source_code_link: link para o repositório do projeto
 */
const projects = [
  {
    name: "Task Scheduler",
    description: "Application developed to schedule tasks to be performed.",
    tags: [
      { name: "C#", color: "blue-text-gradient" },
      { name: "HTML", color: "green-text-gradient" },
      { name: "CSS", color: "pink-text-gradient" },
      { name: ".NET5", color: "red-text-gradient" },
      { name: "SQL", color: "orange" },
    ],
    image: project1,
    source_code_link: "https://github.com/BrenoOl1veira/Agenda_De_Tarefas",
  },
  {
    name: "XAUS API",
    description: "API developed to perform CRUD operations for a sales application.",
    tags: [
      { name: "JAVA", color: "blue-text-gradient" },
      { name: "SPRING BOOT", color: "green-text-gradient" },
      { name: "JPA", color: "pink-text-gradient" },
      { name: "POSTGRESQL", color: "red-text-gradient" },
    ],
    image: project2,
    source_code_link: "https://github.com/BrenoOl1veira/XAUS-BACKEND",
  },
  {
    name: "Portfolio",
    description: "Personal portfolio developed to showcase projects and skills.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
    ],
    image: project3,
    source_code_link: "https://github.com/BrenoOl1veira/BrenoPortfolio",
  },
  {
    name: "Service Orders API",
    description: "API developed to be consumed by the front-end application.",
    tags: [
      { name: "C#", color: "pink-text-gradient" },
      { name: ".NET", color: "pink-text-gradient" },
    ],
    image: project3,
    source_code_link: "https://github.com/BrenoOl1veira/CRUD-API-",
  },
];

// Exporta arrays para uso em outros componentes
export { technologies, experiences, projects };
