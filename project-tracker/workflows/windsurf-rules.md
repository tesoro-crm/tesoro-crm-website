# Windsurf Agent Rules

## Command Safety
- Gebruik enkel commands die vooraf beschreven zijn in `SETUP.md` en `docs/devops/deployment.md`.
- Voer nooit `rm -rf`, `chmod`, of netwerkcalls naar onbekende hosts uit zonder expliciete human approval.
- Schrijf wijzigingen via apply_patch of write_to_file; hergebruik geen shell redirect (`>`).

## File Etiquette
- Bewerk uitsluitend bestanden die gekoppeld zijn aan het huidige issue/epic.
- Bewaar code in het Engels; voor copywriting kan NL/EN/ES gebruikt worden conform issue.
- Voeg geen licentieheaders toe en wijzig geen bestandsrechten.

## Review Workflow
- Markeer elke wijziging in het issue-logboek met datum en korte notitie.
- Update statusvelden (todo → in-progress → done) zodra taken evolueren.
- Vraag om review door de aangewezen reviewer voordat je mergen aanvraagt.

## Testing & Validation
- Draai `npm run lint` en `npm test` vóór elke PR.
- Voer Lighthouse-scripts uit bij UI-wijzigingen en koppel score naar `docs/performance/baseline.md`.
- Controleer dat CTA tracking IDs blijven overeenkomen met `STORY-025` mapping.

## Security & Data
- Plaats nooit secrets in code of logs; gebruik Cloudflare `wrangler secret` map.
- Houd je aan GDPR: houd leads-data in staging geanonimiseerd.
- Bij incidenten volg je direct het protocol in `project-tracker/workflows/ai-agent-monitoring.md`.

## Memory & Context
- Schrijf relevante interacties weg in Windsurf memories volgens issue-eisen.
- Sluit elk agent-run af met samenvatting en openstaande acties.
- Respecteer tone-of-voice uit `docs/workflow/ai-onboarding.md` voor communicatie.
