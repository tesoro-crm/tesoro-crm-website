## Project Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment files:
   - `.env.development` for local settings.
   - `.env.production` for production secrets (never commit).
3. Initialize Astro project if starting fresh:
   ```bash
   npm create astro@latest
   ```
4. Enable recommended integrations:
   ```bash
   npm install @astrojs/tailwind @astrojs/image @astrojs/sitemap
   ```
5. Run development server:
   ```bash
   npm run dev
   ```
6. Lint and test before commits:
   ```bash
   npm run lint
   npm test
   ```

## Tooling Notes

- Tailwind config is located in `tailwind.config.ts`; align with design tokens from `docs/design-system/`.
- Wrangler configuration lives in `wrangler.toml` with staging/production bindings.
- Use Node.js ≥ 18 and npm ≥ 10 to match CI environment.
