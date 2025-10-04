---
id: STORY-033
title: SEO & Language Detection
status: proposed
epic: EPIC-011
assignee: SEO Specialist
priority: medium
estimate: 3 story points
---

## User Story
Als SEO specialist wil ik dat elke taalversie correct geïndexeerd wordt door zoekmachines en dat gebruikers automatisch de juiste taal zien.

## Acceptance Criteria
- [ ] Hreflang tags op alle pages
- [ ] Language detection based on browser/location
- [ ] Language preference persistence (cookie/localStorage)
- [ ] Sitemap.xml met alle taalversies
- [ ] Canonical URLs correct per taal
- [ ] robots.txt updated

## SEO Implementation

### 1. Hreflang Tags
```html
<!-- In <head> of each page -->
<link rel="alternate" hreflang="nl" href="https://tesoro-crm.com/" />
<link rel="alternate" hreflang="en" href="https://tesoro-crm.com/en" />
<link rel="alternate" hreflang="es" href="https://tesoro-crm.com/es" />
<link rel="alternate" hreflang="x-default" href="https://tesoro-crm.com/" />
```

### 2. HTML Lang Attribute
```html
<html lang="nl">  <!-- Dutch -->
<html lang="en">  <!-- English -->
<html lang="es">  <!-- Spanish -->
```

### 3. Canonical URLs
```html
<link rel="canonical" href="https://tesoro-crm.com/pricing" />
<link rel="canonical" href="https://tesoro-crm.com/en/pricing" />
<link rel="canonical" href="https://tesoro-crm.com/es/pricing" />
```

## Language Detection Logic

### Priority Order
1. **User preference** (cookie/localStorage) - highest priority
2. **URL path** (`/en`, `/es`) - explicit choice
3. **Browser language** (`Accept-Language` header)
4. **Geo-location** (Cloudflare country header)
5. **Default** (Nederlands) - fallback

### Implementation
```typescript
// src/middleware/language-detection.ts
export function detectLanguage(request: Request): string {
  // 1. Check cookie
  const cookieLang = getCookie('preferred-language');
  if (cookieLang) return cookieLang;
  
  // 2. Check URL
  const urlLang = getLanguageFromPath(request.url);
  if (urlLang) return urlLang;
  
  // 3. Check browser
  const browserLang = request.headers.get('Accept-Language');
  if (browserLang?.startsWith('en')) return 'en';
  if (browserLang?.startsWith('es')) return 'es';
  
  // 4. Check geo (Cloudflare)
  const country = request.headers.get('CF-IPCountry');
  if (country === 'ES') return 'es';
  if (country === 'GB' || country === 'US') return 'en';
  
  // 5. Default
  return 'nl';
}
```

## Language Persistence

### Cookie Storage
```typescript
// Set language preference
document.cookie = `preferred-language=${locale}; path=/; max-age=31536000`;

// Read preference
function getPreferredLanguage(): string {
  const match = document.cookie.match(/preferred-language=([^;]+)/);
  return match ? match[1] : 'nl';
}
```

### LocalStorage Alternative
```typescript
// Set
localStorage.setItem('preferred-language', locale);

// Get
const locale = localStorage.getItem('preferred-language') || 'nl';
```

## Sitemap Generation

### sitemap.xml Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>https://tesoro-crm.com/</loc>
    <xhtml:link rel="alternate" hreflang="nl" href="https://tesoro-crm.com/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://tesoro-crm.com/en" />
    <xhtml:link rel="alternate" hreflang="es" href="https://tesoro-crm.com/es" />
    <lastmod>2025-10-04</lastmod>
    <priority>1.0</priority>
  </url>
  
  <!-- Pricing -->
  <url>
    <loc>https://tesoro-crm.com/pricing</loc>
    <xhtml:link rel="alternate" hreflang="nl" href="https://tesoro-crm.com/pricing" />
    <xhtml:link rel="alternate" hreflang="en" href="https://tesoro-crm.com/en/pricing" />
    <xhtml:link rel="alternate" hreflang="es" href="https://tesoro-crm.com/es/pricing" />
    <lastmod>2025-10-04</lastmod>
    <priority>0.8</priority>
  </url>
  
  <!-- ... more pages -->
</urlset>
```

## Meta Tags per Language

### Dutch (default)
```html
<html lang="nl">
<head>
  <title>Tesoro CRM - Captación Inteligente voor Professionals</title>
  <meta name="description" content="Automatiseer je leadgeneratie..." />
  <meta property="og:locale" content="nl_NL" />
</head>
```

### English
```html
<html lang="en">
<head>
  <title>Tesoro CRM - Intelligent Lead Generation for Professionals</title>
  <meta name="description" content="Automate your lead generation..." />
  <meta property="og:locale" content="en_US" />
</head>
```

### Spanish
```html
<html lang="es">
<head>
  <title>Tesoro CRM - Captación Inteligente para Profesionales</title>
  <meta name="description" content="Automatiza la generación de leads..." />
  <meta property="og:locale" content="es_ES" />
</head>
```

## Technical Tasks
1. Add hreflang tags to Layout component
2. Implement language detection middleware
3. Add language persistence (cookie)
4. Generate sitemap.xml with all languages
5. Update meta tags per language
6. Test with Google Search Console
7. Add structured data (JSON-LD) per language

## Files to Create/Modify
- `src/middleware/language-detection.ts` - Detection logic
- `src/layouts/Layout.astro` - Add hreflang tags
- `public/sitemap.xml` - Multi-language sitemap
- `src/components/Header.astro` - Persist language choice
- `astro.config.mjs` - Add sitemap integration

## Testing
- [ ] Hreflang validator (Google Search Console)
- [ ] Test language detection in different browsers
- [ ] Verify cookie persistence
- [ ] Check sitemap.xml validity
- [ ] Test with VPN (different countries)
- [ ] Verify canonical URLs
- [ ] Check structured data

## SEO Checklist
- [ ] All pages have hreflang tags
- [ ] HTML lang attribute correct
- [ ] Canonical URLs set
- [ ] Sitemap includes all languages
- [ ] Meta descriptions translated
- [ ] Title tags translated
- [ ] Alt text translated
- [ ] Structured data per language
- [ ] No duplicate content issues

## Notes
- Use `x-default` for language selector page
- Monitor Google Search Console for indexing issues
- Consider using Cloudflare's automatic language redirect
- Test with tools:
  - Google Search Console
  - Screaming Frog
  - Ahrefs Site Audit
