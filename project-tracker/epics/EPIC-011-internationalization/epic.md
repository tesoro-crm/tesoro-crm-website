---
id: EPIC-011
title: Internationalization & Multi-language Support
status: in-progress
owner: Tech Lead
start-date: 2025-10-04
end-date: 2025-10-19
goal: |
  Implementeer een schaalbare i18n oplossing waarmee content eenvoudig vertaald kan worden door AI, met ondersteuning voor Nederlands, Engels en Spaans.
key-metrics:
  - Language switch completion rate ≥85%
  - Translation coverage ≥95% voor alle pages
  - AI translation accuracy ≥90% (human review)
  - Page load time impact <100ms
dependencies:
  - EPIC-003
  - EPIC-004
  - EPIC-005
---

## Overview
Implementeer een complete internationalization (i18n) oplossing met:
- Astro i18n routing (`/`, `/en`, `/es`)
- JSON-based translation files per taal
- AI-friendly translation workflow
- Language selector in header (already implemented)
- SEO-optimized (hreflang tags)

## Deliverables
- [x] Astro i18n routing configuratie
- [x] Translation JSON files (nl, en, es)
- [x] AI translation workflow & scripts
- [x] Updated components met i18n support (Homepage, Header, Footer)
- [x] SEO meta tags (hreflang, lang attributes)
- [ ] Language persistence (localStorage/cookie)
- [ ] Complete Pricing page translations
- [ ] Complete Features page translations

## Stories
- STORY-031: i18n Infrastructure Setup
- STORY-032: Content Translation & AI Workflow
- STORY-033: SEO & Language Detection

## Technical Approach

### 1. Astro i18n Routing
```
/                    → Nederlands (default)
/en                  → English
/es                  → Español
/en/pricing          → English pricing
/es/features         → Spanish features
```

### 2. Translation File Structure
```
src/i18n/
├── locales/
│   ├── nl.json      # Nederlands (source)
│   ├── en.json      # English (AI translated)
│   └── es.json      # Español (AI translated)
├── utils.ts         # i18n helper functions
└── config.ts        # Language configuration
```

### 3. Translation JSON Format
```json
{
  "nav": {
    "features": "Features",
    "pricing": "Prijzen",
    "status": "Status"
  },
  "home": {
    "hero": {
      "badge": "Nieuwe AI-powered captación tools",
      "title": "Captación inteligente voor topmakelaar",
      "description": "Automatiseer je leadgeneratie..."
    }
  }
}
```

### 4. AI Translation Workflow
```bash
# 1. Extract all text from components
npm run i18n:extract

# 2. Generate translation files
npm run i18n:generate

# 3. AI translate (using Claude/GPT)
npm run i18n:translate --from nl --to en
npm run i18n:translate --from nl --to es

# 4. Human review & corrections
npm run i18n:review

# 5. Deploy translations
npm run build
```

## Implementation Plan

### Phase 1: Infrastructure (STORY-031)
1. Install Astro i18n packages
2. Configure routing structure
3. Create translation file structure
4. Build helper functions
5. Update Layout component

### Phase 2: Content Migration (STORY-032)
1. Extract all hardcoded text
2. Create nl.json (source of truth)
3. AI translate to en.json and es.json
4. Update all components to use translations
5. Test all pages in all languages

### Phase 3: SEO & UX (STORY-033)
1. Add hreflang tags
2. Implement language detection
3. Add language persistence
4. Update sitemap.xml
5. Test SEO with Google Search Console

## AI Translation Guidelines

### Translation Prompts

**For English:**
```
Translate the following JSON from Dutch to English for a B2B SaaS CRM website targeting real estate professionals. Maintain:
- Professional tone
- Technical accuracy for CRM/MLS terms
- Marketing appeal
- JSON structure

[JSON content]
```

**For Spanish:**
```
Translate the following JSON from Dutch to Spanish (Spain) for a B2B SaaS CRM website targeting real estate professionals in Spain. Maintain:
- Professional tone (use "usted" form)
- Technical accuracy for CRM/MLS terms
- Marketing appeal
- JSON structure

[JSON content]
```

### Quality Checks
- [ ] No missing translations
- [ ] No broken JSON syntax
- [ ] Consistent terminology
- [ ] Proper formatting (dates, numbers, currency)
- [ ] Cultural appropriateness
- [ ] CTA buttons make sense
- [ ] SEO keywords preserved

## Notes
- Nederlands is de source language (meest complete)
- AI translations require human review for:
  - Brand voice consistency
  - Technical term accuracy
  - Cultural nuances
  - Legal/compliance text
- Use Astro's built-in i18n routing (no external library needed)
- Consider using `astro-i18next` for more advanced features

## Success Criteria
- [ ] All pages available in NL, EN, ES
- [ ] Language selector works on all pages
- [ ] URLs follow `/lang/page` pattern
- [ ] SEO tags correct for each language
- [ ] No hardcoded text in components
- [ ] AI translation workflow documented
- [ ] <100ms performance impact
