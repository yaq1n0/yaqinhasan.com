import type { CV } from "@/data/models/CV";
import { CVProjects } from "./projects/projectHelpers";
import { cvExperiences } from "./experience/experienceHelpers";

// Contact details are injected from the environment so they never live in the
// repo or on the deployed site. Set VITE_CV_EMAIL / VITE_CV_PHONE in a local
// .env.local (gitignored) to render a CV with contact info — see README.
// `import.meta.env` is undefined when this module is loaded outside Vite
// (e.g. the gen:cv-json tsx script), so guard the access.
const env = import.meta.env as ImportMetaEnv | undefined;

export const cvData: CV = {
  basics: {
    name: "Yaqin Hasan",
    email: env?.VITE_CV_EMAIL || undefined,
    phone: env?.VITE_CV_PHONE || undefined,
    url: "https://yaqinhasan.com",
    location: { city: "Cambridge", countryCode: "UK" },
    profiles: [
      { network: "LinkedIn", username: "yaqinhasan", url: "https://linkedin.com/in/yaqinhasan" },
      { network: "GitHub", username: "yaq1n0", url: "https://github.com/yaq1n0" }
    ]
  },
  work: cvExperiences,
  education: [
    {
      institution: "University of Southampton",
      studyType: "BSc Computer Science (Honours)",
      startDate: "2020",
      endDate: "2023",
      courses: [
        "Advanced Computer Architecture & Systems",
        "Real-time Computing & Embedded Systems (RTOS)",
        "Programming Language Concepts (compiler theory)",
        "Web Architecture & Hypertext Technologies (REST Theory)"
      ]
    }
  ],
  projects: CVProjects,
  skills: [
    { name: "Languages", keywords: ["Java", "Python", "TypeScript", "C#", "SQL", "Rust", "Swift"] },
    {
      name: "AI & Agents",
      keywords: ["Agentic Systems", "Strands Agents", "LiteLLM", "MCP", "AG-UI", "LLM Tool Calling", "Agent Evals", "LLM Classifiers"]
    },
    {
      name: "Backend",
      keywords: ["Quarkus", ".NET", "Node.js", "FastAPI", "REST", "GraphQL", "Modular Monoliths", "Distributed Systems"]
    },
    {
      name: "Data & Storage",
      keywords: ["PostgreSQL", "Redis", "S3", "MongoDB", "Schema Design", "Data Synchronisation"]
    },
    {
      name: "Cloud & Infrastructure",
      keywords: ["AWS", "Kubernetes", "Docker", "Azure", "GitHub Actions", "CI/CD"]
    },
    {
      name: "Observability",
      keywords: ["OpenTelemetry", "AWS Kinesis Firehose", "Product Analytics", "Metrics-driven Iteration"]
    },
    { name: "Frontend", keywords: ["Vue", "React", "Vite", "Pinia"] },
    {
      name: "Practices",
      keywords: ["Product Engineering", "Hypothesis-driven Development", "TDD", "Vitest", "Playwright", "XUnit", "Code Review"]
    }
  ]
};
