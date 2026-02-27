import { z } from "zod";
import { cvSchema } from "@/data/models/CV";

// Extract the jsonresume project type from the CV schema
export type CVProject = NonNullable<z.infer<typeof cvSchema>["projects"]>[number];

// Id for projects with matching html description, usually the GitHub repository name.
// Will fail compile if you don't add a matching entry in projectHtmlDescriptions.
export const ProjectIds = ["yaqinhasan.com", "ThymPi", "VidSrcWrapper"] as const;
export type ProjectId = (typeof ProjectIds)[number];
export const isProjectId = (id: string): id is ProjectId => ProjectIds.includes(id as ProjectId);

// Extend with additional portfolio-specific properties
export type FullProject = CVProject & {
  id?: ProjectId; // optional id for matching with html descriptions
  htmlDescription?: string; // rich HTML content, rendered instead of description when present
  status?: string; // "Complete", "In Progress", "Archived", etc.
};
