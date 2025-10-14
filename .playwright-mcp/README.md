# Screenshot Tracking System

Dit systeem houdt alle screenshots en videos bij om duplicaten te voorkomen en een gestructureerd overzicht te behouden.

## Bestanden

- **screenshots-manifest.json** - Centrale database met alle screenshots en videos
- **screenshot-helper.cjs** - Command-line tool voor het beheren van het manifest

## Quick Start

```bash
# Statistieken bekijken
node screenshot-helper.cjs stats

# Checken of screenshot al bestaat
node screenshot-helper.cjs exists dashboard "KPIs and metrics"

# Zoeken naar screenshots
node screenshot-helper.cjs search "property matching"

# Alle screenshots voor een module bekijken
node screenshot-helper.cjs list deals

# Nieuwe screenshot toevoegen
node screenshot-helper.cjs add "new-dashboard.png" crm-modules dashboard "Dashboard with new features"
```

## Manifest Structuur

Het manifest groepeert screenshots in categorieën:

### Categories

1. **videos** - MP4 video files (4 totaal)
   - AI property matching workflow
   - Deal pipeline overview
   - Contact management
   - Properties management

2. **comprehensiveScreenshots** - Recente complete CRM screenshots (10 totaal)
   - Dashboard overview
   - Activities, Leads, Deals, Properties
   - Settings, Calendar

3. **crmModuleScreenshots** - Gedetailleerde module screenshots (64 totaal)
   - Per module: dashboard, leads, deals, contacts, properties, projects, etc.
   - Inclusief modals, dropdowns, detail pages

4. **marketingWebsiteScreenshots** - Website screenshots (26 totaal)
   - Homepage, signup flow, login
   - Navigation, API pages

5. **knowledgeBaseScreenshots** - KB artikel screenshots (2 totaal)
   - Layout fixes en verificaties

6. **crmWorkflowScreenshots** - Workflow captures (23 totaal)
   - Complete user journeys door de CRM

7. **videoSequenceScreenshots** - Video frame sequences (8 totaal)
   - Individuele frames die gecompileerd zijn tot videos

8. **miscellaneousScreenshots** - Overige screenshots (5 totaal)

### Screenshot Entry Format

```json
{
  "filename": "videos/comprehensive-screenshots/01-dashboard-overview.png",
  "category": "crm-modules",
  "module": "dashboard",
  "description": "Dashboard with KPIs, alerts, pipeline metrics",
  "created": "2025-10-14",
  "purpose": "Documentation - main CRM dashboard view"
}
```

## Helper Script Features

### 1. Exists Check (voorkomt duplicaten)

```bash
node screenshot-helper.cjs exists dashboard "overview"
```

**Output als gevonden:**
```json
{
  "filename": "videos/comprehensive-screenshots/01-dashboard-overview.png",
  "category": "crm-modules",
  "module": "dashboard",
  "description": "Dashboard with KPIs, alerts, pipeline metrics",
  "created": "2025-10-14"
}
```

Exit code: 0 (gevonden), 1 (niet gevonden)

### 2. Search (keyword zoeken)

```bash
node screenshot-helper.cjs search "property matching"
```

Zoekt in:
- Filenames
- Descriptions
- Alle categories

**Output:** Lijst met alle matches inclusief module en category info

### 3. List by Module (alle screenshots voor een module)

```bash
node screenshot-helper.cjs list deals
```

**Output:** Complete lijst van alle 21 deals-gerelateerde screenshots

### 4. Add (nieuwe screenshot registreren)

```bash
node screenshot-helper.cjs add "filename.png" "category" "module" "Description here"
```

**Features:**
- Automatische duplicate check
- Metadata toevoegen (created date)
- Totals updaten
- Manifest opslaan

### 5. Stats (overzicht)

```bash
node screenshot-helper.cjs stats
```

**Output:**
```
=== Screenshot Manifest Statistics ===

Total Assets: 140
Total Videos: 4
Total Screenshots: 136
Last Updated: 2025-10-14

Breakdown by category:
- Videos: 4
- Comprehensive Screenshots: 10
- CRM Module Screenshots: 64
...
```

## Workflow voor Nieuwe Screenshots

### Voordat je een screenshot maakt:

1. **Check of het al bestaat:**
   ```bash
   node screenshot-helper.cjs exists [module] "[description]"
   ```

2. **Zoek vergelijkbare screenshots:**
   ```bash
   node screenshot-helper.cjs search "[keyword]"
   node screenshot-helper.cjs list [module]
   ```

3. **Als het niet bestaat, maak de screenshot**

4. **Registreer in het manifest:**
   ```bash
   node screenshot-helper.cjs add "filename.png" "category" "module" "Description"
   ```

### Voorbeeld Workflow:

```bash
# Ik wil een nieuwe dashboard screenshot maken
$ node screenshot-helper.cjs exists dashboard "metrics overview"
✗ Screenshot does not exist

# Kijk wat er al is voor dashboard
$ node screenshot-helper.cjs list dashboard
# ... zie output ...

# Maak de screenshot met Playwright
# ... capture screenshot ...

# Registreer in manifest
$ node screenshot-helper.cjs add "dashboard-metrics-new.png" "crm-modules" "dashboard" "Dashboard metrics overview with charts"
✓ Screenshot added to manifest
```

## Smart Matching

Het script heeft "fuzzy matching" voor duplicate detection:

- Vergelijkt module + description
- Normaliseert text (lowercase, geen special chars)
- Checkt op overlappende woorden (60% threshold)

**Voorbeelden die als duplicaat worden herkend:**
- "Dashboard with KPIs" vs "Dashboard KPIs overview"
- "Property matching AI" vs "AI property matching workflow"
- "Deals Kanban board" vs "Deals kanban overview"

## Integration met Playwright Workflows

In toekomstige Playwright scripts kan ik het script gebruiken:

```javascript
const { execSync } = require('child_process');

// Check if screenshot exists
function screenshotExists(module, description) {
  try {
    execSync(`node screenshot-helper.cjs exists ${module} "${description}"`, {
      cwd: '.playwright-mcp',
      stdio: 'pipe'
    });
    return true; // Exit code 0 = exists
  } catch (error) {
    return false; // Exit code 1 = not exists
  }
}

// Only capture if doesn't exist
if (!screenshotExists('dashboard', 'overview with metrics')) {
  await page.screenshot({ path: 'dashboard-metrics.png' });
  // Add to manifest
  execSync(
    `node screenshot-helper.cjs add "dashboard-metrics.png" "crm-modules" "dashboard" "Overview with metrics"`,
    { cwd: '.playwright-mcp' }
  );
}
```

## Maintenance

### Periodiek:

1. **Verwijder orphaned entries** (screenshots die niet meer bestaan)
2. **Merge duplicates** (handmatig via JSON editing)
3. **Update descriptions** (als screenshots geüpdatet zijn)
4. **Clean up misc category** (herclassificeer naar juiste categories)

### Backup:

```bash
# Backup manifest before major changes
cp screenshots-manifest.json screenshots-manifest.backup.json
```

## Statistics

**Current Status (2025-10-14):**
- 140 totale assets
- 4 MP4 videos
- 136 screenshots
- 8 categories
- Modules: dashboard, leads, deals, contacts, properties, projects, activities, calendar, settings, authentication

**Coverage:**
- ✅ Complete CRM module coverage (alle 9 modules)
- ✅ Marketing website (homepage, signup, API pages)
- ✅ Knowledge base (layout screenshots)
- ✅ Workflow videos (AI matching, pipelines, management)

## Future Enhancements

1. **Auto-generate thumbnails** voor video files
2. **File size tracking** in manifest
3. **Screenshot comparison** (detect visual duplicates)
4. **Export manifest to HTML** voor visueel overzicht
5. **Playwright plugin** voor automatische registration
