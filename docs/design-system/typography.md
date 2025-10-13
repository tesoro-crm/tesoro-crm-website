# Typography System

**Complete typography guidelines for Tesoro CRM**

---

## 🔤 Font Stack

### Primary Fonts

**Display Font: Poppins**
```css
font-family: "Poppins", system-ui, -apple-system, sans-serif;
```
- **Purpose**: Headings (H1-H3), hero text, brand elements
- **Weights**: 600 (SemiBold), 700 (Bold)
- **Character**: Modern, geometric, confident
- **Loading**: Via Fontsource for optimal performance

**Body Font: Inter**
```css
font-family: "Inter", system-ui, -apple-system, sans-serif;
```
- **Purpose**: Body text, UI elements, captions, descriptions
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Character**: Readable, neutral, professional
- **Loading**: Variable font for better performance

**Monospace Font: JetBrains Mono**
```css
font-family: "JetBrains Mono", "Fira Code", "Consolas", monospace;
```
- **Purpose**: Code snippets, technical data, API documentation
- **Weight**: 400 (Regular)
- **Features**: Coding ligatures, excellent readability

---

## 📏 Type Scale

### Heading Scale

| Element | Size | Line Height | Weight | Font | Usage |
|---------|------|-------------|---------|------|-------|
| **H1** | 3.75rem (60px) | 1.1 (66px) | 700 | Poppins | Hero headings, page titles |
| **H2** | 3rem (48px) | 1.2 (58px) | 700 | Poppins | Section headings |
| **H3** | 2.25rem (36px) | 1.3 (47px) | 600 | Poppins | Subsection headings |
| **H4** | 1.875rem (30px) | 1.4 (42px) | 600 | Poppins | Card headings |
| **H5** | 1.5rem (24px) | 1.5 (36px) | 600 | Poppins | Small headings |
| **H6** | 1.25rem (20px) | 1.5 (30px) | 600 | Poppins | Labels, overlines |

### Body Text Scale

| Element | Size | Line Height | Weight | Font | Usage |
|---------|------|-------------|---------|------|-------|
| **Lead** | 1.25rem (20px) | 1.6 (32px) | 400 | Inter | Hero descriptions, lead paragraphs |
| **Body Large** | 1.125rem (18px) | 1.75 (32px) | 400 | Inter | Important body text |
| **Body** | 1rem (16px) | 1.6 (26px) | 400 | Inter | Default body text |
| **Body Small** | 0.875rem (14px) | 1.5 (21px) | 400 | Inter | Captions, help text |
| **Caption** | 0.75rem (12px) | 1.4 (17px) | 500 | Inter | Fine print, metadata |

### UI Text Scale

| Element | Size | Line Height | Weight | Font | Usage |
|---------|------|-------------|---------|------|-------|
| **Button Large** | 1rem (16px) | 1.5 (24px) | 500 | Inter | Primary CTAs |
| **Button** | 0.875rem (14px) | 1.4 (20px) | 500 | Inter | Standard buttons |
| **Button Small** | 0.75rem (12px) | 1.3 (16px) | 500 | Inter | Compact buttons |
| **Input** | 1rem (16px) | 1.5 (24px) | 400 | Inter | Form inputs |
| **Label** | 0.875rem (14px) | 1.4 (20px) | 500 | Inter | Form labels |

---

## 📱 Responsive Typography

### Breakpoint Adjustments

**Mobile (320px - 767px)**
```css
/* Scale down headings for mobile */
h1 { font-size: 2.5rem; }      /* 40px */
h2 { font-size: 2rem; }        /* 32px */
h3 { font-size: 1.75rem; }     /* 28px */
h4 { font-size: 1.5rem; }      /* 24px */

/* Optimize body text */
.lead { font-size: 1.125rem; } /* 18px */
body { font-size: 1rem; }      /* 16px */
```

**Tablet (768px - 1023px)**
```css
/* Moderate scaling */
h1 { font-size: 3rem; }        /* 48px */
h2 { font-size: 2.5rem; }      /* 40px */
h3 { font-size: 2rem; }        /* 32px */
```

**Desktop (1024px+)**
```css
/* Full scale as defined above */
```

---

## 🎨 Typography Utilities

### Font Weights

```css
.font-normal     { font-weight: 400; }  /* Regular */
.font-medium     { font-weight: 500; }  /* Medium */
.font-semibold   { font-weight: 600; }  /* SemiBold */
.font-bold       { font-weight: 700; }  /* Bold */
```

### Letter Spacing

```css
.tracking-tight   { letter-spacing: -0.02em; }  /* Large headings */
.tracking-normal  { letter-spacing: 0; }        /* Default */
.tracking-wide    { letter-spacing: 0.05em; }   /* Buttons, labels */
```

### Text Alignment

```css
.text-left       { text-align: left; }
.text-center     { text-align: center; }
.text-right      { text-align: right; }
.text-justify    { text-align: justify; }
```

### Text Colors

```css
.text-primary    { color: #003366; }     /* Primary blue */
.text-accent     { color: #4BA3FF; }     /* Primary accent */
.text-secondary  { color: #F5B400; }     /* Secondary gold */
.text-neutral-900 { color: #111827; }    /* Headings */
.text-neutral-800 { color: #1A1A1A; }    /* Body text */
.text-neutral-600 { color: #6B7280; }    /* Muted text */
.text-neutral-400 { color: #9CA3AF; }    /* Placeholder */
```

---

## 📐 Spacing Guidelines

### Vertical Rhythm

**Paragraph Spacing**
```css
p + p           { margin-top: 1.5rem; }   /* 24px between paragraphs */
h1, h2, h3 + p  { margin-top: 1rem; }     /* 16px after headings */
p + h2, p + h3  { margin-top: 3rem; }     /* 48px before new sections */
```

**Line Length**
- **Optimal**: 45-75 characters per line
- **Maximum**: 85 characters for readability
- **Minimum**: 35 characters to avoid awkward breaks

**Heading Spacing**
```css
h1 { margin-bottom: 2rem; }      /* 32px */
h2 { margin: 3rem 0 1.5rem; }    /* 48px top, 24px bottom */
h3 { margin: 2rem 0 1rem; }      /* 32px top, 16px bottom */
```

---

## ♿ Accessibility Guidelines

### Contrast Requirements
- **Normal text** (16px): Minimum 4.5:1 contrast ratio
- **Large text** (18px+ or 14px+ bold): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Font Size Considerations
- **Minimum text size**: 14px (0.875rem) for accessibility
- **Preferred minimum**: 16px (1rem) for better readability
- **Touch targets**: Minimum 24px for interactive text

### Screen Reader Support
```html
<!-- Use semantic headings -->
<h1>Main page title</h1>
<h2>Section heading</h2>
<h3>Subsection heading</h3>

<!-- Provide text alternatives -->
<span class="sr-only">Screen reader only text</span>

<!-- Use proper markup -->
<strong>Important text</strong>
<em>Emphasized text</em>
```

---

## 🔧 Implementation

### CSS Custom Properties

```css
:root {
  /* Font Families */
  --font-display: "Poppins", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Consolas", monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
  
  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
  --leading-loose: 1.75;
}
```

### Component Examples

**Heading Component**
```astro
---
interface Props {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  class?: string;
}

const { level, class: className } = Astro.props;
const Tag = `h${level}` as keyof HTMLElementTagNameMap;
---

<Tag class={`font-display font-bold ${className}`}>
  <slot />
</Tag>
```

**Text Component**
```astro
---
interface Props {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'neutral-900' | 'neutral-800';
  class?: string;
}

const { 
  size = 'base', 
  weight = 'normal', 
  color = 'neutral-800',
  class: className 
} = Astro.props;
---

<span class={`font-body text-${size} font-${weight} text-${color} ${className}`}>
  <slot />
</span>
```

---

## 📋 Usage Checklist

### Before Using Typography
- [ ] Choose appropriate font family (Poppins for headings, Inter for body)
- [ ] Select correct font size from type scale
- [ ] Ensure adequate contrast ratio
- [ ] Consider responsive behavior
- [ ] Test with screen readers

### Content Guidelines
- [ ] Use semantic HTML (h1, h2, h3, p, etc.)
- [ ] Maintain logical heading hierarchy
- [ ] Keep line length between 45-75 characters
- [ ] Use adequate spacing between elements
- [ ] Test readability at different zoom levels

---

**This typography system ensures consistent, accessible, and visually appealing text across all Tesoro CRM interfaces.**