import { z } from "zod";
import { cvSchema } from "@/data/models/CV";

// Extract the jsonresume project type from the CV schema
type CVProject = NonNullable<z.infer<typeof cvSchema>["projects"]>[number];

// Extend with additional portfolio-specific properties
export type FullProject = CVProject & {
  htmlDescription?: string; // rich HTML content, rendered instead of description when present
  status?: string; // "Complete", "In Progress", "Archived", etc.
};
