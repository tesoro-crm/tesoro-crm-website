/**
 * Blog Helper Functions
 * Utilities for working with JSON-based blog posts
 */

import type { BlogPost, Section, Language, LocalizedText } from '../types/blog';

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

/**
 * Validate that all required languages are present
 */
export function hasAllLanguages(text: Partial<LocalizedText>): text is LocalizedText {
  return !!(text.nl && text.en && text.es);
}

/**
 * Validate section order
 */
export function validateSectionOrder(sections: Section[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (sections.length < 3) {
    errors.push('Blog post must have at least 3 sections');
  }

  if (sections[0]?.type !== 'introduction') {
    errors.push('First section must be "introduction"');
  }

  if (sections[sections.length - 1]?.type !== 'cta') {
    errors.push('Last section must be "cta"');
  }

  // Check problem comes before solution
  const problemIndex = sections.findIndex(s => s.type === 'problem');
  const solutionIndex = sections.findIndex(s => s.type === 'solution');
  
  if (problemIndex !== -1 && solutionIndex !== -1 && problemIndex > solutionIndex) {
    errors.push('Problem section must come before solution section');
  }

  // Check solution comes before results
  const resultsIndex = sections.findIndex(s => s.type === 'results');
  
  if (solutionIndex !== -1 && resultsIndex !== -1 && solutionIndex > resultsIndex) {
    errors.push('Solution section must come before results section');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate unique section IDs
 */
export function validateUniqueSectionIds(sections: Section[]): {
  valid: boolean;
  duplicates: string[];
} {
  const ids = sections.map(s => s.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  return {
    valid: duplicates.length === 0,
    duplicates: [...new Set(duplicates)]
  };
}

/**
 * Extract all text content from sections for word count
 */
export function extractTextContent(sections: Section[], lang: Language): string {
  let text = '';

  sections.forEach(section => {
    if ('content' in section && section.content) {
      text += section.content[lang]?.text || '';
    }

    if (section.type === 'solution' && 'subsections' in section) {
      section.subsections.forEach(sub => {
        text += sub.content[lang]?.text || '';
      });
    }

    if (section.type === 'quote' && 'quote' in section) {
      text += section.quote[lang] || '';
    }

    if (section.type === 'takeaways' && 'items' in section) {
      section.items.forEach(item => {
        text += item[lang] || '';
      });
    }
  });

  return text;
}

/**
 * Validate blog post completeness
 */
export function validateBlogPost(post: BlogPost): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check meta
  if (!post.meta.id) errors.push('Missing meta.id');
  if (!post.meta.author.name) errors.push('Missing author name');
  if (!hasAllLanguages(post.meta.author.bio)) {
    errors.push('Author bio missing one or more languages');
  }
  if (post.meta.tags.length < 3) {
    warnings.push('Recommended to have at least 3 tags');
  }

  // Check hero
  if (!hasAllLanguages(post.hero.title)) {
    errors.push('Hero title missing one or more languages');
  }
  if (!hasAllLanguages(post.hero.description)) {
    errors.push('Hero description missing one or more languages');
  }
  if (!hasAllLanguages(post.hero.image.alt)) {
    errors.push('Hero image alt text missing one or more languages');
  }

  // Check sections
  const sectionValidation = validateSectionOrder(post.sections);
  if (!sectionValidation.valid) {
    errors.push(...sectionValidation.errors);
  }

  const idValidation = validateUniqueSectionIds(post.sections);
  if (!idValidation.valid) {
    errors.push(`Duplicate section IDs: ${idValidation.duplicates.join(', ')}`);
  }

  // Check reading time
  const nlText = extractTextContent(post.sections, 'nl');
  const calculatedReadingTime = calculateReadingTime(nlText);
  if (Math.abs(post.meta.readingTime - calculatedReadingTime) > 2) {
    warnings.push(`Reading time (${post.meta.readingTime}) differs from calculated (${calculatedReadingTime})`);
  }

  // Check SEO
  if (post.seo.keywords.length < 3) {
    warnings.push('Recommended to have at least 3 SEO keywords');
  }

  // Check related posts
  if (post.relatedPosts.length < 2) {
    warnings.push('Recommended to have at least 2 related posts');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, lang: Language): string {
  const date = new Date(dateString);
  const locales = {
    nl: 'nl-NL',
    en: 'en-US',
    es: 'es-ES'
  };

  return date.toLocaleDateString(locales[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Get section title for TOC
 */
export function getSectionTitle(section: Section, lang: Language): string {
  if (section.title) {
    return section.title[lang];
  }

  // Default titles for sections without explicit title
  const defaultTitles: Record<string, LocalizedText> = {
    introduction: {
      nl: 'Introductie',
      en: 'Introduction',
      es: 'Introducción'
    },
    cta: {
      nl: 'Aan de slag',
      en: 'Get Started',
      es: 'Comenzar'
    }
  };

  return defaultTitles[section.type]?.[lang] || section.id;
}

/**
 * Strip HTML tags from text
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Get excerpt from content
 */
export function getExcerpt(content: string, maxLength: number = 160): string {
  const text = stripHtml(content);
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
  return stripHtml(text).split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Validate image path exists
 */
export function validateImagePath(path: string): boolean {
  // In production, this would check if file exists
  // For now, just validate format
  return path.startsWith('/images/blog/') && 
         (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.webp'));
}

/**
 * Generate social sharing URLs
 */
export function generateShareUrls(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
  };
}

/**
 * Generate structured data for blog post
 */
export function generateStructuredData(post: BlogPost, lang: Language, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.hero.title[lang],
    description: post.hero.description[lang],
    image: post.hero.image.src,
    datePublished: post.hero.publishDate,
    dateModified: post.meta.updatedAt,
    author: {
      '@type': 'Person',
      name: post.meta.author.name,
      description: post.meta.author.bio[lang]
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tesoro CRM',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tesorohq.io/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: post.seo.keywords.join(', '),
    articleSection: post.meta.category,
    wordCount: countWords(extractTextContent(post.sections, lang)),
    timeRequired: `PT${post.meta.readingTime}M`
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(post: BlogPost, lang: Language) {
  if (!post.faq || post.faq.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(item => ({
      '@type': 'Question',
      name: item.question[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[lang]
      }
    }))
  };
}
