import { defineMiddleware } from 'astro:middleware';
import { detectBrowserLanguage } from './i18n/utils';
import { defaultLang } from './i18n/config';
import type { Language } from './i18n/config';

const LANG_COOKIE = 'preferred-language';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  
  // Check if user is on a language-specific path
  const currentLang = pathname.startsWith('/nl') ? 'nl' : 
                      pathname.startsWith('/en') ? 'en' : 
                      pathname.startsWith('/es') ? 'es' : null;
  
  // If on a language path, save it as preference
  if (currentLang) {
    context.cookies.set(LANG_COOKIE, currentLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
  }
  
  // Only redirect if user is on root path (/)
  if (pathname === '/') {
    // First check cookie preference
    const cookieLang = context.cookies.get(LANG_COOKIE)?.value as Language | undefined;
    
    if (cookieLang && (cookieLang === 'nl' || cookieLang === 'en' || cookieLang === 'es')) {
      // Redirect to saved preference
      if (cookieLang !== defaultLang) {
        return context.redirect(`/${cookieLang}`);
      }
    } else {
      // No cookie, detect from browser
      const acceptLanguage = context.request.headers.get('accept-language');
      const detectedLang = detectBrowserLanguage(acceptLanguage);
      
      // Redirect to detected language (unless it's the default)
      if (detectedLang !== defaultLang) {
        return context.redirect(`/${detectedLang}`);
      }
    }
  }
  
  return next();
});
