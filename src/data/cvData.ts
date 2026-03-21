import type { CV } from "@/data/models/CV";
import { CVProjects } from "./projects/projectHelpers";

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
  work: [
    {
      name: "Cambridge Kinetics",
      position: "Software Engineer (Full Stack) • C# .NET, TypeScript, Azure, MongoDB, Vue, GraphQL",
      startDate: "May 2024",
      endDate: "January 2026",
      highlights: [
        "Reduced customer onboarding configuration from hours to seconds by leading end-to-end delivery of LLM-powered workflow automation, owning requirements scoping, system architecture and team coordination.",
        "Aggregated customer data from multiple external systems by architecting and implementing a data synchronisation service, processing thousands of daily updates across heterogeneous schemas with minimised API overhead.",
        "Improved legacy REST API performance by implementing type-safe bulk operations, reducing 100 round-trips into a single call and supporting operations on 10k+ records.",
        "Increased product revenue by co-designing the commercial model for usage-based pricing and subscription add-ons, then extending the existing Stripe billing integration end-to-end without disrupting live subscriptions.",
        "Unified customer financial workflows by delivering Xero and QuickBooks integrations, implementing OAuth account linking, webhook ingestion and error reconciliation.",
        "Cut MongoDB Atlas costs by ~1000£/month by profiling query patterns, identifying excessive search memory consumption from read-heavy workloads, and migrating to dedicated Atlas Search nodes.",
        "Halved CI/CD pipeline run times by transitioning to hybrid local and cloud runners, and managed Azure production deployments.",
        "Onboarded and mentored engineers and SDETs from zero experience to full team contribution, covering SDLC principles, full stack development best practices and developer tooling."
      ]
    }
  ],
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
