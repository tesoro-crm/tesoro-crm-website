---
id: STORY-013-007
epic: EPIC-013
status: completed
owner: Cascade AI
prioriteit: P2
sprint: 2025-10-05
---

## Context

**Als** bezoeker  
**Wil ik** een vrolijke, professionele sectie zien  
**Zodat** de site niet saai aanvoelt en past bij het Tesoro brand

Grijs is saai. Logo kleuren (oranje, roze, paars) geven vrolijkheid. Animatie maakt het levend.

## Acceptance Criteria
- [x] Background gradient: #fff8f0 → #fff5f8 → #f0f9ff
- [x] Animated glow links-boven (oranje → roze)
- [x] Animated glow rechts-onder (roze → paars)
- [x] Float animatie: 20s en 25s loops
- [x] Z-index correct: animatie achter (z-index: 0), content voor (z-index: 1)
- [x] Overflow hidden op sectie
- [x] Position relative op sectie
- [x] ::before en ::after pseudo-elements voor glows
- [x] Radial gradients met lage opacity (0.06-0.12)
- [x] Smooth transform animations

## Issues
- ISSUE-013-020: Implementeer gradient background
- ISSUE-013-021: Voeg animated glows toe
- ISSUE-013-022: Fix z-index layering
- ISSUE-013-023: Test animatie performance
