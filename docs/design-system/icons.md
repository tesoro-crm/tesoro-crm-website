# Icon System - Material Symbols Outlined

## Overview

We use **Google Material Symbols** with the **Outlined** style for all icons across the site. This provides a consistent, professional appearance with optimal performance.

## Implementation

Icons are loaded via Google Fonts CDN with variable font support for maximum flexibility:
- Font: Material Symbols Outlined
- Weight range: 100-700
- Fill range: 0-1 (we use 0 for outlined)
- Optical size: 20-48

## Basic Usage

```html
<!-- Basic icon -->
<span class="icon">search</span>

<!-- Icon with size variant -->
<span class="icon icon-lg">arrow_forward</span>

<!-- Icon inline with text -->
<span class="reading-time">
  <span class="icon icon-sm">schedule</span>
  5 min
</span>
```

## Size Classes

| Class | Size | Use Case |
|-------|------|----------|
| `icon-xs` | 16px | Small inline icons, badges |
| `icon-sm` | 20px | Inline text icons, metadata |
| `icon-md` | 24px | Default size (no class needed) |
| `icon-lg` | 32px | Feature highlights, cards |
| `icon-xl` | 40px | Hero sections |
| `icon-2xl` | 48px | Large hero sections |

## Spacing Utilities

```html
<!-- Icon before text -->
<span class="icon icon-inline">arrow_forward</span> Next

<!-- Icon after text -->
Previous <span class="icon icon-inline-end">arrow_back</span>
```

## Color

Icons automatically inherit the text color using `currentColor`. No need to set colors explicitly:

```html
<!-- Icon inherits blue color from parent -->
<span class="text-blue-600">
  <span class="icon">check_circle</span>
  Success
</span>
```

## Animation Utilities

```html
<!-- Spinning icon (for loading states) -->
<span class="icon icon-spin">progress_activity</span>

<!-- Pulsing icon -->
<span class="icon icon-pulse">notifications</span>
```

## Commonly Used Icons

### Academy/Knowledge Base
- `search` - Search functionality
- `schedule` - Reading time
- `trending_up` - ROI/revenue metrics
- `bolt` - Speed/quick wins
- `arrow_forward` - Navigation, CTAs
- `arrow_back` - Back navigation
- `menu_book` - Documentation
- `school` - Learning/academy

### Navigation
- `menu` - Mobile menu
- `close` - Close dialogs
- `expand_more` - Dropdown indicator
- `chevron_right` - Next/forward
- `chevron_left` - Previous/back

### Actions
- `download` - Download files
- `share` - Share content
- `link` - External links
- `open_in_new` - Open in new tab

### Status/Feedback
- `check_circle` - Success
- `error` - Error state
- `info` - Information
- `warning` - Warning

## Finding Icons

Browse all available icons at: https://fonts.google.com/icons

**Important**: Always use the exact icon name from Material Symbols. The names are case-sensitive and use underscores (not hyphens).

## Best Practices

1. **Consistency**: Use the same icon for the same action/concept across the site
2. **Size**: Match icon size to adjacent text size (use `icon-sm` with small text)
3. **Color**: Let icons inherit color - don't override unless absolutely necessary
4. **Accessibility**: Icons should complement text, not replace it (use aria-label if icon-only)
5. **Performance**: The variable font loads all icons, but only renders what's used

## Examples from Academy Page

```html
<!-- Search bar -->
<div class="hero__search">
  <span class="icon search-icon">search</span>
  <input type="search" placeholder="Search..." />
</div>

<!-- Reading time badge -->
<span class="reading-time">
  <span class="icon icon-sm">schedule</span>
  5 min
</span>

<!-- ROI badge -->
<span class="roi-badge">
  <span class="icon icon-xs">trending_up</span>
  €35K extra per jaar
</span>

<!-- CTA button with arrow -->
<a href="/knowledge-base" class="cta-button">
  Knowledge Base
  <span class="icon icon-inline-end">arrow_forward</span>
</a>
```

## Migration Notes

We've replaced emoji icons (🎯, 💰, 🏆, etc.) with Material Symbols for:
- Better visual consistency
- Proper color inheritance
- Professional appearance
- Accessible design
- Predictable rendering across platforms

Old emoji icons should not be used going forward.
