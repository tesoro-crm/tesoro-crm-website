# Deployment Guide

## Cloudflare Pages Deployment

### Prerequisites
- Cloudflare account with Pages access
- Wrangler CLI installed (`npm install wrangler --save-dev`)
- GitHub repository linked to Cloudflare Pages

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

**Automatic via GitHub Actions:**
- Push to `main` → staging deployment
- Tag with `v*` → production deployment

**Manual via Wrangler:**
```bash
# Staging
npm run deploy:staging

# Production
npm run deploy:production
```

### First-time Setup

1. Authenticate Wrangler:
```bash
npx wrangler login
```

2. Create Pages project:
```bash
npx wrangler pages project create tesoro-crm-website
```

3. Deploy:
```bash
npm run deploy:staging
```

### Environment Variables

Configure secrets via Cloudflare Dashboard or Wrangler:
```bash
wrangler pages secret put API_KEY --env production
```

### Monitoring

- **Dashboard**: https://dash.cloudflare.com/
- **Analytics**: Built-in Cloudflare Web Analytics
- **Logs**: `wrangler pages deployment tail`

### Rollback

In case of issues:
```bash
# List deployments
wrangler pages deployment list

# Rollback to specific deployment
wrangler pages deployment rollback <deployment-id>
```
