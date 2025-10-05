---
id: STORY-013-003
epic: EPIC-013
status: completed
owner: Cascade AI
prioriteit: P0
sprint: 2025-10-05
---

## Context

**Als** gebruiker  
**Wil ik** meer details zien over een partner's bijdrage  
**Zodat** ik begrijp wat ze hebben voorgesteld en waarom ze partner zijn

Drawer geeft meer ruimte voor details zonder de main page te vervuilen. Slide-in van rechts is modern en mobile-friendly.

## Acceptance Criteria
- [x] Drawer slide-in van rechts bij card click
- [x] Max-width 500px, full height
- [x] Overlay met fade-in (rgba(0,0,0,0.5))
- [x] Close button rechtsboven (X icon)
- [x] Close met: X button, overlay click, Escape key
- [x] Body scroll lock wanneer drawer open
- [x] Smooth 300ms cubic-bezier animatie
- [x] Touch support (mobile tap)
- [x] Click support (desktop)
- [x] Drawer content: partner header, feature box, badge
- [x] Partner header: grote avatar + naam + bedrijf
- [x] Feature box: groene background met border
- [x] Badge: gradient background "✅ Development Partner"

## Issues
- ISSUE-013-006: Implementeer drawer component
- ISSUE-013-007: Voeg drawer animations toe
- ISSUE-013-008: Implementeer close functionaliteit
- ISSUE-013-009: Body scroll lock tijdens drawer open
- ISSUE-013-010: View Transitions compatibility
