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
    id: "works",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const technologies = [
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "React JS", icon: reactjs },
  { name: "Git", icon: git },
  { name: "C#", icon: sharp },
  { name: "Python", icon: python },
  { name: "SQL", icon: sql },
  { name: "HTML 5", icon: html },
];

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

export const projectFallbacks = [
  {
    name: "Task Scheduler",
    description: "Application developed to schedule tasks to be performed.",
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
    description: "API developed to perform CRUD operations for a sales application.",
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
    description: "Personal portfolio developed to showcase projects and skills.",
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
    description: "API developed to be consumed by the front-end application.",
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

export { technologies, experiences };
