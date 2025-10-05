---
id: EPIC-014
titel: Workflow Showcase Section - "Van Chaos naar Controle"
status: proposed
eigenaar: Marketing + Development
startdatum: 2025-10-05
einddatum: TBD
doel: |
  Een visueel krachtige sectie toevoegen die de Tesoro workflow laat zien via een interactieve interface preview,
  geïnspireerd door Follow Up Boss. De sectie moet de transformatie van chaos naar controle visualiseren
  en de drie kernfases van het systeem demonstreren: CAPTEER → CONVERTEER → SLUIT AF.
key-metrics:
  - Time on page (verwachting: +30%)
  - Scroll depth tot sectie (target: 80%+)
  - Demo request rate vanaf sectie (target: 5%+)
  - Bounce rate (verwachting: -15%)
afhankelijkheden:
  - EPIC-011 (i18n systeem moet operationeel zijn)
  - EPIC-006 (design system voor consistente styling)
  - Bestaande Kanban component (kan worden hergebruikt/aangepast)
---

## Overzicht

### Probleem
De huidige homepage toont wel features en social proof, maar mist een concrete visualisatie van **hoe** Tesoro werkt in de praktijk. Potentiële klanten kunnen zich moeilijk voorstellen hoe het systeem hun dagelijkse workflow verbetert.

### Oplossing
Een nieuwe sectie tussen Co-Created en Stats/Social Proof die:
1. **Visueel toont** hoe het systeem werkt (geen abstract praatje)
2. **De workflow demonstreert** via een interface preview/widget
3. **De transformatie benadrukt** van chaos naar controle
4. **Interactief is** (optioneel: animaties, hover states, expandable secties)

### Inspiratie
Follow Up Boss homepage:
- Krachtige headline: "Great businesses don't just happen"
- Subheadline: "You build them with flexible systems that scale as you grow"
- Interface preview rechts met lead management UI
- Links: expandable secties (ORGANIZE → ENGAGE → COACH)
- Warm geel als achtergrondkleur (optimistisch, energiek)

## Deliverables

### Design & Copy
- [ ] Headline + subheadline (NL/EN/ES)
- [ ] 3 workflow fase titels + beschrijvingen (NL/EN/ES)
- [ ] Interface mockup/screenshot voor widget
- [ ] Kleurenschema (voorstel: warm oranje/geel gradient zoals Follow Up Boss)
- [ ] Iconografie voor de 3 fases

### Development
- [ ] Nieuwe component: `WorkflowShowcase.astro`
- [ ] i18n keys toevoegen aan `nl.json`, `en.json`, `es.json`
- [ ] Interface preview/widget (statisch of geanimeerd)
- [ ] Expandable secties (links) met smooth animations
- [ ] Responsive design (mobile-first)
- [ ] Integratie in `index.astro` (na CoCreated sectie)

### Content
- [ ] Workflow fase 1: CAPTEER - beschrijving + voordelen
- [ ] Workflow fase 2: CONVERTEER - beschrijving + voordelen  
- [ ] Workflow fase 3: SLUIT AF - beschrijving + voordelen
- [ ] CTA binnen sectie (optioneel: "Zie het in actie" → demo)

## Stories

### STORY-014-001: Copy & Messaging
**Als** marketeer  
**Wil ik** krachtige, benefit-driven copy voor de workflow sectie  
**Zodat** bezoekers direct begrijpen hoe Tesoro hun workflow verbetert

**Acceptatiecriteria:**
- [ ] Headline volgt "Great businesses don't just happen" formule
- [ ] Subheadline benadrukt schaalbaarheid en groei
- [ ] 3 workflow fases hebben duidelijke titels (actiewerkwoorden)
- [ ] Elke fase heeft 1-2 zinnen beschrijving (max 140 karakters)
- [ ] Copy is vertaald naar NL, EN, ES
- [ ] Tone of voice: professioneel maar toegankelijk, actiegericht

**Voorgestelde copy (NL):**

**Headline:** "Topmakelaar worden gebeurt niet vanzelf"  
**Subheadline:** "Je bouwt het met een systeem dat meegroeit met jouw ambities"

**Fase 1: CAPTEER**  
Titel: "Vang elke lead automatisch op"  
Beschrijving: "Geen enkele lead glipt meer door je vingers. Tesoro vangt alles op, waar het ook vandaan komt."

**Fase 2: CONVERTEER**  
Titel: "Nurture met slimme follow-ups"  
Beschrijving: "Automatische follow-ups die zich aanpassen aan gedrag. Jouw leads voelen zich gehoord, zonder dat jij er constant bij hoeft te zijn."

**Fase 3: SLUIT AF**  
Titel: "Zie in één oogopslag wat hot is"  
Beschrijving: "Kanban board toont direct welke leads actie vereisen. Focus op wat écht omzet oplevert."

---

### STORY-014-002: i18n Setup
**Als** developer  
**Wil ik** alle copy keys toevoegen aan het i18n systeem  
**Zodat** de sectie in alle talen correct wordt weergegeven

**Acceptatiecriteria:**
- [ ] Keys toegevoegd aan `src/i18n/locales/nl.json`
- [ ] Keys toegevoegd aan `src/i18n/locales/en.json`
- [ ] Keys toegevoegd aan `src/i18n/locales/es.json`
- [ ] Namespace: `home.workflow.*`
- [ ] Alle keys getest in alle talen

**i18n keys structuur:**
```json
"workflow": {
  "headline": "...",
  "subheadline": "...",
  "phase_1_title": "...",
  "phase_1_description": "...",
  "phase_2_title": "...",
  "phase_2_description": "...",
  "phase_3_title": "...",
  "phase_3_description": "...",
  "cta": "..." (optioneel)
}
```

---

### STORY-014-003: Component Structure
**Als** developer  
**Wil ik** een nieuwe `WorkflowShowcase.astro` component  
**Zodat** de sectie herbruikbaar en maintainable is

**Acceptatiecriteria:**
- [ ] Component aangemaakt: `src/components/sections/WorkflowShowcase.astro`
- [ ] Props: `locale: Language`
- [ ] Gebruikt `t()` helper voor alle teksten
- [ ] Volgt bestaande component structuur (zie `CoCreated.astro`)
- [ ] Scoped styles in `<style>` tag
- [ ] BEM naming convention: `.workflow-showcase__*`

**Component skeleton:**
```astro
---
import { t } from '../../i18n/utils';
import type { Language } from '../../i18n/config';

interface Props {
  readonly locale: Language;
}

const { locale } = Astro.props;
---

<section class="workflow-showcase">
  <div class="workflow-showcase__container">
    <!-- Left: Phases -->
    <div class="workflow-showcase__phases">
      <!-- 3 expandable sections -->
    </div>
    
    <!-- Right: Interface Preview -->
    <div class="workflow-showcase__preview">
      <!-- Widget/Screenshot -->
    </div>
  </div>
</section>

<style>
  /* Scoped styles */
</style>
```

---

### STORY-014-004: Interface Preview/Widget
**Als** developer  
**Wil ik** een visueel aantrekkelijke interface preview  
**Zodat** bezoekers zien hoe Tesoro eruit ziet in de praktijk

**Acceptatiecriteria:**
- [ ] Keuze gemaakt: statische screenshot OF geanimeerde component
- [ ] Preview toont Kanban board met leads (Proposed/Interested/Won)
- [ ] Optioneel: detail panel overlay (zoals Follow Up Boss)
- [ ] Responsive: op mobile onder de phases, op desktop rechts
- [ ] Visueel consistent met design system
- [ ] Laadt snel (optimized images/animations)

**Opties:**
1. **Statische screenshot** (snelst te implementeren)
   - Screenshot van Tesoro Kanban board
   - Blur gevoelige data
   - Webp formaat, geoptimaliseerd
   
2. **Geanimeerde component** (meer impact)
   - Hergebruik bestaande Kanban component
   - Toon demo data
   - Subtiele animaties (cards bewegen tussen kolommen)
   
3. **Hybrid** (aanbevolen)
   - Statische screenshot als base
   - CSS animaties voor hover/focus states
   - Optioneel: detail panel slide-in on click

---

### STORY-014-005: Expandable Phases (Left Side)
**Als** gebruiker  
**Wil ik** de workflow fases kunnen uitklappen  
**Zodat** ik meer details kan lezen zonder de pagina te verlaten

**Acceptatiecriteria:**
- [ ] 3 secties: CAPTEER, CONVERTEER, SLUIT AF
- [ ] Default: eerste sectie open, andere dicht
- [ ] Click op titel: toggle open/closed
- [ ] Smooth expand/collapse animatie (300ms)
- [ ] Icon verandert: + naar - (of chevron)
- [ ] Keyboard accessible (Enter/Space)
- [ ] ARIA labels voor screen readers

**Interactie:**
```javascript
// Pseudo-code
phases.forEach(phase => {
  phase.addEventListener('click', () => {
    // Close others
    phases.forEach(p => p !== phase && p.close());
    // Toggle current
    phase.toggle();
  });
});
```

---

### STORY-014-006: Styling & Layout
**Als** designer  
**Wil ik** een visueel krachtige sectie met warm kleurenschema  
**Zodat** de sectie opvalt en energie uitstraalt

**Acceptatiecriteria:**
- [ ] Achtergrond: warm oranje/geel gradient (zoals Follow Up Boss)
- [ ] Tekst: donker (hoog contrast voor leesbaarheid)
- [ ] Layout: 2-kolommen op desktop (40/60 split)
- [ ] Layout: 1-kolom op mobile (phases boven, preview onder)
- [ ] Padding: consistent met andere secties (8rem verticaal)
- [ ] Smooth scroll naar sectie (anchor link optioneel)
- [ ] Hover states op expandable secties

**Kleurvoorstel:**
```css
.workflow-showcase {
  background: linear-gradient(135deg, 
    #FFA726 0%,    /* Warm oranje */
    #FFB74D 50%,   /* Geel-oranje */
    #FFD54F 100%   /* Zacht geel */
  );
}
```

---

### STORY-014-007: Integration in Homepage
**Als** developer  
**Wil ik** de nieuwe sectie integreren in `index.astro`  
**Zodat** bezoekers de workflow showcase zien

**Acceptatiecriteria:**
- [ ] Import `WorkflowShowcase.astro` in `src/pages/index.astro`
- [ ] Plaats na `<CoCreated />` sectie
- [ ] Plaats vóór Stats/Social Proof sectie
- [ ] Pass `locale` prop correct door
- [ ] Test in alle 3 talen (nl/en/es)
- [ ] Responsive test (mobile/tablet/desktop)

**Code:**
```astro
// src/pages/index.astro
import WorkflowShowcase from '../components/sections/WorkflowShowcase.astro';

// ...

<CoCreated locale={locale} />
<WorkflowShowcase locale={locale} />
<!-- Stats/Social Proof -->
```

---

### STORY-014-008: Performance & Optimization
**Als** developer  
**Wil ik** de sectie optimaliseren voor snelheid  
**Zodat** de pagina snel laadt en smooth scrollt

**Acceptatiecriteria:**
- [ ] Images: webp formaat, lazy loading
- [ ] Animations: CSS transforms (GPU accelerated)
- [ ] JavaScript: minimal, defer indien mogelijk
- [ ] Lighthouse score: geen regressie (blijft >90)
- [ ] LCP: sectie laadt binnen 2.5s
- [ ] CLS: geen layout shifts

---

### STORY-014-009: QA & Testing
**Als** QA  
**Wil ik** de sectie testen in alle scenario's  
**Zodat** er geen bugs in productie komen

**Acceptatiecriteria:**
- [ ] Cross-browser test (Chrome, Firefox, Safari, Edge)
- [ ] Responsive test (mobile: 375px, tablet: 768px, desktop: 1440px)
- [ ] i18n test (NL, EN, ES - alle teksten correct)
- [ ] Accessibility test (keyboard nav, screen reader)
- [ ] Performance test (Lighthouse, WebPageTest)
- [ ] Visual regression test (screenshots voor/na)

**Test checklist:**
- [ ] Expandable secties werken smooth
- [ ] Interface preview laadt correct
- [ ] Geen horizontal scroll
- [ ] Tekst leesbaar op alle achtergronden
- [ ] CTA klikbaar en zichtbaar
- [ ] Geen console errors

---

## Technische Specificaties

### File Structure
```
src/
├── components/
│   └── sections/
│       └── WorkflowShowcase.astro (NEW)
├── i18n/
│   └── locales/
│       ├── nl.json (UPDATE - add workflow keys)
│       ├── en.json (UPDATE - add workflow keys)
│       └── es.json (UPDATE - add workflow keys)
├── pages/
│   └── index.astro (UPDATE - import & use WorkflowShowcase)
└── assets/ (optioneel)
    └── workflow-preview.webp (interface screenshot)
```

### Dependencies
- Geen nieuwe dependencies nodig
- Gebruikt bestaande:
  - `t()` helper uit `i18n/utils`
  - Astro transitions (optioneel voor smooth scroll)
  - Bestaande design tokens

### Browser Support
- Chrome/Edge: laatste 2 versies
- Firefox: laatste 2 versies
- Safari: laatste 2 versies
- Mobile: iOS Safari 14+, Chrome Android laatste versie

## Design Assets Needed

### Van Designer
- [ ] Interface screenshot/mockup (1200x800px, webp)
- [ ] Icons voor 3 fases (SVG, 24x24px)
- [ ] Kleurenschema finalisatie
- [ ] Hover states design
- [ ] Mobile layout design

### Van Copywriter
- [ ] Finale copy review (NL)
- [ ] Engelse vertaling (EN)
- [ ] Spaanse vertaling (ES)
- [ ] Tone of voice check

## Notities

### Waarom deze sectie?
1. **Visuele demonstratie** - Mensen begrijpen beter wat ze zien dan wat ze lezen
2. **Vertrouwen** - Laat zien dat het product echt bestaat en werkt
3. **Differentiatie** - Meeste concurrenten tonen alleen features, niet workflow
4. **Conversie** - Follow Up Boss ziet waarschijnlijk hoge engagement op deze sectie

### Alternatieven overwogen
- **Video** - Te zwaar, moeilijk te onderhouden, skip-gedrag
- **Carousel** - Te veel interactie vereist, lagere engagement
- **Static text** - Te saai, geen visuele impact

### Success Metrics (na launch)
- **Engagement:** Scroll depth naar sectie >80%
- **Time on page:** +30% gemiddeld
- **Bounce rate:** -15%
- **Demo requests:** +5% vanaf deze sectie (via tracking)

### Future Enhancements (out of scope)
- [ ] Video demo in plaats van screenshot
- [ ] Live data preview (connect to demo account)
- [ ] A/B test verschillende headlines
- [ ] Interactieve Kanban (drag & drop demo)
