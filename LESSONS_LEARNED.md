# Lessons Learned - Tesoro CRM Website Project

Dit document bevat belangrijke lessen die we hebben geleerd tijdens de ontwikkeling van de Tesoro CRM website.

## 🔴 Problemen & Oplossingen

### 1. Git Commit Messages - Multi-line Probleem

**Probleem**: 
Multi-line commit messages met newlines liepen vast in de terminal en gaven een `dquote>` prompt.

```bash
# ❌ FOUT - loopt vast
git commit -m "feat: Feature

Details hier
Meer details"
```

**Oplossing**:
Commit messages ALTIJD op **één regel** houden.

```bash
# ✅ GOED - werkt altijd
git commit -m "feat: Feature - korte beschrijving op één regel"
```

**Waarom belangrijk**: 
Voorkomt dat commits vastlopen en tijd verspillen met troubleshooting.

---

### 2. Hardcoded Values - Configuratie Probleem

**Problemen gevonden**:
1. Domain hardcoded in Layout.astro (`https://tesoro-crm-website.pages.dev`)
2. Site URL hardcoded in astro.config.mjs
3. Default meta tags hardcoded in één taal (Spaans)

**Oplossingen**:

**Domain**:
```javascript
// ❌ FOUT
<link rel="canonical" href={`https://tesoro-crm-website.pages.dev${currentPath}`} />

// ✅ GOED
const siteUrl = import.meta.env.SITE || Astro.url.origin;
<link rel="canonical" href={`${siteUrl}${currentPath}`} />
```

**Site Config**:
```javascript
// ❌ FOUT
site: 'https://tesoro-crm-website.pages.dev'

// ✅ GOED
site: process.env.SITE_URL || 'https://tesoro-crm-website.pages.dev'
```

**Meta Tags**:
```javascript
// ❌ FOUT - één taal
const title = 'Tesoro CRM - Captación inteligente...'

// ✅ GOED - per taal
const defaultMeta = {
  es: { title: '...', description: '...' },
  en: { title: '...', description: '...' },
  nl: { title: '...', description: '...' }
};
const title = defaultMeta[locale].title;
```

**Waarom belangrijk**:
- Werkt in alle omgevingen (local, preview, production)
- Makkelijk custom domain toe te voegen
- Correcte SEO per taal

---

### 3. Project Tracker Inconsistenties

**Probleem**:
Epic status was "done" maar stories/issues waren nog "todo". Checkboxes waren niet aangevinkt.

**Oplossing**:
Altijd **alle niveaus** updaten bij het afronden van werk:

1. **Epic level**: `status: done`
2. **Story level**: 
   - `status: done`
   - `completed-date: 2025-10-04`
   - Acceptance criteria: `- [x]`
3. **Issue level**:
   - `status: done`
   - Checklist items: `- [x]`

**Batch update commando's**:
```bash
# Status updaten
find path -name "*.md" -exec sed -i '' 's/status: todo/status: done/g' {} \;

# Checkboxes updaten
find path -name "*.md" -exec sed -i '' 's/- \[ \]/- [x]/g' {} \;
```

**Waarom belangrijk**:
Voorkomt verwarring over wat wel/niet af is en geeft accurate project status.

---

### 4. Taal Prioriteit - Verkeerde Default

**Probleem**:
Website was opgezet met Nederlands als primaire taal (`/`), maar moet Spaans zijn voor Spaanse kustmakelaars.

**Wat moest veranderen**:
1. `astro.config.mjs`: `defaultLocale: 'nl'` → `'es'`
2. `src/i18n/config.ts`: `defaultLang: 'nl'` → `'es'`
3. `languageRoutes`: `nl: '/', es: '/es'` → `es: '/', nl: '/nl'`
4. `sitemap.xml`: Alle hreflang tags aanpassen
5. `robots.txt`: `/es/` → `/nl/`
6. `Layout.astro`: OG locale logic aanpassen

**Oplossing**:
Sed commando's gebruiken voor bulk updates:
```bash
sed -i '' 's|/es/|/nl/|g' public/sitemap.xml
```

**Waarom belangrijk**:
- Primaire doelgroep krijgt de default URL (`/`)
- Betere SEO voor primaire markt
- Correcte taal verwachtingen voor gebruikers

---

### 5. Translation Coverage - Systematische Aanpak

**Wat werkte goed**:

1. **Eerst NL translations compleet maken**
   - Alle keys in `nl.json`
   - Gestructureerd per sectie

2. **Dan AI translate naar EN/ES**
   - Consistent gebruik van terminologie
   - Behoud van structuur

3. **Components updaten om `t()` te gebruiken**
   - Stap voor stap per component
   - Build testen tussen elke stap

4. **Verificatie**
   - Build succesvol?
   - Alle routes gegenereerd?
   - Visuele check per taal

**Waarom belangrijk**:
Voorkomt missing translations en zorgt voor consistente kwaliteit.

---

### 6. Werk Verificatie - Check Before Build

**Probleem**:
Soms werk dubbel gedaan omdat niet gecheckt werd of features al bestonden.

**Oplossing - Altijd eerst checken**:
```bash
# Check of file bestaat
ls -la src/pages/pricing.astro

# Check file grootte
wc -l src/pages/pricing.astro

# Check content
grep "const plans" src/pages/pricing.astro

# Check translations
grep "pricing.hero" src/i18n/locales/nl.json
```

**Waarom belangrijk**:
Bespaart tijd en voorkomt conflicten.

---

## ✅ Best Practices

### Git Workflow
1. ✅ Commit messages op één regel
2. ✅ Feature branches voor elke taak
3. ✅ `--no-ff` merge voor duidelijke history
4. ✅ Descriptive commit messages

### Configuration
1. ✅ Geen hardcoded URLs
2. ✅ Environment variables voor configuratie
3. ✅ `.env.example` voor documentatie
4. ✅ Fallback values voor development

### Internationalization
1. ✅ Primaire taal op root URL (`/`)
2. ✅ Andere talen op prefixed URLs (`/en`, `/nl`)
3. ✅ Default meta tags per taal
4. ✅ Consistent gebruik van `t()` function

### Project Management
1. ✅ Update alle niveaus (Epic → Story → Issue)
2. ✅ Vink checkboxes af
3. ✅ Voeg `completed-date` toe
4. ✅ Gebruik batch commands voor bulk updates

### SEO
1. ✅ Dynamische canonical URLs
2. ✅ Hreflang tags per taal
3. ✅ Sitemap met alle talen
4. ✅ Correcte OG locale per taal

---

## 📚 Handige Commands

### Batch Updates
```bash
# Update status in alle markdown files
find project-tracker -name "*.md" -exec sed -i '' 's/status: todo/status: done/g' {} \;

# Vink alle checkboxes af
find project-tracker -name "*.md" -exec sed -i '' 's/- \[ \]/- [x]/g' {} \;
```

### Verificatie
```bash
# Check build
npm run build

# Check routes
npm run build 2>&1 | grep "└─"

# Check translations
grep -r "t(" src/pages/
```

### Git
```bash
# Eén-regel commit
git commit -m "feat: beschrijving op één regel"

# Merge met no-ff
git merge --no-ff branch-name -m "Merge: beschrijving"
```

---

## 🎯 Checklist voor Nieuwe Features

- [ ] Check of feature al bestaat
- [ ] Gebruik environment variables voor config
- [ ] Implementeer i18n vanaf het begin
- [ ] Test in alle talen
- [ ] Update project tracker (Epic/Story/Issue)
- [ ] Vink alle checkboxes af
- [ ] Commit op één regel
- [ ] Test build voordat je merged
- [ ] Deploy naar preview
- [ ] Visuele check

---

## 📝 Conclusie

De belangrijkste lessen:
1. **Geen hardcoded values** - alles configureerbaar maken
2. **Commit messages op één regel** - voorkomt vastlopen
3. **Systematische i18n** - van begin tot eind doordenken
4. **Project tracker up-to-date** - alle niveaus updaten
5. **Verificatie eerst** - check voordat je bouwt

Deze lessen zorgen voor een snellere, efficiëntere workflow en minder bugs.

---

*Laatste update: 2025-10-04*
