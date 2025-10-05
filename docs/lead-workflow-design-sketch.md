# Design Sketch: Lead Workflow Sectie

## Layout Overzicht
De sectie gebruikt een responsive grid-layout: tekst links (45%), visual rechts (55%) op desktop. Op mobiel (<768px) stapelt het verticaal: tekst boven, afbeelding onder.

## Desktop Layout (≥768px)

```
+-----------------------------------+-----------------------------------+
|                                   |                                   |
|  [Headline]                       |  [Afbeelding: Lead-detailpagina]  |
|  U verliest kostbare leads        |  +-----------------------------+   |
|  omdat ze niet goed worden        |  | Screenshot van interface     |   |
|  opgevolgd.                       |  | - Bel-knop zichtbaar         |   |
|                                   |  | - E-mail template knop       |   |
|  [Sub-headline]                   |  | - Opname-indicator           |   |
|  Met Tesoro krijgt u direct...    |  +-----------------------------+   |
|                                   |                                   |
|  [Bullet lijst]                   |                                   |
|  • Directe melding                |                                   |
|  • Eén-klik bellen                |                                   |
|  • Altijd een backup              |                                   |
|  • Volledige historie             |                                   |
|                                   |                                   |
|  [CTA Button]                     |                                   |
|  +-------------------+            |                                   |
|  | Bekijk de demo    |            |                                   |
|  +-------------------+            |                                   |
+-----------------------------------+-----------------------------------+
```

## Mobiel Layout (<768px)

```
+-----------------------------+
|                             |
|  [Headline]                 |
|  U verliest kostbare leads  |
|  omdat ze niet goed worden  |
|  opgevolgd.                 |
|                             |
|  [Sub-headline]             |
|  Met Tesoro krijgt u...     |
|                             |
|  [Bullet lijst]             |
|  • Directe melding          |
|  • Eén-klik bellen          |
|  • Altijd een backup        |
|  • Volledige historie       |
|                             |
|  [CTA Button]               |
|  +-------------------+      |
|  | Bekijk de demo    |      |
|  +-------------------+      |
|                             |
|  [Afbeelding]               |
|  +-------------------------+ |
|  | Lead-detailpagina        | |
|  | screenshot (smaller)     | |
|  +-------------------------+ |
+-----------------------------+
```

## Visuele Elementen

### Afbeelding
- **Stijl:** Herkenbaar als de echte Tesoro interface, vergelijkbaar met de kanban-visual in de hero-sectie (statische versie).
- **Inhoud:** Mockup van de lead-detailpagina scherm:
  - **Header:** Lead naam en status (bijv. "Nieuwe lead: Jan Jansen").
  - **Bel-knop:** Grote groene knop met telefoon-icoon: "Bellen".
  - **E-mail template:** Dropdown of knoppen voor "Follow-up e-mail" met Office 365/Google logo.
  - **Opname-sectie:** Indicator "Gesprek opgenomen" met play-knop (statisch).
  - **Historie:** Lijst van eerdere acties (bijv. "E-mail verstuurd op 15 okt").
  - **Qualificatie:** Velden voor "Budget", "Interesse niveau" met checkboxes.
- **Bron:** Screenshot van de echte Tesoro app, of een wireframe die lijkt op de kanban-stijl (witte achtergrond, schaduw, ronde hoeken).
- **Alternatief:** Statische HTML/CSS mockup die eruitziet als een app-scherm.
- **Alt-tekst:** "Voorbeeld van de Tesoro lead-detailpagina met bel- en e-mail functies."
- **Formaat:** Max 600px breed, border-radius 1rem, schaduw voor diepte.

### Typografie
- **Headline:** Font-size: clamp(1.75rem, 4vw, 2.5rem), font-weight: 700, color: #0a1f44
- **Sub-headline:** Font-size: 1.1rem, color: rgba(10,31,68,.7)
- **Bullets:** Font-size: 1rem, list-style: disc, color: #0a1f44
- **CTA:** Font-size: 1rem, font-weight: 600, background: #ff9f43, color: white, padding: 0.9rem 2rem, border-radius: 0.75rem

### Kleuren
- **Achtergrond sectie:** #faf9f7 (licht grijs)
- **Tekst:** #0a1f44 (donker blauw)
- **Accent:** #ff9f43 (oranje voor CTA)
- **Bullet icons:** ✓ in #ff6b9d (roze)

### Responsive Gedrag
- **Breakpoint:** 768px (van mobiel naar desktop grid)
- **Spacing:** Gap van 2rem tussen kolommen, padding 4rem boven/onder sectie
- **Afbeelding:** Schalen met max-width, behoud aspect-ratio

## Assets Nodig
1. **lead-detail-placeholder.png** – Screenshot van lead-pagina
2. **email-notification-placeholder.png** – Voor eventuele extra visual
3. **lead-workflow.gif** – Optioneel: korte animatie van workflow

## Notities
- Houd consistent met bestaande hero-sectie styling.
- Focus op usability: bullets scannable, CTA prominent.
- Toegankelijkheid: Alt-tekst, keyboard navigatie voor CTA.
