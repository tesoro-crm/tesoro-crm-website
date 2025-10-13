# Blog Sections Guide - Generic Building Blocks 📦

This document describes all available blog section types and how to use them.

## 🎯 Available Section Types

### 1. **Text Section** (`type: "text"`)
Basic text block with optional subsections.

```json
{
  "type": "text",
  "id": "section-id",
  "title": {
    "nl": "Section Title",
    "en": "Section Title",
    "es": "Section Title"
  },
  "content": {
    "nl": { "text": "<p>HTML content...</p>" },
    "en": { "text": "<p>HTML content...</p>" },
    "es": { "text": "<p>HTML content...</p>" }
  },
  "image": {
    "src": "/path/to/image.jpg",
    "alt": { "nl": "Alt text", "en": "Alt text", "es": "Alt text" },
    "caption": { "nl": "Caption", "en": "Caption", "es": "Caption" },
    "width": 800,
    "height": 600
  },
  "subsections": [
    {
      "id": "subsection-id",
      "title": { "nl": "Subsection", "en": "Subsection", "es": "Subsection" },
      "content": { "nl": { "text": "<p>...</p>" } },
      "image": { ... }
    }
  ]
}
```

**Use cases:** Introduction, explanation, story, general content

---

### 2. **Callout Section** (`type: "callout"`)
Colored highlight box for important points.

```json
{
  "type": "callout",
  "id": "important-tip",
  "variant": "tip",  // tip, warning, note, success, danger
  "title": {
    "nl": "💡 Tip",
    "en": "💡 Tip",
    "es": "💡 Tip"
  },
  "content": {
    "nl": { "text": "<p>Important information...</p>" },
    "en": { "text": "<p>Important information...</p>" },
    "es": { "text": "<p>Important information...</p>" }
  }
}
```

**Variants:**
- `tip` - 💡 Blue, for helpful tips
- `warning` - ⚠️ Yellow, for cautions
- `note` - 📝 Gray, for additional info
- `success` - ✅ Green, for positive outcomes
- `danger` - ❌ Red, for critical warnings

---

### 3. **Steps Section** (`type: "steps"`)
Numbered step-by-step instructions.

```json
{
  "type": "steps",
  "id": "how-to-guide",
  "title": {
    "nl": "Step-by-Step Guide",
    "en": "Step-by-Step Guide",
    "es": "Step-by-Step Guide"
  },
  "steps": [
    {
      "title": {
        "nl": "Step 1: Do this",
        "en": "Step 1: Do this",
        "es": "Step 1: Do this"
      },
      "content": {
        "nl": { "text": "<p>Explanation of step 1...</p>" },
        "en": { "text": "<p>Explanation of step 1...</p>" },
        "es": { "text": "<p>Explanation of step 1...</p>" }
      },
      "image": {
        "src": "/path/to/step1.jpg",
        "alt": { "nl": "Step 1 screenshot", "en": "Step 1 screenshot", "es": "Step 1 screenshot" },
        "width": 800,
        "height": 600
      }
    }
  ]
}
```

**Use cases:** Tutorials, how-to guides, processes, workflows

---

### 4. **Video Section** (`type: "video"`)
Embedded video content.

```json
{
  "type": "video",
  "id": "tutorial-video",
  "title": {
    "nl": "Video Tutorial",
    "en": "Video Tutorial",
    "es": "Video Tutorial"
  },
  "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "thumbnail": "/path/to/thumbnail.jpg",
  "caption": {
    "nl": "Watch this 2-minute tutorial",
    "en": "Watch this 2-minute tutorial",
    "es": "Watch this 2-minute tutorial"
  },
  "duration": "2:30"
}
```

**Supported platforms:** YouTube, Vimeo, Loom, Wistia

---

### 5. **Code Section** (`type: "code"`)
Syntax-highlighted code blocks.

```json
{
  "type": "code",
  "id": "code-example",
  "language": "javascript",
  "code": "const example = 'Hello World!';",
  "caption": {
    "nl": "JavaScript example",
    "en": "JavaScript example",
    "es": "JavaScript example"
  },
  "filename": "example.js"
}
```

**Supported languages:** javascript, typescript, python, php, html, css, sql, json, bash

---

### 6. **Image Section** (`type: "image"`)
Standalone image with caption.

```json
{
  "type": "image",
  "id": "diagram-image",
  "src": "/path/to/diagram.jpg",
  "alt": {
    "nl": "Process diagram",
    "en": "Process diagram",
    "es": "Process diagram"
  },
  "caption": {
    "nl": "Visual overview of the process",
    "en": "Visual overview of the process",
    "es": "Visual overview of the process"
  },
  "width": 1200,
  "height": 800
}
```

**Use cases:** Diagrams, infographics, screenshots, illustrations

---

### 7. **FAQ Section** (`type: "faq-section"`)
Frequently asked questions accordion.

```json
{
  "type": "faq-section",
  "id": "common-questions",
  "title": {
    "nl": "Frequently Asked Questions",
    "en": "Frequently Asked Questions",
    "es": "Frequently Asked Questions"
  },
  "items": [
    {
      "question": {
        "nl": "How do I get started?",
        "en": "How do I get started?",
        "es": "How do I get started?"
      },
      "answer": {
        "nl": { "text": "<p>Getting started is easy...</p>" },
        "en": { "text": "<p>Getting started is easy...</p>" },
        "es": { "text": "<p>Getting started is easy...</p>" }
      }
    }
  ]
}
```

**Use cases:** End of articles, troubleshooting, common questions

---

### 8. **Comparison Section** (`type: "comparison"`)
Side-by-side feature comparison.

```json
{
  "type": "comparison",
  "id": "before-after",
  "title": {
    "nl": "Before vs After",
    "en": "Before vs After",
    "es": "Before vs After"
  },
  "items": [
    {
      "title": {
        "nl": "Before",
        "en": "Before",
        "es": "Before"
      },
      "description": {
        "nl": "How it was before...",
        "en": "How it was before...",
        "es": "How it was before..."
      },
      "pros": [
        "Point 1",
        "Point 2"
      ],
      "cons": [
        "Limitation 1",
        "Limitation 2"
      ]
    }
  ]
}
```

**Use cases:** Before/after comparisons, pros/cons, feature comparisons

---

### 9. **Quote Section** (`type: "quote"`)
Customer testimonial or quote block.

```json
{
  "type": "quote",
  "id": "customer-quote",
  "quote": {
    "nl": "\"This product changed everything for us.\"",
    "en": "\"This product changed everything for us.\"",
    "es": "\"This product changed everything for us.\""
  },
  "author": "John Doe",
  "role": {
    "nl": "CEO, Company Name",
    "en": "CEO, Company Name",
    "es": "CEO, Company Name"
  },
  "image": "/path/to/author.jpg"
}
```

**Use cases:** Testimonials, expert quotes, case study quotes

---

### 10. **CTA Section** (`type: "cta"`)
Call-to-action block (required at end of articles).

```json
{
  "type": "cta",
  "id": "final-cta",
  "title": {
    "nl": "Ready to Get Started?",
    "en": "Ready to Get Started?",
    "es": "Ready to Get Started?"
  },
  "content": {
    "nl": { "text": "<p>Join thousands of satisfied customers...</p>" },
    "en": { "text": "<p>Join thousands of satisfied customers...</p>" },
    "es": { "text": "<p>Join thousands of satisfied customers...</p>" }
  },
  "buttons": [
    {
      "text": {
        "nl": "Start Free Trial",
        "en": "Start Free Trial",
        "es": "Start Free Trial"
      },
      "url": "/signup",
      "style": "primary"
    },
    {
      "text": {
        "nl": "Contact Sales",
        "en": "Contact Sales",
        "es": "Contact Sales"
      },
      "url": "/contact",
      "style": "secondary"
    }
  ]
}
```

**Button styles:** primary, secondary, outline

---

## 🎨 HTML Formatting Guidelines

### **Allowed HTML Tags**
```html
<p>Paragraph</p>
<strong>Bold text</strong>
<em>Italic text</em>
<ul><li>Unordered list</li></ul>
<ol><li>Ordered list</li></ol>
<a href="/link">Link</a>
<code>Inline code</code>
<br>Line break
```

### **Best Practices**
- Use semantic HTML
- Keep paragraphs short (< 4 sentences)
- Use `strong` for emphasis, not `b`
- Use `em` for stress, not `i`
- Always close tags
- No inline styles or classes

---

## 🔧 Technical Implementation

### **Section Renderer**
The `SectionRenderer.astro` component automatically routes sections:

```astro
---
// SectionRouter.astro
import TextSection from './sections/TextSection.astro';
import CalloutSection from './sections/CalloutSection.astro';
// ... imports

const componentMap = {
  text: TextSection,
  callout: CalloutSection,
  steps: StepsSection,
  video: VideoSection,
  code: CodeSection,
  image: ImageSection,
  'faq-section': FAQSection,
  comparison: ComparisonSection,
  quote: QuoteSection,
  cta: CTASection,
};
---

{componentMap[section.type] ?
  Astro.createComponent(componentMap[section.type], { section, lang }) :
  <div>Unknown section type: {section.type}</div>
}
```

### **Type Safety**
All sections are type-safe with TypeScript:

```typescript
export type Section =
  | TextSection
  | CalloutSection
  | StepsSection
  | VideoSection
  | CodeSection
  | ImageSection
  | FAQSection
  | ComparisonSection
  | QuoteSection
  | CTASection;
```

---

## 📋 Checklist for New Articles

- [ ] First section is `introduction`
- [ ] Last section is `cta`
- [ ] All sections have unique IDs
- [ ] All content in 3 languages (nl, en, es)
- [ ] Images have alt text in all languages
- [ ] HTML is valid and semantic
- [ ] Section types match available components
- [ ] Callouts use appropriate variants
- [ ] Code sections specify correct language
- [ ] Videos have thumbnails and captions

---

## 🎯 Usage Patterns

### **Tutorial Articles**
1. `introduction` - Overview
2. `steps` - Main tutorial
3. `callout` - Tips and warnings
4. `video` - Demonstration
5. `faq-section` - Common questions
6. `cta` - Next steps

### **Case Studies**
1. `introduction` - Problem statement
2. `text` - Background
3. `steps` - Implementation
4. `comparison` - Before/after
5. `quote` - Customer testimonial
6. `cta` - Contact us

### **Feature Announcements**
1. `introduction` - What's new
2. `text` - How it works
3. `steps` - Getting started
4. `code` - Code examples
5. `video` - Demo video
6. `cta` - Try it now

---

## 🚀 Adding New Section Types

1. **Add to types** (`src/types/blog.ts`):
```typescript
export interface NewSection extends BaseSection {
  type: 'new-type';
  // custom fields
}
```

2. **Create component** (`src/components/blog/sections/NewSection.astro`)

3. **Add to renderer** (`src/components/blog/SectionRenderer.astro`):
```typescript
import NewSection from './sections/NewSection.astro';
const componentMap = {
  // ...
  'new-type': NewSection,
};
```

4. **Update this guide** with new section documentation

---

**Ready to build amazing content? Use these building blocks to create consistent, engaging blog posts! 🚀**
