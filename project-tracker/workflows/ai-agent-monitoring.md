# AI Agent Monitoring & Incident Response

## Logging & Audit
- Log elke agent-run met timestamp, gebruiker en uitgevoerde commando's in `logs/agent-runs/` (geautomatiseerd script TBD).
- Bewaar lint/test/build output bij elke deployment-run voor traceerbaarheid.
- Archiveer incidenten en lessons learned in gedeelde kennisbank (Notion).

## Alerting
- Slack kanaal `#ai-ops` ontvangt automatische notificaties bij:
  - Command failure met exit code ≠ 0.
  - Detectie van verboden commando (via pre-check script).
  - Nieuwe security/policy schending gemarkeerd door reviewer.
- Email fallback naar ai-ops@tesoro.com wanneer Slack onbereikbaar is.

## Incident Workflow
1. **Detectie**: Agent of reviewer labelt run als incident (severity `low`, `medium`, `high`).
2. **Mitigatie**: Zet agent stop, rollback wijzigingen (`git reset --hard` of revert PR).
3. **Communicatie**: Meld incident in `#ai-ops` met korte samenvatting en impact.
4. **Analyse**: Vul incident template in (`project-tracker/templates/ai-incident.md`).
5. **Herstel**: Documenteer fix, update regels in `project-tracker/workflows/windsurf-rules.md` indien nodig.
6. **Post-mortem**: Deel conclusies in weekly ops meeting.

## Monitoring Checklist
- [ ] Dagelijkse review van agent-run log.
- [ ] Wekelijkse audit van openstaande incidenten.
- [ ] Maandelijkse test van alerting kanalen.

## Escalatie Matrix
- **Low**: Oplossen door AI Ops Lead binnen 24u.
- **Medium**: Escaleren naar Engineering Manager + Security; antwoord binnen 4u.
- **High**: Immediate call met CTO; active incident bridge.
