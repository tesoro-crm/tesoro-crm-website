# Styling Guide

## Tailwind CSS Setup

The project uses **Tailwind CSS v4** via the `@tailwindcss/vite` plugin for Astro.

### Configuration

- **Global stylesheet**: `src/styles/global.css` imports Tailwind via `@import "tailwindcss"`
- **Astro config**: `astro.config.mjs` contains the Tailwind Vite plugin
- **Import in layouts**: Add `import '../styles/global.css'` to shared layouts

### Usage

```astro
---
import '../styles/global.css';
---

<div class="bg-blue-500 text-white p-4 rounded-lg">
  Tailwind classes work directly
</div>
```

### Design Tokens

Design tokens are documented in `docs/design-system/tokens.md` and can be added to Tailwind config for custom colors, spacing, typography, etc.

### Best Practices

- Use utility-first approach for components
- Extract reusable patterns to Astro components
- Follow responsive-first design (mobile → desktop)
- Use dark mode utilities where needed: `dark:bg-gray-900`

### References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro + Tailwind Guide](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
