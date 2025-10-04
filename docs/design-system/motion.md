# Motion & Animation Guidelines

## Motion Principles

### Core Philosophy

**Purposeful**: Animations reinforce spatial relationships and guide user attention, never distract from primary actions.

**Efficient**: Keep durations short (120-300ms) to feel responsive, not sluggish.

**Accessible**: Always respect `prefers-reduced-motion` and provide instant alternatives.

**Performant**: Use GPU-accelerated properties (`transform`, `opacity`) and maintain 60fps.

## Timing & Easing

### Duration Guidelines

| Interaction Type | Duration | Use Case |
|-----------------|----------|----------|
| **Micro** | 100-150ms | Hover states, focus indicators, tooltips |
| **Standard** | 200-250ms | Button clicks, card reveals, dropdown menus |
| **Moderate** | 300-400ms | Modal open/close, page transitions |
| **Slow** | 500-800ms | Loading animations, complex reveals |

### Easing Functions

| Name | Curve | Usage |
|------|-------|-------|
| **Ease-in** | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations, elements leaving screen |
| **Ease-out** | `cubic-bezier(0, 0, 0.2, 1)` | Enter animations, elements appearing |
| **Ease-in-out** | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth transitions, hover states |
| **Spring** | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Playful interactions, CTAs |

### Tailwind Configuration

```typescript
// tailwind.config.ts
theme: {
  extend: {
    transitionDuration: {
      '0': '0ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
    },
    transitionTimingFunction: {
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'spring': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    },
  },
}
```

## Interaction Patterns

### Buttons & CTAs

**Hover**:
- Scale: `1.02` (subtle lift)
- Shadow: Intensify from `shadow` to `shadow-lg`
- Duration: `150ms`
- Easing: `ease-in-out`

```astro
<button class="transition-all duration-150 ease-in-out hover:scale-102 hover:shadow-lg">
  Click Me
</button>
```

**Active/Click**:
- Scale: `0.98` (press down)
- Duration: `100ms`

```astro
<button class="active:scale-98 transition-transform duration-100">
  Click Me
</button>
```

**Focus**:
- Ring: Fade in over `100ms`
- Offset: `2px`

```astro
<button class="focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-shadow duration-100">
  Click Me
</button>
```

### Cards

**Hover**:
- Lift: `translateY(-4px)`
- Shadow: `shadow` → `shadow-xl`
- Duration: `200ms`

```astro
<div class="transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
  <Card>Content</Card>
</div>
```

**Scroll Reveal** (Staggered):
- Fade in + slide up
- Stagger: 40ms offset per card
- Use Intersection Observer API

```typescript
// Staggered animation
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 40}ms`;
  card.classList.add('animate-slide-up');
});
```

### Modals & Overlays

**Open**:
- Background: Fade in `150ms`
- Modal: Fade + slide from `translateY(-16px)`
- Duration: `200ms`
- Easing: `ease-out`

```astro
<div class="fixed inset-0 bg-black/50 transition-opacity duration-150">
  <div class="animate-slide-down">
    <!-- Modal content -->
  </div>
</div>
```

**Close**:
- Reverse animation
- Duration: `150ms`
- Easing: `ease-in`

### Dropdowns & Menus

**Open**:
- Fade + scale from `scale-95`
- Origin: `top` or `top-right`
- Duration: `150ms`

```astro
<div class="origin-top-right transition-all duration-150 scale-95 opacity-0 data-[open]:scale-100 data-[open]:opacity-100">
  <!-- Menu items -->
</div>
```

### Loading States

**Spinner**:
- Rotation: `360deg` continuous
- Duration: `800ms`
- Easing: `linear`

```astro
<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
```

**Skeleton**:
- Pulse: Opacity `1` → `0.5` → `1`
- Duration: `1.5s`
- Loop: Infinite

```astro
<div class="animate-pulse bg-neutral-200 rounded h-4 w-full"></div>
```

**Progress Bar**:
- Width: Animate from `0%` to `100%`
- Duration: Based on actual progress
- Easing: `ease-out`

```astro
<div class="bg-neutral-200 rounded-full h-2">
  <div class="bg-primary h-full rounded-full transition-all duration-300 ease-out" style={`width: ${progress}%`}></div>
</div>
```

## Page Transitions

### Navigation

**Page Enter**:
- Fade in from `opacity-0`
- Slide up from `translateY(8px)`
- Duration: `300ms`

**Page Exit**:
- Fade out to `opacity-0`
- Duration: `200ms`

### Scroll Animations

**Fade In on Scroll**:
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });
});

document.querySelectorAll('.fade-on-scroll').forEach((el) => {
  observer.observe(el);
});
```

**Parallax** (Subtle):
- Background moves slower than foreground
- Max offset: `20%`
- Use `transform: translateY()` with scroll position

## Micro-interactions

### Form Inputs

**Focus**:
- Border color transition: `200ms`
- Ring fade in: `100ms`

```astro
<input class="transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20" />
```

**Error State**:
- Shake animation: `translateX(-4px)` → `translateX(4px)` → `0`
- Duration: `400ms`

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
```

### Tooltips

**Show**:
- Fade + slide from direction
- Delay: `300ms` (prevent accidental triggers)
- Duration: `150ms`

**Hide**:
- Fade out
- Duration: `100ms`

### Badges & Notifications

**Appear**:
- Scale from `0.8` + fade in
- Duration: `200ms`
- Easing: `spring`

**Dismiss**:
- Slide out + fade
- Duration: `250ms`

## Accessibility

### Reduced Motion

Always provide instant alternatives for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Indicators

- Never remove focus outlines
- Ensure visible on all backgrounds
- Minimum 2px width
- Contrast ratio ≥3:1

## Performance Guidelines

### GPU Acceleration

**Use these properties** (GPU-accelerated):
- `transform`
- `opacity`
- `filter`

**Avoid animating**:
- `width`, `height` (causes reflow)
- `top`, `left` (use `transform` instead)
- `box-shadow` (use `filter: drop-shadow()`)

### Will-Change

Use sparingly for elements that will definitely animate:

```css
.modal {
  will-change: transform, opacity;
}

/* Remove after animation */
.modal.is-open {
  will-change: auto;
}
```

### Performance Budget

- **60fps**: All animations must maintain 60fps
- **Max elements**: Animate max 10 elements simultaneously
- **Complexity**: Avoid animating complex SVGs or large images

### Testing

```javascript
// Monitor frame rate
const fps = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('FPS:', 1000 / entry.duration);
  }
});
fps.observe({ entryTypes: ['measure'] });
```

## Implementation Examples

### Tailwind Utilities

```astro
<!-- Hover lift -->
<div class="transition-transform duration-200 hover:-translate-y-1">
  Card
</div>

<!-- Fade in -->
<div class="opacity-0 animate-fade-in">
  Content
</div>

<!-- Slide up -->
<div class="translate-y-4 opacity-0 animate-slide-up">
  Content
</div>
```

### Custom Keyframes

```typescript
// tailwind.config.ts
keyframes: {
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  'slide-up': {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  'slide-down': {
    '0%': { transform: 'translateY(-20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  'scale-in': {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
}
```

## Documentation Standards

When adding new animations:

1. **Record video**: Before/after comparison
2. **Document timing**: Duration, easing, delay
3. **Test performance**: Verify 60fps
4. **Check accessibility**: Test with reduced motion
5. **Update this doc**: Add pattern to relevant section

## Resources

- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [CSS Triggers](https://csstriggers.com/) - Performance impact reference
- [Cubic Bezier Generator](https://cubic-bezier.com/)
- [Easing Functions Cheat Sheet](https://easings.net/)
