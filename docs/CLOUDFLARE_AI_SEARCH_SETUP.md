# Cloudflare AI Search Setup Guide

## Overview

This guide explains how to connect the AI Chat Widget to Cloudflare AI Search (RAG) to enable intelligent search across your 37 indexed pages.

## Current Status

✅ **Implemented:**
- `/api/search` endpoint (src/pages/api/search.ts)
- Updated AI Chat Widget to use AI Search as primary source
- Keyword-based fallback for when AI Search is unavailable
- Additional search results display in chat

⏳ **Pending:**
- Configure AI Search binding in Cloudflare Dashboard

## Step-by-Step Setup

### 1. Create AI Search Instance (If Not Done Yet)

If you haven't created an AI Search instance yet:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **AI** → **AI Search**
3. Click **Create AI Search**
4. Choose data source:
   - **Option A**: Domain crawler (automatically crawl your website)
   - **Option B**: R2 bucket (if you have content in R2)
5. Configure settings:
   - Name: `tesoro-website-search`
   - Domain: `new.tesorohq.io` (if using domain crawler)
   - Auto-refresh: Enabled (keeps index up-to-date)
6. Click **Create**

### 2. Configure AI Search Binding in Cloudflare Pages

1. Go to your **Pages project** in Cloudflare Dashboard
2. Navigate to: **Pages Project → Settings → Functions → Bindings**
3. Click **Add binding**
4. Select **AI Search** from the binding type
5. Configure:
   - **Variable name**: `AI_SEARCH` (important: must match code)
   - **AI Search instance**: Select `tesoro-website-search`
6. Click **Save**

### 3. Deploy Changes

After adding the binding:

```bash
# Build the project
npm run build

# Deploy to production
npm run deploy:production

# Or deploy to preview first to test
npm run deploy:preview
```

### 4. Test the Integration

Once deployed:

1. Open the website
2. Click the AI Chat Widget (bottom right)
3. Ask a question, for example:
   - "How do I add a contact?"
   - "What is the deal pipeline?"
   - "How much does Tesoro cost?"
4. The widget should now return intelligent answers from your indexed content

## How It Works

### Flow Diagram

```
User asks question
    ↓
Chat Widget (AIChatWidget.astro)
    ↓
POST /api/search
    ↓
Cloudflare AI Search (37 indexed pages)
    ↓
Returns top 5 results
    ↓
Display in chat + additional results
```

### API Endpoint

The `/api/search` endpoint:
- Accepts POST requests with `{ query: "..." }`
- Calls `locals.runtime.env.AI_SEARCH.search()`
- Returns top 5 results with metadata
- Includes fallback handling if binding is not configured

### Chat Widget Behavior

**With AI Search:**
- Primary source: AI Search API
- Shows main result + 2 additional results
- Intelligent, context-aware answers

**Without AI Search (fallback):**
- Keyword-based responses for common questions
- Covers: pricing, demo, contact
- Limited compared to AI Search

## Troubleshooting

### Issue: "AI Search is not configured"

**Symptom:** Chat widget shows fallback responses only

**Solution:**
1. Verify binding is added in Cloudflare Dashboard
2. Check binding name is exactly `AI_SEARCH`
3. Redeploy the project after adding binding

### Issue: "API Search returns no results"

**Symptom:** Chat shows "no specific answer found"

**Possible causes:**
1. AI Search index is empty → Check indexing status in dashboard
2. Query is too vague → Try more specific questions
3. Content not indexed yet → Wait for crawler to complete

**Solution:**
1. Go to Cloudflare Dashboard → AI Search
2. Check indexing status
3. Manually trigger reindex if needed

### Issue: CORS errors

**Symptom:** API calls fail in browser console

**Solution:**
- API endpoint is same-origin, should not have CORS issues
- If seeing errors, check browser console for details
- Verify deployment completed successfully

## Monitoring

### Check Search Quality

Monitor what users are asking:

```typescript
// In src/pages/api/search.ts, add logging:
console.log('Search query:', query);
console.log('Results count:', results.length);
```

### View Logs

View logs in Cloudflare Dashboard:
1. Go to **Pages Project → Functions → Logs**
2. Filter by `/api/search`
3. See what users are searching for

## Optimization Tips

### 1. Improve Search Results

To get better results from AI Search:

**Content Optimization:**
- Use clear, descriptive headings
- Include common questions in your content
- Add metadata to pages (title, description)

**Query Rewriting:**
AI Search supports query rewriting. Enable in dashboard:
- Go to AI Search settings
- Enable "Query rewriting"
- This improves natural language understanding

### 2. Customize Response Format

Edit `src/pages/api/search.ts` to customize results:

```typescript
const results = searchResponse.results?.map((result: any) => ({
  title: result.metadata?.title || result.title,
  url: result.metadata?.url || result.url,
  excerpt: result.content || result.excerpt,
  score: result.score,
  // Add custom fields:
  category: result.metadata?.category,
  author: result.metadata?.author,
}))
```

### 3. Add Analytics

Track search usage:

```typescript
// In api/search.ts
// Log popular searches
if (results.length === 0) {
  // Track failed searches to improve content
  console.warn('No results for:', query);
}
```

## Costs

**Cloudflare AI Search Pricing:**
- R2 storage: ~$0.015/GB/month
- AI Search: Included in Workers Paid plan
- Workers AI: Pay per request
- Estimate for 37 pages: <$5/month

## Next Steps

After setup is complete:

1. ✅ Test with various questions
2. ✅ Monitor search quality
3. ✅ Add more content to improve results
4. ✅ Consider adding search analytics
5. ✅ Iterate on response formatting

## Technical Details

### Environment Variables

No environment variables needed. AI Search uses runtime bindings.

### TypeScript Types

The API expects:

```typescript
// Request
POST /api/search
{
  "query": "How do I add a contact?"
}

// Response
{
  "success": true,
  "query": "How do I add a contact?",
  "results": [
    {
      "title": "Add Contact Guide",
      "url": "/knowledge-base/add-contact",
      "excerpt": "Learn how to add contacts...",
      "score": 0.95
    }
  ],
  "total": 5
}
```

### Binding Configuration

The binding must be named `AI_SEARCH` to match this code:

```typescript
// src/pages/api/search.ts (line 43)
if (!locals?.runtime?.env?.AI_SEARCH) {
  // Binding not found
}
```

## Support

For issues:
1. Check Cloudflare AI Search docs: https://developers.cloudflare.com/ai-search/
2. Verify binding configuration
3. Check browser console for errors
4. Review function logs in dashboard

---

**Last updated:** 2025-10-15
**Version:** 1.0.0
