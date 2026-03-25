import type { BaseExperience } from "@/data/models/Experience";

/** Source-of-truth experience data. Tags drive the carousel filter on ExperiencePage. */
export const experiences: BaseExperience[] = [
  {
    id: "cambridge-kinetics",
    company: "Cambridge Kinetics",
    title: "Software Engineer (Full Stack)",
    techStack: ["C# .NET", "TypeScript", "Azure", "MongoDB", "Vue", "GraphQL"],
    startDate: "May 2024",
    endDate: "January 2026",
    highlights: [
      {
        text: "Reduced customer onboarding configuration from hours to seconds by leading end-to-end delivery of LLM-powered workflow automation, owning requirements scoping, system architecture and team coordination.",
        tags: ["Featured", "AI"]
      },
      {
        text: "Aggregated customer data from multiple external systems by architecting and implementing a data synchronisation service, processing thousands of daily updates across heterogeneous schemas with minimised API overhead.",
        tags: ["Featured", "Backend", "Integrations"]
      },
      {
        text: "Improved legacy REST API performance by implementing type-safe bulk operations, reducing 100 round-trips into a single call and supporting operations on 10k+ records.",
        tags: ["Featured", "Backend"]
      },
      {
        text: "Increased product revenue by co-designing the commercial model for usage-based pricing and subscription add-ons, then extending the existing Stripe billing integration end-to-end without disrupting live subscriptions.",
        tags: ["Backend", "Integrations"]
      },
      {
        text: "Unified customer financial workflows by delivering Xero and QuickBooks integrations, implementing OAuth account linking, webhook ingestion and error reconciliation.",
        tags: ["Backend", "Integrations"]
      },
      {
        text: "Cut MongoDB Atlas costs by ~1000£/month by profiling query patterns, identifying excessive search memory consumption from read-heavy workloads, and migrating to dedicated Atlas Search nodes.",
        tags: ["Featured", "Infra"]
      },
      {
        text: "Halved CI/CD pipeline run times by transitioning to hybrid local and cloud runners, and managed Azure production deployments.",
        tags: ["DevOps", "Infra"]
      },
      {
        text: "Onboarded and mentored engineers and SDETs from zero experience to full team contribution, covering SDLC principles, full stack development best practices and developer tooling.",
        tags: ["Mentoring"]
      }
    ]
  }
];
