#!/usr/bin/env node

/**
 * Script to fix Dutch content in knowledge base articles
 * Replaces mixed English/Dutch text with proper Dutch
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KB_DIR = path.join(__dirname, '../src/content/knowledge-base');

// Translation mappings for common mixed English/Dutch phrases
const translations = {
  // Common phrases
  'Proven strategies en tips': 'Bewezen strategieën en tips',
  'proven strategies en tips': 'bewezen strategieën en tips',
  'requires meer dan': 'vereist meer dan',
  'Requires meer dan': 'Vereist meer dan',
  'is the most important factor': 'is de belangrijkste factor',
  'is de most important factor': 'is de belangrijkste factor',

  // Action verbs
  'Respond binnen': 'Reageer binnen',
  'respond binnen': 'reageer binnen',
  'Review minimaal': 'Bekijk minimaal',
  'review minimaal': 'bekijk minimaal',
  'Update status': 'Update status',
  'Provide feedback': 'Geef feedback',
  'provide feedback': 'geef feedback',
  'Re-run suggestions': 'Voer suggesties opnieuw uit',
  're-run suggestions': 'voer suggesties opnieuw uit',

  // Common terms
  'Better qualification': 'Betere kwalificatie',
  'better qualification': 'betere kwalificatie',
  'higher win rates': 'hogere conversie',
  'less wasted time': 'minder verspilde tijd',
  'same business day': 'dezelfde werkdag',
  'daily updates': 'dagelijkse updates',
  'weekly touchpoint': 'wekelijks contactmoment',

  // Time/frequency
  'elke morning': 'elke ochtend',
  'every morning': 'elke ochtend',
  'same day': 'dezelfde dag',
  'binnen 1 hour': 'binnen 1 uur',
  'binnen 4 hours': 'binnen 4 uur',
  'binnen 24 hours': 'binnen 24 uur',
  'ideally < 15 min': 'ideaal binnen 15 minuten',
  '2-3× per week': '2-3 keer per week',

  // Status/stages
  'Early stages': 'Vroege fases',
  'early stages': 'vroege fases',
  'Active stages': 'Actieve fases',
  'active stages': 'actieve fases',
  'Closing stage': 'Sluitingsfase',
  'closing stage': 'sluitingsfase',
  'On Hold': 'Wachtend',
  'Nurture status': 'status Verzorgen',

  // Communication
  'Proactive en timely': 'Proactieve en tijdige',
  'proactive en timely': 'proactieve en tijdige',
  'preferred communication method': 'voorkeur communicatiemethode',
  'important discussions': 'belangrijke gesprekken',
  'quick updates': 'snelle updates',
  'indien appropriate': 'indien passend',
  'if appropriate': 'indien passend',

  // Pipeline
  'Pipeline hygiene en maintenance': 'Pipeline hygiëne en onderhoud',
  'pipeline hygiene en maintenance': 'pipeline hygiëne en onderhoud',
  'Kanban board': 'Kanban board',
  'major events': 'belangrijke gebeurtenissen',
  'recent activity': 'recente activiteit',
  'current status': 'huidige status',
  'complete documentation': 'complete documentatie',

  // AI/Technology
  'Leverage AI': 'Gebruik AI',
  'leverage AI': 'gebruik AI',
  'AI suggestions': 'AI suggesties',
  'top 5 suggested': 'top 5 gesuggereerde',
  'improve algorithm': 'algoritme te verbeteren',
  'match scores': 'match scores',
  'to prioritize': 'te prioriteren',
  'local knowledge': 'lokale kennis',
  'off-market opportunities': 'off-market mogelijkheden',

  // Team collaboration
  'Effective team collaboration': 'Effectieve team samenwerking',
  'effective team collaboration': 'effectieve team samenwerking',
  'team member': 'teamlid',
  'voor oversight': 'voor toezicht',
  'for oversight': 'voor toezicht',
  'Include experienced': 'Betrek ervaren',
  'include experienced': 'betrek ervaren',
  'Add specialist': 'Voeg specialist toe',
  'add specialist': 'voeg specialist toe',
  'Share viewing load': 'Verdeel bezichtigingslast',
  'share viewing load': 'verdeel bezichtigingslast',
  'Clear role definition': 'Duidelijke rolomschrijving',
  'clear role definition': 'duidelijke rolomschrijving',
  'specific action items': 'specifieke actiepunten',
  'team sync meetings': 'team sync meetings',
  'unless truly sensitive': 'tenzij echt gevoelig',
  'team wins publicly': 'team successen publiekelijk',

  // Data/Analytics
  'Data-driven continuous improvement': 'Data-gedreven continue verbetering',
  'data-driven continuous improvement': 'data-gedreven continue verbetering',
  'win/loss rates': 'gewonnen/verloren ratio\'s',
  'identify patterns': 'identificeer patronen',
  'time-to-close': 'tijd-tot-sluiting',
  'different deal types': 'verschillende deal types',
  'loss reasons': 'verlies redenen',
  'adjust strategy': 'pas strategie aan',
  'forecast accuracy': 'voorspelling nauwkeurigheid',
  'refine methodology': 'verfijn methodologie',
  'pipeline health assessment': 'pipeline gezondheid beoordeling',
  'performance review': 'prestatie review',
  'individual en team': 'individueel en team',
  'individual and team': 'individueel en team',
  'bottleneck identification': 'bottleneck identificatie',
  'Goal setting voor': 'Doelstelling voor',
  'goal setting voor': 'doelstelling voor',
  'next quarter': 'volgend kwartaal',
  'post-mortem': 'post-mortem',
  'significant lost deals': 'significante verloren deals',
  'lessons learned': 'geleerde lessen',
  'Share insights met': 'Deel inzichten met',
  'share insights met': 'deel inzichten met',
  'based op findings': 'op basis van bevindingen',
  'based on findings': 'op basis van bevindingen',

  // Golden rules
  'Golden rules voor': 'Gouden regels voor',
  'golden rules voor': 'gouden regels voor',
  'Qualify rigorously': 'Kwalificeer grondig',
  'qualify rigorously': 'kwalificeer grondig',
  'Respond quickly': 'Reageer snel',
  'respond quickly': 'reageer snel',
  'Speed wins deals': 'Snelheid wint deals',
  'speed wins deals': 'snelheid wint deals',
  'Document everything': 'Documenteer alles',
  'document everything': 'documenteer alles',
  'If it\'s not in CRM': 'Als het niet in het CRM staat',
  'if it\'s not in CRM': 'als het niet in het CRM staat',
  'it didn\'t happen': 'is het niet gebeurd',
  'Use AI suggestions': 'Gebruik AI suggesties',
  'use AI suggestions': 'gebruik AI suggesties',
  'Let technology help': 'Laat technologie helpen',
  'let technology help': 'laat technologie helpen',
  'Keep pipeline current': 'Houd pipeline actueel',
  'keep pipeline current': 'houd pipeline actueel',
  'Follow up persistently': 'Follow-up persistent',
  'follow up persistently': 'follow-up persistent',
  'Most deals need': 'Meeste deals hebben',
  'most deals need': 'meeste deals hebben',
  'touchpoints': 'contactmomenten',
  'Be proactive': 'Wees proactief',
  'be proactive': 'wees proactief',
  'Anticipate client needs': 'Anticipeer op klant behoeften',
  'anticipate client needs': 'anticipeer op klant behoeften',
  'Collaborate effectively': 'Werk effectief samen',
  'collaborate effectively': 'werk effectief samen',
  'Use team strengths': 'Gebruik team sterke punten',
  'use team strengths': 'gebruik team sterke punten',
  'Learn from data': 'Leer van data',
  'learn from data': 'leer van data',
  'Analyze en improve': 'Analyseer en verbeter',
  'analyze en improve': 'analyseer en verbeter',
  'Analyze and improve': 'Analyseer en verbeter',
  'analyze and improve': 'analyseer en verbeter',
  'Celebrate wins': 'Vier successen',
  'celebrate wins': 'vier successen',
  'Acknowledge success': 'Erken prestaties',
  'acknowledge success': 'erken prestaties',

  // Lead qualification
  'Rigorous lead qualification': 'Grondige lead kwalificatie',
  'rigorous lead qualification': 'grondige lead kwalificatie',
  'Why it matters': 'Waarom het belangrijk is',
  'why it matters': 'waarom het belangrijk is',
  'Qualification checklist': 'Kwalificatie checklist',
  'qualification checklist': 'kwalificatie checklist',
  'Budget verified': 'Budget geverifieerd',
  'budget verified': 'budget geverifieerd',
  'Pre-approval of': 'Vooraf goedkeuring of',
  'pre-approval of': 'vooraf goedkeuring of',
  'financial capability confirmed': 'financiële capaciteit bevestigd',
  'Timeline clear': 'Tijdlijn duidelijk',
  'timeline clear': 'tijdlijn duidelijk',
  'Urgency en realistic': 'Urgentie en realistische',
  'urgency en realistic': 'urgentie en realistische',
  'timeframe understood': 'tijdsbestek begrepen',
  'Motivation strong': 'Motivatie sterk',
  'motivation strong': 'motivatie sterk',
  'Clear reasons voor': 'Duidelijke redenen voor',
  'clear reasons voor': 'duidelijke redenen voor',
  'buying/selling': 'kopen of verkopen',
  'Decision maker identified': 'Beslisser geïdentificeerd',
  'decision maker identified': 'beslisser geïdentificeerd',
  'Who makes final decisions': 'Wie neemt de uiteindelijke beslissingen',
  'who makes final decisions': 'wie neemt de uiteindelijke beslissingen',
  'Criteria defined': 'Criteria gedefinieerd',
  'criteria defined': 'criteria gedefinieerd',
  'Must-haves vs': 'Must-haves versus',
  'must-haves vs': 'must-haves versus',
  'nice-to-haves documented': 'nice-to-haves gedocumenteerd',
  'Red flags to watch': 'Rode vlaggen om op te letten',
  'red flags to watch': 'rode vlaggen om op te letten',
  'Vague budget': 'Vaag budget',
  'vague budget': 'vaag budget',
  'just looking': 'gewoon even kijken',
  'No clear timeline': 'Geen duidelijke tijdlijn',
  'no clear timeline': 'geen duidelijke tijdlijn',
  'Shopping multiple agents': 'Vergelijkt meerdere makelaars',
  'shopping multiple agents': 'vergelijkt meerdere makelaars',
  'simultaneously without commitment': 'tegelijk zonder commitment',
  'Unrealistic expectations': 'Onrealistische verwachtingen',
  'unrealistic expectations': 'onrealistische verwachtingen',
  'Poor communication responsiveness': 'Slechte communicatie responsiviteit',
  'poor communication responsiveness': 'slechte communicatie responsiviteit',
  'Move unqualified leads': 'Verplaats ongekwalificeerde leads',
  'move unqualified leads': 'verplaats ongekwalificeerde leads',
  'instead van active pipeline': 'in plaats van actieve pipeline',
  'instead of active pipeline': 'in plaats van actieve pipeline',

  // Titles with English words
  'Effectief deal management requires': 'Effectief deal management vereist',
  'effectief deal management requires': 'effectief deal management vereist',

  // Corrections for specific patterns
  ' en ': ' en ',
  'voor ': 'voor ',
  'met ': 'met ',
  'op ': 'op ',
  'indien ': 'indien ',
};

// Regex patterns for common English phrases that need translation
const regexReplacements = [
  // "X en Y" where X or Y is English
  { pattern: /(\w+ing) en (\w+)/gi, replacement: (match, p1, p2) => {
    // If first word ends in -ing (likely English verb), translate
    const translations = {
      'Viewing': 'Bezichtiging',
      'viewing': 'bezichtiging',
      'Negotiation': 'Onderhandeling',
      'negotiation': 'onderhandeling',
      'Lead': 'Lead',
      'lead': 'lead',
      'Qualification': 'Kwalificatie',
      'qualification': 'kwalificatie',
    };
    return `${translations[p1] || p1} en ${p2}`;
  }},
];

function fixDutchText(text) {
  if (!text || typeof text !== 'string') return text;

  let fixed = text;

  // Apply direct translations
  for (const [eng, nl] of Object.entries(translations)) {
    fixed = fixed.replace(new RegExp(eng, 'g'), nl);
  }

  return fixed;
}

function processContent(obj) {
  if (typeof obj === 'string') {
    return fixDutchText(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => processContent(item));
  }

  if (obj && typeof obj === 'object') {
    const processed = {};
    for (const [key, value] of Object.entries(obj)) {
      // Only fix Dutch content (nl key)
      if (key === 'nl' && typeof value === 'string') {
        processed[key] = fixDutchText(value);
      } else if (key === 'nl' && value && typeof value === 'object') {
        // Handle nested nl objects (like in sections)
        processed[key] = processContent(value);
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
  console.log('🔧 Starting Dutch content correction...\n');

  // Get all JSON files
  const files = fs.readdirSync(KB_DIR)
    .filter(f => f.endsWith('.json') && !f.endsWith('.backup'))
    .map(f => path.join(KB_DIR, f));

  console.log(`Found ${files.length} articles to process\n`);

  // Skip already corrected file
  const filesToFix = files.filter(f => !f.includes('deal-best-practices.json'));

  console.log(`Processing ${filesToFix.length} articles (skipping already corrected)...\n`);

  const results = [];
  let processed = 0;

  for (const file of filesToFix) {
    const result = await fixArticle(file);
    results.push(result);
    processed++;

    if (processed % 10 === 0) {
      console.log(`Progress: ${processed}/${filesToFix.length} articles processed`);
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

  console.log('\n✨ Dutch content correction complete!');
}

main().catch(console.error);
