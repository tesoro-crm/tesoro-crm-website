import type { Language } from './config';
import { defaultLang } from './config';

type TranslationKey = string;
type Translations = Record<string, any>;

const translations: Record<Language, Translations> = {
  nl: {},
  en: {},
  es: {},
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
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to default language
      value = translations[defaultLang];
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
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
 * Get current locale from Astro
 */
export function getLocale(astroLocale: string | undefined): Language {
  if (!astroLocale) return defaultLang;
  
  const locale = astroLocale.toLowerCase();
  if (locale === 'nl' || locale === 'en' || locale === 'es') {
    return locale;
  }
  
  return defaultLang;
}

// URL translations per language
const urlTranslations: Record<Language, Record<string, string>> = {
  nl: {
    '/pricing': '/prijzen',
    '/features': '/kenmerken',
    '/status': '/status',
  },
  en: {
    '/pricing': '/pricing',
    '/features': '/features',
    '/status': '/status',
  },
  es: {
    '/pricing': '/precios',
    '/features': '/caracteristicas',
    '/status': '/estado',
  },
};

/**
 * Get localized path with translated URL
 */
export function getLocalizedPath(path: string, locale: Language): string {
  // Translate the path for the target locale
  const translatedPath = urlTranslations[locale]?.[path] || path;
  
  if (locale === defaultLang) {
    return translatedPath;
  }
  
  // Remove leading slash if present
  const cleanPath = translatedPath.startsWith('/') ? translatedPath.slice(1) : translatedPath;
  
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
