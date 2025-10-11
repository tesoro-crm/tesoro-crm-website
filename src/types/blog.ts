/**
 * Blog Post Type Definitions for AI Agent Content Generation
 * 
 * This file defines the complete structure for blog posts that AI agents
 * will use to generate consistent, multilingual content.
 */

export type Language = 'nl' | 'en' | 'es';

export interface LocalizedText {
  nl: string;
  en: string;
  es: string;
}

export interface LocalizedContent {
  nl: {
    text: string;
  };
  en: {
    text: string;
  };
  es: {
    text: string;
  };
}

export interface Author {
  name: string;
  image: string;
  bio: LocalizedText;
}

export interface BlogMeta {
  id: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  category: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  readingTime: number;
  aiGenerated: boolean;
  aiPrompt?: string;
}

export interface SEO {
  canonicalURL: string;
  socialImage: string;
  keywords: string[];
}

export interface Image {
  src: string;
  alt: LocalizedText;
  width?: number;
  height?: number;
  caption?: LocalizedText;
}

export interface Hero {
  title: LocalizedText;
  description: LocalizedText;
  image: Image;
  publishDate: string;
}

export interface Button {
  text: LocalizedText;
  url: string;
  style: 'primary' | 'secondary' | 'outline';
}

export interface Metric {
  value: string;
  label: LocalizedText;
}

// Section Types
export type SectionType = 
  | 'introduction'
  | 'problem'
  | 'solution'
  | 'results'
  | 'quote'
  | 'takeaways'
  | 'technical'
  | 'faq-section'
  | 'cta'
  | 'image-gallery'
  | 'comparison'
  | 'timeline';

export interface BaseSection {
  type: SectionType;
  id: string;
  title?: LocalizedText;
}

export interface IntroductionSection extends BaseSection {
  type: 'introduction';
  content: LocalizedContent;
}

export interface ProblemSection extends BaseSection {
  type: 'problem';
  content: LocalizedContent;
  highlights?: LocalizedText[];
}

export interface SolutionSubsection {
  id: string;
  title: LocalizedText;
  content: LocalizedContent;
  image?: Image;
  code?: {
    language: string;
    code: string;
    caption?: LocalizedText;
  };
}

export interface SolutionSection extends BaseSection {
  type: 'solution';
  subsections: SolutionSubsection[];
}

export interface ResultsSection extends BaseSection {
  type: 'results';
  metrics: Metric[];
  content: LocalizedContent;
}

export interface QuoteSection extends BaseSection {
  type: 'quote';
  quote: LocalizedText;
  author: string;
  role: LocalizedText;
  image?: string;
}

export interface TakeawaysSection extends BaseSection {
  type: 'takeaways';
  items: LocalizedText[];
}

export interface TechnicalSection extends BaseSection {
  type: 'technical';
  content: LocalizedContent;
  code?: {
    language: string;
    code: string;
    caption?: LocalizedText;
  }[];
  images?: Image[];
}

export interface FAQItem {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface FAQSectionType extends BaseSection {
  type: 'faq-section';
  items: FAQItem[];
}

export interface CTASection extends BaseSection {
  type: 'cta';
  content: LocalizedContent;
  buttons: Button[];
}

export interface ImageGallerySection extends BaseSection {
  type: 'image-gallery';
  images: Image[];
  layout: 'grid' | 'masonry' | 'carousel';
}

export interface ComparisonItem {
  label: LocalizedText;
  before: LocalizedText;
  after: LocalizedText;
}

export interface ComparisonSection extends BaseSection {
  type: 'comparison';
  items: ComparisonItem[];
}

export interface TimelineItem {
  date: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface TimelineSection extends BaseSection {
  type: 'timeline';
  items: TimelineItem[];
}

export type Section = 
  | IntroductionSection
  | ProblemSection
  | SolutionSection
  | ResultsSection
  | QuoteSection
  | TakeawaysSection
  | TechnicalSection
  | FAQSectionType
  | CTASection
  | ImageGallerySection
  | ComparisonSection
  | TimelineSection;

export interface BlogPost {
  meta: BlogMeta;
  seo: SEO;
  hero: Hero;
  sections: Section[];
  relatedPosts: string[];
  faq?: FAQItem[];
}

// Validation helpers
export function isValidLanguage(lang: string): lang is Language {
  return ['nl', 'en', 'es'].includes(lang);
}

export function hasAllLanguages(text: Partial<LocalizedText>): text is LocalizedText {
  return !!(text.nl && text.en && text.es);
}
