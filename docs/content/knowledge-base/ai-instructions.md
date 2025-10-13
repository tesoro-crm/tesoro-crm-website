# 🤖 AI Agent Instructions for Knowledge Base Articles

## 📋 Important Rules

### 1. **Slugs/IDs are ALWAYS in English**
```json
{
  "meta": {
    "id": "add-contact",  // ✅ English
    "id": "contact-toevoegen"  // ❌ WRONG - Dutch
  }
}
```

**Why?**
- URLs remain consistent across all languages
- `/nl/knowledge-base/add-contact` (Dutch article, English slug)
- `/en/knowledge-base/add-contact` (English article, same slug)
- `/es/knowledge-base/add-contact` (Spanish article, same slug)

### 2. **Slug Naming Conventions**
- Use kebab-case: `add-contact`, `import-properties`
- Short and descriptive: max 3-4 words
- No special characters, only `a-z`, `0-9`, and `-`
- No language-specific words

**Examples:**
```
✅ add-contact
✅ import-csv
✅ setup-email
✅ troubleshoot-sync
✅ custom-fields

❌ contact-toevoegen (Dutch)
❌ añadir-contacto (Spanish)
❌ add_contact (underscore)
❌ addContact (camelCase)
```

### 3. **Category Slugs - Also English**
```json
{
  "meta": {
    "category": "getting-started",  // ✅ English
    "category": "aan-de-slag"       // ❌ WRONG
  }
}
```

**Available categories:**
- `getting-started`
- `contacts`
- `properties`
- `communication`
- `integrations`
- `reports`
- `settings`
- `troubleshooting`
- `best-practices`

### 4. **Tags - Also English**
```json
{
  "meta": {
    "tags": ["contacts", "basics", "crm"],  // ✅ English
    "tags": ["contacten", "basis", "crm"]   // ❌ WRONG
  }
}
```

---

## 📝 JSON Template for New Articles

```json
{
  "meta": {
    "id": "article-slug-in-english",
    "version": "1.0.0",
    "publishDate": "2024-10-11",
    "updatedAt": "2024-10-11T17:00:00Z",
    "authorId": "maria-perez",
    "category": "getting-started",
    "difficulty": "beginner",
    "tags": ["tag1", "tag2", "tag3"],
    "featured": false,
    "readingTime": 5,
    "videoIncluded": false,
    "aiGenerated": true
  },

  "seo": {
    "socialImage": "https://images.unsplash.com/photo-xxx",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  },

  "hero": {
    "title": {
      "nl": "Dutch Title",
      "en": "English Title",
      "es": "Título en Español"
    },
    "description": {
      "nl": "Dutch description of the article...",
      "en": "English description of the article...",
      "es": "Description in Spanish of the article..."
    },
    "icon": "📄"
  },

  "sections": [
    {
      "type": "text",
      "id": "intro",
      "content": {
        "nl": {
          "text": "<p>Dutch content...</p>"
        },
        "en": {
          "text": "<p>English content...</p>"
        },
        "es": {
          "text": "<p>Content in Spanish...</p>"
        }
      }
    }
  ],

  "relatedArticles": [
    "related-article-slug-1",
    "related-article-slug-2"
  ],

  "faq": [
    {
      "question": {
        "nl": "Dutch question?",
        "en": "English question?",
        "es": "¿Question in Spanish?"
      },
      "answer": {
        "nl": "Dutch answer.",
        "en": "English answer.",
        "es": "Answer in Spanish."
      }
    }
  ]
}
```

---

## 🎯 Section Types & Usage

### **1. Text Section**
Basic text with HTML formatting.

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
  }
}
```

### **2. Callout Section**
For tips, warnings, notes.

```json
{
  "type": "callout",
  "id": "tip-section",
  "variant": "tip",  // tip, warning, note, success, danger
  "title": {
    "nl": "💡 Tip",
    "en": "💡 Tip",
    "es": "💡 Tip"
  },
  "content": {
    "nl": { "text": "<p>Useful tip...</p>" },
    "en": { "text": "<p>Useful tip...</p>" },
    "es": { "text": "<p>Useful tip...</p>" }
  }
}
```

### **3. Steps Section**
For step-by-step instructions.

```json
{
  "type": "steps",
  "id": "how-to-steps",
  "title": {
    "nl": "Steps",
    "en": "Steps",
    "es": "Steps"
  },
  "steps": [
    {
      "title": {
        "nl": "Step 1: Do this",
        "en": "Step 1: Do this",
        "es": "Step 1: Do this"
      },
      "content": {
        "nl": { "text": "<p>Explanation...</p>" },
        "en": { "text": "<p>Explanation...</p>" },
        "es": { "text": "<p>Explanation...</p>" }
      },
      "image": {
        "src": "https://...",
        "alt": {
          "nl": "Alt text",
          "en": "Alt text",
          "es": "Alt text"
        }
      }
    }
  ]
}
```

### **4. Video Section**
For YouTube/Loom videos.

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
  "thumbnail": "https://...",
  "caption": {
    "nl": "Watch this video...",
    "en": "Watch this video...",
    "es": "Watch this video..."
  },
  "duration": "5:30"
}
```

### **5. Code Section**
For code examples.

```json
{
  "type": "code",
  "id": "code-example",
  "title": {
    "nl": "Code Example",
    "en": "Code Example",
    "es": "Code Example"
  },
  "language": "javascript",
  "code": "const example = 'code here';",
  "caption": {
    "nl": "This is an example...",
    "en": "This is an example...",
    "es": "This is an example..."
  }
}
```

### **6. Image Section**
For screenshots with caption.

```json
{
  "type": "image",
  "id": "screenshot",
  "title": {
    "nl": "Screenshot",
    "en": "Screenshot",
    "es": "Screenshot"
  },
  "src": "https://...",
  "alt": {
    "nl": "Alt text",
    "en": "Alt text",
    "es": "Alt text"
  },
  "caption": {
    "nl": "This shows...",
    "en": "This shows...",
    "es": "This shows..."
  },
  "width": 800,
  "height": 600
}
```

### **7. FAQ Section**
For frequently asked questions within an article.

```json
{
  "type": "faq",
  "id": "common-questions",
  "title": {
    "nl": "Frequently Asked Questions",
    "en": "Frequently Asked Questions",
    "es": "Frequently Asked Questions"
  },
  "items": [
    {
      "question": {
        "nl": "Question?",
        "en": "Question?",
        "es": "¿Question?"
      },
      "answer": {
        "nl": { "text": "<p>Answer...</p>" },
        "en": { "text": "<p>Answer...</p>" },
        "es": { "text": "<p>Answer...</p>" }
      }
    }
  ]
}
```

---

## ✍️ Content Writing Guidelines

### **Tone of Voice**
- **Friendly** - Speak directly to the user
- **Clear** - No jargon, simple language
- **Helpful** - Focus on solutions
- **Professional** - But not too formal

### **Structure**
1. **Intro** - What will this article cover?
2. **Steps/Content** - How to do it?
3. **Tips** - Extra useful information
4. **Related Articles** - Where to learn more?
5. **FAQ** - Frequently asked questions

### **HTML Formatting**
```html
<p>Paragraph text</p>
<strong>Bold text</strong>
<em>Italic text</em>
<ul>
  <li>Bullet point</li>
</ul>
<ol>
  <li>Numbered list</li>
</ol>
<a href="/link">Link text</a>
<code>inline code</code>
```

### **Screenshots**
- Use Unsplash for placeholder images
- Format: `https://images.unsplash.com/photo-xxx?w=800&h=600&fit=crop`
- Always include alt text in all 3 languages

---

## 🎨 Icons & Emojis

**Per Category:**
- 🚀 Getting Started
- 👥 Contacts
- 🏠 Properties
- 📧 Communication
- 🔗 Integrations
- 📊 Reports
- ⚙️ Settings
- 🆘 Troubleshooting
- 💡 Best Practices

**Callout Variants:**
- 💡 Tip
- ⚠️ Warning
- 📝 Note
- ✅ Success
- ❌ Danger

---

## 📊 Metadata Guidelines

### **Difficulty Levels**
- `beginner` - Basic functionality, no prior knowledge
- `intermediate` - Requires basic CRM knowledge
- `advanced` - Complex features, integrations, API

### **Reading Time**
- Count words and divide by 200 (average reading speed)
- Round up
- Don't count video time (separate field)

### **Tags**
- Max 5 tags per article
- Use existing tags where possible
- Lowercase, English, no spaces

### **Featured**
- Max 3 featured articles per category
- Most important/popular articles
- Update regularly based on analytics

---

## 🔄 Update Workflow

### **New Article**
1. Choose English slug: `article-name`
2. Create JSON file: `/src/content/knowledge-base/article-name.json`
3. Fill all 3 languages (nl, en, es)
4. Test locally: `npm run dev`
5. Commit & push

### **Update Existing Article**
1. Open JSON file
2. Update `meta.updatedAt` timestamp
3. Change content
4. Test locally
5. Commit with clear message

### **Delete Article**
1. Delete JSON file
2. Update `relatedArticles` in other articles
3. Check for broken links
4. Commit

---

## 🎯 Quick Start Checklist

Create new article:
- [ ] Choose English slug
- [ ] Create JSON file
- [ ] Fill meta data
- [ ] Add hero section in 3 languages
- [ ] Add at least 1 text section
- [ ] Add related articles
- [ ] Add FAQ (optional)
- [ ] Test locally
- [ ] Committed & pushed

---

## 💡 Best Practices

1. **Reuse content** - Copy structure from existing articles
2. **Stay consistent** - Same tone and style
3. **Keep screenshots current** - Update regularly
4. **Use relative links** - `/knowledge-base/...`
5. **Good SEO** - Good keywords in title and description
6. **Mobile** - Test on mobile, short paragraphs
7. **Accessibility** - Alt text for all images
8. **Updates** - Review articles quarterly

---

## 🎯 Examples of Good Slugs

```
✅ add-contact
✅ import-contacts-csv
✅ setup-email-integration
✅ create-custom-field
✅ export-property-list
✅ troubleshoot-sync-error
✅ configure-user-permissions
✅ generate-sales-report
✅ connect-zapier
✅ setup-whatsapp
```

**Pattern:** `[action]-[object]` or `[action]-[object]-[detail]`
