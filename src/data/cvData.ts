import type { CV } from "@/data/models/CV";
import { CVProjects } from "./projects/projectHelpers";
import { cvExperiences } from "./experience/experienceHelpers";

export const cvData: CV = {
  basics: {
    name: "Yaqin Hasan",
    email: "yaqin.k.hasan@gmail.com",
    phone: "07459 616935",
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
    { name: "Languages", keywords: ["C#", "TypeScript", "JavaScript", "Python", "Rust", "Swift", "SQL"] },
    { name: "Frontend", keywords: ["Vue", "React", "Vite", "Pinia", "SPA Development", "Responsive UI"] },
    {
      name: "Backend",
      keywords: [".NET", "Node.js", "FastAPI", "GraphQL", "REST APIs", "Microservices", "OAuth", "Webhooks"]
    },
    {
      name: "Data",
      keywords: ["MongoDB", "PostgreSQL", "Database Design", "Data Synchronisation", "Schema Design"]
    },
    {
      name: "Infrastructure & DevOps",
      keywords: ["Azure", "AWS", "Docker", "GitHub Actions", "CI/CD Pipelines", "Cloud Infrastructure"]
    },
    {
      name: "Testing & Practices",
      keywords: ["Vitest", "XUnit", "Playwright", "TDD", "Agile", "Code Review"]
    }
  ]
};
