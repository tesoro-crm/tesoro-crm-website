# AI Agent Blog Writing Guidelines

These guidelines are intended for AI agents writing blog posts for Tesoro CRM. Follow these rules carefully to produce consistent, high-quality content.

## 📋 Table of Contents

1. [General Principles](#general-principles)
2. [Section Types & Order](#section-types--order)
3. [Tone of Voice per Language](#tone-of-voice-per-language)
4. [Length Guidelines](#length-guidelines)
5. [SEO Best Practices](#seo-best-practices)
6. [Image Specifications](#image-specifications)
7. [JSON Structure Validation](#json-structure-validation)
8. [Examples](#examples)

---

## 🎯 General Principles

### Content Philosophy
- **Value first**: Every blog post must provide concrete value to real estate agents and professionals
- **Story-driven**: Use stories and concrete examples, not dry feature lists
- **Actionable**: Give practical tips that readers can apply immediately
- **Authentic**: Use real cases and data (no made-up numbers)

### Target Audience
- **Primary**: Real estate agents, property professionals, office managers
- **Secondary**: Marketing managers in real estate, CRM decision makers
- **Knowledge level**: Varying from beginner to expert
- **Pain points**: Time constraints, technical complexity, lead generation, CRM integration

### Brand Voice
- **Professional but accessible**: No corporate jargon
- **Helpful**: Advisor, not salesperson
- **Honest**: Transparent about limitations and challenges
- **Human**: Use humor where appropriate, but stay professional

---

## 📚 Section Types & Order

### Required Sections (in this order)

#### 1. Hero Section
**Purpose**: Grab attention and provide context
**Elements**:
- Title (max 60 characters for SEO)
- Description (max 160 characters for meta description)
- Hero image (1200x600px minimum)
- Publish date

#### 2. Introduction Section
**Purpose**: Hook the reader and explain what they'll learn
**Structure**:
- Start with a relatable problem or question
- Promise specific value/outcome
- Preview what the article covers
- End with transition to first main section

#### 3. Problem Section
**Purpose**: Show you understand the pain points
**Structure**:
- Describe common challenges
- Use real examples
- Show empathy, not criticism
- Lead into solution

#### 4. Solution Section
**Purpose**: Present the value proposition
**Structure**:
- Break down into clear steps or subsections
- Use concrete examples
- Include benefits and outcomes
- Address potential objections

#### 5. Results Section (for case studies)
**Purpose**: Show proof with metrics
**Structure**:
- Before/after comparisons
- Concrete numbers and percentages
- Testimonials or quotes
- Visual representations (charts, graphs)

#### 6. Takeaways Section
**Purpose**: Summarize key learnings
**Structure**:
- 3-5 bullet points
- Actionable advice
- Quick wins
- Next steps

#### 7. CTA Section
**Purpose**: Drive action
**Structure**:
- Clear call-to-action
- Multiple options (demo, contact, free trial)
- Urgency without pressure
- Contact information

### Optional Sections

#### Technical Section
**Purpose**: Deep dive for technical users
**When to use**: Complex integrations, API usage, advanced features

#### FAQ Section
**Purpose**: Address common questions
**When to use**: Complex topics, common objections

#### Quote Section
**Purpose**: Add credibility
**When to use**: Customer testimonials, expert opinions

---

## 🌍 Tone of Voice per Language

### Nederlands (NL)
- **Formal but warm**: "U" for formal contexts, "je" for tutorials
- **Direct**: Dutch mentality - no detours
- **Practical**: Focus on "how do you do that"
- **Examples**: Use Dutch place names (Amsterdam, Rotterdam) and examples
- **Humor**: Subtle, self-deprecating where appropriate

### English (EN)
- **Professional**: More formal than Dutch
- **Benefit-focused**: Emphasize outcomes and ROI
- **Global perspective**: International examples
- **Data-driven**: Include statistics and research

### Español (ES)
- **Friendly**: Warm and approachable
- **Detailed explanations**: Spanish readers appreciate thoroughness
- **Local examples**: Spanish cities (Madrid, Barcelona) and contexts
- **Passionate**: Show enthusiasm for solutions

---

## 📏 Length Guidelines

### By Article Type

#### Tutorials (How-to guides)
- **Total**: 1,500-2,500 words
- **Hero**: 50-80 words
- **Introduction**: 150-250 words
- **Main content**: 1,000-1,800 words
- **Conclusion**: 200-300 words

#### Case Studies
- **Total**: 2,000-3,500 words
- **Hero**: 60-90 words
- **Problem**: 300-500 words
- **Solution**: 800-1,500 words
- **Results**: 400-700 words
- **Conclusion**: 200-300 words

#### Feature Announcements
- **Total**: 800-1,500 words
- **Hero**: 50-70 words
- **Explanation**: 600-1,000 words
- **Examples**: 300-500 words

### Reading Time
- **Calculate**: Word count ÷ 200 = minutes
- **Target**: 5-12 minutes per article
- **Display**: Show estimated reading time prominently

---

## 🔍 SEO Best Practices

### Title Optimization
- **Length**: 50-60 characters
- **Keywords**: Include primary keyword near beginning
- **Benefit**: Show value/outcome
- **Numbers**: Use numbers when applicable (5 Ways, 10 Tips)

### Meta Description
- **Length**: 150-160 characters
- **Keywords**: Include primary and secondary keywords
- **CTA**: Include subtle call-to-action
- **Unique**: Each post must have unique meta description

### Content SEO
- **H1**: One per page (title)
- **H2**: 3-6 per article (section headers)
- **H3**: For subsections
- **Keyword density**: 1-2% naturally distributed
- **Internal links**: Link to 2-3 related articles
- **External links**: 1-2 authoritative sources

### Technical SEO
- **URL structure**: `/blog/[category]/[slug]`
- **Slug**: kebab-case, descriptive, keyword-rich
- **Images**: Optimized, alt text, descriptive filenames
- **Structured data**: Article schema, FAQ schema
- **Mobile-first**: Test on mobile devices

---

## 🖼️ Image Specifications

### Hero Image
**Dimensions**: 1200x600px (2:1 ratio)
**Format**: JPG (photos), PNG (graphics)
**File size**: Max 200KB (optimized)
**Alt text**: Descriptive, 10-15 words, includes keyword
**Naming**: `hero-[slug].jpg`

**Example alt texts**:
✅ "Modern real estate agent website on laptop with CRM dashboard"
❌ "Website image"

### Content Images
**Dimensions**: 800x400px minimum (2:1 ratio)
**Format**: JPG or PNG
**File size**: Max 150KB
**Alt text**: Descriptive, context-relevant
**Caption**: Optional but recommended for context

### Screenshots
**Dimensions**: Original resolution (max 1920px wide)
**Format**: PNG (for sharpness)
**File size**: Max 300KB
**Annotations**: Add red arrows/circles for focus
**Alt text**: Describe what's shown + context

---

## ✅ JSON Structure Validation

### Required Fields
```json
{
  "meta": {
    "id": "string",           // English slug
    "version": "1.0.0",
    "publishDate": "2024-01-15",
    "updatedAt": "2024-01-15T10:00:00Z",
    "author": "author-id",    // Reference to authors.json
    "category": "valid-category",
    "tags": ["tag1", "tag2"],
    "featured": false,
    "draft": false,
    "readingTime": 5,
    "aiGenerated": true
  }
}
```

### Language Validation
- **All fields**: Must have nl, en, es keys
- **Text content**: HTML allowed, semantic markup
- **Character limits**: Respect SEO limits
- **Unique IDs**: Section IDs must be unique per article

### Schema Validation
- **Zod schema**: All content validated against schema
- **Type safety**: TypeScript interfaces enforced
- **Error messages**: Clear validation feedback

---

## 📝 Writing Checklist

### Pre-Writing
- [ ] Target audience identified
- [ ] Value proposition clear
- [ ] Keywords researched
- [ ] Outline approved
- [ ] Images sourced

### Content Creation
- [ ] All sections present and in order
- [ ] Tone of voice consistent
- [ ] Examples concrete and relevant
- [ ] Technical accuracy verified
- [ ] Length guidelines followed

### SEO Optimization
- [ ] Title optimized (50-60 chars)
- [ ] Meta description written (150-160 chars)
- [ ] Keywords naturally integrated
- [ ] Headers hierarchical (H1→H2→H3)
- [ ] Internal links added

### Quality Assurance
- [ ] Grammar and spelling checked
- [ ] Readability tested (Flesch score)
- [ ] Mobile formatting verified
- [ ] Links functional
- [ ] Images optimized

---

## 🎨 Content Examples

### Good Title Examples
✅ "How to Generate 50% More Leads with CRM Automation"
✅ "5 CRM Mistakes Costing Your Real Estate Business Money"
✅ "Complete Guide: CRM Integration for Real Estate Agents"

### Bad Title Examples
❌ "CRM Features" (too generic)
❌ "Everything You Need to Know About CRM" (too broad)
❌ "The Best CRM Solution Ever" (too salesy)

### Good Introduction Example
> "As a busy real estate agent, you're probably drowning in spreadsheets, sticky notes, and missed follow-ups. What if there was a way to automate your lead nurturing process while you sleep? In this guide, you'll learn how to set up CRM automation that generates 3x more qualified leads with just 30 minutes of setup time."

### Bad Introduction Example
> "CRM automation is important. This article will explain CRM automation. We will show you how to set it up."

---

## 📊 Success Metrics

### Content Performance
- **Page views**: Target 500+ per article
- **Time on page**: Target 3+ minutes
- **Bounce rate**: Target <40%
- **Conversion rate**: Track demo requests, signups

### SEO Performance
- **Organic rankings**: Track keyword positions
- **Organic traffic**: Monthly growth target
- **Backlinks**: Quality over quantity
- **Domain authority**: Long-term goal

### User Engagement
- **Social shares**: Track sharing rates
- **Comments**: Monitor feedback
- **Email subscribers**: Conversion from content
- **Lead quality**: Track lead source attribution

---

**Ready to create amazing content? Follow these guidelines for consistent, high-performing blog posts! 🚀**
