## Pre-Deployment

- **CI status**: all GitHub Actions jobs passing (lint, tests, build).
- **Manual QA**: verify critical flows (signup, pricing toggle, lead magnet forms) on staging.
- **Accessibility**: run Axe/Storybook checks for changed components.
- **Performance**: run Lighthouse on staging; confirm scores ≥ target.
- **Analytics**: validate event tracking for new/changed funnels.

## Deployment Steps

1. Confirm release notes and version metadata are updated.
2. Trigger staging deploy via GitHub Actions; await Wrangler confirmation.
3. Smoke-test staging after deploy; capture screenshots if issues arise.
4. Obtain go/no-go approval from engineering + marketing leads.
5. Promote to production (manual approval) and monitor GitHub Actions logs.

## Post-Deployment

- **Health check**: verify `/_health` endpoint and uptime monitor.
- **Analytics sanity**: ensure events flowing to Plausible/GA4 within 15 minutes.
- **Alerting**: confirm no error spikes in Sentry/Cloudflare logs.
- **Documentation**: log deployment summary in `docs/devops/deployment.md` and archive artifacts.
- **Follow-up**: create issues for discovered defects or TODOs.
