# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on codebase |
| `npm run deploy:preview` | Deploy to Cloudflare Pages preview environment |
| `npm run deploy:production` | Deploy to Cloudflare Pages production |

**Note**: No test framework is currently configured (package.json shows placeholder test command).

## Architecture Overview

This is an **Astro v5.14.1** website for Tesoro CRM, built as a multilingual (es/en/nl) marketing site with a JSON-based content management system.

### Key Architectural Decisions

**Content Management**: Uses Astro Content Collections with JSON data files instead of MDX for both blog posts and knowledge base articles. This enables:
- Structured, schema-validated content via Zod (src/content/config.ts:125-205)
- Multilingual content with localized text objects (`{nl: "", en: "", es: ""}`)
- Type-safe content with complex nested sections

**Internationalization**: Configured with Spanish as default locale, fallback routing to Spanish for en/nl routes (astro.config.mjs:45-56).

**Styling**: Tailwind CSS with custom design system featuring:
- Tesoro brand colors (Primary Blue #003366, Secondary Gold #F5B400)
- Typography using Inter (body) and Poppins (headings) via Fontsource
- Custom UI components in src/components/ui/
- Complete design system documented in docs/design-system/

**Deployment**: Cloudflare Pages with Wrangler CLI, dual environment setup (preview/production).

### Directory Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (Button, Card, Input, Badge)
│   ├── sections/              # Page sections (Hero, Features, FAQ, etc.)
│   ├── blog/                  # Blog-specific components
│   └── knowledge-base/        # KB-specific components
├── content/
│   ├── blog/                  # JSON blog posts
│   └── knowledge-base/        # JSON knowledge base articles
├── pages/
│   ├── blog/                  # Blog routing ([...slug].astro, index.astro)
│   ├── knowledge-base/        # KB routing
│   └── api/                   # API endpoints
├── types/                     # TypeScript type definitions
├── utils/                     # Helper utilities (authors.ts, blogHelpers.ts)
└── data/                      # Static data files
```

### Content Collections

**Blog Collection** (src/content/config.ts:125-157):
- JSON-based with complex schema including meta, SEO, hero, and sections
- Supports multiple section types: introduction, problem, solution, results, quote, takeaways, CTA
- Author system with localized bios and images
- Built-in FAQ support and related posts

**Knowledge Base Collection** (src/content/config.ts:160-200):
- Similar JSON structure with category-based organization
- 9 predefined categories (getting-started, contacts, properties, etc.)
- Difficulty levels (beginner, intermediate, advanced)
- Video support indication

### Component Patterns

**UI Components** follow consistent patterns:
- Props interface with TypeScript
- Support for variants/sizes via classes
- Astro component syntax with TypeScript

**Section Components** are page-building blocks that:
- Accept structured data props
- Handle multilingual content rendering
- Use consistent spacing and responsive design

### Performance Optimizations

- Inline stylesheets forced (astro.config.mjs:27)
- Fontsource integration for optimal font loading
- Static site generation with Astro
- Cloudflare Pages CDN deployment

## Development Guidelines

### Adding New Content

**Blog Posts**: Create JSON files in src/content/blog/ following the schema in src/content/config.ts. Use existing posts as templates.

**Knowledge Base**: Create JSON files in src/content/knowledge-base/ with proper category and difficulty classification.

### Working with Components

**UI Components**: Located in src/components/ui/. Follow existing patterns for TypeScript props and Astro syntax.

**Section Components**: Built for page composition. Each section should handle its own responsive design and multilingual content.

### Multilingual Development

All user-facing text should use the localized text schema:
```typescript
const localizedText = {
  nl: "Dutch text",
  en: "English text", 
  es: "Spanish text"
}
```

Default locale is Spanish with fallback routing configured.

### Before Committing

Always run `npm run build` to verify the build succeeds before committing changes, as this project has strict TypeScript and Astro validation.

## Documentation Structure

This project has comprehensive documentation organized in the docs/ folder:

### Quick Access
- **[Documentation Hub](docs/README.md)** - Central index for all documentation
- **[Product Specifications](docs/product/product-specs.md)** - Complete product information and pricing
- **[Brand Identity](docs/product/brand-identity.md)** - Brand colors, typography, voice guidelines
- **[Design System](docs/design-system/overview.md)** - Complete UI design system

### Key Documentation Categories
- **docs/product/** - Product specifications, brand identity, content strategy
- **docs/development/** - Development setup, deployment procedures  
- **docs/workflow/** - Git strategy, PR checklist, release process
- **docs/design-system/** - Design tokens, components, typography system
- **docs/content/** - Blog and knowledge base writing guidelines
- **docs/operations/** - Analytics, SEO, security, accessibility guidelines

### For Content Creation
- **Blog posts**: Follow [AI guidelines](docs/content/blog/ai-guidelines.md) for structure and tone
- **Knowledge base**: Use [AI instructions](docs/content/knowledge-base/ai-instructions.md) for KB articles
- **Brand compliance**: Reference [brand identity](docs/product/brand-identity.md) for colors, fonts, voice

### Product Information (Single Source of Truth)
- **Pricing**: €99/month up to 10 users (docs/product/product-specs.md)
- **Core features**: Smart matching, customer portal, email integration
- **Target audience**: Real estate agents and professionals
- **Languages**: Spanish (primary), English, Dutch

## ⚠️ CRITICAL VERIFICATION RULE

**ALWAYS verify marketing claims with actual code implementation before making business assertions.**

### Code Verification Protocol
- When making ANY specific claim about Tesoro CRM functionality, FIRST check the source code
- Use Grep/Read tools to find actual implementation before writing marketing copy
- NO assumptions or "logical deductions" about features - only verified facts
- Cross-reference claims with `/Volumes/2TB/Tesoro-Server/tesoro-nuxt/` codebase

### Examples of Required Verification
- ❌ "Tesoro has X feature" → ✅ First check code, then "Tesoro has X feature (verified in components/...)"  
- ❌ "AI does Y automatically" → ✅ Find implementation, then make specific claim
- ❌ "Integration works like Z" → ✅ Read integration code, verify exact workflow

### Marketing Content Standards
- Only make business claims that can be backed up by code evidence
- When uncertain about implementation details: verify first, market second
- Better to be accurate than impressive
- Code-verified claims are more powerful than assumed features

## 🌍 MULTILINGUAL REQUIREMENT

**ALL pages MUST be properly internationalized using the i18n system.**

### I18n Implementation Rules
- **NEVER** hardcode text in any language directly in .astro pages
- **ALWAYS** use `t('translation.key', locale)` function calls for all user-facing text
- Check existing pages (pricing.astro, contact.astro) for proper i18n patterns
- All content must work correctly for Spanish (primary), English, and Dutch

### Required I18n Pattern
```astro
const locale: Language = getLocale(Astro.currentLocale);
await loadTranslations(locale);

// ✅ Correct - use t() function
title: t('page.title', locale)

// ❌ Wrong - hardcoded text
title: 'Hardcoded Title'
```

### Before Creating New Pages
1. Define all translation keys in i18n files first
2. Use t() function calls for ALL text content
3. Test all three language versions work correctly
- ik ben geen fan van alle toegepaste icons. Verminder deze tot het minimum.