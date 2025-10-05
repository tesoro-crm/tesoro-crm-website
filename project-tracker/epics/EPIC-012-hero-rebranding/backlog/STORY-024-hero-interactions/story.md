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

- [ ] Hero animaties starten via IntersectionObserver (pas na 60% viewport)
- [ ] CTA button hover states (darken, scale, focus zichtbaar)
- [ ] Floating cards wisselen automatisch met 3D transform loop en pause-on-hover
- [ ] Matching Pulse strip toont 3 property cards in marquee met hover-pause
- [ ] Metric badge telt op (count up) en pulse-highlight bij refresh
- [ ] Trust bar toont typewriter-effect en stopt na 1 loop (accessibility)
- [ ] Smooth scroll naar demo form bij CTA click
- [ ] Loading states voor alle interactieve elementen
- [ ] Performance: animaties 60fps, geen layout shifts
- [ ] `prefers-reduced-motion` fallback schakelt loops uit en toont crossfade

## Interactive Elements

### 1. Page Load & Trigger
- Observer target: hero container, threshold 0.6
- Bij trigger: text fade-in 0.5s, CTA scale 0.4s, trust bar typewriter start
- On unobserve (scroll up): animaties resetten na 3s cooldown

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
- Parallax scroll: move at 0.4x speed
- Card swap loop: 6s, translateZ + rotate(-3deg → 0deg)
- Hover: scale 1.05, shadow increase, loop pause

### 4. Kanban Screenshot + Matching Pulse
- Property card drag animation: 3s loop, translateX 0 → 48px → 96px
- Card snap in Proposed lane, highlight border voor 0.6s
- Matching Pulse strip: marquee 8s, stop on hover, resume on mouseleave

### 5. Metric Counter & Trust Bar
- Count up van 0 naar target in 1.5s (ease-out)
- Pulse glow (box-shadow) gedurende 0.8s bij voltooiing
- Trust bar typewriter (CSS steps) max 1 loop, daarna statisch

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
