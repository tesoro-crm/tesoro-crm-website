---
id: STORY-032
title: Content Translation & AI Workflow
status: proposed
epic: EPIC-011
assignee: Content Lead + AI
priority: high
estimate: 8 story points
---

## User Story
Als content manager wil ik een geautomatiseerde AI translation workflow zodat ik snel en consistent content kan vertalen naar Engels en Spaans.

## Acceptance Criteria
- [ ] All hardcoded text extracted to nl.json
- [ ] AI translation scripts created
- [ ] English translations (en.json) generated & reviewed
- [ ] Spanish translations (es.json) generated & reviewed
- [ ] All components updated to use translation keys
- [ ] Translation coverage ≥95%

## Content Scope

### Pages to Translate
1. Homepage (9 sections)
2. Pricing page (6 sections)
3. Features page (7 sections)
4. Header navigation
5. Footer links
6. Error messages
7. Form labels

### Translation Categories
- Navigation & UI elements
- Hero sections & CTAs
- Feature descriptions
- Pricing tiers & add-ons
- Testimonials
- FAQs
- Footer content

## AI Translation Workflow

### Step 1: Extract Content
```bash
# Create script to extract all text
node scripts/extract-content.js

# Output: src/i18n/locales/nl.json (source)
```

### Step 2: AI Translation
```bash
# Translate to English
node scripts/translate.js --from nl --to en --model claude-3.5-sonnet

# Translate to Spanish
node scripts/translate.js --from nl --to es --model claude-3.5-sonnet
```

### Step 3: Human Review
```bash
# Generate review report
node scripts/review-translations.js

# Output: Missing translations, inconsistencies, suggestions
```

### Step 4: Apply Translations
```bash
# Update all components
node scripts/apply-translations.js

# Test build
npm run build
```

## AI Translation Prompt Template

```markdown
You are translating content for Tesoro CRM, a B2B SaaS platform for real estate professionals.

**Context:**
- Target audience: Real estate agents and brokers in [country]
- Tone: Professional, trustworthy, results-oriented
- Industry: Real estate, CRM, lead generation

**Instructions:**
1. Translate the following JSON from Dutch to [language]
2. Maintain JSON structure exactly
3. Preserve placeholders like {{variable}}
4. Keep brand name "Tesoro CRM" unchanged
5. Adapt cultural references appropriately
6. Use professional terminology for:
   - CRM terms (leads, pipeline, conversion)
   - Real estate terms (MLS, listings, captación)
   - Compliance terms (GDPR, AVG)

**Translation:**
[JSON content]

**Output format:** Valid JSON only, no explanations
```

## Translation Quality Checklist

### Technical
- [ ] Valid JSON syntax
- [ ] All keys present (no missing translations)
- [ ] Placeholders preserved ({{name}}, {count})
- [ ] HTML entities correct (&nbsp;, &mdash;)

### Content
- [ ] Professional tone maintained
- [ ] CRM terminology accurate
- [ ] CTAs compelling and clear
- [ ] Numbers/dates formatted correctly
- [ ] Currency symbols appropriate (€)

### Cultural
- [ ] Formal vs informal appropriate
- [ ] Cultural references adapted
- [ ] Local market terminology
- [ ] Legal disclaimers reviewed

## Component Updates

### Before (hardcoded):
```astro
<h1>Captación inteligente voor topmakelaar</h1>
```

### After (i18n):
```astro
---
import { t } from '../i18n/utils';
const locale = Astro.currentLocale || 'nl';
---
<h1>{t('home.hero.title', locale)}</h1>
```

## Files to Create
- `scripts/extract-content.js` - Extract text to JSON
- `scripts/translate.js` - AI translation script
- `scripts/review-translations.js` - Quality checks
- `scripts/apply-translations.js` - Update components
- `src/i18n/locales/nl.json` - Dutch (complete)
- `src/i18n/locales/en.json` - English (AI + review)
- `src/i18n/locales/es.json` - Spanish (AI + review)

## Testing
- [ ] All pages render in all 3 languages
- [ ] No missing translations (fallback works)
- [ ] Formatting correct (dates, currency)
- [ ] CTAs make sense in context
- [ ] Links work in all languages
- [ ] Mobile layout correct

## Notes
- Use Claude 3.5 Sonnet for best translation quality
- Budget ~$5-10 for AI translations
- Human review required for:
  - Legal text
  - Brand messaging
  - Technical terms
- Keep translation memory for consistency
