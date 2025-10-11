# Tesoro CRM - Typography Style Guide

## 📚 Font Families

### Primary Fonts
- **Headings (H1)**: Poppins 500 (Medium)
- **Headings (H2/H3)**: Poppins 600-700 OR Ledger 600-700 (decorative)
- **Headings (H4)**: Poppins 600 OR body font 600
- **Body Text**: Inter 400 (Regular)
- **Intro/Lead**: Inter 500 (Medium)
- **Code**: JetBrains Mono

### Font Weights
- **H1**: 500 (Medium) - Licht en elegant, niet te zwaar
- **H2**: 700 (Bold) - Sterker contrast met H1
- **H3**: 600 (SemiBold) - Subtiele hiërarchie
- **H4**: 600 (SemiBold)
- **Intro**: 500 (Medium) - Iets zwaarder dan body
- **Body**: 400 (Regular)
- **Bold text**: 600 (SemiBold)

## 🎨 Typography Scale

### Headings
```
H1: 3rem (48px) - font-weight: 500
H2: 2.25rem (36px) - font-weight: 700
H3: 1.75rem (28px) - font-weight: 600
H4: 1.25rem (20px) - font-weight: 600
```

### Body Text
```
Intro/Lead: 1.35rem (21.6px) - font-weight: 500
Body: 1.125rem (18px) - font-weight: 400
Small: 0.875rem (14px)
```

### Line Heights
```
H1: 1.2
H2: 1.3
H3: 1.4
H4: 1.4
Intro: 1.7
Body: 1.8
```

### Letter Spacing
```
H1: -0.02em (tighter)
H2: -0.01em
H3-H4: normal
Body: normal
```

## 🎭 Content Components

### 1. Quote / Testimonial
**Gebruik**: Testimonials, belangrijke citaten
**Font**: H2/H3 font (Ledger voor decoratief)
**Styling**:
- Gradient achtergrond: `#f8fafc` → `#f1f5f9`
- Border-left: 5px solid `#F59E0B` (oranje)
- Groot quote symbool (") als decoratie
- Font-size: 1.5rem
- Font-style: italic
- Border-radius: 8px
- Box-shadow: subtiel

**Wanneer gebruiken**: 
- Klant testimonials
- Expert quotes
- Belangrijke statements

### 2. Highlight Box
**Gebruik**: Belangrijke takeaways, key points
**Font**: Body font
**Styling**:
- Gradient achtergrond: `#FEF3C7` → `#FDE68A` (geel)
- Border-left: 4px solid `#F59E0B` (oranje)
- Font-size: 1.125rem
- Font-weight: 500
- Color: `#78350f` (donker bruin)
- Border-radius: 8px

**Wanneer gebruiken**:
- Key takeaways
- Belangrijke statistieken
- Samenvattingen

### 3. Bullet List met Checkmarks
**Gebruik**: Features, voordelen, lijsten
**Font**: Body font
**Styling**:
- Groene checkmarks (✓): `#10B981`
- List items: `#475569`
- Geen standaard bullets
- Padding-left: 2rem voor checkmark ruimte

**Wanneer gebruiken**:
- Feature lists
- Voordelen opsommen
- Stap-voor-stap instructies

### 4. CTA Section
**Gebruik**: Call-to-action aan einde van artikel
**Font**: Body font voor tekst
**Styling**:
- Achtergrond: wit
- Border: 2px solid `#e2e8f0` (licht grijs)
- Text color: `#475569`
- Button: `#0f172a` (donker) met witte tekst
- Border-radius: 12px
- Text-align: center

**Wanneer gebruiken**:
- Einde van blog posts
- Na belangrijke secties
- Conversie momenten

## 🎨 Color Palette

### Text Colors
```css
--text-primary: #0f172a;      /* H1, belangrijke tekst */
--text-secondary: #1e293b;    /* H2, H3 */
--text-tertiary: #334155;     /* H4, intro */
--text-body: #475569;         /* Body tekst */
--text-muted: #64748b;        /* Meta info, captions */
--text-light: #94a3b8;        /* Subtiele tekst */
```

### Accent Colors
```css
--accent-primary: #F59E0B;    /* Oranje - borders, accenten */
--accent-secondary: #F97316;  /* Donker oranje - hover states */
--accent-success: #10B981;    /* Groen - checkmarks, success */
```

### Background Colors
```css
--bg-primary: #ffffff;        /* Wit - main background */
--bg-secondary: #f9fafb;      /* Licht grijs - page background */
--bg-tertiary: #f1f5f9;       /* Iets donkerder - cards */
--bg-dark: #0f172a;          /* Donker - buttons, headers */
```

## 📐 Spacing

### Margins
```css
H1 margin-bottom: 1.5rem
H2 margin-top: 3rem, margin-bottom: 1.5rem
H3 margin-top: 2.5rem, margin-bottom: 1.25rem
H4 margin-top: 2rem, margin-bottom: 1rem
Body margin-bottom: 1.5rem
```

### Component Spacing
```css
Quote: margin 3rem 0
Highlight: margin 2.5rem 0
List: margin 2rem 0
CTA: margin-top 4rem
```

## 🎯 Best Practices

### DO ✅
- Gebruik Poppins 500 voor H1 (niet te zwaar)
- Gebruik Ledger alleen voor H2/H3/quotes (decoratief)
- Houd body tekst in Inter voor optimale leesbaarheid
- Gebruik highlight boxes spaarzaam (1-2 per artikel)
- Plaats CTA aan einde van content
- Gebruik quotes voor testimonials en belangrijke statements

### DON'T ❌
- Gebruik Ledger niet voor H1 of body tekst (te dramatisch)
- Gebruik niet meer dan 2-3 font families per pagina
- Maak H1 niet te zwaar (max 600, liefst 500)
- Overlaad niet met highlight boxes
- Gebruik geen felle kleuren voor body tekst

## 📱 Responsive Breakpoints

### Mobile (< 768px)
```css
H1: 2rem (32px)
H2: 1.75rem (28px)
H3: 1.5rem (24px)
Intro: 1.125rem (18px)
Body: 1rem (16px)
```

## 🔤 Font Loading

### Local Font Loading (Recommended)
Fonts worden lokaal gehost via `@fontsource` voor betere performance en privacy:

```typescript
// In Layout.astro
import '@fontsource-variable/inter';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource-variable/jetbrains-mono';
```

**Voordelen:**
- ✅ Sneller laden (geen externe requests)
- ✅ Betere privacy (geen Google tracking)
- ✅ Offline beschikbaar
- ✅ Consistente rendering
- ✅ Variable fonts voor kleinere file size

### NPM Packages
```bash
npm install @fontsource-variable/inter @fontsource/poppins @fontsource-variable/jetbrains-mono
```

### Font-family Declarations
```css
/* Headings */
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Body (Variable Font) */
font-family: 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Decorative (H2/H3/Quotes) */
font-family: 'Ledger', Georgia, serif;

/* Code (Variable Font) */
font-family: 'JetBrains Mono Variable', 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
```

**Note:** Ledger is momenteel nog via Google Fonts omdat er geen @fontsource package voor is. Voor productie kun je overwegen om deze zelf te hosten.

## 📝 Usage Examples

### Blog Article Structure
```
1. H1 - Main Title (Poppins 500)
2. Intro paragraph (Inter 500, larger)
3. H2 - Section (Poppins 700 or Ledger 700)
4. Body paragraphs (Inter 400)
5. H3 - Subsection (Poppins 600 or Ledger 600)
6. Body paragraphs
7. Quote (Ledger italic)
8. H3 - Another subsection
9. Body paragraphs
10. Highlight box (key takeaway)
11. H4 - Minor heading
12. Bullet list with checkmarks
13. CTA section
```

---

**Last Updated**: October 11, 2025
**Version**: 1.0
**Maintained by**: Tesoro CRM Team
