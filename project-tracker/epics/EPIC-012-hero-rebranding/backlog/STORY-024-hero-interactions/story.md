---
id: STORY-024
epic: EPIC-012
status: todo
owner: Frontend Lead
priority: P2
sprint: S2
---

## Context

Voeg interactieve elementen en subtiele animaties toe aan de hero section voor betere engagement en professionele uitstraling.

## Acceptance Criteria

- [ ] Subtle fade-in animatie bij page load
- [ ] CTA button hover states (darken, scale)
- [ ] Floating elements hebben parallax effect
- [ ] Property card in screenshot heeft drag animatie
- [ ] Metric counter animatie (count up effect)
- [ ] Smooth scroll naar demo form bij CTA click
- [ ] Loading states voor alle interactive elements
- [ ] Performance: animaties <60fps, geen jank

## Interactive Elements

### 1. Page Load Animation
- Hero content fades in: 0.6s ease-out
- Visual slides in from right: 0.8s ease-out
- Stagger effect: text → buttons → trust bar

### 2. CTA Buttons
**Primary (Orange):**
- Hover: darken 10%, scale 1.02, shadow increase
- Active: scale 0.98
- Transition: 0.2s ease

**Secondary (Outline):**
- Hover: Navy bg, white text, scale 1.02
- Active: scale 0.98
- Transition: 0.2s ease

### 3. Floating Elements
- Parallax scroll: move at 0.5x speed
- Subtle float animation: 3s ease-in-out infinite
- Hover: scale 1.05, shadow increase

### 4. Kanban Screenshot
- Property card drag animation: 2s loop
- Card moves from left → "Proposed lane"
- Pause 1s, fade out, restart

### 5. Metric Counter
- Count up from 0 to target number
- Duration: 1.5s
- Easing: ease-out
- Trigger: when in viewport

## Performance Requirements

- [ ] All animations use CSS transforms (GPU accelerated)
- [ ] No layout shifts during animations
- [ ] Reduced motion support (prefers-reduced-motion)
- [ ] Lazy load visual assets
- [ ] Total hero section <500KB
- [ ] First Contentful Paint <1.5s

## Issues

- ISSUE-065: Implement page load animations
- ISSUE-066: Add CTA hover states
- ISSUE-067: Create parallax effect
- ISSUE-068: Animate property card drag
- ISSUE-069: Add metric counter animation
