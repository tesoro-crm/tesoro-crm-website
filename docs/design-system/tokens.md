## Design Tokens

### Color

| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | `#003366` | Hero accents, primary buttons |
| `color-primary-accent` | `#4BA3FF` | Hover states, highlights |
| `color-secondary` | `#F5B400` | CTA secondary buttons |
| `color-neutral-100` | `#FFFFFF` | Backgrounds |
| `color-neutral-800` | `#1A1A1A` | Body text |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `font-family-base` | `"Inter", sans-serif` | Body copy |
| `font-family-display` | `"Poppins", sans-serif` | Headings |
| `font-size-base` | `16px` | Body text |
| `line-height-base` | `1.6` | Paragraphs |
| `font-scale` | `1.25` | Modular scale multiplier |

### Spacing

| Token | Value |
|-------|-------|
| `space-2xs` | `4px` |
| `space-xs` | `8px` |
| `space-sm` | `12px` |
| `space-md` | `16px` |
| `space-lg` | `24px` |
| `space-xl` | `32px` |
| `space-2xl` | `48px` |

### Radius & Shadow

| Token | Value |
|-------|-------|
| `radius-sm` | `6px` |
| `radius-md` | `12px` |
| `radius-lg` | `20px` |
| `shadow-base` | `0 12px 30px rgba(0, 42, 102, 0.12)` |

### Export Workflow

1. Source tokens live in Figma Tokens plugin (Tesoro CRM library).
2. Run export to JSON via plugin and commit to `design-tokens.json`.
3. Sync values to `tailwind.config.ts` (`theme.extend.colors`, `spacing`, `borderRadius`, `boxShadow`).
4. Document changes in pull requests referencing affected components.
