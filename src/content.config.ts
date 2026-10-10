import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number().optional(),
    tags: z.array(z.string()).default([]),
    links: z.object({
      paper: z.string().url().optional(),
      code: z.string().url().optional(),
      site: z.string().url().optional(),
    }).optional(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    year: z.number(),
    authors: z.string().optional(),
    links: z.object({
      paper: z.string().url().optional(),
      code: z.string().url().optional(),
    }).optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, publications, posts };
