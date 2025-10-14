#!/usr/bin/env node

/**
 * Translation Key Validation Script
 *
 * Scans all .astro files for t() function calls and validates that
 * the translation keys exist in all language files (en.json, es.json, nl.json).
 *
 * Usage: node scripts/validate-translations.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Language files to check
const languages = ['en', 'es', 'nl'];
const i18nDir = join(projectRoot, 'src/i18n/locales');

// Directories to scan for .astro files
const srcDir = join(projectRoot, 'src');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Recursively find all .astro files in a directory
 */
function findAstroFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findAstroFiles(filePath, fileList);
    } else if (file.endsWith('.astro')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extract all t() function calls from a file
 * Matches patterns like: t('key.subkey', locale) or t("key.subkey", locale)
 */
function extractTranslationKeys(content, filePath) {
  const regex = /t\(['"]([\w.]+)['"]\s*,\s*\w+\)/g;
  const keys = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    keys.push({
      key: match[1],
      file: filePath.replace(projectRoot, ''),
      line: content.substring(0, match.index).split('\n').length
    });
  }

  return keys;
}

/**
 * Check if a key exists in a translation object (supports nested keys)
 */
function keyExists(obj, keyPath) {
  const keys = keyPath.split('.');
  let current = obj;

  for (const key of keys) {
    if (current[key] === undefined) {
      return false;
    }
    current = current[key];
  }

  return true;
}

/**
 * Load translation files from modules
 */
function loadTranslations(lang) {
  const langDir = join(i18nDir, lang);
  const modules = ['common', 'pages', 'feature-pages', 'website-api', 'legal'];

  try {
    const translations = {};

    for (const module of modules) {
      const filePath = join(langDir, `${module}.json`);
      try {
        const content = readFileSync(filePath, 'utf-8');
        const moduleData = JSON.parse(content);
        Object.assign(translations, moduleData);
      } catch (error) {
        console.error(`${colors.red}Error loading ${lang}/${module}.json: ${error.message}${colors.reset}`);
      }
    }

    return Object.keys(translations).length > 0 ? translations : null;
  } catch (error) {
    console.error(`${colors.red}Error loading ${lang} translations: ${error.message}${colors.reset}`);
    return null;
  }
}

/**
 * Main validation function
 */
function validateTranslations() {
  console.log(`${colors.cyan}🔍 Scanning for translation keys...${colors.reset}\n`);

  // Find all .astro files
  const astroFiles = findAstroFiles(srcDir);
  console.log(`Found ${astroFiles.length} .astro files\n`);

  // Extract all translation keys
  const allKeys = [];
  astroFiles.forEach(file => {
    const content = readFileSync(file, 'utf-8');
    const keys = extractTranslationKeys(content, file);
    allKeys.push(...keys);
  });

  // Get unique keys
  const uniqueKeys = [...new Set(allKeys.map(k => k.key))];
  console.log(`Found ${allKeys.length} translation key usages (${uniqueKeys.length} unique keys)\n`);

  // Load translation files
  const translations = {};
  for (const lang of languages) {
    translations[lang] = loadTranslations(lang);
    if (!translations[lang]) {
      console.log(`${colors.red}❌ Failed to load ${lang}.json${colors.reset}\n`);
      process.exit(1);
    }
  }

  // Validate keys
  const missingKeys = {};
  languages.forEach(lang => {
    missingKeys[lang] = [];
  });

  uniqueKeys.forEach(key => {
    languages.forEach(lang => {
      if (!keyExists(translations[lang], key)) {
        const usage = allKeys.find(k => k.key === key);
        missingKeys[lang].push({
          key,
          file: usage.file,
          line: usage.line
        });
      }
    });
  });

  // Report results
  let hasErrors = false;

  languages.forEach(lang => {
    if (missingKeys[lang].length > 0) {
      hasErrors = true;
      console.log(`${colors.red}❌ Missing keys in ${lang}.json (${missingKeys[lang].length}):${colors.reset}`);

      missingKeys[lang].forEach(({ key, file, line }) => {
        console.log(`   ${colors.yellow}${key}${colors.reset}`);
        console.log(`   ${colors.blue}   → Used in: ${file}:${line}${colors.reset}`);
      });
      console.log('');
    } else {
      console.log(`${colors.green}✅ All keys present in ${lang}.json${colors.reset}`);
    }
  });

  if (hasErrors) {
    console.log(`\n${colors.red}❌ Translation validation failed!${colors.reset}`);
    console.log(`${colors.yellow}Please add the missing keys to the respective language files.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ All translation keys are valid!${colors.reset}\n`);
    process.exit(0);
  }
}

// Run validation
validateTranslations();
