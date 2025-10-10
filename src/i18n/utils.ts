import type { Language } from './config';
import { defaultLang } from './config';

type TranslationKey = string;
type Translations = Record<string, unknown>;

const translations: Record<Language, Translations> = {
  es: {},
  en: {},
  nl: {},
};

/**
 * Load translations for a specific language
 */
export async function loadTranslations(lang: Language): Promise<void> {
  try {
    const module = await import(`./locales/${lang}.json`);
    translations[lang] = module.default;
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
    translations[lang] = {};
  }
}

/**
 * Get translation by key with fallback to default language
 */
export function t(key: TranslationKey, lang: Language = defaultLang): string {
  const keys = key.split('.');
  let value: unknown = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      // Fallback to default language
      value = translations[defaultLang];
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = (value as Record<string, unknown>)[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Detect browser language from Accept-Language header
 */
export function detectBrowserLanguage(acceptLanguage: string | null): Language {
  if (!acceptLanguage) return defaultLang;
  
  // Parse Accept-Language header (e.g., "nl-NL,nl;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, qValue] = lang.trim().split(';q=');
      const langCode = code.split('-')[0].toLowerCase();
      const quality = qValue ? parseFloat(qValue) : 1.0;
      return { code: langCode, quality };
    })
    .sort((a, b) => b.quality - a.quality);
  
  // Find first supported language
  for (const { code } of languages) {
    if (code === 'nl' || code === 'en' || code === 'es') {
      return code;
    }
  }
  
  return defaultLang;
}

/**
 * Get current locale from Astro or URL
 */
export function getLocale(astroLocale: string | undefined, url?: URL): Language {
  // First try Astro.currentLocale
  if (astroLocale) {
    const locale = astroLocale.toLowerCase();
    if (locale === 'nl' || locale === 'en' || locale === 'es') {
      return locale;
    }
  }
  
  // Fallback: detect from URL path
  if (url) {
    const path = url.pathname;
    if (path.startsWith('/nl')) return 'nl';
    if (path.startsWith('/en')) return 'en';
  }
  
  return defaultLang;
}

/**
 * Get localized path
 */
export function getLocalizedPath(path: string, locale: Language): string {
  if (locale === defaultLang) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
}

/**
 * Get alternate language links for SEO
 */
export function getAlternateLinks(path: string): Array<{ lang: Language; href: string }> {
  return [
    { lang: 'nl', href: getLocalizedPath(path, 'nl') },
    { lang: 'en', href: getLocalizedPath(path, 'en') },
    { lang: 'es', href: getLocalizedPath(path, 'es') },
  ];
}
