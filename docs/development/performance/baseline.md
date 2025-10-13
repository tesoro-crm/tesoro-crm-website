## Lighthouse Baseline

| Metric | Target | Notes |
|--------|--------|-------|
| Performance | ≥ 90 | Ensure images use Astro `<Image>` and Cloudflare optimization |
| Accessibility | ≥ 95 | Follow `docs/design-system/motion.md` and `docs/design-system/responsive.md` guidelines |
| Best Practices | ≥ 95 | Remove console errors, enforce HTTPS, audit third-party scripts |
| SEO | ≥ 95 | Align with `docs/seo/onpage-guidelines.md` |

## Audit Procedure

1. Run `npm run build && npm run preview`.
2. Execute Lighthouse (Chrome DevTools) for desktop & mobile on `/`, `/pricing`, `/features`.
3. Record results in `performance-reports/<date>.md` (create if absent).
4. Capture key opportunities and assign follow-up issues.

## Optimization Checklist

- Use Astro partial hydration and island architecture for interactive blocks.
- Enable image optimization with `@astrojs/image` + Cloudflare resizing.
- Implement code splitting via dynamic imports for heavy components.
- Prefetch critical fonts with `rel="preload"` and `font-display: swap`.
- Monitor bundle size using `npm run analyze` (configure Vite bundle analyzer).

## Regression Monitoring

- CI job runs `npm run lint` and `npm run test:performance` (Lighthouse CI) on PRs touching UI.
- Alerts raised in Slack `#web-performance` if scores drop < targets.
- Schedule monthly full audit and update this document with new benchmarks.
