# Tailwind Refactor Plan

## ✅ Waarom Tailwind?

**Voordelen:**
- 🚀 Sneller ontwikkelen met utility classes
- 📦 Kleinere bundle size (purged CSS)
- 🎨 Consistent design system
- 🔧 Makkelijker te onderhouden
- 📱 Responsive design out-of-the-box

## 🎯 Te Refactoren Components

### **Blog Components** (Prioriteit: Hoog)
- [ ] `HighlightsSection.astro` - Veel custom CSS
- [ ] `ContentSection.astro` - Veel layout CSS
- [ ] `ResultsCardsSection.astro` - Grid & card styling
- [ ] `QuoteSection.astro` - Custom styling
- [ ] `CTASection.astro` - Button & layout styling
- [ ] `IntroductionSection.astro` - Typography

### **Blog Pages**
- [ ] `blog/[...slug].astro` - Veel custom CSS (>800 lijnen!)
- [ ] `blog/index.astro` - Card grids & filters

### **Utility Components**
- [ ] `ImageWithFallback.astro` - Modal & hover states
- [ ] `RelatedPosts.astro` - Card styling

## 📝 Voorbeeld: HighlightsSection

### **Voor (Custom CSS):**
```css
.highlights-box {
  padding: 1.5rem 2rem;
  border-radius: 8px;
  border-left: 4px solid;
}

.highlights-section[data-variant="warning"] .highlights-box {
  background: #fef2f2;
  border-color: #dc2626;
}
```

### **Na (Tailwind):**
```html
<div class="p-6 rounded-lg border-l-4 bg-red-50 border-red-600">
  <!-- content -->
</div>
```

## 🎨 Tailwind Config Highlights

**Custom Colors:**
- `primary` - Navy (#0A1F44)
- `accent` - Orange (#FF9F43)
- `warning` - Orange (#F59E0B)
- `success` - Green (#10B981)

**Custom Fonts:**
- `font-sans` - Inter (body)
- `font-display` - Poppins (headings)
- `font-mono` - JetBrains Mono (code)

**Custom Spacing:**
- `space-2xs` tot `space-4xl`

## 🚀 Voordelen per Component

### **HighlightsSection:**
- ✅ 50+ lijnen CSS → 10 Tailwind classes
- ✅ Variants via `data-variant` → `className` prop
- ✅ Responsive out-of-the-box

### **ResultsCardsSection:**
- ✅ Custom grid CSS → `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- ✅ Hover states → `hover:shadow-lg hover:-translate-y-1`
- ✅ Responsive gaps → `gap-4 md:gap-6 lg:gap-8`

### **Blog Article Page:**
- ✅ 800+ lijnen CSS → ~200 lijnen Tailwind
- ✅ Sticky TOC → `sticky top-8`
- ✅ Grid layout → `grid grid-cols-1 lg:grid-cols-[1fr_280px]`

## 📋 Volgende Stappen

1. **Start met kleine components** (HighlightsSection)
2. **Test grondig** na elke refactor
3. **Documenteer patterns** voor consistentie
4. **Gebruik @apply** alleen voor complexe patterns
5. **Leverage Tailwind plugins** (@tailwindcss/typography voor blog content)

## 💡 Best Practices

- ✅ Gebruik Tailwind utilities waar mogelijk
- ✅ Custom CSS alleen voor complexe animaties/transitions
- ✅ Gebruik `@apply` spaarzaam (alleen voor herbruikbare patterns)
- ✅ Leverage `prose` class voor blog content
- ✅ Gebruik responsive modifiers (`sm:`, `md:`, `lg:`)
- ✅ Gebruik state modifiers (`hover:`, `focus:`, `active:`)

Wil je dat ik begin met het refactoren van een component? Welke heeft prioriteit?
