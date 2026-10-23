import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "*/index.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Copy for static pages, shared by the HTML and markdown versions
const pages = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/pages" }),
});

export const collections = { blog, pages };
