# Styling Guide

## Tailwind CSS Setup

Het project gebruikt **Tailwind CSS v4** via de `@tailwindcss/vite` plugin voor Astro.

### Configuratie

- **Global stylesheet**: `src/styles/global.css` importeert Tailwind via `@import "tailwindcss"`
- **Astro config**: `astro.config.mjs` bevat de Tailwind Vite plugin
- **Import in layouts**: Voeg `import '../styles/global.css'` toe aan shared layouts

### Gebruik

```astro
---
import '../styles/global.css';
---

<div class="bg-blue-500 text-white p-4 rounded-lg">
  Tailwind classes werken direct
</div>
```

### Design Tokens

Design tokens worden gedocumenteerd in `docs/design-system/tokens.md` en kunnen worden toegevoegd aan Tailwind config voor custom kleuren, spacing, typography, etc.

### Best Practices

- Gebruik utility-first approach voor componenten
- Extracteer herbruikbare patronen naar Astro components
- Volg responsive-first design (mobile → desktop)
- Gebruik dark mode utilities waar nodig: `dark:bg-gray-900`

### Referenties

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro + Tailwind Guide](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
