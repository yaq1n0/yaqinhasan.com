import type { ExperienceOverride } from "@/data/models/Experience";

/**
 * Website-specific overrides per experience ID.
 * Only experiences listed here appear on ExperiencePage.
 * Key = BaseExperience.id from experiences.ts.
 */
export const experienceOverrides: Record<string, ExperienceOverride> = {
  "cambridge-kinetics": {
    // No overrides needed yet — base data is already website-ready.
    // Examples of what you could override:
    // title: "Full Stack Software Engineer",
    // techStack: ["C# .NET", "TypeScript", "Azure", "MongoDB", "Vue", "GraphQL", "Stripe"],
    // highlightOverrides: { 0: { tags: ["Featured", "AI", "Backend"] } },
  }
};
