#!/usr/bin/env node
/**
 * Fix Cloudflare _routes.json to route all pages through the Worker
 *
 * The Cloudflare adapter generates routes based on prerendered pages,
 * but in full SSR mode we need ALL routes to go through the Worker.
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const routesPath = join(__dirname, '../dist/_routes.json');

const routes = {
  version: 1,
  include: ['/*'],
  exclude: [
    '/_astro/*',
    '/_worker.js/*',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap-*.xml',
    '/*.png',
    '/*.jpg',
    '/*.jpeg',
    '/*.webp',
    '/*.svg',
    '/*.ico',
    '/*.woff',
    '/*.woff2',
    '/*.ttf',
    '/*.eot'
  ]
};

writeFileSync(routesPath, JSON.stringify(routes));
console.log('✅ Fixed _routes.json for full SSR mode');
