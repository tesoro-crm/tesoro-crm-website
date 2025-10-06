# Cloudflare AI Search Setup

## 🤖 Wat is Cloudflare AI Search?

Cloudflare AI Search is een AI-powered zoekfunctie die:
- ✅ **Semantic search** - Begrijpt betekenis, niet alleen keywords
- ✅ **Automatische indexering** - Crawlt je site via sitemap
- ✅ **Edge computing** - Razendsnel, draait op Cloudflare's netwerk
- ✅ **Multilingual** - Werkt in alle talen (NL/ES/EN)
- ✅ **Gratis tier** - Tot 10,000 queries/maand

## 📋 Vereisten

- ✅ Cloudflare account (heb je al!)
- ✅ Site draait op Cloudflare Pages (check!)
- ✅ Sitemap.xml (hebben we!)

## 🚀 Activatie Stappen

### 1. Enable AI Search in Cloudflare Dashboard

1. Ga naar je Cloudflare dashboard
2. Selecteer je domain: `tesorohq.io`
3. Ga naar **AI** → **AI Search** (in de sidebar)
4. Klik **"Enable AI Search"**

### 2. Configureer de Index

```bash
# In Cloudflare dashboard:
1. Sitemap URL: https://new.tesorohq.io/sitemap.xml
2. Languages: nl, es, en
3. Crawl frequency: Daily
4. Click "Start Indexing"
```

### 3. Krijg je API Endpoint

Na activatie krijg je een endpoint zoals:
```
https://ai-search.cloudflare.com/v1/search/{YOUR_ACCOUNT_ID}
```

### 4. Update de Search Component

Open `src/components/AISearch.astro` en vervang:

```typescript
// VOOR:
const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

// NA:
const response = await fetch(`https://ai-search.cloudflare.com/v1/search/YOUR_ACCOUNT_ID?q=${encodeURIComponent(query)}`, {
  headers: {
    'Authorization': `Bearer ${import.meta.env.CLOUDFLARE_AI_SEARCH_API_KEY}`
  }
});
```

### 5. Voeg API Key toe aan Environment Variables

In Cloudflare Pages dashboard:
```
Settings → Environment Variables → Add Variable

Name: CLOUDFLARE_AI_SEARCH_API_KEY
Value: [your-api-key-from-cloudflare]
```

### 6. Voeg Search toe aan Header

Open `src/components/Header.astro` en voeg toe:

```astro
---
import AISearch from './AISearch.astro';
// ... other imports
---

<header>
  <!-- ... existing header content ... -->
  
  <!-- Add search before CTA button -->
  <AISearch locale={locale} />
  
  <!-- ... rest of header ... -->
</header>
```

## 🎨 Customization

### Wijzig de zoek trigger positie

De search trigger kan overal geplaatst worden:
- In de header (aanbevolen)
- In de hero sectie
- Als floating button

### Wijzig de styling

Alle styles zitten in `src/components/AISearch.astro`:
- `.ai-search__trigger` - De zoekknop
- `.ai-search__dialog` - Het zoekvenster
- `.ai-search__result` - Individuele resultaten

### Wijzig de keyboard shortcut

Standaard: `Cmd/Ctrl + K`

Wijzig in de script sectie:
```typescript
if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
  // Wijzig 'k' naar een andere toets
}
```

## 📊 Analytics

Cloudflare AI Search geeft je automatisch:
- Aantal queries
- Populaire zoekopdrachten
- Click-through rates
- Gemiddelde response tijd

Bekijk dit in: **Cloudflare Dashboard → AI → AI Search → Analytics**

## 🔧 Troubleshooting

### "Search is not yet configured"
- Controleer of AI Search is geactiveerd in Cloudflare
- Controleer of de API endpoint correct is
- Controleer of de API key is toegevoegd aan environment variables

### "No results found"
- Wacht 24 uur na activatie (eerste crawl duurt even)
- Controleer of sitemap.xml toegankelijk is
- Controleer of pages niet geblokkeerd zijn in robots.txt

### Search is langzaam
- AI Search draait op de edge, moet <100ms zijn
- Check Cloudflare Analytics voor performance metrics
- Mogelijk rate limiting (gratis tier: 10,000 queries/maand)

## 💡 Pro Tips

1. **Gebruik specifieke meta descriptions** - AI Search gebruikt deze voor excerpts
2. **Structureer content met headings** - Betere search relevance
3. **Voeg FAQ schema toe** - AI kan direct antwoorden geven
4. **Monitor populaire queries** - Optimaliseer content based on wat mensen zoeken

## 🎯 Verwachte Impact

**Voor bezoekers:**
- ⚡ Instant antwoorden op vragen
- 🎯 Relevante resultaten (niet alleen keyword matching)
- 🌍 Werkt in alle talen
- 📱 Perfect op mobiel

**Voor conversies:**
- 📈 Hogere engagement (mensen vinden sneller wat ze zoeken)
- 💰 Meer conversies (minder friction)
- 🎨 Professionele indruk
- 📊 Inzicht in wat bezoekers zoeken

## 📚 Resources

- [Cloudflare AI Search Docs](https://developers.cloudflare.com/ai-search/)
- [API Reference](https://developers.cloudflare.com/ai-search/api/)
- [Best Practices](https://developers.cloudflare.com/ai-search/best-practices/)

## ✅ Checklist

- [ ] AI Search geactiveerd in Cloudflare dashboard
- [ ] Sitemap geconfigureerd
- [ ] API endpoint verkregen
- [ ] API key toegevoegd aan environment variables
- [ ] Search component toegevoegd aan Header
- [ ] Getest op desktop en mobiel
- [ ] Translations toegevoegd (zie hieronder)

## 🌍 Translations Toevoegen

Voeg toe aan `src/i18n/locales/nl.json`:
```json
"search": {
  "open": "Zoeken openen",
  "close": "Sluiten",
  "placeholder": "Zoek in Tesoro CRM...",
  "label": "Zoeken",
  "empty": "Begin met typen om te zoeken...",
  "navigate": "navigeren",
  "select": "selecteren"
}
```

Herhaal voor `en.json` en `es.json`.

---

**Klaar om te lanceren?** Volg de stappen hierboven en je hebt binnen 30 minuten een AI-powered zoekfunctie! 🚀
