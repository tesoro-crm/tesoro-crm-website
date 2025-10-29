# UI Component Standards

## Mandatory Design System Usage

**Golden Rule: If a component exists in `src/components/ui/`, YOU MUST USE IT.**

Never create custom implementations of existing UI components.

## Available UI Components

### Button Component

**Location:** `src/components/ui/Button.astro`

#### Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;          // Makes it an <a> tag
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  class?: string;         // Additional Tailwind classes

  // Icon support (NEW!)
  icon?: string;          // Manual icon (Material Symbol name)
  iconPosition?: 'start' | 'end'; // Icon before/after text (default: 'start')
  autoIcon?: boolean;     // Auto-detect icon from context (default: true)

  // Plus any other HTML attributes (data-*, aria-*, etc.)
}
```

#### Icon Support

Buttons now intelligently show icons based on their purpose! Icons improve UX by making actions immediately recognizable.

**Auto-Detection (Enabled by default):**

The Button component automatically detects and displays appropriate icons based on:

| Context | Auto Icon | Example |
|---------|-----------|---------|
| `data-video-modal-target` | `play_circle` | Video modal buttons |
| `data-modal-target="contact-modal"` | `mail` | Contact forms |
| `data-modal-target="signup-modal"` | `person_add` | Sign up buttons |
| `data-modal-target="demo-modal"` | `calendar_today` | Demo requests |
| `href` with external URL | `open_in_new` | External links |
| `href` with `/download` | `download` | Download buttons |
| `href` with `/pricing` | `payments` | Pricing pages |
| `href` with `/contact` | `mail` | Contact links |
| `href` with `tel:` | `call` | Phone links |
| `href` with `mailto:` | `mail` | Email links |
| `type="submit"` | `send` | Form submissions |

**Manual Icons:**

Override auto-detection or add custom icons:

```astro
<!-- Manual icon (overrides auto-detection) -->
<Button icon="rocket_launch" variant="primary">
  Launch Now
</Button>

<!-- Icon at end of button -->
<Button icon="arrow_forward" iconPosition="end" variant="secondary">
  Next Step
</Button>

<!-- Disable auto icon -->
<Button autoIcon={false} data-modal-target="signup-modal">
  Sign Up
</Button>
```

#### Variants Explained

| Variant | Background | Text | Border | Use Case |
|---------|-----------|------|--------|----------|
| `primary` | Primary blue (#003366) | White | None | Main CTAs |
| `secondary` | Gold (#F5B400) | Dark | None | Secondary actions |
| `outline` | Transparent | Primary | Primary 2px | Tertiary actions |
| `ghost` | Transparent | Primary | None | Subtle actions |
| `gradient` | Pink gradient | White | None | Special CTAs |
| `white` | White | Primary | Primary 2px | On dark backgrounds |

#### Usage Examples

```astro
---
import Button from '@/components/ui/Button.astro';
---

<!-- Basic button -->
<Button variant="primary" size="md">
  Click Me
</Button>

<!-- Link with auto-detected icon (shows "payments" icon) -->
<Button href="/pricing" variant="secondary" size="lg">
  View Pricing
</Button>

<!-- Modal trigger with auto-detected icon (shows "person_add" icon) -->
<Button variant="primary" data-modal-target="signup-modal">
  Sign Up
</Button>

<!-- Video modal with auto-detected icon (shows "play_circle" icon) -->
<Button variant="gradient" data-video-modal-target="video-modal">
  Watch Demo
</Button>

<!-- Manual icon -->
<Button variant="outline" icon="download">
  Download PDF
</Button>

<!-- Icon at end -->
<Button variant="primary" icon="arrow_forward" iconPosition="end">
  Continue
</Button>

<!-- External link with auto icon (shows "open_in_new" icon) -->
<Button href="https://example.com" variant="secondary">
  Visit Website
</Button>

<!-- Submit button with auto icon (shows "send" icon) -->
<Button type="submit" variant="primary">
  Send Message
</Button>

<!-- Disable auto icon -->
<Button autoIcon={false} data-modal-target="contact-modal">
  Contact (no icon)
</Button>

<!-- Full width button -->
<Button variant="primary" fullWidth>
  Submit
</Button>

<!-- Custom classes (for rare cases) -->
<Button variant="primary" class="mt-4 shadow-lg">
  Custom Styled
</Button>
```

### Card Component

**Location:** `src/components/ui/Card.astro`

```astro
<Card variant="default" padding="lg">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

### Input Component

**Location:** `src/components/ui/Input.astro`

```astro
<Input
  type="email"
  name="email"
  placeholder="Enter your email"
  required
/>
```

### Badge Component

**Location:** `src/components/ui/Badge.astro`

```astro
<Badge variant="success">New</Badge>
<Badge variant="warning">Beta</Badge>
```

## Accessibility Standards

All UI components MUST meet WCAG 2.1 Level AA standards:

### Color Contrast

- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18pt+ or 14pt+ bold):** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio

Our button variants are tested for contrast:

| Variant | Contrast Ratio | WCAG Compliance |
|---------|---------------|-----------------|
| Primary | 15:1 | ✅ AAA |
| Secondary | 12:1 | ✅ AAA |
| Outline | 15:1 | ✅ AAA |
| White | 15:1 | ✅ AAA |
| Gradient | 2.5:1 | ⚠️ Large text only (AA) |

### Focus States

All interactive components have visible focus indicators:
- 2px focus ring with appropriate color
- `focus:outline-none focus:ring-2 focus:ring-offset-2`

### Keyboard Navigation

- All buttons are keyboard accessible
- Tab order follows logical document flow
- Escape key closes modals/dropdowns

## Forbidden Practices

### ❌ NEVER Do This

```astro
<!-- DON'T: Custom button class -->
<style>
  .my-button {
    background: blue;
    padding: 1rem;
    border-radius: 8px;
  }
</style>
<button class="my-button">Click</button>

<!-- DON'T: Link styled as button without component -->
<a href="/page" class="btn btn-primary">Link</a>

<!-- DON'T: Inline styles -->
<button style="background: blue; padding: 1rem;">Click</button>
```

### ✅ ALWAYS Do This

```astro
---
import Button from '@/components/ui/Button.astro';
---

<!-- DO: Use Button component -->
<Button variant="primary" size="md">Click</Button>

<!-- DO: Link as button -->
<Button href="/page" variant="primary">Link</Button>
```

## When to Create a New Variant

If the existing variants don't fit your use case:

1. **First:** Try using the `class` prop to customize an existing variant
2. **Second:** Discuss with the team if a new variant is truly needed
3. **Third:** Add the new variant to `Button.astro` (NOT in your component)

### Adding a New Variant

```astro
// In src/components/ui/Button.astro
const variantClasses = {
  // ... existing variants
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-2 border-red-600',
};

// Update the Props interface
export interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'white' | 'danger';
  // ... rest of props
}
```

## Validation Tools

### Automated Checks

Run before committing:

```bash
# Check for custom button implementations
npm run validate:buttons

# Check translation keys
npm run validate:i18n

# Run all validations
npm run validate:all
```

### Pre-commit Checklist

- [ ] Using Button component (not custom classes)
- [ ] Imported from correct relative path
- [ ] Chosen appropriate variant
- [ ] Passed through all necessary props
- [ ] Removed any custom button CSS
- [ ] Ran `npm run validate:buttons`
- [ ] Build passes: `npm run build`

## Component Documentation

Each UI component should have:

1. **TypeScript interface** for props
2. **Usage examples** in comments
3. **Accessibility notes** for special considerations
4. **Variant explanations** for different styles

See `src/components/ui/Button.astro` as the reference implementation.

## Questions?

- Check [CONTRIBUTING.md](../.github/CONTRIBUTING.md) for general guidelines
- Review [Design System Overview](./design-system/overview.md)
- Ask in team chat before creating custom implementations
