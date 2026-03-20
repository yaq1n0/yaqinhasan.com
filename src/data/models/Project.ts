import { z } from "zod";
import { cvSchema } from "@/data/models/CV";

// jsonresume project type — used for CV output and cv.json generation
export type CVProject = NonNullable<z.infer<typeof cvSchema>["projects"]>[number];

// Shape of data pulled from GitHub API (auto-generated into githubProjects.ts)
export interface GitHubProject {
  id: string; // repo name — the canonical project ID
  name: string; // repo name
  description: string | null; // GitHub repo description (the one-liner)
  url: string; // html_url
  readmeHtml: string | null; // README markdown converted to HTML, null if no README
  language: string | null; // primary language from GitHub
  topics: string[]; // GitHub repo topics
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

// Resolved project for the Projects page (after merging github data + overrides)
export interface FullProject {
  id: string;
  name: string; // displayName from override, or repo name
  description?: string;
  htmlDescription?: string; // override HTML or README HTML
  url?: string;
  keywords?: string[];
  type?: string; // "Web" | "Desktop" | "Other" — for category grouping
  status?: string; // "Complete" | "In Progress" | "Archived"
  order: number; // sort order within category
}
