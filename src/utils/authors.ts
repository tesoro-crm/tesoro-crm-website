import authorsData from '../data/authors.json';

export interface Author {
  id: string;
  name: string;
  image: string;
  bio: {
    nl: string;
    en: string;
    es: string;
  };
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

/**
 * Get author by ID from the central authors library
 */
export function getAuthor(authorId: string): Author | null {
  const author = authorsData[authorId as keyof typeof authorsData];
  return author || null;
}

/**
 * Get all authors
 */
export function getAllAuthors(): Author[] {
  return Object.values(authorsData);
}
