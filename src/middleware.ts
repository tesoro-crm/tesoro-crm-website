import { defineMiddleware } from 'astro:middleware';
import type { Language } from './i18n/config';

// URL translations per language
const urlTranslations: Record<Language, Record<string, string>> = {
  nl: {
    '/pricing': '/prijzen',
    '/features': '/kenmerken',
  },
  en: {
    '/prijzen': '/pricing',
    '/kenmerken': '/features',
  },
  es: {
    '/pricing': '/precios',
    '/features': '/caracteristicas',
    '/prijzen': '/precios',
    '/kenmerken': '/caracteristicas',
  },
};

// Reverse mapping for incoming requests
const reverseTranslations: Record<string, string> = {
  '/prijzen': '/pricing',
  '/kenmerken': '/features',
  '/precios': '/pricing',
  '/caracteristicas': '/features',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  
  // Check if this is a translated URL that needs to be rewritten
  for (const [translatedPath, originalPath] of Object.entries(reverseTranslations)) {
    if (pathname === translatedPath || pathname.startsWith(`/en${translatedPath}`) || pathname.startsWith(`/es${translatedPath}`)) {
      // Rewrite the URL internally to the original path
      const newPathname = pathname
        .replace(translatedPath, originalPath)
        .replace(`/en${translatedPath}`, `/en${originalPath}`)
        .replace(`/es${translatedPath}`, `/es${originalPath}`);
      
      url.pathname = newPathname;
      return context.rewrite(url);
    }
  }
  
  return next();
});
