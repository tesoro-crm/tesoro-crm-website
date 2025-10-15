# UI Patterns & Guidelines

Documentatie van UI patterns, component afspraken en styling guidelines voor de Tesoro Marketing website.

## Core Principles

### 1. Geen Emojis in Productie
**Regel**: Gebruik NOOIT emojis in de productie-versie van de website.

**Alternatief**: Gebruik Material Icons voor alle iconografie.

**Rationale**:
- Emojis renderen inconsistent tussen platforms
- Geen professionele uitstraling
- Material Icons zijn scherp, schaalbaar en consistent

**Voorbeelden**:
```html
<!-- ❌ FOUT -->
<div class="icon">🚀</div>

<!-- ✅ CORRECT -->
<div class="icon">
  <span class="icon">rocket_launch</span>
</div>
```

**Veelgebruikte Material Icons**:
- `rocket_launch` - Voor onboarding/getting started
- `menu_book` - Voor documentatie/guides
- `bolt` - Voor power features/advanced
- `arrow_forward` - Voor CTAs en navigatie
- `arrow_back` - Voor terug-navigatie
- `search` - Voor zoekfunctionaliteit
- `schedule` - Voor tijdindicatie
- `play_circle` - Voor video content

---

## Component Patterns

### Card Grid with Aligned Buttons

**Probleem**: Cards met verschillende tekstlengtes hebben buttons op verschillende hoogtes.

**Oplossing**: Gebruik flexbox layout met `flex-grow` op de beschrijving.

```css
.card {
  display: flex;
  flex-direction: column;
  /* andere styling */
}

.card__description {
  flex-grow: 1; /* Duwt button naar onderkant */
  margin-bottom: 1.5rem;
}

.card__button {
  /* Button blijft onderaan */
}
```

**Gebruikt in**:
- Knowledge Base path selection cards (`/knowledge-base/index.astro:996-1060`)
- Feature cards (indien toegepast)

---

### Navigation Back Button

**Pattern**: Lichtgewicht border button voor "terug" acties.

```css
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: transparent;
  color: #64748b;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  color: #003366;
  border-color: #003366;
  background: #f8f9fa;
}

.back-btn .icon {
  transition: transform 0.2s ease;
}

.back-btn:hover .icon {
  transform: translateX(-4px);
}
```

**HTML Structuur**:
```html
<button class="back-btn" data-action="back">
  <span class="icon">arrow_back</span>
  Terug naar overzicht
</button>
```

---

### Primary CTA Button

**Pattern**: Donkerblauwe button met hover effect.

```css
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: #003366;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);
  transition: all 0.25s ease;
}

.cta-btn:hover {
  background: #004080;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 51, 102, 0.4);
}

.cta-btn .icon {
  transition: transform 0.25s ease;
}

.cta-btn:hover .icon {
  transform: translateX(4px);
}
```

**Gebruik**: Primaire call-to-actions, belangrijke navigatie

---

## Knowledge Base Specifiek

### Drie-Pad Systeem

**Concept**: Knowledge base heeft drie verschillende user journeys:
1. **Nieuwe gebruikers** - Onboarding stappen
2. **Documentatie zoeken** - Zoek in alle guides
3. **Power users** - Advanced tips en workflows

**Implementatie**:
- Path selectie cards tonen bij eerste bezoek
- Geselecteerde path wordt opgeslagen in `localStorage` met key `tesoro-docs-path`
- Bij terugkerende bezoeken wordt opgeslagen path automatisch getoond
- Terug-knop wist localStorage en toont path selectie opnieuw

**localStorage Keys**:
```typescript
// Path selection
localStorage.setItem('tesoro-docs-path', 'new' | 'docs' | 'power');

// Step completion tracking
localStorage.setItem('tesoro-kb-completed-steps', JSON.stringify([1, 2, 3]));
```

**Code Locatie**: `/src/pages/knowledge-base/index.astro:1267-1343`

---

### Path Selection Cards

**Structuur**:
```html
<div class="path-card">
  <div class="path-card__icon">
    <span class="icon">rocket_launch</span>
  </div>
  <h2 class="path-card__title">Nieuw bij Tesoro</h2>
  <p class="path-card__desc">
    Stap-voor-stap onboarding. Account aanmaken, medewerkers
    uitnodigen, email instellen en je eerste deals.
  </p>
  <button class="path-card__cta" data-path-select="new">
    Start onboarding <span class="icon">arrow_forward</span>
  </button>
</div>
```

**Styling kenmerken**:
- Flexbox layout voor button alignment
- 4px blauwe top-border animatie on hover
- 4rem Material Icon (3rem op mobile)
- `flex-grow: 1` op description
- Box shadow on hover met translateY

---

### Step Cards

**Pattern**: Numbered step cards met completion tracking.

```html
<a href="/kb/step-url" class="step" data-step-id="1">
  <div class="step__number">1</div>
  <div class="step__content">
    <h3 class="step__title">Account aanmaken</h3>
    <p class="step__desc">Registreer je account en nodig je team uit.</p>
    <div class="step__meta">
      <span class="step__time">
        <span class="icon icon-xs">schedule</span> 5 min
      </span>
      <span class="step__video">
        <span class="icon icon-xs">play_circle</span> Video
      </span>
    </div>
  </div>
  <div class="step__arrow">
    <span class="icon">arrow_forward</span>
  </div>
</a>
```

**Completion State**:
- Attribuut `data-completed="true"` wordt toegevoegd bij klik
- Visuele wijzigingen: groene border, groene gradient, checkmark
- Opgeslagen in localStorage voor persistentie

---

## Animation Patterns

### Fade In on Scroll

```css
.fade-in-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
```

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

elements.forEach(el => observer.observe(el));
```

### Content Transition

```css
.content-section {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Gebruik**: Path content sections, modal open/close

---

## Responsive Patterns

### Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

### Mobile Typography

```css
.title {
  font-size: clamp(1.5rem, 5vw, 3rem);
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 1.75rem; /* Fixed size voor kleine schermen */
  }
}
```

---

## Search Functionality

**Pattern**: Unified search voor steps en guide items.

```javascript
const setupSearch = (searchInputId: string): void => {
  const searchInput = document.getElementById(searchInputId);

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    // Filter zichtbare items
    items.forEach(item => {
      const title = item.querySelector('.item__title')?.textContent?.toLowerCase();
      const isMatch = query === '' || title.includes(query);
      item.style.display = isMatch ? '' : 'none';
    });
  });
};

// Setup voor meerdere search inputs
setupSearch('kb-search');
setupSearch('kb-search-docs');
```

**Best Practices**:
- Real-time filtering (geen submit button)
- Case insensitive
- Empty query toont alles
- Hide empty categories

---

## Color Usage

### Primary Colors
- `#003366` - Primary blue (buttons, accents)
- `#004080` - Hover state
- `#F5B400` - Secondary/warning

### Neutrals
- `#1e293b` - Headings
- `#64748b` - Body text, descriptions
- `#94a3b8` - Placeholder, disabled
- `#e2e8f0` - Borders
- `#f8f9fa` - Background light

### Semantic
- `#10b981` - Success (completed steps)
- `#059669` - Success dark

---

## Border Radius Scale

- `6px` - Small elements (badges, tags)
- `8px` - Guide items, small cards
- `10px` - Buttons, inputs
- `12px` - Standard cards
- `16px` - Large cards (path selection)
- `20px` - Hero sections, major blocks

---

## Shadow Scale

```css
/* Subtle */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

/* Base */
box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);

/* Elevated */
box-shadow: 0 6px 16px rgba(0, 51, 102, 0.4);

/* Hover states */
box-shadow: 0 8px 16px -4px rgba(0, 51, 102, 0.15);

/* Large elements */
box-shadow: 0 12px 24px rgba(0, 51, 102, 0.15);
```

---

## Accessibility Checklist

- [ ] All interactive elements have `:focus` states
- [ ] Contrast ratio min 4.5:1 for text
- [ ] Icons accompanied by text labels
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-expanded` on toggleable elements
- [ ] Keyboard navigation works
- [ ] Form inputs have associated labels

---

## Performance Guidelines

### CSS
- Gebruik `transform` en `opacity` voor animaties (GPU accelerated)
- Vermijd `width`, `height`, `top`, `left` animaties
- Gebruik `will-change` spaarzaam

### JavaScript
- Debounce search input events (indien nodig voor grote datasets)
- Gebruik `IntersectionObserver` voor scroll animations
- Cache DOM queries in variabelen

### Images
- Gebruik WebP formaat waar mogelijk
- Lazy load images outside viewport
- Provide width/height attributes

---

## Code Locations

**Knowledge Base**:
- Main page: `/src/pages/knowledge-base/index.astro`
- Article template: `/src/pages/knowledge-base/[...slug].astro`

**Styling Patterns**:
- Path cards: `index.astro:996-1102`
- Back button: `index.astro:1120-1149`
- Step cards: `index.astro:686-782`

**JavaScript Functionality**:
- Path switching: `index.astro:1267-1343`
- Carousel: `index.astro:1345-1396`
- Search: `index.astro:1461-1498`

---

## Version History

- **2025-10-15**: Initial documentation - UI patterns, KB three-path system, no-emoji rule
