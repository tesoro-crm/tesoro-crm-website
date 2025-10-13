# Responsive Design Guidelines

## Breakpoints

Tesoro CRM uses a mobile-first responsive strategy with the following breakpoints:

| Name | Width | Tailwind | Usage |
|------|-------|----------|-------|
| **Mobile** | 0-639px | `default` | Single-column layouts, stacked content, hamburger menu |
| **Tablet** | 640-1023px | `sm:` | Two-column grids, compact navigation, side-by-side cards |
| **Desktop** | 1024-1279px | `lg:` | Standard layout, three-column grids, full navigation |
| **Widescreen** | ≥1280px | `xl:` | Expanded hero, dense data tables, max content width |

### Tailwind Configuration

```typescript
// tailwind.config.ts
screens: {
  sm: '640px',  // tablet
  md: '768px',  // tablet-large
  lg: '1024px', // desktop
  xl: '1280px', // widescreen
  '2xl': '1536px', // ultra-wide
}
```

## Container System

### Max Widths

| Breakpoint | Container Width | Padding |
|------------|-----------------|---------|
| Mobile | 100% | 16px (1rem) |
| Tablet | 100% | 24px (1.5rem) |
| Desktop | 1024px | 32px (2rem) |
| Widescreen | 1280px | 48px (3rem) |

### Usage

```astro
<!-- Standard container -->
<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  <!-- Content -->
</div>

<!-- Full-width section with contained content -->
<section class="w-full bg-neutral-50">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
    <!-- Content -->
  </div>
</section>
```

## Grid System

### Base Grid

- **Columns**: 12-column grid (desktop), 8-column (tablet), 4-column (mobile)
- **Gutter**: 24px (desktop/tablet), 16px (mobile)
- **Margins**: Match container padding

### Responsive Grid Patterns

```astro
<!-- Auto-fit cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>Feature 1</Card>
  <Card>Feature 2</Card>
  <Card>Feature 3</Card>
</div>

<!-- Asymmetric layout -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div class="lg:col-span-2">Main content</div>
  <div>Sidebar</div>
</div>

<!-- Auto-fit with min/max -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
  <!-- Cards auto-wrap based on available space -->
</div>
```

## Layout Patterns

### Hero Section

**Mobile**:
- Full-width background image
- Centered content
- Stacked CTA buttons
- Typography: `text-4xl` (36px)

**Desktop**:
- Split layout (60/40 text/image)
- Side-by-side CTA buttons
- Typography: `text-6xl` (60px)

```astro
<section class="relative py-16 lg:py-24">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-4xl lg:text-6xl font-display font-bold">
          Captación inteligente
        </h1>
        <div class="flex flex-col sm:flex-row gap-4 mt-8">
          <Button variant="primary">Start Free Trial</Button>
          <Button variant="outline">View Demo</Button>
        </div>
      </div>
      <div>
        <!-- Hero image -->
      </div>
    </div>
  </div>
</section>
```

### Feature Grid

**Mobile**: Stacked cards (1 column)
**Tablet**: 2 columns
**Desktop**: 3 columns

```astro
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature) => (
        <Card>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </Card>
      ))}
    </div>
  </div>
</section>
```

### Pricing Tables

**Mobile**: Stacked cards with horizontal scroll for comparison
**Desktop**: Side-by-side columns with sticky headers

```astro
<div class="overflow-x-auto lg:overflow-visible">
  <div class="flex lg:grid lg:grid-cols-3 gap-6 min-w-max lg:min-w-0">
    {plans.map((plan) => (
      <Card class="min-w-[280px] lg:min-w-0">
        <!-- Pricing content -->
      </Card>
    ))}
  </div>
</div>
```

### Navigation

**Mobile**:
- Hamburger menu
- Full-screen overlay
- Stacked links

**Desktop**:
- Horizontal navigation
- Inline CTA button
- Dropdown menus

## Typography Scaling

Use fluid typography for smooth scaling across breakpoints:

```css
/* Fluid typography */
h1 {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
}

h2 {
  font-size: clamp(2rem, 4vw, 3rem);
}

body {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}
```

## Spacing Scale

Responsive spacing using Tailwind utilities:

```astro
<!-- Responsive padding -->
<section class="py-12 md:py-16 lg:py-24">
  <!-- Content -->
</section>

<!-- Responsive gaps -->
<div class="space-y-4 md:space-y-6 lg:space-y-8">
  <!-- Items -->
</div>
```

## Images & Media

### Responsive Images

```astro
<img
  src="/hero.jpg"
  srcset="/hero-mobile.jpg 640w, /hero-tablet.jpg 1024w, /hero-desktop.jpg 1920w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1280px"
  alt="Hero image"
  class="w-full h-auto"
/>
```

### Aspect Ratios

```astro
<!-- 16:9 on desktop, 4:3 on mobile -->
<div class="aspect-[4/3] lg:aspect-video">
  <img src="/image.jpg" class="w-full h-full object-cover" />
</div>
```

## Testing Checklist

- [ ] Test on actual devices (iOS, Android, tablets)
- [ ] Verify touch targets ≥44px on mobile
- [ ] Check horizontal scroll (should be none except intentional)
- [ ] Test landscape orientation on mobile
- [ ] Verify text readability at all sizes
- [ ] Check image loading performance
- [ ] Test with slow 3G connection

## Accessibility

- **Touch targets**: Min 44x44px on mobile
- **Font size**: Min 16px base (no zoom required)
- **Contrast**: Maintain ratios across all breakpoints
- **Focus indicators**: Visible on all screen sizes
- **Orientation**: Support both portrait and landscape

## Performance

- **Mobile-first CSS**: Load mobile styles first, desktop as enhancements
- **Image optimization**: Use WebP with JPEG fallback, lazy loading
- **Critical CSS**: Inline above-the-fold styles
- **Font loading**: Use `font-display: swap` to prevent FOIT

## Resources

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)
