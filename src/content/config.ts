import { defineCollection, z } from 'astro:content';

/**
 * Blog Collection Schema for JSON-based posts
 * Type: 'data' for JSON/YAML files (not MDX)
 * See: https://docs.astro.build/en/guides/content-collections/
 */

// Localized text schema (nl, en, es)
const localizedTextSchema = z.object({
  nl: z.string(),
  en: z.string(),
  es: z.string(),
});

// Image schema
const imageSchema = z.object({
  src: z.string(),
  alt: localizedTextSchema,
  width: z.number().optional(),
  height: z.number().optional(),
  caption: localizedTextSchema.optional(),
});

// Author schema
const authorSchema = z.object({
  name: z.string(),
  image: z.string(),
  bio: localizedTextSchema,
});

// Button schema
const buttonSchema = z.object({
  text: localizedTextSchema,
  url: z.string(),
  style: z.enum(['primary', 'secondary', 'outline']),
});

// Metric schema
const metricSchema = z.object({
  value: z.string(),
  label: localizedTextSchema,
});

// Content schema (for sections)
const contentSchema = z.object({
  nl: z.object({ text: z.string() }),
  en: z.object({ text: z.string() }),
  es: z.object({ text: z.string() }),
});

// Base section schema
const baseSectionSchema = z.object({
  type: z.string(),
  id: z.string(),
  title: localizedTextSchema.optional(),
});

// Section schemas (discriminated union would be ideal, but keeping flexible for now)
const sectionSchema = z.union([
  // Introduction
  baseSectionSchema.extend({
    type: z.literal('introduction'),
    content: contentSchema,
  }),
  // Problem
  baseSectionSchema.extend({
    type: z.literal('problem'),
    content: contentSchema,
    highlights: z.array(localizedTextSchema).optional(),
  }),
  // Solution
  baseSectionSchema.extend({
    type: z.literal('solution'),
    subsections: z.array(z.object({
      id: z.string(),
      title: localizedTextSchema,
      content: contentSchema,
      image: imageSchema.optional(),
      code: z.object({
        language: z.string(),
        code: z.string(),
        caption: localizedTextSchema.optional(),
      }).optional(),
    })),
  }),
  // Results
  baseSectionSchema.extend({
    type: z.literal('results'),
    metrics: z.array(metricSchema),
    content: contentSchema,
  }),
  // Quote
  baseSectionSchema.extend({
    type: z.literal('quote'),
    quote: localizedTextSchema,
    author: z.string(),
    role: localizedTextSchema,
    image: z.string().optional(),
  }),
  // Takeaways
  baseSectionSchema.extend({
    type: z.literal('takeaways'),
    items: z.array(localizedTextSchema),
  }),
  // CTA
  baseSectionSchema.extend({
    type: z.literal('cta'),
    content: contentSchema,
    buttons: z.array(buttonSchema),
  }),
  // Generic fallback for other section types
  baseSectionSchema.extend({
    type: z.string(),
  }).passthrough(),
]);

// FAQ schema
const faqSchema = z.object({
  question: localizedTextSchema,
  answer: localizedTextSchema,
});

// Main blog collection schema
const blog = defineCollection({
  type: 'data', // For JSON files
  schema: z.object({
    meta: z.object({
      id: z.string(),
      version: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      author: authorSchema,
      category: z.string(),
      tags: z.array(z.string()),
      featured: z.boolean(),
      draft: z.boolean(),
      readingTime: z.number(),
      aiGenerated: z.boolean(),
      aiPrompt: z.string().optional(),
    }),
    seo: z.object({
      canonicalURL: z.string(),
      socialImage: z.string(),
      keywords: z.array(z.string()),
    }),
    hero: z.object({
      title: localizedTextSchema,
      description: localizedTextSchema,
      image: imageSchema,
      publishDate: z.string(),
    }),
    sections: z.array(sectionSchema),
    relatedPosts: z.array(z.string()),
    faq: z.array(faqSchema).optional(),
  }),
});

// Knowledge Base collection schema
const knowledgeBase = defineCollection({
  type: 'data', // For JSON files
  schema: z.object({
    meta: z.object({
      id: z.string(),
      version: z.string(),
      publishDate: z.string(),
      updatedAt: z.string(),
      authorId: z.string(),
      category: z.enum([
        'getting-started',
        'contacts',
        'properties',
        'communication',
        'integrations',
        'reports',
        'settings',
        'troubleshooting',
        'best-practices',
      ]),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
      tags: z.array(z.string()),
      featured: z.boolean(),
      readingTime: z.number(),
      videoIncluded: z.boolean(),
      aiGenerated: z.boolean(),
    }),
    seo: z.object({
      socialImage: z.string().optional(),
      keywords: z.array(z.string()),
    }),
    hero: z.object({
      title: localizedTextSchema,
      description: localizedTextSchema,
      icon: z.string().optional(), // emoji or icon name
    }),
    sections: z.array(sectionSchema),
    relatedArticles: z.array(z.string()).optional(),
    faq: z.array(faqSchema).optional(),
  }),
});

export const collections = {
  blog,
  'knowledge-base': knowledgeBase,
};
