# Tesoro CRM - Documentation

**Essential knowledge to build, deploy, and maintain the website.**

---

## 🚀 Quick Start

**For new developers:**
1. [Development Setup](development/setup.md) - Get your local environment running
2. [Brand Identity](product/brand-identity.md) - Brand colors, typography, voice
3. [Product Specs](product/product-specs.md) - Features, pricing, positioning
4. [Deployment Guide](workflow/deployment.md) - Deploy to production

**For technical reference:**
- See `../CLAUDE.md` for complete technical architecture and development guidelines

---

## 📁 Essential Documentation

### 🎯 Product
Core brand and product information (Single Source of Truth)
- **[Brand Identity](product/brand-identity.md)** - Brand colors, typography, voice guidelines
- **[Product Specifications](product/product-specs.md)** - Features, pricing, target audience

### 💻 Development
Critical setup and configuration
- **[Development Setup](development/setup.md)** - Local environment configuration
- **[Forms Setup](development/forms-setup.md)** - ⚠️ **CRITICAL**: Secret Store ID, Turnstile keys, Mailgun config

### 🎨 Design System
Technical design implementation
- **[Components](design-system/components.md)** - UI component library reference
- **[Design Tokens](design-system/design-tokens.md)** - Technical values (colors, spacing, typography)

### ⚙️ Workflow & Operations
- **[Deployment](workflow/deployment.md)** - Deployment procedures and Cloudflare setup
- **[Cloudflare AI Search](operations/cloudflare/ai-search.md)** - AI search configuration

---

## 📋 Quick Reference

### Brand Colors
```css
--primary-blue: #003366     /* Hero sections, primary CTAs */
--primary-accent: #4BA3FF   /* Hover states, highlights */
--secondary-gold: #F5B400   /* Secondary CTAs, badges */
```

### Key Commands
```bash
# Development
npm run dev                   # Start local server (localhost:4321)
npm run build                 # Build for production
npm run validate:i18n         # Validate translations
npm run validate:buttons      # Validate button usage

# Deployment
npm run deploy:preview        # Deploy to preview environment
npm run deploy:production     # Deploy to production (includes validation)
```

### Important Links
- **Production**: https://new.tesorohq.io/
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Forms Secret Store ID**: `f232fb5497684c778c9082dab1308c64`

---

## 🎯 Documentation Philosophy

**This documentation contains ONLY critical knowledge:**
- Information needed to build/deploy the site
- Configuration that can't be easily reconstructed
- Brand guidelines to maintain consistency

**Everything else lives in:**
- `CLAUDE.md` - Technical architecture, coding standards, workflows
- Source code - Component patterns, implementation details
- AI assistance - Content guidelines, best practices

---

## ❓ Can't Find Something?

1. **Check CLAUDE.md** - Most technical info is there
2. **Check source code** - Implementation details in components
3. **Ask AI** - For content guidelines, best practices
4. **If truly critical** - Add it to this documentation

**Rule of thumb:** If losing this information would prevent us from building, deploying, or maintaining the site, it belongs here. Everything else can be regenerated.

---

**Last updated: October 2024**
