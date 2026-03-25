import type { CVExperience } from "@/data/models/Experience";

/**
 * CV-specific overrides per experience ID.
 * Only experiences listed here appear in the CV.
 * Key = BaseExperience.id from experiences.ts.
 *
 * Overrides are merged on top of the auto-generated CV shape
 * (which flattens highlights and recombines title + techStack into position).
 */
export const experienceCvOverrides: Record<string, Partial<CVExperience>> = {
  "cambridge-kinetics": {
    // No overrides needed — the auto-generated position and highlights are CV-ready.
    // Examples:
    // position: "Software Engineer (Full Stack) • C# .NET, TypeScript, Azure, MongoDB, Vue, GraphQL",
    // highlights: ["Custom CV-only bullet point"],
  }
};
