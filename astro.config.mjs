// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import spotlight from '@spotlightjs/astro';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://new.tesorohq.io',
  integrations: [
    tailwind(),
    spotlight(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
          nl: 'nl',
        },
      },
    }),
  ],
  build: {
    inlineStylesheets: 'always', // Force inline all CSS to eliminate render-blocking
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: 'Inter',
        cssVariable: '--font-inter',
        weights: [400, 500, 600, 700],
      },
      {
        provider: fontProviders.fontsource(),
        name: 'Poppins',
        cssVariable: '--font-poppins',
        weights: [600, 700],
      },
    ],
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