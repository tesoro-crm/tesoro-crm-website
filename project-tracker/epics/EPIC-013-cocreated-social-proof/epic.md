---
id: EPIC-013
titel: Co-Created Social Proof Section
status: completed
eigenaar: Cascade AI + John Stevens
startdatum: 2025-10-05
einddatum: 2025-10-05
doel: |
  Vervang traditionele social proof (aantal klanten) door een krachtige "co-creation" sectie 
  die laat zien dat Tesoro écht naar makelaars luistert en hun ideeën binnen weken implementeert.
  Positioneer Tesoro als het CRM dat daadwerkelijk luistert, in contrast met traditionele CRMs.
key-metrics:
  - Click-through rate op "Word Development Partner" CTA
  - Time on page (engagement met sectie)
  - Conversion rate van deze sectie
  - User feedback op positionering
afhankelijkheden:
  - EPIC-011 (i18n voor NL/EN/ES support)
  - EPIC-003 (Homepage structure)
---

## Overzicht

Met slechts 10 klanten kunnen we niet pronken met grote aantallen. In plaats daarvan maken we van deze "beperking" een kracht door te laten zien dat we een exclusieve groep development partners hebben die direct invloed hebben op het product.

**Kernboodschap:** "Jouw ideeën worden hier écht gebouwd"

Dit contrasteert met de #1 klacht van makelaars: traditionele CRMs negeren hun feature requests.

## Deliverables

- [x] CoCreated.astro component met partner grid
- [x] Interactive drawer (slide-in van rechts)
- [x] Feature timeline component (3 stappen)
- [x] CRM comparison (Traditional vs Tesoro)
- [x] CTA sectie met benefits
- [x] Translations (NL, EN, ES)
- [x] Responsive design (mobile + desktop)
- [x] Animated background met logo kleuren
- [x] Touch support voor mobile
- [x] View Transitions compatibility

## User Stories

### STORY-013-001: Hero Statement
**Status:** ✅ Completed

**Als** potentiële klant  
**Wil ik** direct zien dat dit CRM anders is  
**Zodat** ik begrijp waarom Tesoro beter luistert dan Salesforce/HubSpot

**Acceptatie:**
- [x] Headline: "Jouw ideeën worden hier écht gebouwd"
- [x] Subheadline over feedback → features in weken
- [x] Vertaald in NL, EN, ES

### STORY-013-002: Development Partner Cards
**Status:** ✅ Completed

**Als** bezoeker  
**Wil ik** zien WIE dit product mee heeft gebouwd  
**Zodat** ik vertrouwen krijg in de kwaliteit

**Acceptatie:**
- [x] 6 partner cards met avatar
- [x] Naam + bedrijf zichtbaar
- [x] Feature request direct zichtbaar (geen hover)
- [x] Click/tap opent drawer met details
- [x] Responsive grid (2x3 of 3x2)

### STORY-013-003: Interactive Drawer
**Status:** ✅ Completed

**Als** gebruiker  
**Wil ik** meer details zien over een partner's bijdrage  
**Zodat** ik begrijp wat ze hebben voorgesteld

**Acceptatie:**
- [x] Drawer slide-in van rechts (500px max-width)
- [x] Partner details + feature request
- [x] "Development Partner" badge
- [x] Close met X, overlay click, of Escape key
- [x] Body scroll lock wanneer open
- [x] Touch support (mobile)
- [x] Smooth 300ms animatie

### STORY-013-004: Feature Timeline
**Status:** ✅ Completed

**Als** sceptische makelaar  
**Wil ik** bewijs zien dat jullie echt snel implementeren  
**Zodat** ik geloof dat mijn input ook wordt geïmplementeerd

**Acceptatie:**
- [x] Timeline met 3 stappen: Request → Building → Live
- [x] Week indicators (Week 1, Week 2, Week 3)
- [x] Status icons (💬 🔨 ✅)
- [x] Titel: "Van idee naar realiteit in weken, niet maanden"
- [x] Concrete voorbeelden

### STORY-013-005: CRM Comparison
**Status:** ✅ Completed

**Als** gefrustreerde makelaar  
**Wil ik** zien dat jullie het probleem SNAPPEN  
**Zodat** ik me gehoord voel

**Acceptatie:**
- [x] Split comparison layout
- [x] ❌ Traditional: "Request → ticket → 18 maanden → misschien"
- [x] ✅ Tesoro: "Request → gesprek → 2 weken → live"
- [x] Color coded (red background vs green background)

### STORY-013-006: CTA Section
**Status:** ✅ Completed

**Als** geïnteresseerde makelaar  
**Wil ik** development partner kunnen worden  
**Zodat** ik invloed heb op het product

**Acceptatie:**
- [x] "Word Development Partner" button
- [x] Benefit text: "Lifetime 50% korting + directe invloed op roadmap"
- [x] Prominent placement onderaan sectie
- [x] Link naar partner form

### STORY-013-007: Visual Design
**Status:** ✅ Completed

**Als** bezoeker  
**Wil ik** een vrolijke, professionele sectie zien  
**Zodat** de site niet saai aanvoelt

**Acceptatie:**
- [x] Vrolijke gradient achtergrond (logo kleuren)
- [x] Animated background glows (oranje, roze, paars)
- [x] Z-index correct (cards altijd boven animatie)
- [x] Float animatie (20s en 25s loops)
- [x] Modern, professional look

## Technische Implementatie

**Component:**
```
/src/components/sections/CoCreated.astro
```

**Translations:**
```
/src/i18n/locales/nl.json: home.cocreated.*
/src/i18n/locales/en.json: home.cocreated.*
/src/i18n/locales/es.json: home.cocreated.*
```

**Features:**
- Drawer component met slide-in animatie
- View Transitions compatible (re-init na taalwissel)
- Touch en click support
- Keyboard navigation (Escape to close)
- Body scroll lock tijdens drawer open
- Animated background met CSS ::before en ::after
- Z-index layering voor correcte stacking

**Styling:**
- Background: Gradient (#fff8f0 → #fff5f8 → #f0f9ff)
- Cards: White met shadow, hover border (#ff6b9d)
- Drawer: 500px max-width, slide from right
- Colors: Tesoro brand (oranje #FF8C42, roze #FF6B9D, paars #8B5CF6)
- Animations: 300ms cubic-bezier transitions

## Design Decisions

### Waarom geen hover?
Mobile heeft geen hover. Alle informatie moet direct zichtbaar zijn of via click/tap toegankelijk.

### Waarom drawer ipv modal?
- Drawer voelt moderner
- Komt van rechts (natural reading flow)
- Minder "blocking" dan center modal
- Betere mobile UX

### Waarom geen "Development Partner" badge op cards?
- Neemt ruimte in
- Feature request is interessanter
- Badge zit nu in drawer (exclusiviteit behouden)

### Waarom animated background?
- Maakt sectie levendig
- Niet saai grijs
- Past bij brand (logo kleuren)
- Subtiel genoeg om niet af te leiden

## Notities

**Marketing strategie:**
Dit epic kwam voort uit de vraag: "Hoe buigen we 10 klanten om naar iets positiefs?"

**Antwoord:** Maak het exclusief en persoonlijk. Focus op kwaliteit (co-creation) ipv kwantiteit (aantal klanten).

**Resultaat:** Een sectie die onze grootste "zwakte" (weinig klanten) ombuigt naar onze grootste kracht (we luisteren écht en implementeren snel).

**Volgende stappen:**
- Echte partner foto's toevoegen (ipv emoji's)
- Video testimonials overwegen
- Live roadmap integratie
- A/B testing van CTA copy
