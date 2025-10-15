// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import spotlight from '@spotlightjs/astro';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import compress from '@playform/compress';
import robotsTxt from 'astro-robots-txt';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    routes: {
      strategy: 'include',
      include: ['/*'],
      exclude: ['/_astro/*', '/_worker.js/*', '/favicon.ico', '/robots.txt', '/sitemap-*.xml', '/*.png', '/*.jpg', '/*.jpeg', '/*.webp', '/*.svg', '/*.ico', '/*.woff', '/*.woff2', '/*.ttf', '/*.eot']
    }
  }),
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
    partytown({
      config: {
        forward: ['dataLayer.push'], // For Google Analytics/Tag Manager (if needed)
        // Cloudflare Web Analytics works automatically via type="text/partytown"
      },
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
    robotsTxt({
      sitemap: true, // Automatically add sitemap reference
    }),
    icon({
      include: {
        'material-symbols': ['*'], // Include all Material Symbols
      },
    }),
  ],
  build: {
    inlineStylesheets: 'always', // Force inline all CSS to eliminate render-blocking
  },
  prefetch: {
    prefetchAll: true, // Automatically prefetch all internal links
    defaultStrategy: 'hover', // Prefetch on hover (can also be 'viewport', 'load', or 'tap')
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