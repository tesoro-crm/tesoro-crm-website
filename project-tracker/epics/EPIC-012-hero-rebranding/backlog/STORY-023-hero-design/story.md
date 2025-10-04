---
id: STORY-023
epic: EPIC-012
status: todo
owner: Design Lead
priority: P1
sprint: S1
---

## Context

Design en implementeer de nieuwe hero section volgens Tesoro brand guidelines. 60/40 split layout met Kanban interface screenshot en floating elements.

## Acceptance Criteria

- [ ] 60/40 split layout (text left, visual right)
- [ ] Tesoro brand kleuren: Navy (#0A1F44), Coral (#FF6B9D), Orange (#FF9F43)
- [ ] Typography: Inter/Poppins, headline 56px desktop / 36px mobile
- [ ] Screenshot van Kanban interface met "Proposed lane"
- [ ] Floating metric card (top right)
- [ ] Floating feature badge (bottom)
- [ ] CTA buttons: Orange primary, Navy outline secondary
- [ ] Trust bar met 3 items (pricing, integration, commitment)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility AA compliant

## Design Specificaties

### Layout
- Container max-width: 1280px
- Left column: 60% (text content)
- Right column: 40% (visual)
- Vertical spacing: 120px top/bottom padding

### Kleuren
- **Primary Navy:** #0A1F44
- **Accent Coral:** #FF6B9D (voor emphasis woorden)
- **CTA Orange:** #FF9F43
- **Background:** #FAF9F7 (beige/cream)

### Typography
- **Headline:** Inter Bold, 56px, line-height 1.1, Navy
- **Subheadline:** Inter Regular, 20px, line-height 1.5, Navy 70%
- **Trust Bar:** Inter Medium, 14px, Navy 60%

### CTA Buttons
- **Primary:** Orange bg, white text, 16px padding, 8px radius
- **Secondary:** Navy border 2px, Navy text, transparent bg

### Visual Elements
- Kanban screenshot: rounded corners 12px, subtle shadow
- Floating metric card: white bg, shadow, 16px padding
- Feature badge: Orange bg, white text, pill shape

## Issues

- ISSUE-062: Create Kanban interface screenshot
- ISSUE-063: Design floating elements
- ISSUE-064: Implement responsive layout
