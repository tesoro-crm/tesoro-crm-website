# Button Icon Guide

## Overview

Buttons automatically display contextual icons to improve UX and make actions immediately recognizable. Icons are detected automatically based on button purpose, but can be overridden manually.

## Auto-Detection Rules

### Modal Triggers

| Modal Type | Icon | Appearance |
|------------|------|------------|
| `data-video-modal-target` | `play_circle` | ▶️ Play circle |
| `data-modal-target="contact-modal"` | `mail` | ✉️ Envelope |
| `data-modal-target="signup-modal"` | `person_add` | 👤+ Person with plus |
| `data-modal-target="demo-modal"` | `calendar_today` | 📅 Calendar |

**Example:**
```astro
<!-- Automatically shows play icon -->
<Button data-video-modal-target="product-demo">
  Watch Demo
</Button>
```

### Link Destinations

| URL Pattern | Icon | Appearance |
|-------------|------|------------|
| External (`http://`, `https://`, `//`) | `open_in_new` | ↗️ Arrow diagonal |
| `/download` in path | `download` | ⬇️ Download arrow |
| `/pricing` in path | `payments` | 💳 Credit card |
| `/contact` in path | `mail` | ✉️ Envelope |
| `tel:` protocol | `call` | 📞 Phone |
| `mailto:` protocol | `mail` | ✉️ Envelope |

**Examples:**
```astro
<!-- External link → open_in_new icon -->
<Button href="https://docs.example.com">
  Read Docs
</Button>

<!-- Download → download icon -->
<Button href="/download/whitepaper.pdf">
  Download Whitepaper
</Button>

<!-- Phone → call icon -->
<Button href="tel:+31201234567">
  Call Us
</Button>
```

### Form Actions

| Type | Icon | Appearance |
|------|------|------------|
| `type="submit"` | `send` | ➡️ Send arrow |

**Example:**
```astro
<!-- Submit → send icon -->
<Button type="submit" variant="primary">
  Send Message
</Button>
```

## Manual Icon Override

### Setting Custom Icons

Use the `icon` prop with any Material Symbol name:

```astro
<!-- Custom icon -->
<Button icon="rocket_launch" variant="primary">
  Launch Product
</Button>

<Button icon="favorite" variant="secondary">
  Add to Favorites
</Button>

<Button icon="delete" variant="outline">
  Remove Item
</Button>
```

### Icon Position

Control whether icon appears before or after text:

```astro
<!-- Icon at start (default) -->
<Button icon="arrow_back" variant="ghost">
  Go Back
</Button>

<!-- Icon at end -->
<Button icon="arrow_forward" iconPosition="end" variant="primary">
  Next Step
</Button>
```

### Disabling Auto Icons

Explicitly disable auto-detection when needed:

```astro
<!-- No icon, even though it's a modal trigger -->
<Button autoIcon={false} data-modal-target="signup-modal">
  Sign Up
</Button>
```

## Common Icon Patterns

### Navigation Actions

```astro
<Button icon="arrow_back" variant="ghost">
  Back
</Button>

<Button icon="arrow_forward" iconPosition="end">
  Continue
</Button>

<Button icon="home" href="/">
  Home
</Button>
```

### CRUD Operations

```astro
<Button icon="add" variant="primary">
  Create New
</Button>

<Button icon="edit" variant="secondary">
  Edit
</Button>

<Button icon="delete" variant="outline">
  Delete
</Button>

<Button icon="save" type="submit">
  Save Changes
</Button>
```

### Social & Communication

```astro
<Button icon="share" variant="ghost">
  Share
</Button>

<Button icon="mail" href="mailto:info@example.com">
  Email Us
</Button>

<Button icon="call" href="tel:+31201234567">
  Call Now
</Button>
```

### Downloads & Files

```astro
<Button icon="download" href="/brochure.pdf">
  Download Brochure
</Button>

<Button icon="upload" variant="outline">
  Upload File
</Button>

<Button icon="description" href="/docs">
  View Documentation
</Button>
```

### Account & User Actions

```astro
<Button icon="person_add" data-modal-target="signup-modal">
  Sign Up
</Button>

<Button icon="login" href="/login">
  Sign In
</Button>

<Button icon="logout" variant="ghost">
  Sign Out
</Button>

<Button icon="settings" href="/settings">
  Settings
</Button>
```

## Material Symbols Reference

All icons use [Google Material Symbols (Outlined)](https://fonts.google.com/icons).

### Most Used Icons

| Icon Name | Visual | Use Case |
|-----------|--------|----------|
| `play_circle` | ▶️ | Video/media playback |
| `arrow_forward` | → | Next/Continue actions |
| `arrow_back` | ← | Back/Previous actions |
| `download` | ⬇️ | File downloads |
| `upload` | ⬆️ | File uploads |
| `mail` | ✉️ | Email/Contact |
| `call` | 📞 | Phone calls |
| `person_add` | 👤+ | Sign up/Register |
| `calendar_today` | 📅 | Schedule/Book |
| `open_in_new` | ↗️ | External links |
| `send` | ➡️ | Submit forms |
| `payments` | 💳 | Pricing/Billing |
| `delete` | 🗑️ | Remove/Delete |
| `edit` | ✏️ | Edit/Modify |
| `settings` | ⚙️ | Settings/Config |
| `favorite` | ❤️ | Like/Favorite |
| `share` | ↗️ | Share content |

### Finding More Icons

Browse all available icons at: https://fonts.google.com/icons
- Filter: **Outlined** style only
- Copy the exact icon name (e.g., `rocket_launch`)
- Use snake_case format

## Accessibility

Icons are marked with `aria-hidden="true"` because button text provides the accessible label. Never rely on icons alone without text.

**✅ Good:**
```astro
<Button icon="download">
  Download PDF
</Button>
```

**❌ Bad (icon without text):**
```astro
<!-- Screen readers won't know what this does -->
<Button icon="download" aria-label="Download">
</Button>
```

If you need an icon-only button, add descriptive text and hide it visually:

```astro
<Button icon="close" class="p-2">
  <span class="sr-only">Close modal</span>
</Button>
```

## Performance

Icons use the Material Symbols font already loaded globally - no additional requests or JavaScript needed.

## Tips

1. **Let auto-detection work** - It covers 90% of use cases
2. **Be consistent** - Use the same icon for the same action across the site
3. **Don't overuse** - Not every button needs an icon
4. **Test readability** - Icons should enhance, not confuse
5. **Consider mobile** - Icons help when space is limited

## Examples from the Site

```astro
<!-- Video demo CTA (auto: play_circle) -->
<Button data-video-modal-target="demo">
  Watch Product Demo
</Button>

<!-- External documentation (auto: open_in_new) -->
<Button href="https://docs.tesorohq.io">
  View Documentation
</Button>

<!-- Contact form (auto: mail) -->
<Button data-modal-target="contact-modal">
  Contact Sales
</Button>

<!-- Newsletter submit (auto: send) -->
<Button type="submit" variant="gradient">
  Subscribe
</Button>

<!-- Download case study (auto: download) -->
<Button href="/downloads/case-study.pdf">
  Download Case Study
</Button>
```
