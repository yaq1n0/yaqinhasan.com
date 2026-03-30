import { z } from "zod";

export const BlogFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  coverImage: z.string().optional(),
  draft: z.boolean().default(false)
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  htmlContent: string;
  readingTime: number;
};
