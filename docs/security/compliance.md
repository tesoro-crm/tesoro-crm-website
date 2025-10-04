# Security & Compliance

## Content Security Policy (CSP)

### Headers Configuration

Add to `wrangler.toml` or Cloudflare Pages settings:

```toml
[[headers]]
for = "/*"
[headers.values]
Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.tesoro-crm.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
Permissions-Policy = "geolocation=(), microphone=(), camera=()"
Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```

### CSP Directives Explained

- **default-src 'self'**: Alleen resources van eigen domein
- **script-src 'self' 'unsafe-inline'**: Scripts van eigen domein + inline (te verbeteren met nonces)
- **style-src 'self' 'unsafe-inline'**: Styles van eigen domein + inline
- **img-src 'self' data: https:**: Images van eigen domein, data URIs en HTTPS
- **connect-src**: API endpoints voor fetch/XHR
- **frame-ancestors 'none'**: Prevent clickjacking
- **base-uri 'self'**: Prevent base tag injection

## GDPR/AVG Compliance

### Cookie Consent

**Required for:**
- Analytics cookies (Google Analytics, Plausible, etc.)
- Marketing cookies (Facebook Pixel, LinkedIn Insight, etc.)
- Preference cookies (language, theme, etc.)

**Not required for:**
- Strictly necessary cookies (session, CSRF tokens)
- Security cookies

### Implementation

1. **Cookie Banner Component**
```astro
---
// src/components/CookieConsent.astro
---
<div id="cookie-consent" class="cookie-banner">
  <p>We gebruiken cookies om uw ervaring te verbeteren. <a href="/privacy">Meer info</a></p>
  <button id="accept-cookies">Accepteren</button>
  <button id="reject-cookies">Weigeren</button>
</div>
```

2. **Consent Management**
```typescript
// src/lib/consent.ts
export interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export function saveConsent(prefs: ConsentPreferences): void {
  localStorage.setItem('cookie-consent', JSON.stringify(prefs));
}

export function getConsent(): ConsentPreferences | null {
  const stored = localStorage.getItem('cookie-consent');
  return stored ? JSON.parse(stored) : null;
}
```

### Privacy Policy

**Must include:**
- Welke data wordt verzameld
- Waarom data wordt verzameld
- Hoe lang data wordt bewaard
- Met wie data wordt gedeeld
- Rechten van gebruikers (inzage, correctie, verwijdering)
- Contact gegevens Data Protection Officer

**Template**: `/docs/legal/privacy-policy-template.md`

### Data Processing Agreement (DPA)

Voor B2B klanten die CRM gebruiken:
- DPA template beschikbaar op aanvraag
- Subprocessors lijst (Cloudflare, analytics providers)
- Data retention policies

## Security Checklist

### Development
- [ ] No hardcoded secrets in code
- [ ] Environment variables voor API keys
- [ ] .env files in .gitignore
- [ ] Dependencies up-to-date (npm audit)

### Build
- [ ] Source maps disabled in production
- [ ] Console logs removed/disabled
- [ ] Error messages niet te verbose

### Deployment
- [ ] HTTPS enforced (Cloudflare automatic)
- [ ] Security headers configured
- [ ] Rate limiting op API endpoints
- [ ] DDoS protection (Cloudflare)

### Monitoring
- [ ] Security alerts configured
- [ ] Dependency vulnerability scanning (Dependabot)
- [ ] Regular security audits
- [ ] Incident response plan documented

## Incident Response

### Severity Levels

**Critical**: Data breach, site down, security vulnerability exploited
**High**: Partial outage, performance degradation, potential vulnerability
**Medium**: Minor bugs, UX issues
**Low**: Cosmetic issues, feature requests

### Response Procedure

1. **Detect**: Monitoring alerts, user reports
2. **Assess**: Determine severity and impact
3. **Contain**: Stop the bleeding (disable feature, rollback)
4. **Investigate**: Root cause analysis
5. **Remediate**: Fix the issue
6. **Communicate**: Notify stakeholders
7. **Document**: Post-mortem report

### Contacts

- **Security Lead**: [email]
- **DevOps**: [email]
- **Legal**: [email]
- **Cloudflare Support**: Via dashboard

## Compliance Certifications

### Targets
- [ ] SOC 2 Type II (voor enterprise klanten)
- [ ] ISO 27001 (information security)
- [ ] GDPR compliance (EU)
- [ ] CCPA compliance (California)

### Audit Schedule
- **Quarterly**: Internal security review
- **Annually**: External penetration test
- **Continuous**: Automated vulnerability scanning
