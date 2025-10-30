# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on codebase |
| `npm run validate:i18n` | Validate all translation keys exist in all language files |
| `npm run deploy:preview` | Deploy to Cloudflare Pages preview environment |
| `npm run deploy:production` | Deploy to Cloudflare Pages production |

**Note**: No test framework is currently configured (package.json shows placeholder test command).

## Environment URLs

- **Local Development**: http://localhost:4321/
- **Production**: https://new.tesorohq.io/

Use these URLs when:
- Testing changes locally with `npm run dev`
- Verifying deployed changes with Playwright
- Sharing links to the live website

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

### Helper Scripts & Temporary Files

**IMPORTANT: Use clear naming conventions to distinguish permanent tooling from temporary helper scripts.**

#### Script Types

**Permanent Scripts** (used by npm commands or core workflow):
- ✅ `scripts/validate-translations.js` - Part of build validation
- ✅ `scripts/check-button-usage.js` - Part of build validation
- ✅ `scripts/fix-routes.js` - Part of build process
- ✅ `.playwright-mcp/screenshot-helper.cjs` - Documentation workflow tool

**Temporary Helper Scripts** (one-time tasks, can be deleted after use):
- Use prefix `helper-` for general helper scripts
- Use prefix `temp-` for temporary fixes
- Use prefix `one-time-` for one-off tasks

#### Naming Examples

```bash
# ✅ CORRECT - Clear that these are temporary
scripts/helper-detect-fake-content.js
scripts/temp-fix-dutch-bullets.js
scripts/one-time-remove-emojis.sh
scripts/helper-record-videos.js

# ❌ WRONG - Unclear if permanent or temporary
scripts/detect-fake-content.js
scripts/fix-dutch-bullets.js
scripts/remove-emojis.sh
scripts/record-videos.js
```

#### When to Delete Helper Scripts

- ✅ Delete helper scripts immediately after completing their one-time task
- ✅ If unsure whether to keep: add comment at top of file explaining purpose and whether it's needed long-term
- ✅ Regular cleanup: Check for obsolete `helper-*`, `temp-*`, `one-time-*` scripts monthly

#### Creating New Helper Scripts

When creating a temporary script:
1. Use appropriate prefix (`helper-`, `temp-`, or `one-time-`)
2. Add comment at top explaining what it does and when it can be deleted
3. Put in `scripts/` directory (not root)
4. Delete immediately after task completion

```javascript
// helper-example.js
/**
 * TEMPORARY HELPER SCRIPT
 * Purpose: One-time migration of old format to new format
 * Delete after: Migration is complete and verified
 * Created: 2025-10-30
 */
```

### Git Workflow and Branch Strategy

**CRITICAL: ALL new features and fixes MUST be developed in feature branches, NOT directly in main.**

#### Branch Workflow

**For every new task/feature/fix:**

1. **Create a feature branch** from main:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/descriptive-name
   # OR for bugs:
   git checkout -b fix/descriptive-name
   ```

2. **Develop and test** in the feature branch:
   ```bash
   # Make your changes
   npm run build  # Verify build succeeds
   npm run validate:i18n  # If touching i18n or .astro files
   # Use Playwright for visual verification if needed
   ```

3. **Commit changes** in the feature branch:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   # OR
   git commit -m "fix: your bug fix description"
   ```

4. **Test thoroughly** before merging:
   ```bash
   npm run build  # Final build check
   npm run deploy:preview  # Deploy to preview environment
   # Test the preview deployment
   ```

5. **Merge to main** only after successful testing:
   ```bash
   git checkout main
   git pull origin main
   git merge feature/your-branch-name
   git push origin main
   ```

6. **Deploy to production**:
   ```bash
   npm run deploy:production
   ```

7. **Clean up** the feature branch:
   ```bash
   git branch -d feature/your-branch-name
   ```

#### Branch Naming Conventions

- **Features**: `feature/short-description` (e.g., `feature/modal-cta-fix`)
- **Bug fixes**: `fix/short-description` (e.g., `fix/language-selector-hover`)
- **SEO improvements**: `seo/short-description` (e.g., `seo/brand-name-optimization`)
- **Content updates**: `content/short-description` (e.g., `content/blog-post-announcement`)
- **Documentation**: `docs/short-description` (e.g., `docs/update-workflow`)

#### Why Feature Branches Matter

- ✅ **Isolation**: Work on features independently without affecting main
- ✅ **Testing**: Thoroughly test changes in preview before production
- ✅ **Rollback**: Easy to revert if something goes wrong
- ✅ **Code Review**: Allows for review before merging to main
- ✅ **Collaboration**: Multiple developers can work on different features simultaneously

#### Exception: Emergency Hotfixes

Only in true emergencies (production is broken) may you commit directly to main:

```bash
# Emergency hotfix - use with caution
git checkout main
# Fix the critical issue
git add .
git commit -m "hotfix: critical production issue"
git push origin main
npm run deploy:production
```

After the hotfix, document what happened and why the normal workflow was skipped.

### Before Committing

Always run these checks before committing:

1. **Build verification**: `npm run build` - Ensures TypeScript and Astro validation passes
2. **i18n validation**: `npm run validate:i18n` - If touching .astro or i18n files
3. **Visual verification**: Use Playwright for any UI changes
4. **Test locally**: `npm run dev` and manually test the changes

## 🎭 MANDATORY: Visual Verification with Playwright

**CRITICAL: ALL design changes MUST be visually verified with Playwright BEFORE committing.**

### When Visual Verification is REQUIRED

You MUST use Playwright to verify changes when modifying:
- ✅ CSS files (styles, layouts, spacing, colors)
- ✅ Component positioning (navigation, menus, modals)
- ✅ Responsive design (breakpoints, mobile layouts)
- ✅ Visual elements (buttons, cards, images, icons)
- ✅ Typography (font sizes, weights, line heights)
- ✅ Animations and transitions
- ✅ Any file in src/components/ that affects visual rendering

### Verification Workflow

**MANDATORY STEPS - DO NOT SKIP:**

1. **Make your code changes**
   - Edit CSS/components as needed
   - Save files

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy to preview OR use dev server**
   ```bash
   npm run deploy:preview
   # OR use local dev server
   npm run dev
   ```

4. **Use Playwright to visually verify**
   ```bash
   # Navigate to production
   mcp__playwright__browser_navigate("https://new.tesorohq.io/")
   # OR navigate to local dev server
   mcp__playwright__browser_navigate("http://localhost:4321/")

   # Interact with elements (hover, click, etc.)
   mcp__playwright__browser_hover(element, ref)

   # Take screenshot to verify alignment/styling
   mcp__playwright__browser_take_screenshot("verification-screenshot.png")
   ```

5. **Analyze the screenshot**
   - Check alignment is correct
   - Verify spacing matches design
   - Confirm colors and typography are correct
   - Test responsive behavior if applicable

6. **ONLY AFTER VISUAL CONFIRMATION: Commit and deploy**
   ```bash
   git add .
   git commit -m "fix: your message"
   git push
   npm run deploy:production
   ```

### Why This Matters

Without visual verification:
- ❌ Changes may look wrong in production
- ❌ User catches bugs that should have been caught earlier
- ❌ Wasted time rolling back broken deployments
- ❌ Loss of user trust

With Playwright verification:
- ✅ Catch visual bugs BEFORE they reach production
- ✅ Verify fixes actually work as intended
- ✅ Build user confidence through quality
- ✅ Professional development workflow

### Real Example

**BAD (what happened before):**
```bash
# ❌ WRONG - Committed without verification
1. Edit Header.astro (mega menu positioning)
2. git add . && git commit && git push
3. npm run deploy:production
4. User reports: "It doesn't work, here's a screenshot"
5. Scramble to fix and redeploy
```

**GOOD (required workflow):**
```bash
# ✅ CORRECT - Verify first, then commit
1. Edit Header.astro (mega menu positioning)
2. npm run build (check for errors)
3. npm run deploy:preview
4. Use Playwright to navigate and hover over menu
5. Take screenshot and verify alignment is correct
6. ONLY THEN: git add . && git commit && git push
7. npm run deploy:production (with confidence)
```

### Exception: Non-Visual Changes

You may skip Playwright verification ONLY when:
- Changes are purely backend/API (no UI impact)
- Modifying configuration files (astro.config.mjs, tsconfig.json)
- Documentation updates (README.md, CLAUDE.md)
- Content-only changes (blog JSON, i18n translations)

**When in doubt: VERIFY. Better safe than sorry.**

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
4. **ALWAYS run validation before committing** (see below)

### Translation Key Validation Protocol

**CRITICAL: Always validate translation keys exist before committing!**

This project includes an automated validation script that prevents missing translation keys from reaching production.

#### Automated Validation Script

Run the validation script **before every commit** that touches .astro files or i18n JSON files:

```bash
npm run validate:i18n
```

This script will:
- Scan all .astro files for t() function calls
- Extract all translation keys used in the codebase
- Verify each key exists in ALL three language files (en.json, es.json, nl.json)
- Report any missing keys with file location and line number

#### Workflow Integration

**When to Run:**
1. ✅ Before committing changes to .astro files
2. ✅ After adding new translation keys to any language file
3. ✅ Before creating a pull request
4. ✅ As part of your pre-deployment checklist

**Expected Output:**

✅ **Success (all keys valid):**
```
🔍 Scanning for translation keys...
Found 62 .astro files
Found 783 translation key usages (757 unique keys)

✅ All keys present in en.json
✅ All keys present in es.json
✅ All keys present in nl.json

✅ All translation keys are valid!
```

❌ **Failure (missing keys):**
```
❌ Missing keys in en.json (3):
   website_api.hero.cta_primary
   → Used in: /src/pages/website-api.astro:25

   website_api.hero.cta_secondary
   → Used in: /src/pages/website-api.astro:28
```

#### Fixing Missing Keys

When the validation script reports missing keys:

1. **Identify the pattern:** Look at the key structure (e.g., `website_api.hero.cta_primary`)
2. **Add to ALL language files:** Open en.json, es.json, and nl.json
3. **Maintain consistency:** Ensure the key structure matches across all files
4. **Translate properly:** Don't just copy English text - translate appropriately
5. **Re-run validation:** `npm run validate:i18n` to confirm fixes

#### Common Mistakes to Avoid

❌ **Wrong:** Using a key before it exists
```astro
// ❌ Code uses key that doesn't exist yet
<h1>{t('new_page.hero.title', locale)}</h1>
```

✅ **Correct:** Add key to all language files first
```json
// en.json, es.json, nl.json
{
  "new_page": {
    "hero": {
      "title": "..."
    }
  }
}
```

❌ **Wrong:** Adding key to only one language file
```json
// Only added to en.json - WRONG!
```

✅ **Correct:** Add to ALL three files (en.json, es.json, nl.json)

❌ **Wrong:** Naming mismatch between code and JSON
```astro
// Code expects: feature_1_title
t('section.feature_1_title', locale)
```
```json
// JSON has: benefit_1_title - MISMATCH!
{ "section": { "benefit_1_title": "..." } }
```

✅ **Correct:** Exact match between code and all JSON files

#### Pre-Commit Checklist

Before every commit that touches i18n or .astro files:

- [ ] Run `npm run validate:i18n`
- [ ] Fix any reported missing keys
- [ ] Test pages in all three languages (es, en, nl)
- [ ] Verify build succeeds: `npm run build`
- [ ] Commit only after validation passes

#### Why This Matters

Missing translation keys cause:
- ❌ Raw key names displayed to users (e.g., "website_api.hero.title" instead of actual text)
- ❌ Broken user experience in production
- ❌ Time wasted debugging why translations don't show
- ❌ Inconsistent multilingual experience

The validation script catches these issues **before** they reach production.

#### Optional: Git Pre-Commit Hook

For extra protection, you can set up a git pre-commit hook that automatically runs validation:

```bash
# Create/edit .git/hooks/pre-commit
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh

# Run i18n validation before allowing commit
echo "Running i18n validation..."
npm run validate:i18n

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Commit blocked: Translation validation failed"
  echo "Fix the missing keys and try again"
  exit 1
fi

echo "✅ Translation validation passed"
exit 0
EOF

# Make it executable
chmod +x .git/hooks/pre-commit
```

With this hook, git will automatically run validation before every commit and block the commit if validation fails.

**Note:** This is optional but highly recommended for developers who frequently work with i18n.

## 📸 Screenshot & Video Guidelines

### Screenshot Management

**Screenshot Tracking System**: All screenshots and videos are tracked in `.playwright-mcp/screenshots-manifest.json` to prevent duplicates.

**Before Creating New Screenshots:**
```bash
# Always check if screenshot already exists
cd .playwright-mcp
node screenshot-helper.cjs exists <module> "<description>"
node screenshot-helper.cjs list <module>
```

**After Creating Screenshots:**
```bash
# Register new screenshots in manifest
node screenshot-helper.cjs add "filename.png" "category" "module" "Description"
```

See `.playwright-mcp/README.md` for complete documentation.

### Video Recording Rules

**CRITICAL: DO NOT create video files from static screenshots.**

Videos should ONLY be created when there is actual dynamic behavior to demonstrate:

✅ **When to Use Video (MP4):**
- User interactions with visible animations (dropdowns opening, modals appearing)
- Drag-and-drop operations
- Real-time data updates or loading states
- Multi-step workflows with transitions
- Hover effects and interactive elements
- Scrolling through large datasets with dynamic loading

❌ **When NOT to Use Video:**
- Static page views (use PNG screenshot instead)
- Single form states without interaction
- Dashboard views without animation
- Static content that doesn't change
- Any scenario where a screenshot would suffice

**Bad Example (what was done before):**
```bash
# ❌ WRONG - Creating "video" from static screenshots
ffmpeg -loop 1 -i screenshot.png -t 5 output.mp4
# This creates a 5-second video of a still image - pointless!
```

**Good Example:**
```bash
# ✅ CORRECT - Static view = PNG screenshot
playwright screenshot dashboard.png

# ✅ CORRECT - Real interaction = screen recording
playwright video-record opening-property-modal.mp4
# Records actual user clicking button, modal animating in, content loading
```

### File Format Guidelines

- **Static views**: PNG (preferred) or JPG
- **Dynamic interactions**: MP4 (only with actual movement)
- **UI mockups**: PNG with transparency if needed
- **Documentation screenshots**: PNG (better quality for text)

### Naming Conventions

Screenshots should use descriptive names:
- `{module}-{view}-{detail}.png` (e.g., `dashboard-overview-with-kpis.png`)
- `{workflow}-{step-number}-{action}.png` (e.g., `signup-03-company-details.png`)

### Website Showcase Screenshots

**Purpose**: The WebsiteShowcase component (src/components/sections/WebsiteShowcase.astro) displays real websites delivered by Tesoro in a fade in/out carousel with browser chrome mockup.

**Location**: `public/images/websites/`

**Specifications**:
- **Resolution**: 1920×1200 pixels (16:10 aspect ratio) - preferred
- **Alternative**: 1600×1000px or similar 16:10 ratio
- **Format**: PNG (best quality for text) or WebP (smaller file size)
- **Quality**: Full-page desktop screenshots, clean (no cookie banners, fully loaded)
- **Naming**: `website-{client-name}.png` (e.g., `website-inmobiliaria-silva.png`)

**Capture Guidelines**:
1. Use desktop viewport at 1920px width minimum
2. Capture homepage with hero section + first few sections visible
3. Remove cookie consent banners before capturing
4. Ensure all images and content are fully loaded
5. Focus on the hero section and key visual elements

**Implementation**:
```typescript
// Add to websites array in WebsiteShowcase.astro
const websites = [
  {
    name: 'Client Name',
    url: 'clientwebsite.com',
    screenshot: '/images/websites/website-client-name.png',
    alt: 'Client Name - Real Estate Website'
  },
];
```

**Carousel Behavior**:
- Automatic fade transition every 5 seconds
- Pause on hover (desktop) or touch (mobile)
- URL updates in browser chrome to match current website
- Smooth opacity transitions (1000ms duration)

**File Size Considerations**:
- Aim for <5MB per screenshot (use PNG compression or WebP)
- Images are lazy-loaded (only first screenshot loads eagerly)
- Consider using WebP format for better compression with good quality

### Title Case Rules by Language

**CRITICAL: Title capitalization differs by language!**

- ✅ **English**: Use Title Case (Every Major Word Capitalized)
  - Example: "What Can You Build?"
  - Example: "Flexibility Your Business Needs"

- ❌ **Dutch & Spanish**: Use Sentence case (Only First Word Capitalized)
  - Dutch: "Wat kun je bouwen?" (NOT "Wat Kun Je Bouwen?")
  - Dutch: "Flexibiliteit die jouw business nodig heeft" (NOT "Flexibiliteit Die Jouw Business Nodig Heeft")
  - Spanish: "¿Qué puedes construir?" (NOT "¿Qué Puedes Construir?")

**When Writing Translations:**
- English headings: Capitalize All Major Words (Title Case)
- Dutch/Spanish headings: Only capitalize the first word and proper nouns (Sentence case)
- This applies to ALL headings (h1, h2, h3), section titles, feature titles, and button text
- Exception: Brand names and proper nouns always capitalized (e.g., "Tesoro CRM")

**IMPORTANT: No Colons in Titles/Headings**
- ❌ Avoid using colons (:) in titles, headings, and section names
- ✅ Instead: Split text into main heading and smaller subtitle
  - Bad: "Foundation: €0 → €5K Deal"
  - Good: "Foundation" (main heading) + "€0 → €5K Deal" (smaller subtitle below)
- Apply this rule to:
  - Page titles (h1, h2, h3)
  - Category names
  - Section headings
  - Card titles
  - Navigation labels
- Use separate elements with different font sizes for primary and secondary text
- Subtitle should be smaller font size and lighter color than main heading

## Icon & Emoji Guidelines

**CRITICAL: No Emojis - Use Material Symbols Only**

- ❌ **DO NOT use emojis** in any part of the UI
  - No emojis in headings, titles, buttons, labels, or UI elements
  - No emojis in content (blog posts, knowledge base articles, etc.)
  - No emojis in navigation or menus
  - Exception: User-generated content only (if applicable)

- ✅ **USE Google Material Symbols** for all icons
  - Icon library: [Google Material Symbols](https://fonts.google.com/icons)
  - Style: **Outlined only** (not Filled, Rounded, or Sharp)
  - Load only the specific icons needed (not the entire library)
  - Use `currentColor` for icon color to inherit from parent text/theme
  - Ensure consistency in line weight, size, and color across all icons
  - Minimize icon usage - only use when truly necessary

**Implementation Pattern:**
```html
<!-- ✅ Correct: Material Symbol -->
<span class="icon">search</span>

<!-- ❌ Wrong: Emoji -->
<span>🔍</span>
```

**CSS Setup:**
```css
.icon {
  font-family: 'Material Symbols Outlined';
  color: currentColor;
  font-size: inherit;
}
```

## ✓ Bulletpoint & List Alignment Rule

**CRITICAL: Bulletpoints and checklists must ALWAYS be left-aligned, NEVER centered.**

This is a fundamental UX principle: lists are meant to be scanned vertically, and centering them makes reading significantly harder.

- ❌ **NEVER** center align bulletpoint lists or checklist items
  - Don't use `text-center` on containers with `<ul>` or `<li>` elements
  - Don't use `justify-center` in flexbox layouts containing list items
  - Don't center checkmark lists or feature lists

- ✅ **ALWAYS** left-align bulletpoint lists and checklists
  - Lists should use `flex items-center` with default `justify-start`
  - Checkmarks/bullets should align to the left edge
  - Text should flow naturally from left to right

**Pattern to Follow:**
```html
<!-- ✅ CORRECT: Left-aligned list -->
<Card variant="default" padding="lg">
  <h3 class="text-center">Feature Name</h3>
  <p class="text-center">Feature description</p>

  <!-- List is LEFT-aligned, even if title/description are centered -->
  <ul class="space-y-1">
    <li class="flex items-center gap-1">
      <span class="icon">check_circle</span>
      Feature detail
    </li>
  </ul>
</Card>

<!-- ❌ WRONG: Centered list -->
<Card variant="default" padding="lg" class="text-center">
  <ul>
    <li class="flex items-center justify-center gap-1">
      <span class="icon">check_circle</span>
      Feature detail
    </li>
  </ul>
</Card>
```

**Key Rule:**
- Title and description MAY be centered
- Bulletpoints and checklists MUST be left-aligned
- These are independent layout decisions