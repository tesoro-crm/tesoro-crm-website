/**
 * Knowledge Base Type Definitions
 * Similar structure to blog system for consistency
 */

export type Language = 'nl' | 'en' | 'es';

export interface LocalizedText {
  nl: string;
  en: string;
  es: string;
}

export interface LocalizedContent {
  nl: { text: string };
  en: { text: string };
  es: { text: string };
}

// Article Categories
export type ArticleCategory =
  | 'getting-started'
  | 'contacts'
  | 'properties'
  | 'communication'
  | 'integrations'
  | 'reports'
  | 'settings'
  | 'troubleshooting'
  | 'best-practices';

// Difficulty Levels
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// Section Types (reuse blog section types)
export type SectionType =
  | 'text'
  | 'callout'
  | 'steps'
  | 'video'
  | 'code'
  | 'image'
  | 'faq'
  | 'comparison'
  | 'warning'
  | 'tip';

// Base Section Interface
export interface BaseSection {
  type: SectionType;
  id: string;
  title?: LocalizedText;
}

// Text Section
export interface TextSection extends BaseSection {
  type: 'text';
  content: LocalizedContent;
}

// Callout Section (tip, warning, note)
export interface CalloutSection extends BaseSection {
  type: 'callout';
  variant: 'tip' | 'warning' | 'note' | 'success' | 'danger';
  content: LocalizedContent;
}

// Steps Section (numbered instructions)
export interface StepsSection extends BaseSection {
  type: 'steps';
  steps: Array<{
    title: LocalizedText;
    content: LocalizedContent;
    image?: {
      src: string;
      alt: LocalizedText;
    };
  }>;
}

// Video Section
export interface VideoSection extends BaseSection {
  type: 'video';
  videoUrl: string; // YouTube, Loom, etc.
  thumbnail?: string;
  caption?: LocalizedText;
  duration?: string; // e.g., "5:30"
}

// Code Section
export interface CodeSection extends BaseSection {
  type: 'code';
  language: string; // javascript, python, json, etc.
  code: string;
  caption?: LocalizedText;
  filename?: string;
}

// Image Section
export interface ImageSection extends BaseSection {
  type: 'image';
  src: string;
  alt: LocalizedText;
  caption?: LocalizedText;
  width?: number;
  height?: number;
}

// FAQ Section
export interface FAQSection extends BaseSection {
  type: 'faq';
  items: Array<{
    question: LocalizedText;
    answer: LocalizedContent;
  }>;
}

// Comparison Section
export interface ComparisonSection extends BaseSection {
  type: 'comparison';
  items: Array<{
    title: LocalizedText;
    description: LocalizedText;
    pros?: LocalizedText[];
    cons?: LocalizedText[];
  }>;
}

// Union type for all sections
export type Section =
  | TextSection
  | CalloutSection
  | StepsSection
  | VideoSection
  | CodeSection
  | ImageSection
  | FAQSection
  | ComparisonSection;

// Article Metadata
export interface ArticleMeta {
  id: string;
  version: string;
  publishDate: string;
  updatedAt: string;
  authorId: string;
  category: ArticleCategory;
  difficulty: DifficultyLevel;
  tags: string[];
  featured: boolean;
  readingTime: number; // minutes
  videoIncluded: boolean;
  aiGenerated: boolean;
}

// SEO Metadata
export interface ArticleSEO {
  socialImage?: string;
  keywords: string[];
}

// Hero Section
export interface ArticleHero {
  title: LocalizedText;
  description: LocalizedText;
  icon?: string; // emoji or icon name
}

// Related Articles
export interface RelatedArticle {
  id: string;
  relevance?: 'high' | 'medium' | 'low';
}

// Complete Article Structure
export interface KennisbankArticle {
  meta: ArticleMeta;
  seo: ArticleSEO;
  hero: ArticleHero;
  sections: Section[];
  relatedArticles?: string[]; // Array of article IDs
  faq?: Array<{
    question: LocalizedText;
    answer: LocalizedText;
  }>;
}
