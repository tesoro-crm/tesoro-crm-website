# Accessibility Audit Checklist

## WCAG 2.1 AA Compliance

### Perceivable

#### Text Alternatives (1.1)
- [ ] Alle afbeeldingen hebben alt-tekst
- [ ] Decoratieve afbeeldingen hebben `alt=""`
- [ ] Icons hebben aria-label of sr-only tekst

#### Time-based Media (1.2)
- [ ] Video's hebben captions
- [ ] Audio content heeft transcripts

#### Adaptable (1.3)
- [ ] Semantische HTML gebruikt (nav, main, article, etc.)
- [ ] Headings in logische volgorde (h1 → h2 → h3)
- [ ] Forms hebben labels gekoppeld aan inputs
- [ ] Tables hebben proper headers

#### Distinguishable (1.4)
- [ ] Kleurcontrast ≥4.5:1 voor normale tekst
- [ ] Kleurcontrast ≥3:1 voor grote tekst (18pt+)
- [ ] Informatie niet alleen via kleur gecommuniceerd
- [ ] Tekst kan tot 200% worden vergroot zonder scroll
- [ ] Focus indicators zichtbaar

### Operable

#### Keyboard Accessible (2.1)
- [ ] Alle functionaliteit beschikbaar via toetsenbord
- [ ] Geen keyboard traps
- [ ] Skip links aanwezig voor navigatie
- [ ] Tab order logisch

#### Enough Time (2.2)
- [ ] Geen time limits of aanpasbaar
- [ ] Auto-refresh kan worden gepauzeerd

#### Seizures (2.3)
- [ ] Geen flashing content >3x per seconde

#### Navigable (2.4)
- [ ] Page titles uniek en beschrijvend
- [ ] Focus order logisch
- [ ] Link tekst beschrijvend (geen "klik hier")
- [ ] Multiple ways to find pages (menu, search, sitemap)
- [ ] Headings en labels beschrijvend

### Understandable

#### Readable (3.1)
- [ ] Lang attribute op html element
- [ ] Lang changes gemarkeerd met lang attribute

#### Predictable (3.2)
- [ ] Consistent navigation across pages
- [ ] Consistent identification van componenten
- [ ] Geen onverwachte context changes

#### Input Assistance (3.3)
- [ ] Error messages duidelijk en specifiek
- [ ] Labels en instructions voor form inputs
- [ ] Error prevention voor belangrijke acties

### Robust

#### Compatible (4.1)
- [ ] Valid HTML (geen parse errors)
- [ ] Proper ARIA usage
- [ ] Status messages gebruik maken van role="status"

## Testing Tools

### Automated
- **Axe DevTools**: Browser extension voor quick scan
- **Lighthouse**: Accessibility score in Chrome DevTools
- **WAVE**: Web accessibility evaluation tool

### Manual
- **Keyboard navigation**: Tab through entire page
- **Screen reader**: Test met NVDA (Windows) of VoiceOver (Mac)
- **Zoom**: Test op 200% zoom level
- **Color contrast**: Use Contrast Checker tool

## Testing Procedure

1. Run Axe DevTools op elke pagina
2. Keyboard navigation test
3. Screen reader test (critical flows)
4. Color contrast check
5. Zoom test (200%)
6. Document issues in project tracker

## Issue Template

```markdown
---
id: ISSUE-XXX
story: STORY-XXX
status: todo
labels:
  - accessibility
  - wcag
severity: [critical|high|medium|low]
---

## WCAG Criterion
[1.1.1 Non-text Content]

## Issue
[Beschrijving van het probleem]

## Impact
[Welke gebruikers worden beïnvloed]

## Remediation
[Hoe op te lossen]
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Astro Accessibility Guide](https://docs.astro.build/en/guides/accessibility/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
