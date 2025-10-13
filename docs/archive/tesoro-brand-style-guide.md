# Tesoro CRM - Brand Style Guide

## Overview
This style guide defines the complete brand identity system for Tesoro CRM, including color palette, typography, components, and usage guidelines.

---

## 🎨 Color System

### Primary Brand Colors

#### Warm Colors (Energy & Action)
```css
--tesoro-yellow: #FCC72C        /* Bright, attention-grabbing yellow */
--tesoro-orange-light: #F8B131  /* Warm, friendly orange */  
--tesoro-coral: #EE7461         /* Sophisticated coral-orange */
--tesoro-orange: #ED6E19        /* Primary brand orange */
--tesoro-orange-dark: #F18407   /* Rich, deep orange */
--tesoro-red: #E84847          /* Bold, energetic red */
```

#### Cool Colors (Trust & Stability)
```css
--tesoro-pink: #E94A93          /* Vibrant, modern pink */
--tesoro-pink-dark: #CF1D5B     /* Deep, professional pink */
--tesoro-burgundy: #B6154A      /* Rich burgundy accent */
--tesoro-red-bright: #E2071E    /* Pure, confident red */
--tesoro-pink-light: #EE8BB6    /* Soft, approachable pink */
--tesoro-purple-light: #8C6DAC  /* Creative purple accent */
```

#### Blue Family (Professional)
```css
--tesoro-purple: #7C61A7        /* Premium purple */
--tesoro-blue-dark: #3B529F     /* Trustworthy dark blue */
--tesoro-blue-navy: #36398D     /* Professional navy */
--tesoro-blue-light: #57AEE3    /* Fresh, modern light blue */
```

---

## 🏷️ Color Applications

### Blog Categories
Each blog category automatically receives a unique brand color:

| Category | Color | Hex | Usage |
|----------|--------|-----|-------|
| Case Study | Orange | `#ED6E19` | Success stories, client transformations |
| CRM Tips | Blue Dark | `#3B529F` | Educational content, best practices |
| Success Stories | Pink | `#E94A93` | Client testimonials, achievements |
| Real Estate | Purple | `#7C61A7` | Industry-specific content |
| Integrations | Blue Light | `#57AEE3` | Technical features, connections |
| Tutorials | Yellow | `#FCC72C` | Step-by-step guides |
| Updates | Coral | `#EE7461` | Product announcements |
| Insights | Purple Light | `#8C6DAC` | Market analysis, trends |

### Callout Sections
Contextual color coding for different message types:

| Variant | Color | Purpose | Icon |
|---------|--------|---------|------|
| Info | Blue Light | General information | 💡 |
| Success | Green | Achievements, confirmations | ✅ |
| Warning | Yellow | Cautions, important notes | ⚠️ |
| Danger | Red | Errors, critical alerts | 🚨 |
| Tip | Orange | Helpful suggestions | 💡 |
| Insight | Purple | Strategic advice | 🎯 |
| Update | Pink | New features, changes | 🆕 |

---

## 🎯 Usage Guidelines

### Primary Actions (CTAs)
- **Primary CTA**: Orange (`--tesoro-orange`)
- **Secondary CTA**: Orange Dark (`--tesoro-orange-dark`)
- **Hover states**: Darker shade of base color

### Interactive Elements
- **Links**: Blue Dark (`--tesoro-blue-dark`)
- **Buttons**: Orange family
- **Form elements**: Blue accents
- **Navigation**: Navy blue

### Content Hierarchy
- **Headers**: Dark neutrals with color accents
- **Body text**: Neutral grays
- **Highlights**: Brand colors for emphasis
- **Backgrounds**: Light tints of brand colors

---

## 📱 Responsive Color Usage

### Desktop (1440px+)
- Full color palette available
- Gradients and complex color schemes
- Hover effects with color transitions

### Tablet (768px - 1439px)
- Simplified color scheme
- Essential brand colors only
- Reduced gradient usage

### Mobile (320px - 767px)
- Core brand colors (Orange, Blue Dark, Pink)
- High contrast for readability
- Minimal decorative color usage

---

## ♿ Accessibility Standards

### Color Contrast Requirements
All color combinations meet WCAG 2.1 AA standards:
- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text**: 3:1 contrast ratio minimum
- **Interactive elements**: Clear focus states

### Color-Blind Considerations
- Never rely solely on color to convey information
- Use icons, patterns, or text alongside colors
- Test with color-blind simulation tools

---

## 🔧 Technical Implementation

### CSS Variables
All colors are defined as CSS custom properties in `/src/styles/typography.css`:
```css
:root {
  /* Tesoro Brand Colors */
  --tesoro-orange: #ED6E19;
  --tesoro-blue-dark: #3B529F;
  /* ... all other colors */
}
```

### Dynamic Color Mapping
Blog categories use dynamic color assignment:
```javascript
function getCategoryStyle(category: string) {
  const categoryKey = category.toLowerCase().replace(/\s+/g, '-');
  return {
    color: `var(--category-${categoryKey}, var(--tesoro-orange))`,
    backgroundColor: `var(--category-${categoryKey}-bg, #FFF4E6)`
  };
}
```

---

## 📋 Brand Color Psychology

### Warm Colors (Orange Family)
- **Energy**: Motivating, action-oriented
- **Friendliness**: Approachable, welcoming
- **Confidence**: Professional, trustworthy
- **Innovation**: Modern, forward-thinking

### Cool Colors (Blue/Purple Family)  
- **Trust**: Reliable, stable
- **Professionalism**: Corporate, serious
- **Expertise**: Knowledgeable, experienced
- **Premium**: High-quality, valuable

### Accent Colors (Pink/Red Family)
- **Attention**: Eye-catching, important
- **Modern**: Contemporary, fresh
- **Success**: Achievement, growth
- **Community**: Social, connected

---

## 🚀 Implementation Checklist

### ✅ Completed
- [x] Complete color palette defined
- [x] CSS variables implemented  
- [x] Blog category color mapping
- [x] Callout section variants
- [x] Dynamic color functions
- [x] Accessibility compliance

### 🔄 In Progress
- [ ] Component library documentation
- [ ] Design tokens export
- [ ] Style guide website
- [ ] Brand asset downloads

### 📝 Future Enhancements
- [ ] Seasonal color variations
- [ ] Dark mode color scheme
- [ ] Animation guidelines
- [ ] Print color specifications

---

*Last updated: October 2024*  
*Version: 1.0.0*