import { z } from "zod";
import { cvSchema } from "@/data/models/CV";

// jsonresume project type — used for CV output and cv.json generation
export type CVProject = NonNullable<z.infer<typeof cvSchema>["projects"]>[number];

/**  Shape of the GitHubProject in githubProjects.ts file that sync-github-projects.ts generates */
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

/** Resolved project for the Projects page (after merging github data + overrides) */
export type FullProject = {
  id: string;
  name: string; // displayName from override, or repo name
  description?: string;
  htmlDescription?: string; // override HTML or README HTML
  url?: string;
  keywords?: string[];
  type?: string; // "Web" | "Desktop" | "Other" — for category grouping
  status?: string; // "Complete" | "In Progress" | "Archived"
  order: number; // sort order within category
};
