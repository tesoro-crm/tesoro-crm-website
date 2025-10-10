import { defineMiddleware } from 'astro:middleware';
import { detectBrowserLanguage } from './i18n/utils';
import { defaultLang } from './i18n/config';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  
  // Only redirect if user is on root path (/)
  if (pathname === '/') {
    const acceptLanguage = context.request.headers.get('accept-language');
    const detectedLang = detectBrowserLanguage(acceptLanguage);
    
    // Redirect to detected language (unless it's the default)
    if (detectedLang !== defaultLang) {
      return context.redirect(`/${detectedLang}`);
    }
  }
  
  return next();
});
