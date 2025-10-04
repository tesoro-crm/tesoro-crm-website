---
id: EPIC-010
title: Delivery Workflow & AI Ops
status: done
owner: Engineering Manager
start-date: 2025-10-12
end-date: 2025-10-26
goal: |
  Borg stabiele deliveryprocessen voor het websiteproject: git-strategie, CI/CD naar Cloudflare, QA-checklists en richtlijnen voor AI/Windsurf agents.
key-metrics:
  - Branching-strategie en PR-proces gedocumenteerd en gevolgd door team
  - CI/CD pipeline succesvol voor main en release branches
  - Windsurf rules gepubliceerd, 100% agents gebrieft
Dependencies:
  - EPIC-008
  - EPIC-009
---

## Overview
Legt de workflows vast die in `tesoro-crm-website-blueprint.md#9` en interne requirements zijn beschreven: git branching, reviewproces, deployment via Wrangler, QA checklist en AI-agent operationalisatie.

## Deliverables
- [ ] Git branching & PR guidelines
- [ ] CI/CD pipeline documentatie + scripts
- [ ] QA & release checklist
- [ ] Windsurf rules & memory guidelines

## Stories
- STORY-028
- STORY-029
- STORY-030

## Notes
- Documentatie opslaan onder `docs/` en `project-tracker/workflows/` zodat AI agents deze direct kunnen raadplegen.
