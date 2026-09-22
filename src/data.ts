import { JobEntry, ProjectEntry, TechSkill } from "./types";

export const jobEntries: JobEntry[] = [
  {
    id: "job-1",
    title: "QA ANALYST",
    company: "MMCY",
    dateRange: "2026 - Present",
    bullets: [
      "Manual QA Analyst with deep expertise in testing event websites powered by Cvent—the industry's leading event management platform.",
      "I validate every module: event setup, email campaigns, landing pages, mobile app integrations, and real-time reporting dashboards.",
      "I enhance testing efficiency using AI-assisted tools for regression test maintenance, cross-browser validation, and rapid issue triage."
    ]
  },
  {
    id: "job-2",
    title: "BACKEND DEVELOPER",
    company: "Freelance",
    dateRange: "2024 - Present",
    bullets: [
      "Backend Developer specializing in Python, Django, and PostgreSQL.",
      "I build scalable, secure RESTful APIs and database architectures that power high-performance web applications.",
      "Leverage AI-assisted development tools to accelerate coding, debugging, and optimization without sacrificing code quality."
    ]
  },
  {
    id: "job-3",
    title: "FULLSTACK DEVELOPER/intern",
    company: "Massive Tech",
    dateRange: "2024 - 2024",
    bullets: [
      "Fullstack Developer with proven internship experience building scalable web applications from concept to deployment.",
      "Tech stack includes React, Node.js, and PostgreSQL—with a focus on clean architecture, RESTful APIs, and responsive design",
      "Use AI-powered development tools to streamline debugging, automate repetitive tasks, and ship reliable features on tight deadlines."
    ]
  }
];

export const projectEntries: ProjectEntry[] = [
  {
    id: "proj-1",
    title: "Scribe — Collaborative Notebook",
    description: "A fast, privacy-first markdown editor tailored for engineering notebooks. Leverages local synced storage, intuitive sidebar hierarchies, and offline-first compilation styles.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://scribe-demo.example.com",
    sourceUrl: "https://github.com/example/scribe"
  },
  {
    id: "proj-2",
    title: "Beacon — Live Telemetry Analyzer",
    description: "An interactive, web-based analytics engine that parses and maps streaming server metrics. Visualizes database queries and network latency bottle-necks with sub-millisecond precision.",
    tags: ["Next.js", "GraphQL", "PostgreSQL"],
    liveUrl: "https://beacon-telemetry.example.com",
    sourceUrl: "https://github.com/example/beacon"
  },
  {
    id: "proj-3",
    title: "Pulse — Core Orchestration Agent",
    description: "A lightweight worker daemon designed to monitor container vital statistics across distributed systems. Features custom auto-healing scripts and secure OAuth access logs.",
    tags: ["Node.js", "Docker", "AWS"],
    liveUrl: "https://pulse-core.example.com",
    sourceUrl: "https://github.com/example/pulse"
  }
];

export const currentlyBuildingProject = {
  title: "Aura — Visual Layout Graph engine",
  description: "Crafting a stateful visual graph editor that renders complex component dependency paths. Optimized to load multi-thousand node layouts seamlessly with Zero-Runtime canvas layouts.",
  status: "🚧 Under Construction",
  progress: 70,
  tags: ["React", "TypeScript", "CanvasAPI"]
};

export const techSkills: TechSkill[] = [
  { name: "React" },
  { name: "Node.js" },
  { name: "Python" },
  { name: "TypeScript" },
  { name: "Java" },
  { name: "PostgreSQL" },
  { name: "Git" }
];
