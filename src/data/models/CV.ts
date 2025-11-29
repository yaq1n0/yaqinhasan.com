import { z } from "zod";

// Personal Information Schema
const personalInfoSchema = z.object({
  name: z.string(),
  portfolio: z.string().optional(),
  linkedin: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  tagline: z.string(),
  objective: z.string().optional()
});

// Experience Schema
const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(), // undefined means "Present"
  bullets: z.array(z.string())
});

// Education Subsection Schema (for nested items like modules, achievements)
const educationSubsectionSchema = z.object({
  label: z.string(),
  content: z.string()
});

// Education Schema
const educationSchema = z.object({
  institution: z.string(),
  degree: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  grade: z.string().optional(),
  subsections: z.array(educationSubsectionSchema).optional()
});

// Project Schema
const projectSchema = z.object({
  name: z.string(),
  dates: z.string(),
  description: z.string(),
  skills: z.array(z.string())
});

// Skill Category Schema
const skillCategorySchema = z.object({
  category: z.string(),
  items: z.array(z.string())
});

// Full CV Schema
export const cvSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillCategorySchema),
  interests: z.array(z.string())
});

// TypeScript type inferred from Zod schema
export type CV = z.infer<typeof cvSchema>;
