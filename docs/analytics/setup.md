# Analytics Setup

## Overview

Het project gebruikt een privacy-first analytics stack:
- **Plausible Analytics**: Privacy-vriendelijke web analytics (GDPR compliant)
- **Cloudflare Web Analytics**: Ingebouwde analytics zonder cookies
- **Sentry**: Error tracking en performance monitoring

## Plausible Analytics

### Setup

1. **Account aanmaken**: https://plausible.io/
2. **Script toevoegen**:

```astro
---
// src/layouts/BaseLayout.astro
const plausibleDomain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN;
---
<html>
  <head>
    {plausibleDomain && (
      <script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js"></script>
    )}
  </head>
</html>
```

3. **Environment variables**:
```bash
# .env
PUBLIC_PLAUSIBLE_DOMAIN=tesoro-crm.com
```

### Event Tracking

```typescript
// src/lib/analytics.ts
export function trackEvent(eventName: string, props?: Record<string, string>): void {
  if (window.plausible) {
    window.plausible(eventName, { props });
  }
}

// Usage
trackEvent('signup_clicked', { plan: 'professional' });
trackEvent('pricing_viewed');
```

### Goals

Configure in Plausible dashboard:
- **Conversions**: `/thank-you`, `/signup-complete`
- **Outbound links**: External documentation, partners
- **File downloads**: Whitepapers, case studies

## Cloudflare Web Analytics

### Setup

1. Enable in Cloudflare Dashboard → Analytics → Web Analytics
2. Add beacon script (automatic via Cloudflare Pages)

### Features

- **No cookies**: GDPR compliant by default
- **Real-time**: Live visitor data
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Bandwidth**: Data transfer metrics

## Sentry

### Setup

1. **Install**:
```bash
npm install @sentry/astro
```

2. **Configure**:
```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sentry from '@sentry/astro';

export default defineConfig({
  integrations: [
    sentry({
      dsn: import.meta.env.PUBLIC_SENTRY_DSN,
      environment: import.meta.env.MODE,
      release: import.meta.env.PUBLIC_APP_VERSION,
    }),
  ],
});
```

3. **Environment variables**:
```bash
PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
PUBLIC_APP_VERSION=1.0.0
```

### Error Tracking

```typescript
// Automatic error capture
throw new Error('Something went wrong');

// Manual capture
import * as Sentry from '@sentry/astro';

try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { section: 'checkout' },
    extra: { userId: user.id },
  });
}
```

### Performance Monitoring

```typescript
// Transaction tracking
const transaction = Sentry.startTransaction({
  op: 'page_load',
  name: 'Homepage',
});

// Spans for specific operations
const span = transaction.startChild({
  op: 'api_call',
  description: 'Fetch pricing data',
});

await fetchPricingData();
span.finish();
transaction.finish();
```

## Consent Management

### Integration with Cookie Consent

```typescript
// src/lib/consent.ts
import { trackEvent } from './analytics';

export function initializeAnalytics(): void {
  const consent = getConsent();
  
  if (consent?.analytics) {
    // Enable Plausible
    loadPlausible();
  }
  
  if (consent?.marketing) {
    // Enable marketing pixels
    loadMarketingScripts();
  }
}

function loadPlausible(): void {
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN;
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
}
```

## Dashboard Access

### Plausible
- **URL**: https://plausible.io/tesoro-crm.com
- **Team access**: Via email invites

### Cloudflare Analytics
- **URL**: https://dash.cloudflare.com/
- **Path**: Account → Analytics → Web Analytics

### Sentry
- **URL**: https://sentry.io/organizations/tesoro-crm/
- **Projects**: tesoro-website-production, tesoro-website-staging

## Metrics & KPIs

### Traffic Metrics
- **Pageviews**: Total page loads
- **Unique visitors**: Distinct users
- **Bounce rate**: Single-page sessions
- **Session duration**: Average time on site

### Conversion Metrics
- **Signup rate**: Visitors → signups
- **Trial-to-paid**: Trial users → paying customers
- **Pricing page views**: Interest indicator

### Performance Metrics
- **LCP**: Largest Contentful Paint (<2.5s)
- **FID**: First Input Delay (<100ms)
- **CLS**: Cumulative Layout Shift (<0.1)
- **TTFB**: Time to First Byte (<600ms)

### Error Metrics
- **Error rate**: Errors per session
- **Crash-free sessions**: % sessions without errors
- **Response time**: API latency

## AI Agent Integration

### Querying Analytics Data

```typescript
// src/lib/analytics-query.ts
export async function getAnalyticsSummary(dateRange: string): Promise<AnalyticsSummary> {
  // Query Plausible API
  const response = await fetch(
    `https://plausible.io/api/v1/stats/aggregate?site_id=${SITE_ID}&period=${dateRange}`,
    {
      headers: {
        Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
      },
    }
  );
  
  return response.json();
}
```

### Automated Reporting

```typescript
// Generate weekly report
export async function generateWeeklyReport(): Promise<void> {
  const summary = await getAnalyticsSummary('7d');
  const errors = await getSentryErrors('7d');
  
  const report = {
    traffic: summary.visitors,
    conversions: summary.goals,
    errors: errors.count,
    performance: await getWebVitals('7d'),
  };
  
  // Send to Slack/email
  await sendReport(report);
}
```

## Privacy Compliance

### GDPR
- ✅ No PII collected without consent
- ✅ Data retention: 12 months (configurable)
- ✅ Right to deletion: Via Plausible/Sentry dashboards
- ✅ Data processing agreement: Available on request

### Cookie Usage
- **Plausible**: No cookies (localStorage only)
- **Cloudflare**: No cookies
- **Sentry**: Session cookies (strictly necessary)

## Troubleshooting

### Analytics not tracking

1. Check consent status in browser console
2. Verify script loaded: `window.plausible`
3. Check ad blockers (Plausible usually bypasses)
4. Verify domain in Plausible dashboard

### Sentry errors not appearing

1. Check DSN configuration
2. Verify environment (staging vs production)
3. Check sample rate settings
4. Review error filters/ignore rules
