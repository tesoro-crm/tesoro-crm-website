// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import spotlight from '@spotlightjs/astro';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://tesoro-crm-website.pages.dev',
  integrations: [tailwind(), spotlight()],
  build: {
    inlineStylesheets: 'auto', // Inline small CSS files to reduce render-blocking requests
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'nl'],
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite'
    },
    fallback: {
      en: 'es',
      nl: 'es'
    }
  }
});