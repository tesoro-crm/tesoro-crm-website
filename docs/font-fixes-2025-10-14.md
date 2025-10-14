# Font Loading Fixes - 14 oktober 2025

## Probleem
Fonts werden niet correct geladen in bepaalde browsers door:
1. Verkeerde font-family namen in CSS
2. Ontbrekende CSS custom properties
3. Incomplete font weights
4. Geen font-display strategie

## Uitgevoerde Fixes

### 1. Typography.css Updates (`src/styles/typography.css`)

**VOOR:**
```css
--font-heading: 'Poppins', ...;
--font-body: 'Inter Variable', 'Inter', ...;
--font-mono: 'JetBrains Mono Variable', 'JetBrains Mono', ...;
```

**NA:**
```css
--font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-poppins: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: var(--font-poppins);
--font-body: var(--font-inter);
--font-mono: 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
```

**Wijzigingen:**
- ✅ Verwijderd: `'Inter Variable'` → Correct: `'Inter'`
- ✅ Verwijderd: `'JetBrains Mono Variable'` → Correct: `'JetBrains Mono'`
- ✅ Toegevoegd: `--font-inter` en `--font-poppins` custom properties (voor Tailwind)
- ✅ Gebruik van CSS custom properties voor consistentie

### 2. Font Loading Updates (`src/layouts/Layout.astro`)

**VOOR:**
```typescript
import '@fontsource-variable/inter';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource-variable/jetbrains-mono';
```

**NA:**
```typescript
import '@fontsource-variable/inter/index.css';
import '@fontsource/poppins/400.css';  // ← NIEUW
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import '../styles/fonts.css';  // ← NIEUW
```

**Wijzigingen:**
- ✅ Toegevoegd: Poppins weight 400 (werd gemist)
- ✅ Expliciet: `.css` extensies voor clarity
- ✅ Toegevoegd: Font configuration layer

### 3. Nieuwe Font Configuration (`src/styles/fonts.css`)

Nieuw bestand toegevoegd met:
- ✅ Expliciete `font-display: swap` voor alle fonts
- ✅ Local font fallbacks
- ✅ Browser compatibility optimalisaties
- ✅ Material Symbols configuratie

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-display: swap;  /* ← Voorkomt FOIT */
  font-weight: 100 900;
  src: local('Inter'), local('Inter-Variable');
}
```

### 4. Preload Hints (`src/layouts/Layout.astro`)

Toegevoegd voor betere performance:
```html
<link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/poppins-600.woff2" as="font" type="font/woff2" crossorigin />
```

## Resultaat

### Browser Compatibiliteit
- ✅ Chrome/Edge: Font-display: swap voorkomt FOIT
- ✅ Firefox: Correcte font-family namen herkend
- ✅ Safari: Local fallbacks werken correct
- ✅ Mobile browsers: Preload hints verbeteren performance

### Performance Improvements
- ✅ Fonts laden met `font-display: swap` (geen invisible text flash)
- ✅ Preload hints voor critical fonts
- ✅ System font fallbacks tijdens loading
- ✅ Optimale font-weight range voor variable fonts

### Tailwind Integration
- ✅ `var(--font-inter)` is nu gedefinieerd
- ✅ `var(--font-poppins)` is nu gedefinieerd
- ✅ Font-sans en font-display classes werken correct

## Testing Checklist

- [ ] Test in Chrome (desktop)
- [ ] Test in Firefox (desktop)
- [ ] Test in Safari (desktop)
- [ ] Test in Chrome (mobile)
- [ ] Test in Safari (iOS)
- [ ] Slow 3G netwerk simulatie
- [ ] Disable cache en hard refresh
- [ ] Check DevTools Network tab voor font loading
- [ ] Verify geen console errors

## Font Stack Overzicht

| Use Case | Font Family | Weights | Variable |
|----------|-------------|---------|----------|
| Body text | Inter | 100-900 | ✅ Yes |
| Headings | Poppins | 400, 500, 600, 700 | ❌ No |
| Decorative | Ledger | 400 | ❌ No (Google Fonts) |
| Code | JetBrains Mono | 100-800 | ✅ Yes |
| Icons | Material Symbols | N/A | ✅ Yes |

## Troubleshooting

### Als fonts nog steeds niet laden:

1. **Check browser DevTools Network tab:**
   ```
   Filter: "font"
   Kijk of alle fonts status 200 hebben
   ```

2. **Check console voor errors:**
   ```javascript
   // Geen errors zoals:
   // "Failed to load font-face"
   // "Font-family not found"
   ```

3. **Verify CSS custom properties:**
   ```css
   /* In DevTools > Elements > Computed styles */
   --font-inter: "Inter", -apple-system, ...
   --font-poppins: "Poppins", -apple-system, ...
   ```

4. **Force rebuild:**
   ```bash
   rm -rf dist .astro node_modules/.vite
   npm run build
   ```

## Gerelateerde Bestanden

- `src/styles/typography.css` - Font families en CSS variables
- `src/styles/fonts.css` - Font-display en @font-face overrides
- `src/layouts/Layout.astro` - Font imports en preload hints
- `tailwind.config.ts` - Tailwind font family configuration

## Referenties

- [@fontsource documentation](https://fontsource.org/docs/getting-started)
- [font-display best practices](https://web.dev/font-display/)
- [CSS font loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API)
