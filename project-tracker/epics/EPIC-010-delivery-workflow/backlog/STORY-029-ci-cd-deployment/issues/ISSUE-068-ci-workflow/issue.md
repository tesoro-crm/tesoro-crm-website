---
id: ISSUE-068
story: STORY-029
status: in-progress
assignee: DevOps Engineer
due-date: 2025-10-16
labels:
  - cicd
  - ci
---

## Beschrijving
Configureer GitHub Actions workflow (`.github/workflows/ci.yml`) voor linting, testing en Astro build op iedere pull request.

## Checklist
- [x] ESLint/TypeScript lint jobs geconfigureerd
- [ ] Unit/integration tests opgezet (Vitest/Playwright) en uitgevoerd in CI
- [x] Astro build stap + artifact upload toegevoegd
- [ ] Status badges gedeeld met team

## Logboek
| Datum | Opmerking |
|-------|-----------|
| 2025-10-04 | CI workflow aangemaakt (`.github/workflows/ci.yml`) en lint/build stappen bevestigd |
