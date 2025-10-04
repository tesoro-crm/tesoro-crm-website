# AI Agent Onboarding Guide

## Access Requirements
- Vraag toegang tot GitHub repo, Cloudflare account (read-only), en relevante Notion/Drive docs via Engineering Manager.
- Gebruik dedicated service accounts; deel geen persoonlijke tokens.
- Configureer lokale `.env.development` met dummy credentials; echte secrets alleen via Cloudflare `wrangler secret`.

## Environment Setup
1. Volg `SETUP.md` voor npm dependencies en Astro project.
2. Installeer extra tooling:
   ```bash
   npm install --global wrangler@latest
   npm install --global lighthouse-ci
   ```
3. Configureer `~/.npmrc` met read-only tokens indien nodig.

## Context & Knowledge Base
- Lees `tesoro-crm-website-blueprint.md` en `spanje-makelaars-analyse.md` voor marketing context.
- Raadpleeg `project-tracker/epics/EPIC-010-delivery-workflow/` voor actuele processen.
- Gebruik `docs/` map als primaire bron voor ontwerp, performance en SEO richtlijnen.

## Safety & Command Limits
- Verboden: muterende shell commands buiten project (`rm -rf /`, `sudo`, netwerkcalls naar onbekende hosts).
- Alle file edits via apply_patch/write_to_file; geen shell `>` redirects.
- Meld verdachte output direct in incident channel.

## Workflow Expectations
- Claim issue door status naar `in-progress` te wijzigen in het betreffende `issue.md`.
- Log dagelijkse voortgang in het issue-logboek met datum + korte notitie.
- Houd branch naamgeving aan zoals beschreven in `docs/workflow/git-strategy.md`.

## Memory Management
- Schrijf belangrijke beslissingen naar Windsurf memory store zodra bevestigd.
- Verwijder verouderde memories door markering "obsolete" te gebruiken in notities.
- Houd tone-of-voice consistent met `docs/workflow/pr-checklist.md` guidelines (zakelijk, to-the-point).

## First Run Checklist
- [ ] `npm install`
- [ ] `npm run lint` & `npm test`
- [ ] `npm run dev` verify homepage loads
- [ ] Schrijf onboarding notitie in project log
- [ ] Deel eerste update in `#tesoro-web` Slack kanaal
