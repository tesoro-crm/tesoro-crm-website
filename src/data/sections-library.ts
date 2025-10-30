/**
 * Sections Library
 *
 * Central registry of all reusable page sections/blocks in the Tesoro website.
 * Each section is documented with its purpose, props, usage, and where it's currently used.
 */

export interface SectionMetadata {
  /** Unique identifier for the section */
  id: string;
  /** Display name of the section */
  name: string;
  /** Category of the section (homepage, blog, features, etc.) */
  category: 'homepage' | 'blog' | 'features' | 'layout' | 'other';
  /** Short description of what the section does */
  description: string;
  /** File path relative to src/components/sections/ */
  path: string;
  /** Props interface description */
  props: string[];
  /** Pages where this section is currently used */
  usedIn: string[];
  /** Visual characteristics */
  visual: {
    background?: string;
    layout: 'full-width' | 'contained' | 'split' | 'grid';
    hasAnimation?: boolean;
  };
  /** Whether the section supports i18n */
  i18n: boolean;
  /** Tags for filtering */
  tags: string[];
}

export const sectionsLibrary: SectionMetadata[] = [
  // ========== HOMEPAGE SECTIONS ==========
  {
    id: 'hero-simple',
    name: 'Hero Simple',
    category: 'homepage',
    description: 'Homepage hero section with headline, CTA buttons, trust indicators, and visual elements (kanban board, property cards)',
    path: 'sections/HeroSimple.astro',
    props: ['locale: Language'],
    usedIn: ['homepage (/)'],
    visual: {
      background: 'gradient',
      layout: 'full-width',
      hasAnimation: true,
    },
    i18n: true,
    tags: ['hero', 'cta', 'visual', 'homepage'],
  },
  {
    id: 'pain-point-section',
    name: 'Pain Point Section',
    category: 'homepage',
    description: 'Two-column section highlighting a customer pain point with question, description, solution, and visual. Supports reverse layout.',
    path: 'sections/PainPointSection.astro',
    props: ['locale: Language', 'painKey: string', 'reverse?: boolean'],
    usedIn: ['homepage (/) - 3x instances (callback, follow_up, lost_deal)'],
    visual: {
      background: 'white/neutral',
      layout: 'split',
      hasAnimation: false,
    },
    i18n: true,
    tags: ['problem-solution', 'visual', 'two-column', 'homepage'],
  },
  {
    id: 'website-showcase',
    name: 'Website Showcase',
    category: 'homepage',
    description: 'Showcases website integration feature with visual preview, benefits list, and CTA',
    path: 'sections/WebsiteShowcase.astro',
    props: ['locale: Language'],
    usedIn: ['homepage (/)'],
    visual: {
      background: 'gradient-neutral',
      layout: 'split',
      hasAnimation: false,
    },
    i18n: true,
    tags: ['feature', 'visual', 'benefits', 'homepage'],
  },
  {
    id: 'lead-workflow-section',
    name: 'Lead Workflow Section',
    category: 'homepage',
    description: 'Displays lead management workflow with visual diagram and feature highlights',
    path: 'sections/LeadWorkflowSection.astro',
    props: ['locale: Language'],
    usedIn: ['homepage (/)'],
    visual: {
      layout: 'contained',
      hasAnimation: false,
    },
    i18n: true,
    tags: ['workflow', 'feature', 'visual', 'homepage'],
  },
  {
    id: 'co-created',
    name: 'Co-Created',
    category: 'homepage',
    description: 'Section highlighting that Tesoro was co-created with real estate professionals',
    path: 'sections/CoCreated.astro',
    props: ['locale: Language'],
    usedIn: ['homepage (/)'],
    visual: {
      layout: 'contained',
    },
    i18n: true,
    tags: ['trust', 'social-proof', 'homepage'],
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    category: 'homepage',
    description: 'Customer testimonials section with quotes and attribution',
    path: 'sections/Testimonials.astro',
    props: ['locale: Language'],
    usedIn: ['homepage (/)'],
    visual: {
      background: 'light',
      layout: 'grid',
    },
    i18n: true,
    tags: ['social-proof', 'testimonials', 'homepage'],
  },
  {
    id: 'demo-section',
    name: 'Demo Section',
    category: 'homepage',
    description: 'Call-to-action section for booking a demo with visual elements',
    path: 'sections/DemoSection.astro',
    props: ['locale: Language'],
    usedIn: ['homepage (/)'],
    visual: {
      background: 'gradient',
      layout: 'contained',
    },
    i18n: true,
    tags: ['cta', 'demo', 'homepage'],
  },
  {
    id: 'faq',
    name: 'FAQ',
    category: 'homepage',
    description: 'Frequently Asked Questions section with expandable/collapsible questions',
    path: 'sections/FAQ.astro',
    props: ['locale: Language'],
    usedIn: ['homepage (/)'],
    visual: {
      layout: 'contained',
    },
    i18n: true,
    tags: ['faq', 'accordion', 'homepage'],
  },
  {
    id: 'final-cta',
    name: 'Final CTA',
    category: 'homepage',
    description: 'Final call-to-action section at the bottom of pages, encouraging signup or demo',
    path: 'sections/FinalCTA.astro',
    props: ['locale: Language'],
    usedIn: ['homepage (/)'],
    visual: {
      background: 'gradient',
      layout: 'contained',
    },
    i18n: true,
    tags: ['cta', 'bottom', 'homepage'],
  },

  // ========== BLOG SECTIONS ==========
  {
    id: 'quote-section',
    name: 'Quote Section',
    category: 'blog',
    description: 'Blockquote section for blog posts with optional attribution',
    path: 'blog/sections/QuoteSection.astro',
    props: ['quote: LocalizedText', 'author?: LocalizedText', 'locale: Language'],
    usedIn: ['blog posts'],
    visual: {
      background: 'light',
      layout: 'contained',
    },
    i18n: true,
    tags: ['blog', 'quote', 'content'],
  },
  {
    id: 'text-section',
    name: 'Text Section',
    category: 'blog',
    description: 'Standard text content section for blog posts with rich text support',
    path: 'blog/sections/TextSection.astro',
    props: ['content: LocalizedText', 'locale: Language'],
    usedIn: ['blog posts'],
    visual: {
      layout: 'contained',
    },
    i18n: true,
    tags: ['blog', 'text', 'content'],
  },
  {
    id: 'comparison-section',
    name: 'Comparison Section',
    category: 'blog',
    description: 'Two-column comparison table for blog posts (before/after, vs competitor, etc.)',
    path: 'blog/sections/ComparisonSection.astro',
    props: ['title: LocalizedText', 'columns: ComparisonColumn[]', 'locale: Language'],
    usedIn: ['blog posts'],
    visual: {
      layout: 'grid',
    },
    i18n: true,
    tags: ['blog', 'comparison', 'table'],
  },
  {
    id: 'stats-grid-section',
    name: 'Stats Grid Section',
    category: 'blog',
    description: 'Grid of statistics/metrics for showcasing numbers in blog posts',
    path: 'blog/sections/StatsGridSection.astro',
    props: ['stats: Stat[]', 'locale: Language'],
    usedIn: ['blog posts'],
    visual: {
      layout: 'grid',
    },
    i18n: true,
    tags: ['blog', 'stats', 'numbers', 'grid'],
  },
  {
    id: 'steps-section',
    name: 'Steps Section',
    category: 'blog',
    description: 'Numbered steps/process section for how-to guides in blog posts',
    path: 'blog/sections/StepsSection.astro',
    props: ['title: LocalizedText', 'steps: Step[]', 'locale: Language'],
    usedIn: ['blog posts'],
    visual: {
      layout: 'contained',
    },
    i18n: true,
    tags: ['blog', 'steps', 'process', 'how-to'],
  },
  {
    id: 'video-section',
    name: 'Video Section',
    category: 'blog',
    description: 'Embedded video section for blog posts (YouTube, Vimeo, etc.)',
    path: 'blog/sections/VideoSection.astro',
    props: ['videoUrl: string', 'title?: LocalizedText', 'locale: Language'],
    usedIn: ['blog posts'],
    visual: {
      layout: 'contained',
    },
    i18n: true,
    tags: ['blog', 'video', 'media'],
  },
  {
    id: 'callout-section',
    name: 'Callout Section',
    category: 'blog',
    description: 'Highlighted callout box for important information in blog posts (info, warning, tip)',
    path: 'blog/sections/CalloutSection.astro',
    props: ['type: "info" | "warning" | "tip"', 'content: LocalizedText', 'locale: Language'],
    usedIn: ['blog posts'],
    visual: {
      layout: 'contained',
    },
    i18n: true,
    tags: ['blog', 'callout', 'highlight'],
  },
  {
    id: 'cta-section',
    name: 'CTA Section',
    category: 'blog',
    description: 'Call-to-action section for blog posts (signup, demo, learn more)',
    path: 'blog/sections/CTASection.astro',
    props: ['title: LocalizedText', 'description: LocalizedText', 'ctaLabel: LocalizedText', 'ctaUrl: string', 'locale: Language'],
    usedIn: ['blog posts'],
    visual: {
      background: 'gradient',
      layout: 'contained',
    },
    i18n: true,
    tags: ['blog', 'cta', 'conversion'],
  },

  // ========== FEATURE SECTIONS ==========
  {
    id: 'features-grid',
    name: 'Features Grid',
    category: 'features',
    description: 'Grid layout for displaying multiple features with icons, titles, and descriptions',
    path: 'sections/FeaturesGrid.astro',
    props: ['locale: Language', 'features: Feature[]'],
    usedIn: ['features pages'],
    visual: {
      layout: 'grid',
    },
    i18n: true,
    tags: ['features', 'grid', 'icons'],
  },
  {
    id: 'competitor-comparison',
    name: 'Competitor Comparison',
    category: 'features',
    description: 'Comparison table showing Tesoro vs competitors with checkmarks',
    path: 'sections/CompetitorComparison.astro',
    props: ['locale: Language'],
    usedIn: ['pricing page', 'features pages'],
    visual: {
      layout: 'contained',
    },
    i18n: true,
    tags: ['comparison', 'competitors', 'table'],
  },

  // ========== OTHER SECTIONS ==========
  {
    id: 'lead-workflow-visual',
    name: 'Lead Workflow Visual',
    category: 'other',
    description: 'Standalone visual component showing lead workflow diagram (used within LeadWorkflowSection)',
    path: 'sections/LeadWorkflowVisual.astro',
    props: ['locale: Language'],
    usedIn: ['LeadWorkflowSection'],
    visual: {
      layout: 'contained',
    },
    i18n: true,
    tags: ['visual', 'workflow', 'diagram'],
  },
];

/**
 * Get sections by category
 */
export function getSectionsByCategory(category: SectionMetadata['category']): SectionMetadata[] {
  return sectionsLibrary.filter(section => section.category === category);
}

/**
 * Get sections by tag
 */
export function getSectionsByTag(tag: string): SectionMetadata[] {
  return sectionsLibrary.filter(section => section.tags.includes(tag));
}

/**
 * Get section by ID
 */
export function getSectionById(id: string): SectionMetadata | undefined {
  return sectionsLibrary.find(section => section.id === id);
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(sectionsLibrary.map(s => s.category)));
}

/**
 * Get all tags
 */
export function getAllTags(): string[] {
  return Array.from(new Set(sectionsLibrary.flatMap(s => s.tags))).sort();
}
