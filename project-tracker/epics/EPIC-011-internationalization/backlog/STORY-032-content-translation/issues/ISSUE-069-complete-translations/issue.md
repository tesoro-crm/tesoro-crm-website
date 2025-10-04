---
id: ISSUE-069
title: Complete missing translations for all pages
status: proposed
story: STORY-032
assignee: Content Lead
priority: high
estimate: 3 hours
---

## Problem
Not all content is translated yet. Many sections still show hardcoded Dutch/English text instead of using translation keys.

## Current State
✅ **Translated:**
- Homepage hero (badge, title, description, CTAs, trust indicators)
- Stats bar labels
- Features section (3 features)
- Testimonials (3 quotes)
- FAQs (4 Q&As)

❌ **Missing Translations:**

### Homepage
- [ ] Social proof section title
- [ ] Features section title + description
- [ ] Testimonials section title + subtitle
- [ ] Demo section (badge, title, description, features list, CTA)
- [ ] FAQ section title + subtitle + "more questions" text
- [ ] Final CTA section (title, description, CTAs)

### Pricing Page
- [ ] Hero section (badge, title, description, trust indicators)
- [ ] All 3 pricing tiers (names, descriptions, features)
- [ ] Add-ons section (4 add-ons with descriptions)
- [ ] ROI calculator section
- [ ] 6 FAQ questions and answers
- [ ] Final CTA section

### Features Page
- [ ] Hero section
- [ ] 4 feature categories (titles + descriptions)
- [ ] 12 integration names
- [ ] Comparison matrix (8 features vs 2 competitors)
- [ ] All section titles and CTAs

### Header & Footer
- [ ] Navigation links (already in nav.* but not used)
- [ ] Footer tagline and section titles
- [ ] Footer links

### Status Page
- [ ] Page title and descriptions
- [ ] Status labels (proposed, in-progress, done, blocked)
- [ ] Epic/Story/Issue labels

## Acceptance Criteria
- [ ] All visible text uses `t()` function
- [ ] No hardcoded strings in components
- [ ] All 3 languages (NL/EN/ES) have complete translations
- [ ] Translation coverage ≥95%
- [ ] Build succeeds without errors
- [ ] All pages render correctly in all languages

## Implementation Steps

### 1. Extract all remaining content to translation files
```bash
# Scan all .astro files for hardcoded text
grep -r ">" src/pages/*.astro | grep -v "t('" | grep -v "---"
```

### 2. Update translation files
- Expand `nl.json` with all missing keys
- AI translate to `en.json` and `es.json`
- Human review for accuracy

### 3. Update components
- Replace all hardcoded text with `t()` calls
- Test each page in all 3 languages

### 4. Add translation helper
Create script to find untranslated content:
```bash
node scripts/find-untranslated.js
```

## Translation Keys Structure

### Suggested structure:
```json
{
  "nav": { ... },
  "footer": { ... },
  "home": {
    "hero": { ... },
    "stats": { ... },
    "social_proof": { ... },
    "features": { ... },
    "testimonials": { ... },
    "demo": { ... },
    "faq": { ... },
    "final_cta": { ... }
  },
  "pricing": {
    "hero": { ... },
    "plans": {
      "starter": { ... },
      "professional": { ... },
      "enterprise": { ... }
    },
    "addons": { ... },
    "roi": { ... },
    "faq": { ... },
    "final_cta": { ... }
  },
  "features": {
    "hero": { ... },
    "categories": { ... },
    "integrations": { ... },
    "comparison": { ... }
  },
  "status": {
    "title": "...",
    "labels": { ... }
  }
}
```

## Testing Checklist
- [ ] Homepage renders in NL/EN/ES
- [ ] Pricing page renders in NL/EN/ES
- [ ] Features page renders in NL/EN/ES
- [ ] Status page renders in NL/EN/ES
- [ ] Language selector switches correctly
- [ ] No "undefined" or missing text
- [ ] All CTAs are translated
- [ ] All form labels are translated

## Notes
- Use AI (Claude 3.5 Sonnet) for initial translations
- Human review required for:
  - Brand messaging
  - Technical terms
  - Legal text
  - CTAs (conversion critical)
- Keep translation keys descriptive
- Use nested structure for organization
- Add comments for context where needed

## Related
- STORY-032: Content Translation & AI Workflow
- EPIC-011: Internationalization & Multi-language Support
