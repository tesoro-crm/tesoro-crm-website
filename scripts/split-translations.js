#!/usr/bin/env node

/**
 * Script to split large translation files into smaller modules
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Define which keys go into which module
const moduleMapping = {
  common: ['meta', 'nav', 'cta', 'footer', 'search'],
  pages: ['home', 'pricing', 'pricing_page', 'features', 'features_overview', 'features_page'],
  'feature-pages': ['feature_pages'],
  'website-api': ['website_api', 'roi_calculator'],
  legal: ['fair_use_policy'],
};

function splitTranslations(lang) {
  console.log(`\n📦 Splitting ${lang}.json...`);

  // Read original file
  const originalPath = join(projectRoot, 'src/i18n/locales', `${lang}.json`);
  const originalData = JSON.parse(readFileSync(originalPath, 'utf-8'));

  // Create output directory
  const outputDir = join(projectRoot, 'src/i18n/locales', lang);
  mkdirSync(outputDir, { recursive: true });

  // Split into modules
  for (const [moduleName, keys] of Object.entries(moduleMapping)) {
    const moduleData = {};

    for (const key of keys) {
      if (originalData[key]) {
        moduleData[key] = originalData[key];
      }
    }

    const outputPath = join(outputDir, `${moduleName}.json`);
    writeFileSync(outputPath, JSON.stringify(moduleData, null, 2) + '\n', 'utf-8');

    const keyCount = Object.keys(moduleData).length;
    console.log(`   ✓ ${moduleName}.json (${keyCount} top-level keys)`);
  }
}

// Split all languages
const languages = ['en', 'es', 'nl'];

console.log('🔧 Starting translation file splitting...\n');

for (const lang of languages) {
  try {
    splitTranslations(lang);
  } catch (error) {
    console.error(`❌ Error splitting ${lang}:`, error.message);
  }
}

console.log('\n✅ Translation files split successfully!\n');
