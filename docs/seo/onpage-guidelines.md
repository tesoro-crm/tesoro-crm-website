## On-Page SEO Guidelines

### Metadata

- Title tag format: `Tesoro CRM | <Page Focus> voor <Persona>` capped at 60 characters.
- Meta descriptions: 150–160 characters, include CTA and primary keyword.
- Use hreflang tags for `nl`, `en`, `es` variants.

### Headings & Content

- One `<h1>` per page; include primary keyword within first 60 characters.
- Structure sections with logical `<h2>`/`<h3>` reflecting blueprint flows.
- Place hero copy and unique value proposition above the fold.
- Include captación, MLS, compliance terms naturally within first 200 words.

### Structured Data

- Homepage: `Organization` schema with logo, social links, contact info.
- Pricing: `Product` schema (plan name, price, currency, availability).
- Feature pages: `FAQ` schema for collapsible Q&A blocks.

### Internal Linking

- Link from homepage hero CTA to `/pricing` and `/demo`.
- Use cross-links between feature detail pages and integrations hub.
- Ensure breadcrumbs component outputs schema-friendly markup.

### Media Optimization

- Provide descriptive `alt` text containing secondary keywords where relevant.
- Use WebP/AVIF via Astro image pipeline; set width/height attributes.
- Lazy-load below-the-fold media; eager-load hero imagery.

### Localization

- Maintain translation glossary from `docs/workflow/ai-onboarding.md` (once created) for tone consistency.
- Adapt CTA copy per locale (e.g., `Vraag een demo aan`, `Request a demo`, `Solicitar demo`).
- Ensure currency and date formats reflect locale conventions.

### Tracking Alignment

- Every CTA must include `data-analytics-id="cta-<page>-<action>`.
- Update analytics mapping in `project-tracker/epics/EPIC-009-conversion-analytics/backlog/STORY-025-cta-strategy` when IDs change.
