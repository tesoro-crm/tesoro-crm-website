# Component Library

## Overview

The Tesoro CRM component library provides reusable UI components built with Astro and Tailwind CSS, fully aligned with the design tokens and brand guidelines.

## Core Components

### Button

**File**: `src/components/ui/Button.astro`

**Variants**:
- `primary`: Main actions (signup, submit)
- `secondary`: Secondary actions (learn more, contact)
- `outline`: Tertiary actions (cancel, back)
- `ghost`: Subtle actions (close, dismiss)

**Sizes**:
- `sm`: Compact buttons (12px padding)
- `md`: Default buttons (16px padding)
- `lg`: Hero CTAs (20px padding)

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  class?: string;
}
```

**Usage**:
```astro
<Button variant="primary" size="lg">
  Start Free Trial
</Button>

<Button variant="outline" href="/pricing">
  View Pricing
</Button>
```

**Accessibility**:
- ✅ Keyboard navigable
- ✅ Focus visible (2px ring)
- ✅ Disabled state (opacity 50%)
- ✅ ARIA attributes when needed

---

### Card

**File**: `src/components/ui/Card.astro`

**Variants**:
- `default`: Standard white card with border
- `feature`: Gradient background for highlights
- `bordered`: Emphasized border (2px primary)
- `elevated`: High shadow for floating effect

**Padding**:
- `none`: No padding (for custom layouts)
- `sm`: 16px padding
- `md`: 24px padding (default)
- `lg`: 32px padding

**Props**:
```typescript
interface CardProps {
  variant?: 'default' | 'feature' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  class?: string;
}
```

**Usage**:
```astro
<Card variant="feature" padding="lg">
  <h3>Premium Feature</h3>
  <p>Advanced analytics dashboard</p>
</Card>
```

---

### Input

**File**: `src/components/ui/Input.astro`

**Types**:
- `text`, `email`, `password`, `tel`, `url`, `number`

**States**:
- Default
- Focus (primary ring)
- Error (red border + message)
- Disabled (opacity 50%)

**Props**:
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  class?: string;
}
```

**Usage**:
```astro
<Input
  type="email"
  name="email"
  label="Email Address"
  placeholder="you@example.com"
  required
  helperText="We'll never share your email"
/>

<Input
  type="text"
  name="name"
  label="Full Name"
  error="Name is required"
/>
```

**Accessibility**:
- ✅ Label associated with input
- ✅ Required indicator (*)
- ✅ Error announced (aria-invalid, aria-describedby)
- ✅ Helper text linked (aria-describedby)

---

### Badge

**File**: `src/components/ui/Badge.astro`

**Variants**:
- `primary`: Brand color
- `secondary`: Gold accent
- `success`: Green (completed, active)
- `warning`: Amber (pending, review)
- `error`: Red (failed, blocked)
- `info`: Blue (informational)
- `neutral`: Gray (default)

**Sizes**:
- `sm`: 12px text
- `md`: 14px text (default)
- `lg`: 16px text

**Props**:
```typescript
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}
```

**Usage**:
```astro
<Badge variant="success">Active</Badge>
<Badge variant="warning" size="sm">Pending</Badge>
```

---

## Layout Components

### Container

**Purpose**: Max-width wrapper for content

**Usage**:
```astro
<div class="container mx-auto px-4 max-w-7xl">
  <!-- Content -->
</div>
```

**Breakpoints**:
- Mobile: 100% width, 16px padding
- Tablet: 100% width, 24px padding
- Desktop: 1280px max-width, 48px padding

---

### Section

**Purpose**: Vertical spacing between page sections

**Usage**:
```astro
<section class="py-16 md:py-24">
  <!-- Section content -->
</section>
```

**Spacing**:
- Mobile: 64px (py-16)
- Desktop: 96px (py-24)

---

### Grid

**Purpose**: Responsive grid layouts

**Usage**:
```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>Feature 1</Card>
  <Card>Feature 2</Card>
  <Card>Feature 3</Card>
</div>
```

---

## Form Components

### Form Group

**Purpose**: Wrapper for form fields with consistent spacing

**Usage**:
```astro
<form class="space-y-6">
  <Input name="name" label="Name" required />
  <Input name="email" type="email" label="Email" required />
  <Button type="submit" fullWidth>Submit</Button>
</form>
```

---

### Checkbox

**Usage**:
```astro
<label class="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    class="w-5 h-5 rounded border-neutral-300 text-primary focus:ring-primary"
  />
  <span class="text-sm text-neutral-700">I agree to the terms</span>
</label>
```

---

### Radio

**Usage**:
```astro
<label class="flex items-center gap-2 cursor-pointer">
  <input
    type="radio"
    name="plan"
    value="starter"
    class="w-5 h-5 border-neutral-300 text-primary focus:ring-primary"
  />
  <span class="text-sm text-neutral-700">Starter Plan</span>
</label>
```

---

## Navigation Components

### Header

**Structure**:
```astro
<header class="sticky top-0 z-50 bg-white border-b border-neutral-200">
  <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
    <a href="/" class="text-2xl font-display font-bold text-primary">
      Tesoro CRM
    </a>
    <ul class="hidden md:flex items-center gap-8">
      <li><a href="/features">Features</a></li>
      <li><a href="/pricing">Pricing</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
    <Button variant="primary" href="/signup">Get Started</Button>
  </nav>
</header>
```

---

### Footer

**Structure**:
```astro
<footer class="bg-neutral-900 text-white py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Footer columns -->
    </div>
    <div class="mt-8 pt-8 border-t border-neutral-700 text-center text-sm">
      © 2025 Tesoro CRM. All rights reserved.
    </div>
  </div>
</footer>
```

---

## Feedback Components

### Alert

**Usage**:
```astro
<div class="p-4 rounded-lg bg-success/10 border border-success/20 text-success">
  <p class="font-medium">Success!</p>
  <p class="text-sm">Your changes have been saved.</p>
</div>
```

**Variants**:
- Success: Green
- Warning: Amber
- Error: Red
- Info: Blue

---

### Toast

**Usage**: Client-side notification (implement with JavaScript)

---

## Component Guidelines

### Composition

- **Single responsibility**: Each component does one thing well
- **Prop-driven**: Behavior controlled via props, not internal state
- **Slot-based**: Use `<slot />` for flexible content
- **Accessible**: ARIA attributes, keyboard support, focus management

### Naming Conventions

- **PascalCase** for component files: `Button.astro`, `Card.astro`
- **camelCase** for props: `fullWidth`, `helperText`
- **kebab-case** for CSS classes: `bg-primary`, `text-white`

### File Organization

```
src/
├── components/
│   ├── ui/              # Core UI components
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Input.astro
│   │   └── Badge.astro
│   ├── layout/          # Layout components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Container.astro
│   └── features/        # Feature-specific components
│       ├── PricingCard.astro
│       └── FeatureGrid.astro
```

### Testing Checklist

- [ ] Visual regression (Chromatic/Percy)
- [ ] Accessibility audit (Axe DevTools)
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Responsive behavior (mobile, tablet, desktop)
- [ ] Dark mode support (if applicable)

### Documentation

Each component should have:
1. **Props interface** with TypeScript types
2. **Usage examples** in this doc
3. **Accessibility notes** (WCAG compliance)
4. **Variants and states** documented

---

## Component Roadmap

### Phase 1 (Current)
- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Badge

### Phase 2 (Next Sprint)
- [ ] Select/Dropdown
- [ ] Textarea
- [ ] Modal/Dialog
- [ ] Tabs

### Phase 3 (Future)
- [ ] Table
- [ ] Pagination
- [ ] Breadcrumbs
- [ ] Tooltip
- [ ] Accordion

---

## Resources

- **Figma Library**: [Link to Figma]
- **Storybook**: [Link to Storybook] (if implemented)
- **Design Tokens**: `docs/design-system/tokens.md`
- **Brand Kit**: `docs/design-system/brand-kit.md`
