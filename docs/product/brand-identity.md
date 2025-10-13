# Tesoro CRM - Brand Identity & Guidelines

**Single Source of Truth for Brand Information**  
Last updated: October 2024

---

## 🎯 Brand Positioning

### Mission Statement
> We believe every real estate agent deserves tools that actively help them sell more properties. Not just manage data, but drive sales.

### Value Proposition
Tesoro CRM shifts the role of the real estate agent from passive recipient to active sales agent, with smart matching, feedback loops via customer portal, and integration of communication at deal level.

### Tagline
**English**: "Smart sales automation for real estate professionals"  
**Spanish**: "Captación inteligente para profesionales inmobiliarios"  
**Dutch**: "Slimme verkoopautomatisering voor vastgoedprofessionals"

---

## 🎨 Visual Identity

### Primary Brand Colors

| Color | Hex | Usage | Contrast |
|-------|-----|-------|----------|
| **Primary Blue** | `#003366` | Hero sections, primary CTAs, navigation | AAA with white |
| **Primary Accent** | `#4BA3FF` | Hover states, highlights, interactive elements | AA with white |
| **Secondary Gold** | `#F5B400` | Secondary CTAs, badges, success states | AA with dark text |

### Extended Color Palette

#### Warm Colors (Energy & Action)
```css
--tesoro-yellow: #FCC72C        /* Bright, attention-grabbing */
--tesoro-orange-light: #F8B131  /* Warm, friendly */  
--tesoro-coral: #EE7461         /* Sophisticated coral */
--tesoro-orange: #ED6E19        /* Primary brand orange */
--tesoro-red: #E84847          /* Bold, energetic */
```

#### Cool Colors (Trust & Stability)
```css
--tesoro-pink: #E94A93          /* Vibrant, modern */
--tesoro-purple: #7C61A7        /* Premium purple */
--tesoro-blue-dark: #3B529F     /* Trustworthy dark blue */
--tesoro-blue-light: #57AEE3    /* Fresh, modern light blue */
```

#### Neutral Palette
```css
--neutral-50: #F9FAFB          /* Light backgrounds */
--neutral-100: #FFFFFF         /* Cards, modals */
--neutral-200: #F3F4F6         /* Dividers, borders */
--neutral-800: #1A1A1A         /* Body text */
--neutral-900: #111827         /* Headings */
```

#### Semantic Colors
```css
--success: #10B981             /* Green for success states */
--warning: #F59E0B             /* Amber for warnings */
--error: #EF4444               /* Red for errors */
--info: #3B82F6                /* Blue for information */
```

### Color Usage Guidelines
- **Primary colors**: Max 30% of page (headers, CTAs)
- **Secondary colors**: Max 10% (accents, highlights)  
- **Neutral colors**: 60% (backgrounds, text, borders)
- **Semantic colors**: Only for status/feedback

---

## 📝 Typography

### Font Families

**Display Font**: Poppins
- **Usage**: Headings (h1-h3), hero text, brand elements
- **Weights**: 600 (SemiBold), 700 (Bold)
- **Character**: Modern, geometric, confident

**Body Font**: Inter
- **Usage**: Body text, UI elements, captions, descriptions
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Character**: Readable, neutral, professional

**Monospace**: JetBrains Mono
- **Usage**: Code snippets, technical data, API documentation
- **Weight**: 400 (Regular)

### Type Scale

| Element | Size | Line Height | Weight | Usage |
|---------|------|-------------|--------|-------|
| h1 | 3.75rem (60px) | 1.1 | 700 | Hero headings |
| h2 | 3rem (48px) | 1.2 | 700 | Section headings |
| h3 | 2.25rem (36px) | 1.3 | 600 | Subsection headings |
| h4 | 1.875rem (30px) | 1.4 | 600 | Card headings |
| h5 | 1.5rem (24px) | 1.5 | 600 | Small headings |
| h6 | 1.25rem (20px) | 1.5 | 600 | Labels |
| body-lg | 1.125rem (18px) | 1.75 | 400 | Lead paragraphs |
| body | 1rem (16px) | 1.6 | 400 | Body text |
| body-sm | 0.875rem (14px) | 1.5 | 400 | Captions, labels |
| body-xs | 0.75rem (12px) | 1.4 | 500 | Fine print |

---

## 🏷️ Brand Voice & Messaging

### Tone of Voice

**Professional but accessible**
- No corporate jargon
- Clear, direct communication
- Technical accuracy without complexity

**Helpful advisor, not salesperson**
- Focus on solving problems
- Educational approach
- Honest about limitations

**Human and approachable**
- Warmth and trust
- Subtle humor where appropriate
- Empathy for user challenges

### Key Messages

1. **Active vs Passive**: "Don't wait for leads — Tesoro searches and matches for you"
2. **Integration**: "All your communication and deal process in one clear system"
3. **Relationship Building**: "Build relationships AND close deals — Tesoro supports both"
4. **Familiar Tools**: "Integrations with tools you already use (Gmail, Outlook)"

### Language-Specific Adaptations

**Nederlands (Dutch)**
- Formal but warm ("U" for business contexts, "je" for tutorials)
- Direct and practical
- Focus on efficiency and results

**English**
- Professional and benefit-focused
- Global perspective
- Data-driven approach

**Español (Spanish)**
- Friendly and approachable
- Detailed explanations
- Passionate about solutions
- Local market examples

---

## 🎭 Brand Applications

### Logo Usage
- **Clear space**: Minimum 16px on all sides
- **Minimum size**: 120px width
- **Backgrounds**: White, primary blue, or neutral-50
- **Variations**: Full color, white, monochrome

### CTA Buttons

**Primary CTA**
```css
background: #003366;        /* Primary blue */
color: white;
hover: #4BA3FF;            /* Primary accent */
padding: 12px 24px;
border-radius: 8px;
```

**Secondary CTA**
```css
background: #F5B400;       /* Secondary gold */
color: #111827;            /* Dark text */
hover: darken(#F5B400, 10%);
padding: 12px 24px;
border-radius: 8px;
```

### Content Categories (Blog/Knowledge Base)

| Category | Color | Usage |
|----------|--------|-------|
| Case Study | Orange `#ED6E19` | Success stories, transformations |
| CRM Tips | Blue Dark `#3B529F` | Educational content, best practices |
| Success Stories | Pink `#E94A93` | Testimonials, achievements |
| Real Estate | Purple `#7C61A7` | Industry-specific content |
| Integrations | Blue Light `#57AEE3` | Technical features, connections |
| Tutorials | Yellow `#FCC72C` | Step-by-step guides |
| Updates | Coral `#EE7461` | Product announcements |
| Insights | Purple Light `#8C6DAC` | Market analysis, trends |

---

## ♿ Accessibility Standards

### Color Contrast Requirements
- **Normal text**: Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large text**: Minimum 3:1 contrast ratio (WCAG AA)
- **UI components**: Minimum 3:1 contrast ratio

### Focus States
```css
outline: 2px solid #4BA3FF;  /* Primary accent */
outline-offset: 2px;
border-radius: inherit;      /* Match element's border radius */
```

### Color-Blind Considerations
- Never rely solely on color to convey information
- Use icons, patterns, or text alongside colors
- Test with color-blind simulation tools

---

## 📐 Spacing & Layout

### Spacing Scale (4px base unit)

| Token | Value | Usage |
|-------|-------|-------|
| 2xs | 4px | Icon padding |
| xs | 8px | Tight spacing |
| sm | 12px | Component padding |
| md | 16px | Default spacing |
| lg | 24px | Section spacing |
| xl | 32px | Large gaps |
| 2xl | 48px | Section margins |
| 3xl | 64px | Hero spacing |
| 4xl | 96px | Page sections |

### Layout Grid
- **Container**: Max 1280px width
- **Columns**: 12-column grid system
- **Gutter**: 24px (desktop), 16px (mobile)
- **Margins**: 48px (desktop), 24px (tablet), 16px (mobile)

### Border Radius
- **Small**: 6px (buttons, badges)
- **Medium**: 12px (cards, inputs)
- **Large**: 20px (large cards)
- **Extra Large**: 24px (hero sections)

---

## 🖼️ Imagery Guidelines

### Photography Style
- **Professional and authentic**: Real people, not stock photos
- **Real estate context**: Properties, agents, client interactions
- **Natural lighting**: Warm tones, avoiding harsh shadows
- **Diverse representation**: Inclusive imagery

### Image Specifications
- **Hero images**: 1200x600px (2:1 ratio), max 200KB
- **Content images**: 800x400px minimum, max 150KB
- **Screenshots**: Original resolution (max 1920px wide), PNG format
- **Format**: WebP with JPEG fallback for optimization

---

## 🚫 Brand Don'ts

### Visual Don'ts
- Don't use unauthorized color combinations
- Don't stretch or distort the logo
- Don't use low-contrast color combinations
- Don't mix different font families within components

### Messaging Don'ts
- Avoid vague or over-promising statements
- Don't use inconsistent terminology across content
- Avoid technical jargon without explanation
- Don't make claims without supporting evidence

### Content Don'ts
- Don't create content without checking brand voice
- Avoid mixing languages within single documents
- Don't use placeholder content in production
- Avoid contradicting information across channels

---

**This document serves as the single source of truth for all Tesoro CRM brand applications. All other brand-related documents should reference this guide.**