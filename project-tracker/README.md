# Project Tracker

Deze map bevat een lokale Jira-achtige structuur voor het Tesoro CRM websiteproject. Structuur:

- `templates/`: Markdown sjablonen voor epics, stories en issues.
- `epics/EPIC-xxx-naam/`: Map per epic met `epic.md`, `backlog/` (stories) en `notes/`.

## Gebruik

1. Maak voor elke nieuwe epic een map onder `epics/` op basis van het nummer en de naam.
2. Kopieer het juiste sjabloon uit `templates/` en vul de metadata in.
3. Voor stories: plaats in `backlog/` een map `STORY-xxx-naam/` met `story.md` en submap `issues/`.
4. Voor issues: maak in `issues/` een map `ISSUE-xxx-naam/` met `issue.md` en optionele submappen `attachments/`, `checklists/` enz.

Front matter (YAML) maakt filtering mogelijk met tooling zoals `yq` of `ripgrep`.
