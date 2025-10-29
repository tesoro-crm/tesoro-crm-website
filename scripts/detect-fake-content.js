#!/usr/bin/env node

/**
 * Script to detect potentially fabricated content in KB articles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KB_DIR = path.join(__dirname, '../src/content/knowledge-base');

// Red flags for fake content
const RED_FLAGS = {
  // Real estate company names
  companies: [
    'RE/MAX', 'REMAX', 'Remax',
    'Sotheby', "Sotheby's",
    'Coldwell Banker',
    'Engel & Völkers', 'Engel Völkers',
    'Century 21',
    'Keller Williams',
    'Berkshire Hathaway',
    'Compass Real Estate',
    'eXp Realty'
  ],

  // Office/team patterns (likely fake case studies)
  officePatterns: [
    /Barcelona office/gi,
    /Madrid office/gi,
    /Amsterdam office/gi,
    /Valencia office/gi,
    /Seville office/gi,
    /Netherlands team/gi,
    /Spanish team/gi,
    /Barcelona team/gi,
    /Madrid team/gi,
    /agency in Barcelona/gi,
    /agency in Madrid/gi,
    /brokerage in/gi,
  ],

  // Testimonial patterns
  testimonialPatterns: [
    /says.*director/gi,
    /according to.*CEO/gi,
    /testimonial/gi,
    /customer said/gi,
    /client said/gi,
    /agent reported/gi,
  ],

  // Specific case study markers
  caseStudyPatterns: [
    /case study/gi,
    /real-world example/gi,
    /success story/gi,
    /customer spotlight/gi,
  ],

  // Specific person names in business context (likely fake)
  personPatterns: [
    /María González.*director/gi,
    /Carlos Martínez.*CEO/gi,
    /Jan de Vries.*managing/gi,
    /Peter van den Berg/gi,
  ]
};

function scanArticle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const article = JSON.parse(content);
    const fileName = path.basename(filePath);

    const findings = {
      file: fileName,
      issues: []
    };

    const contentStr = JSON.stringify(article);

    // Check for company names
    RED_FLAGS.companies.forEach(company => {
      if (contentStr.includes(company)) {
        findings.issues.push({
          type: 'COMPANY_NAME',
          detail: `Contains "${company}"`,
          severity: 'HIGH'
        });
      }
    });

    // Check for office patterns
    RED_FLAGS.officePatterns.forEach(pattern => {
      const matches = contentStr.match(pattern);
      if (matches) {
        findings.issues.push({
          type: 'OFFICE_PATTERN',
          detail: `Contains pattern: "${matches[0]}"`,
          severity: 'HIGH'
        });
      }
    });

    // Check for testimonial patterns
    RED_FLAGS.testimonialPatterns.forEach(pattern => {
      const matches = contentStr.match(pattern);
      if (matches) {
        findings.issues.push({
          type: 'TESTIMONIAL',
          detail: `Possible testimonial: "${matches[0]}"`,
          severity: 'MEDIUM'
        });
      }
    });

    // Check for case study patterns
    RED_FLAGS.caseStudyPatterns.forEach(pattern => {
      const matches = contentStr.match(pattern);
      if (matches) {
        findings.issues.push({
          type: 'CASE_STUDY',
          detail: `Contains: "${matches[0]}"`,
          severity: 'HIGH'
        });
      }
    });

    // Check for person patterns
    RED_FLAGS.personPatterns.forEach(pattern => {
      const matches = contentStr.match(pattern);
      if (matches) {
        findings.issues.push({
          type: 'PERSON_NAME',
          detail: `Named person in business context: "${matches[0]}"`,
          severity: 'HIGH'
        });
      }
    });

    return findings.issues.length > 0 ? findings : null;

  } catch (error) {
    return {
      file: path.basename(filePath),
      issues: [{
        type: 'ERROR',
        detail: error.message,
        severity: 'ERROR'
      }]
    };
  }
}

async function main() {
  console.log('🔍 Scanning knowledge base for fabricated content...\n');

  // Get all JSON files
  const files = fs.readdirSync(KB_DIR)
    .filter(f => f.endsWith('.json') && !f.endsWith('.backup'))
    .map(f => path.join(KB_DIR, f));

  console.log(`Scanning ${files.length} articles...\n`);

  const suspicious = [];

  for (const file of files) {
    const result = scanArticle(file);
    if (result) {
      suspicious.push(result);
    }
  }

  // Report
  console.log('='.repeat(60));
  console.log('📊 SCAN RESULTS');
  console.log('='.repeat(60));
  console.log();

  if (suspicious.length === 0) {
    console.log('✅ No suspicious content detected!');
  } else {
    console.log(`⚠️  Found ${suspicious.length} articles with potential fabricated content:\n`);

    // Group by severity
    const high = suspicious.filter(s => s.issues.some(i => i.severity === 'HIGH'));
    const medium = suspicious.filter(s => s.issues.every(i => i.severity === 'MEDIUM'));

    if (high.length > 0) {
      console.log(`🚨 HIGH PRIORITY (${high.length} articles) - LIKELY FAKE:`);
      console.log('='.repeat(60));
      high.forEach(item => {
        console.log(`\n📄 ${item.file}`);
        item.issues.forEach(issue => {
          console.log(`   [${issue.severity}] ${issue.type}: ${issue.detail}`);
        });
      });
      console.log();
    }

    if (medium.length > 0) {
      console.log(`\n⚠️  MEDIUM PRIORITY (${medium.length} articles) - REVIEW NEEDED:`);
      console.log('='.repeat(60));
      medium.forEach(item => {
        console.log(`\n📄 ${item.file}`);
        item.issues.forEach(issue => {
          console.log(`   [${issue.severity}] ${issue.type}: ${issue.detail}`);
        });
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log('RECOMMENDATION:');
    console.log('='.repeat(60));
    console.log(`DELETE all ${high.length} HIGH PRIORITY articles immediately.`);
    console.log(`REVIEW all ${medium.length} MEDIUM PRIORITY articles manually.`);
    console.log();
  }
}

main().catch(console.error);
