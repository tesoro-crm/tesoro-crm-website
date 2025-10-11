import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    author: z.string(),
    authorImage: z.string().optional(),
    authorBio: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
    aiGenerated: z.boolean().default(false),
    aiPrompt: z.string().optional(),
    socialImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = {
  blog,
};
