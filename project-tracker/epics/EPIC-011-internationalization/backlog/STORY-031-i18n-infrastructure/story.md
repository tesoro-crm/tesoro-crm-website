---
id: STORY-031
title: i18n Infrastructure Setup
status: done
epic: EPIC-011
assignee: Tech Lead
priority: high
estimate: 5 story points
---

## User Story
Als developer wil ik een schaalbare i18n infrastructuur zodat we eenvoudig nieuwe talen kunnen toevoegen en content kunnen vertalen.

## Acceptance Criteria
- [x] Astro i18n routing geconfigureerd (`/`, `/en`, `/es`)
- [x] Translation file structure opgezet (`src/i18n/locales/`)
- [x] Helper functions voor translations (`t()`, `getLocale()`)
- [x] Language configuration file
- [x] Layout component updated met lang attribute
- [x] Type-safe translation keys (TypeScript)

## Technical Tasks
1. Configure Astro i18n routing in `astro.config.mjs`
2. Create folder structure: `src/i18n/locales/`
3. Create `src/i18n/config.ts` with language settings
4. Create `src/i18n/utils.ts` with helper functions
5. Update `Layout.astro` to accept locale prop
6. Create TypeScript types for translations
7. Add language switcher logic to Header component

## Files to Create/Modify
- `astro.config.mjs` - Add i18n config
- `src/i18n/config.ts` - Language configuration
- `src/i18n/utils.ts` - Translation helpers
- `src/i18n/locales/nl.json` - Dutch translations
- `src/i18n/locales/en.json` - English translations
- `src/i18n/locales/es.json` - Spanish translations
- `src/i18n/types.ts` - TypeScript types
- `src/layouts/Layout.astro` - Add lang attribute
- `src/components/Header.astro` - Update language links

## Testing
- [ ] Navigate to `/`, `/en`, `/es` - all work
- [ ] Language selector updates current language
- [ ] Translation function returns correct text
- [ ] TypeScript compilation succeeds
- [ ] No console errors

## Notes
- Use Astro's built-in i18n routing (v4.0+)
- Keep translation files flat for AI processing
- Implement fallback to Dutch if translation missing
