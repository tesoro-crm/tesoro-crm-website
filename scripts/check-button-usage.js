#!/usr/bin/env node

/**
 * Button Usage Checker
 *
 * This script scans the codebase for custom button implementations
 * and warns about potential violations of the design system.
 *
 * Run with: node scripts/check-button-usage.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const EXCLUDE_DIRS = ['node_modules', 'dist', '.astro', '.git'];
const EXCLUDE_FILES = ['Button.astro']; // The actual Button component itself

// Patterns that indicate custom button implementations
const SUSPICIOUS_PATTERNS = [
  /class=["'][^"']*button[^"']*["']/gi,
  /class=["'][^"']*btn[^"']*["']/gi,
  /class=["'][^"']*cta-button[^"']*["']/gi,
  /\.\w*button[^{]*\{[^}]*(background|padding|border-radius)/gi,
  /\.\w*btn[^{]*\{[^}]*(background|padding|border-radius)/gi,
];

// Pattern to check if Button component is imported
const BUTTON_IMPORT_PATTERN = /import\s+Button\s+from\s+['"][^'"]*Button\.astro['"]/;

const violations = [];

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const fileName = filePath.split('/').pop();

  // Skip if this is the Button component itself
  if (EXCLUDE_FILES.includes(fileName)) {
    return;
  }

  let hasSuspiciousPattern = false;
  let hasButtonImport = BUTTON_IMPORT_PATTERN.test(content);

  SUSPICIOUS_PATTERNS.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches && matches.length > 0) {
      hasSuspiciousPattern = true;
    }
  });

  // If file has button-like patterns but doesn't import Button component
  if (hasSuspiciousPattern && !hasButtonImport) {
    violations.push({
      file: filePath,
      issue: 'Custom button implementation detected without Button component import',
      severity: 'warning',
    });
  }
}

function scanDirectory(dir) {
  const items = readdirSync(dir);

  items.forEach(item => {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(item)) {
        scanDirectory(fullPath);
      }
    } else if (item.endsWith('.astro')) {
      scanFile(fullPath);
    }
  });
}

console.log('🔍 Scanning codebase for custom button implementations...\n');

// Scan src directory
scanDirectory('./src');

// Report results
if (violations.length === 0) {
  console.log('✅ No button usage violations found!\n');
  console.log('All buttons appear to be using the Button component correctly.');
} else {
  console.log(`⚠️  Found ${violations.length} potential violation(s):\n`);

  violations.forEach((violation, index) => {
    console.log(`${index + 1}. ${violation.file}`);
    console.log(`   Issue: ${violation.issue}`);
    console.log(`   Severity: ${violation.severity}\n`);
  });

  console.log('💡 Reminder: Always use the Button component (src/components/ui/Button.astro)');
  console.log('📖 See CONTRIBUTING.md for guidelines\n');

  // Exit with error code if violations found
  process.exit(1);
}
