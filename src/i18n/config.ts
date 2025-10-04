export const languages = {
  nl: 'Nederlands',
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'nl' as const;

export type Language = keyof typeof languages;

export const languageFlags = {
  nl: '🇳🇱',
  en: '🇬🇧',
  es: '🇪🇸',
} as const;

export const languageRoutes = {
  nl: '/',
  en: '/en',
  es: '/es',
} as const;
