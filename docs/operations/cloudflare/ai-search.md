# Cloudflare AI Search Setup

## 🤖 What is Cloudflare AI Search?

Cloudflare AI Search is an AI-powered search function that:
- ✅ **Semantic search** - Understands meaning, not just keywords
- ✅ **Automatic indexing** - Crawls your site via sitemap
- ✅ **Edge computing** - Lightning fast, runs on Cloudflare's network
- ✅ **Multilingual** - Works in all languages (NL/ES/EN)
- ✅ **Free tier** - Up to 10,000 queries/month

## 📋 Requirements

- ✅ Cloudflare account (you already have one!)
- ✅ Site running on Cloudflare Pages (check!)
- ✅ Sitemap.xml (we have it!)

## 🚀 Activation Steps

### 1. Enable AI Search in Cloudflare Dashboard

1. Go to your Cloudflare dashboard
2. Select your domain: `tesorohq.io`
3. Go to **AI** → **AI Search** (in the sidebar)
4. Click **"Enable AI Search"**

### 2. Configure the Index

```bash
# In Cloudflare dashboard:
1. Sitemap URL: https://new.tesorohq.io/sitemap.xml
2. Languages: nl, es, en
3. Crawl frequency: Daily
4. Click "Start Indexing"
```

### 3. Get your API Endpoint

After activation you'll get an endpoint like:
```
https://ai-search.cloudflare.com/v1/search/{YOUR_ACCOUNT_ID}
```

### 4. Update the Search Component

Open `src/components/AISearch.astro` and replace:

```typescript
// BEFORE:
const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

// AFTER:
const response = await fetch(`https://ai-search.cloudflare.com/v1/search/YOUR_ACCOUNT_ID?q=${encodeURIComponent(query)}`, {
  headers: {
    'Authorization': `Bearer ${import.meta.env.CLOUDFLARE_AI_SEARCH_API_KEY}`
  }
});
```

### 5. Add API Key to Environment Variables

In Cloudflare Pages dashboard:
```
Settings → Environment Variables → Add Variable

Name: CLOUDFLARE_AI_SEARCH_API_KEY
Value: [your-api-key-from-cloudflare]
```

### 6. Add Search to Header

Open `src/components/Header.astro` and add:

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

### Change the search trigger position

The search trigger can be placed anywhere:
- In the header (recommended)
- In the hero section
- As a floating button

### Change the styling

All styles are in `src/components/AISearch.astro`:
- `.ai-search__trigger` - The search button
- `.ai-search__dialog` - The search window
- `.ai-search__result` - Individual results

### Change the keyboard shortcut

Default: `Cmd/Ctrl + K`

Change in the script section:
```typescript
if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
  // Change 'k' to another key
}
```

## 📊 Analytics

Cloudflare AI Search automatically gives you:
- Number of queries
- Popular search terms
- Click-through rates
- Average response time

View this in: **Cloudflare Dashboard → AI → AI Search → Analytics**

## 🔧 Troubleshooting

### "Search is not yet configured"
- Check if AI Search is activated in Cloudflare
- Check if the API endpoint is correct
- Check if the API key is added to environment variables

### "No results found"
- Wait 24 hours after activation (first crawl takes time)
- Check if sitemap.xml is accessible
- Check if pages are not blocked in robots.txt

### Search is slow
- AI Search runs on the edge, should be <100ms
- Check Cloudflare Analytics for performance metrics
- Possible rate limiting (free tier: 10,000 queries/month)

## 💡 Pro Tips

1. **Use specific meta descriptions** - AI Search uses these for excerpts
2. **Structure content with headings** - Better search relevance
3. **Add FAQ schema** - AI can give direct answers
4. **Monitor popular queries** - Optimize content based on what people search for

## 🎯 Expected Impact

**For visitors:**
- ⚡ Instant answers to questions
- 🎯 Relevant results (not just keyword matching)
- 🌍 Works in all languages
- 📱 Perfect on mobile

**For conversions:**
- 📈 Higher engagement (people find what they need faster)
- 💰 More conversions (less friction)
- 🎨 Professional impression
- 📊 Insight into what visitors are searching for

## 📚 Resources

- [Cloudflare AI Search Docs](https://developers.cloudflare.com/ai-search/)
- [API Reference](https://developers.cloudflare.com/ai-search/api/)
- [Best Practices](https://developers.cloudflare.com/ai-search/best-practices/)

## ✅ Checklist

- [ ] AI Search activated in Cloudflare dashboard
- [ ] Sitemap configured
- [ ] API endpoint obtained
- [ ] API key added to environment variables
- [ ] Search component added to Header
- [ ] Tested on desktop and mobile
- [ ] Translations added (see below)

## 🌍 Add Translations

Add to `src/i18n/locales/nl.json`:
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

Repeat for `en.json` and `es.json`.

---

**Ready to launch?** Follow the steps above and you'll have an AI-powered search function within 30 minutes! 🚀
