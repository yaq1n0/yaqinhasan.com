import { experiences } from "./experiences";
import { experienceOverrides } from "./experienceOverrides";
import { experienceCvOverrides } from "./experienceCvOverrides";
import type { FullExperience, CVExperience, HighlightTag, TaggedHighlight } from "@/data/models/Experience";

/** Canonical display order for tags in the carousel */
const TAG_ORDER: HighlightTag[] = ["Featured", "AI", "Backend", "Integrations", "Infra", "DevOps", "Mentoring"];

/** Resolve a base experience + website overrides → FullExperience */
const resolveFullExperience = (id: string): FullExperience | undefined => {
  const base = experiences.find((e) => e.id === id);
  if (!base) {
    console.warn(`[experienceHelpers] Override references unknown experience: "${id}"`);
    return undefined;
  }

  const override = experienceOverrides[id] ?? {};

  // Merge highlight-level overrides
  const highlights: TaggedHighlight[] = base.highlights.map((h, i) => {
    const ho = override.highlightOverrides?.[i];
    return ho ? { ...h, ...ho } : h;
  });

  // Derive unique tags in canonical order
  const tagSet = new Set(highlights.flatMap((h) => h.tags));
  const tags = TAG_ORDER.filter((t) => tagSet.has(t));

  return {
    id,
    company: override.company ?? base.company,
    title: override.title ?? base.title,
    techStack: override.techStack ?? base.techStack,
    startDate: override.startDate ?? base.startDate,
    endDate: override.endDate ?? base.endDate,
    highlights,
    tags
  };
};

/** Resolve a base experience + CV overrides → CVExperience (JSON Resume compliant) */
const resolveCVExperience = (id: string): CVExperience | undefined => {
  const base = experiences.find((e) => e.id === id);
  if (!base) {
    console.warn(`[experienceHelpers] CV override references unknown experience: "${id}"`);
    return undefined;
  }

  const override = experienceCvOverrides[id] ?? {};

  return {
    name: override.name ?? base.company,
    position: override.position ?? `${base.title} • ${base.techStack.join(", ")}`,
    startDate: override.startDate ?? base.startDate,
    endDate: override.endDate ?? base.endDate,
    highlights: override.highlights ?? base.highlights.map((h) => h.text),
    ...override
  };
};

/** For ExperiencePage.vue — all experiences with rich tag metadata */
export const fullExperiences: FullExperience[] = Object.keys(experienceOverrides)
  .map(resolveFullExperience)
  .filter((e): e is FullExperience => !!e);

/** For cvData.ts — flat JSON Resume compliant work entries */
export const cvExperiences: CVExperience[] = Object.keys(experienceCvOverrides)
  .map(resolveCVExperience)
  .filter((e): e is CVExperience => !!e);
