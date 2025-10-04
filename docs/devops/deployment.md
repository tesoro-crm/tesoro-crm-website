# Deployment Guide

## Cloudflare Pages Deployment

### Prerequisites
- Cloudflare account met Pages toegang
- Wrangler CLI geïnstalleerd (`npm install wrangler --save-dev`)
- GitHub repository gekoppeld aan Cloudflare Pages

### Configuration

**wrangler.toml:**
```toml
name = "tesoro-crm-website"
compatibility_date = "2025-01-01"
pages_build_output_dir = "./dist"

[env.staging]
name = "tesoro-crm-website-staging"

[env.production]
name = "tesoro-crm-website-production"
```

### Deployment Flow

**Automatisch via GitHub Actions:**
- Push naar `main` → staging deployment
- Tag met `v*` → production deployment

**Handmatig via Wrangler:**
```bash
# Staging
npm run deploy:staging

# Production
npm run deploy:production
```

### First-time Setup

1. Authenticeer Wrangler:
```bash
npx wrangler login
```

2. Maak Pages project aan:
```bash
npx wrangler pages project create tesoro-crm-website
```

3. Deploy:
```bash
npm run deploy:staging
```

### Environment Variables

Configureer secrets via Cloudflare Dashboard of Wrangler:
```bash
wrangler pages secret put API_KEY --env production
```

### Monitoring

- **Dashboard**: https://dash.cloudflare.com/
- **Analytics**: Ingebouwde Cloudflare Web Analytics
- **Logs**: `wrangler pages deployment tail`

### Rollback

Bij problemen:
```bash
# Lijst deployments
wrangler pages deployment list

# Rollback naar specifieke deployment
wrangler pages deployment rollback <deployment-id>
```
