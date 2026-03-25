import { CV } from "./CV";

/** (jsonResume compliant! derive from CV type) experience (called "work" in the jsonresume schema) type in the CV type */
export type CVExperience = NonNullable<CV["work"]>[number];

// --- Rich experience types for the website pipeline ---

/** Tag categories for filtering highlights via carousel navigation */
export type HighlightTag = "Featured" | "AI" | "Backend" | "Integrations" | "Infra" | "DevOps" | "Mentoring";

/** A single highlight with tags for filtering/grouping */
export type TaggedHighlight = {
  text: string;
  tags: HighlightTag[];
};

/** Source-of-truth experience shape (any structure we want) */
export type BaseExperience = {
  id: string;
  company: string;
  title: string;
  techStack: string[];
  startDate: string;
  endDate: string;
  highlights: TaggedHighlight[];
};

/** Override shape for website-specific tweaks (mirrors ProjectOverride pattern) */
export type ExperienceOverride = Partial<Omit<BaseExperience, "id" | "highlights">> & {
  /** Override individual highlights by index, or append new ones */
  highlightOverrides?: Partial<Record<number, Partial<TaggedHighlight>>>;
};

/** Resolved experience for ExperiencePage.vue — rich, with tag metadata */
export type FullExperience = {
  id: string;
  company: string;
  title: string;
  techStack: string[];
  startDate: string;
  endDate: string;
  highlights: TaggedHighlight[];
  /** All unique tags across highlights, in display order */
  tags: HighlightTag[];
};
