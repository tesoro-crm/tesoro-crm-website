export const languages = {
  es: 'Español',
  en: 'English',
  nl: 'Nederlands',
} as const;

export const defaultLang = 'es' as const;

export type Language = keyof typeof languages;

export const languageFlags = {
  es: '🇪🇸',
  en: '🇬🇧',
  nl: '🇳🇱',
} as const;

export const languageRoutes = {
  es: '/',
  en: '/en',
  nl: '/nl',
} as const;
