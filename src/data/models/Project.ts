import { CV } from "@/data/models/CV";

/** GitHubProject in githubProjects.ts file that sync-github-projects.ts generates */
export type GitHubProject = {
  id: string; // repo name — the canonical project ID
  name: string; // repo name
  description: string | null; // GitHub repo description (the one-liner)
  htmlDescription: string | null; // README markdown converted to HTML, null if no README
  url: string; // html_url
  language: string | null; // primary language from GitHub
  topics: string[]; // GitHub repo topics
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};

/** (jsonResume compliant! derive from CV type) Resolved project for the CV (after merging githubProjects.ts + cvOverrides.ts)  */
export type CVProject = NonNullable<CV["projects"]>[number];

/** Resolved project for the Projects page (after merging githubProjects.ts and projectOverrides.ts) */
export type FullProject = {
  id: string;
  name: string; // displayName from override, or repo name
  description?: string;
  htmlDescription?: string; // override HTML or README HTML
  url?: string;
  keywords?: string[];
  category?: "Desktop" | "Web" | "Package" | "Academic" | "Other" | "Joke";
  status?: "Complete" | "In Progress" | "Archived";
  order: number; // sort order within category
};

export type FullProjectCategory = NonNullable<FullProject["category"]>;
export type FullProjectStatus = NonNullable<FullProject["status"]>;
