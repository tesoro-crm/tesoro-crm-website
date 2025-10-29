# Contributing Guidelines

## 🎨 UI Components - MANDATORY RULES

### Button Component Usage

**❌ NEVER create custom button styles or classes**
**✅ ALWAYS use the Button component (`src/components/ui/Button.astro`)**

#### ❌ WRONG - Custom button styling:
```astro
<style>
  .my-custom-button {
    background: blue;
    padding: 1rem;
    border-radius: 8px;
  }
</style>

<button class="my-custom-button">Click me</button>
<a href="/page" class="custom-cta">Link Button</a>
```

#### ✅ CORRECT - Use Button component:
```astro
---
import Button from '../components/ui/Button.astro';
---

<Button variant="primary" size="md">Click me</Button>
<Button href="/page" variant="secondary" size="lg">Link Button</Button>
```

### Available Button Variants

```typescript
variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'white'
size?: 'sm' | 'md' | 'lg'
```

| Variant | Use Case | Text Color | WCAG Compliant |
|---------|----------|------------|----------------|
| `primary` | Main actions | White | ✅ Yes (15:1) |
| `secondary` | Secondary actions | Dark | ✅ Yes (12:1) |
| `outline` | Tertiary actions | Primary → White on hover | ✅ Yes |
| `ghost` | Subtle actions | Primary | Depends on bg |
| `gradient` | Special CTAs | White | ⚠️ Large text only |
| `white` | On dark backgrounds | Primary | ✅ Yes (15:1) |

### When You Need a New Button Style

1. **First, check if an existing variant works**
2. **If truly needed, add a NEW variant to Button.astro**
3. **NEVER create one-off button classes**

Example of adding a new variant:
```astro
// In src/components/ui/Button.astro
const variantClasses = {
  // ... existing variants
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};
```

### Pre-commit Checklist

Before committing code that includes buttons:

- [ ] Am I using the Button component? (not custom classes)
- [ ] Did I import Button from the correct relative path?
- [ ] Does my variant choice make semantic sense?
- [ ] Did I pass through all necessary props (data-modal-target, etc.)?
- [ ] Did I remove any custom button CSS?

## 🚨 Code Review Rejections

Pull requests will be REJECTED if they contain:

1. Custom button classes (`.my-button`, `.cta-button`, etc.)
2. Inline button styles
3. `<a>` tags styled to look like buttons without using Button component
4. Duplicate button CSS in multiple files

## 📚 Design System

All UI components should come from `src/components/ui/`:
- Button.astro
- Card.astro
- Input.astro
- Badge.astro

**Golden Rule: If it exists in `/ui/`, USE IT. Don't recreate it.**

## 🔍 Automated Checks

We run automated checks on every commit:
- ESLint for code quality
- Type checking with TypeScript
- Build validation with `npm run build`

## 📖 Further Reading

- [Astro Components Documentation](https://docs.astro.build/en/core-concepts/astro-components/)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Design System Overview](./docs/design-system/overview.md)
