# Accessibility Audit Checklist

## WCAG 2.1 AA Compliance

### Perceivable

#### Text Alternatives (1.1)
- [ ] All images have alt text
- [ ] Decorative images have `alt=""`
- [ ] Icons have aria-label or sr-only text

#### Time-based Media (1.2)
- [ ] Videos have captions
- [ ] Audio content has transcripts

#### Adaptable (1.3)
- [ ] Semantic HTML used (nav, main, article, etc.)
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Forms have labels associated with inputs
- [ ] Tables have proper headers

#### Distinguishable (1.4)
- [ ] Color contrast ≥4.5:1 for normal text
- [ ] Color contrast ≥3:1 for large text (18pt+)
- [ ] Information not conveyed solely through color
- [ ] Text can be enlarged to 200% without horizontal scroll
- [ ] Focus indicators visible

### Operable

#### Keyboard Accessible (2.1)
- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Skip links present for navigation
- [ ] Tab order logical

#### Enough Time (2.2)
- [ ] No time limits or adjustable
- [ ] Auto-refresh can be paused

#### Seizures (2.3)
- [ ] No flashing content >3x per second

#### Navigable (2.4)
- [ ] Page titles unique and descriptive
- [ ] Focus order logical
- [ ] Link text descriptive (not "click here")
- [ ] Multiple ways to find pages (menu, search, sitemap)
- [ ] Headings and labels descriptive

### Understandable

#### Readable (3.1)
- [ ] Lang attribute on html element
- [ ] Lang changes marked with lang attribute

#### Predictable (3.2)
- [ ] Consistent navigation across pages
- [ ] Consistent identification of components
- [ ] No unexpected context changes

#### Input Assistance (3.3)
- [ ] Error messages clear and specific
- [ ] Labels and instructions for form inputs
- [ ] Error prevention for important actions

### Robust

#### Compatible (4.1)
- [ ] Valid HTML (no parse errors)
- [ ] Proper ARIA usage
- [ ] Status messages use role="status"

## Testing Tools

### Automated
- **Axe DevTools**: Browser extension for quick scan
- **Lighthouse**: Accessibility score in Chrome DevTools
- **WAVE**: Web accessibility evaluation tool

### Manual
- **Keyboard navigation**: Tab through entire page
- **Screen reader**: Test with NVDA (Windows) or VoiceOver (Mac)
- **Zoom**: Test at 200% zoom level
- **Color contrast**: Use Contrast Checker tool

## Testing Procedure

1. Run Axe DevTools on every page
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
[Description of the problem]

## Impact
[Which users are affected]

## Remediation
[How to fix]
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Astro Accessibility Guide](https://docs.astro.build/en/guides/accessibility/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
