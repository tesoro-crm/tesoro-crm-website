#!/usr/bin/env node

/**
 * Script to fix English bullets in Dutch HTML content
 * Phase 2: Handles HTML bullet points specifically
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KB_DIR = path.join(__dirname, '../src/content/knowledge-base');

// Translation mappings for bullet labels
const bulletTranslations = {
  // Common bullet terms
  'Complete customer history': 'Volledige klant geschiedenis',
  'Team collaboration': 'Team samenwerking',
  'Follow-up reminders': 'Follow-up herinneringen',
  'Performance tracking': 'Prestatie tracking',
  'Deal context': 'Deal context',
  'Legal protection': 'Juridische bescherming',

  // Technical terms
  'Close background apps': 'Sluit achtergrond apps',
  'Clear app cache': 'Wis app cache',
  'Update app': 'Update app',
  'Restart phone': 'Herstart telefoon',
  'Check storage': 'Controleer opslag',
  'Battery drain': 'Batterij leeg',

  // Property terms
  'Half bathrooms': 'Halve badkamers',
  'Total area': 'Totale oppervlakte',
  'Built area': 'Bebouwde oppervlakte',
  'Useful area': 'Nuttige oppervlakte',
  'Plot size': 'Perceelgrootte',

  // Pipeline/Deal terms
  'Weekly review': 'Wekelijkse review',
  'Monthly deep dive': 'Maandelijkse diepe duik',
  'Compare periods': 'Vergelijk periodes',
  'Set targets': 'Stel doelen',
  'Share with team': 'Deel met team',
  'Act on insights': 'Handel op basis van inzichten',

  'Visual overview': 'Visueel overzicht',
  'Visueel overzicht': 'Visueel overzicht',
  'AI-powered matching': 'AI-gedreven matching',
  'Team collaboration': 'Team samenwerking',
  'Customizable stages': 'Aanpasbare fases',
  'Commission tracking': 'Commissie tracking',
  'Activity history': 'Activiteiten geschiedenis',

  'Update regularly': 'Update regelmatig',
  'Be realistic': 'Wees realistisch',
  'Be conservative': 'Wees conservatief',
  'Set closing dates': 'Stel sluitingsdatums in',
  'Track confidence': 'Volg vertrouwen',
  'Document changes': 'Documenteer wijzigingen',
  'Review forecasts': 'Bekijk voorspellingen',
  'Use AI suggesties': 'Gebruik AI suggesties',
  'Documenteer alles': 'Documenteer alles',
  'Track activities': 'Volg activiteiten',
  'Assign ownership': 'Wijs eigendom toe',
  'Monitor metrics': 'Monitor statistieken',

  'Update promptly': 'Update prompt',
  'Document reasons': 'Documenteer redenen',
  'Follow criteria': 'Volg criteria',
  'Review regularly': 'Review regelmatig',
  'Learn from Lost': 'Leer van Verloren',

  // Contact/CRM terms
  'Specific titles': 'Specifieke titels',
  'Specifieke titels': 'Specifieke titels',
  'Realistic deadlines': 'Realistische deadlines',
  'Realistische deadlines': 'Realistische deadlines',
  'Assign priority': 'Wijs prioriteit toe',
  'Daily review': 'Dagelijkse review',
  'Complete tasks': 'Voltooi taken',
  'Recurring tasks': 'Terugkerende taken',

  'Qualify first': 'Kwalificeer eerst',
  'Use AI suggestions': 'Gebruik AI suggesties',
  'Set realistic dates': 'Stel realistische datums in',
  'Document criteria': 'Documenteer criteria',
  'Link immediately': 'Koppel direct',

  // Common reasons
  'Price': 'Prijs',
  'Competition': 'Concurrentie',
  'Financing': 'Financiering',
  'Timing': 'Timing',
  'Property': 'Woning',
  'Communication': 'Communicatie',
  'Other': 'Anders',
};

// Translations for common English phrases in bullets
const phraseTranslations = {
  'Free up memory': 'Maak geheugen vrij',
  'Latest version is faster': 'Laatste versie is sneller',
  'Fresh start helps': 'Verse start helpt',
  'Phone needs 1GB+ free space': 'Telefoon heeft 1GB+ vrije ruimte nodig',

  'See at a glance where every deal stands': 'Zie in een oogopslag waar elke deal staat',
  'Automatic property suggestions based on buyer criteria': 'Automatische woning suggesties op basis van koper criteria',
  'Real-time updates and shared ownership': 'Real-time updates en gedeeld eigendom',
  'Adapt pipeline stages to your sales process': 'Pas pipeline fases aan aan je sales proces',
  'Automatic commission calculations': 'Automatische commissie berekeningen',
  'Complete timeline of all deal activities': 'Complete tijdlijn van alle deal activiteiten',

  'Update values during price negotiations': 'Update waardes tijdens prijs onderhandelingen',
  'Use realistic expected values, not optimistic': 'Gebruik realistische verwachte waardes, niet optimistisch',
  'Always add closing date for forecasting': 'Voeg altijd sluitingsdatum toe voor forecasting',
  'Update confidence level as deal progresses': 'Update vertrouwen niveau terwijl deal vordert',
  'Add notes when values change': 'Voeg notities toe wanneer waardes veranderen',
  'Weekly review of pipeline value and forecasts': 'Wekelijkse review van pipeline waarde en voorspellingen',

  'Update deal status within 24 hours of important interactions': 'Update deal status binnen 24 uur na belangrijke interacties',
  'Let system suggest at least 3-5 properties per deal': 'Laat systeem minimaal 3-5 woningen suggereren per deal',
  'Add notes for every status change with reasoning': 'Voeg notities toe bij elke status wijziging met redenering',
  'Log all calls, emails, viewings as activities': 'Log alle gesprekken, emails, bezichtigingen als activiteiten',
  'Add realistic closing dates for accurate forecasting': 'Voeg realistische sluitingsdatums toe voor accurate forecasting',
  'Assign primary agent and teamlids for accountability': 'Wijs primaire makelaar en teamleden toe voor verantwoordelijkheid',
  'Review conversion rates weekly to identify bottlenecks': 'Review conversie percentages wekelijks om knelpunten te identificeren',

  'Refresh forecasts weekly': 'Ververs voorspellingen wekelijks',
  'Better to under-promise, over-deliver': 'Beter te weinig beloven, te veel leveren',
  'Combine weighted and historical': 'Combineer gewogen en historisch',
  'Monitor forecast vs actual monthly': 'Monitor voorspelling vs werkelijk maandelijks',
  'Refine stage percentages based on data': 'Verfijn fase percentages op basis van data',
  'Note factors affecting forecast': 'Noteer factoren die voorspelling beïnvloeden',

  'Move deals within 24 hours of important milestones': 'Verplaats deals binnen 24 uur na belangrijke mijlpalen',
  'Add notes for each stage transition with explanation': 'Voeg notities toe bij elke fase overgang met uitleg',
  'Use entry criteria to prevent premature moves': 'Gebruik toegangscriteria om vroegti jdige verplaatsingen te voorkomen',
  'Log all relevant activities in each stage': 'Log alle relevante activiteiten in elke fase',
  'Weekly pipeline review to identify stagnant deals': 'Wekelijkse pipeline review om stagnante deals te identificeren',
  'Analyze lost deals to improve process': 'Analyseer verloren deals om proces te verbeteren',

  'not': 'niet',
  'Give yourself enough time': 'Geef jezelf genoeg tijd',
  'Use High for urgent tasks': 'Gebruik Hoog voor urgente taken',
  'Check your tasks every morning': 'Controleer je taken elke ochtend',
  'Mark as completed as soon as done': 'Markeer als voltooid zodra klaar',
  'For regular check-ins': 'Voor regelmatige check-ins',

  'Ensure contact is qualified (budget, timeline, motivation) before deal creation': 'Zorg dat contact gekwalificeerd is (budget, tijdlijn, motivatie) voor deal creatie',
  'Let AI suggest at least 3-5 properties for better buyer choice': 'Laat AI minimaal 3-5 woningen suggereren voor betere koper keuze',
  'Add realistic closing dates for accurate forecasting': 'Voeg realistische sluitingsdatums toe voor accurate forecasting',
  'Add notes with buyer preferences and requirements': 'Voeg notities toe met koper voorkeuren en vereisten',
  'Always assign primary owner for accountability': 'Wijs altijd primaire eigenaar toe voor verantwoordelijkheid',
  'Link properties directly at creation for tracking continuity': 'Koppel woningen direct bij creatie voor tracking continuïteit',

  'Too expensive, couldn\'t negotiate': 'Te duur, kon niet onderhandelen',
  'Chose another agent/property': 'Koos andere makelaar/woning',
  'Mortgage denied, insufficient funds': 'Hypotheek afgewezen, onvoldoende middelen',
  'Not ready, circumstances changed': 'Niet klaar, omstandigheden veranderd',
  'Issues discovered, didn\'t meet expectations': 'Problemen ontdekt, voldeed niet aan verwachtingen',
  'Poor response, service issues': 'Slechte respons, service problemen',
  'Specify in notes': 'Specificeer in notities',
};

function fixDutchBullets(html) {
  if (!html || typeof html !== 'string') return html;

  let fixed = html;

  // Fix bullet labels: <li><strong>English:</strong>
  for (const [eng, nl] of Object.entries(bulletTranslations)) {
    // Pattern: <li><strong>English:</strong>
    fixed = fixed.replace(
      new RegExp(`<li><strong>${eng}:</strong>`, 'gi'),
      `<li><strong>${nl}:</strong>`
    );
    // Pattern: <strong>English:</strong> (not in li)
    fixed = fixed.replace(
      new RegExp(`<strong>${eng}:</strong>`, 'gi'),
      `<strong>${nl}:</strong>`
    );
  }

  // Fix common phrases
  for (const [eng, nl] of Object.entries(phraseTranslations)) {
    fixed = fixed.replace(new RegExp(eng, 'gi'), nl);
  }

  return fixed;
}

function processContent(obj) {
  if (typeof obj === 'string') {
    return fixDutchBullets(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => processContent(item));
  }

  if (obj && typeof obj === 'object') {
    const processed = {};
    for (const [key, value] of Object.entries(obj)) {
      // Only fix Dutch content
      if (key === 'nl' && value && typeof value === 'object' && value.text) {
        // Handle nl objects with text property (most common in sections)
        processed[key] = {
          ...value,
          text: fixDutchBullets(value.text)
        };
      } else {
        // Recursively process other keys
        processed[key] = processContent(value);
      }
    }
    return processed;
  }

  return obj;
}

async function fixArticle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const article = JSON.parse(content);

    // Process the entire article
    const fixed = processContent(article);

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(fixed, null, 2) + '\n', 'utf-8');

    return { success: true, file: path.basename(filePath) };
  } catch (error) {
    return { success: false, file: path.basename(filePath), error: error.message };
  }
}

async function main() {
  console.log('🔧 Starting Dutch bullet correction (Phase 2)...\n');

  // Get all JSON files
  const files = fs.readdirSync(KB_DIR)
    .filter(f => f.endsWith('.json') && !f.endsWith('.backup'))
    .map(f => path.join(KB_DIR, f));

  console.log(`Found ${files.length} articles to process\n`);

  const results = [];
  let processed = 0;

  for (const file of files) {
    const result = await fixArticle(file);
    results.push(result);
    processed++;

    if (processed % 10 === 0) {
      console.log(`Progress: ${processed}/${files.length} articles processed`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successfully processed: ${successful} articles`);

  if (failed.length > 0) {
    console.log(`❌ Failed: ${failed.length} articles`);
    failed.forEach(f => {
      console.log(`   - ${f.file}: ${f.error}`);
    });
  }

  console.log('\n✨ Dutch bullet correction complete!');
}

main().catch(console.error);
