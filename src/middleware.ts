import { defineMiddleware } from 'astro:middleware';
import { detectBrowserLanguage } from './i18n/utils';
import { defaultLang } from './i18n/config';
import type { Language } from './i18n/config';

const LANG_COOKIE = 'preferred-language';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  
  // DISABLED: Auto language detection causing redirect loops
  // TODO: Fix and re-enable later
  
  // Check if user is on a language-specific path (but don't redirect)
  const currentLang = pathname.startsWith('/nl/') ? 'nl' : 
                      pathname.startsWith('/en/') ? 'en' : 
                      pathname.startsWith('/es/') ? 'es' : null;
  
  // If on a language path, save it as preference (but don't redirect)
  if (currentLang) {
    context.cookies.set(LANG_COOKIE, currentLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
  }
  
  return next();
});
