# Tesoro CRM Website

> Captación inteligente voor professionals inmobiliarios

Een moderne, high-performance marketing website gebouwd met Astro, Tailwind CSS en gedeployed op Cloudflare Pages.

## 🚀 Live URLs

- **Preview**: https://preview.tesoro-crm-website.pages.dev
- **Production**: https://tesoro-crm-website.pages.dev

### Pages
- Homepage: `/`
- Pricing: `/pricing`
- Features: `/features`
- Status Dashboard: `/status`

## ✨ Features

### Homepage (9 Secties)
- **Hero**: Gradient background, badge, dual CTAs, trust indicators
- **Stats Bar**: 3.2x meer captaties, 67% tijdsbesparing, €12K extra omzet
- **Social Proof**: 500+ makelaars, partner logos (Funda, Idealista, Kyero, Fotocasa)
- **Features Grid**: Captación Automatizada, MLS Integratie, Compliance Dashboard
- **Testimonials**: 3 klantquotes met namen en bedrijven
- **Demo Section**: Product demo met checklist en CTA
- **FAQ**: 4 veelgestelde vragen met antwoorden
- **Final CTA**: Gradient background met dual buttons
- **Footer**: 4-column layout met links

### Pricing Page (6 Secties)
- **3 Pricing Tiers**: Starter (€99), Professional (€249), Enterprise (custom)
- **4 Add-ons**: Extra MLS, Premium Support, White Label, API Access
- **ROI Calculator**: Teaser met gemiddelde resultaten
- **6 FAQs**: Veelgestelde vragen over prijzen
- **Trust Elements**: 14 dagen gratis, geen creditcard, cancel anytime

### Features Page (7 Secties)
- **4 Feature Categories**: AI Captación, MLS Integraties, Compliance, Team Collaboration
- **12 Integrations**: MLS platforms, email, messaging, automation tools
- **Comparison Matrix**: 8 features vs 2 concurrenten
- **Alternating Layout**: Visuele variatie met left/right sections

### Status Dashboard
- Live project status overzicht
- Interactive drawer met markdown content
- Auto-refresh elke 15 seconden
- Klikbare epics, stories en issues

### Design System
- **4 UI Components**: Button, Card, Input, Badge
- **Design Tokens**: Colors, typography, spacing, shadows
- **Responsive**: Mobile-first met breakpoints
- **Motion**: Smooth transitions en animations

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) v5.14.1
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v3.4.18
- **Typography**: [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- **Markdown**: [marked](https://marked.js.org/) v16.3.0
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com) via Wrangler v4.42.0
- **Language**: TypeScript v5.9.3

## 📦 Project Structure

```
/
├── docs/                      # Documentation
│   ├── design-system/        # Brand kit, components, tokens
│   ├── devops/               # Deployment, git strategy
│   ├── performance/          # Baselines, reports
│   ├── security/             # Compliance, GDPR
│   └── analytics/            # Setup, integration
├── project-tracker/          # Project management
│   ├── epics/               # Epic breakdown
│   ├── workflows/           # AI agent workflows
│   └── templates/           # Issue/story templates
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   └── ui/              # UI components (Button, Card, Input, Badge)
│   ├── layouts/             # Layout components
│   ├── lib/                 # Utilities (status.ts)
│   ├── pages/               # Routes
│   │   ├── api/            # API endpoints
│   │   ├── index.astro     # Homepage
│   │   └── status.astro    # Status dashboard
│   └── styles/              # Global styles
├── tailwind.config.ts       # Tailwind configuration
├── wrangler.toml           # Cloudflare Pages config
└── package.json            # Dependencies & scripts
```

## 🧞 Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run deploy:preview` | Deploy to preview environment |
| `npm run deploy:production` | Deploy to production |
| `npm run lint` | Run ESLint |

## 🚀 Deployment

### Prerequisites
- Cloudflare account
- Wrangler CLI authenticated (`wrangler login`)

### Deploy to Preview
```bash
npm run deploy:preview
```

### Deploy to Production
```bash
npm run deploy:production
```

## 📊 Performance

- **Build Time**: ~0.9s
- **Bundle Size**: 43KB (13KB gzipped)
- **Pages**: 4 (homepage, pricing, features, status)
- **Lighthouse Score**: Target 95+
- **First Contentful Paint**: Target <1.5s
- **Time to Interactive**: Target <3s

## 🎨 Design System

### Colors
- **Primary**: #003366 (Navy Blue)
- **Secondary**: #D4AF37 (Gold)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Red)

### Typography
- **Display**: Poppins (600, 700)
- **Body**: Inter (400, 500, 600, 700)

### Components
- **Button**: 4 variants (primary, secondary, outline, ghost) × 3 sizes
- **Card**: 4 variants (default, feature, bordered, elevated)
- **Input**: With label, error states, helper text
- **Badge**: 7 color variants × 3 sizes

## 📝 Documentation

Volledige documentatie beschikbaar in `/docs`:
- [Brand Kit](docs/design-system/brand-kit.md)
- [Components](docs/design-system/components.md)
- [Responsive Design](docs/design-system/responsive.md)
- [Motion Guidelines](docs/design-system/motion.md)
- [Deployment Guide](docs/devops/deployment.md)
- [Git Strategy](docs/devops/git-strategy.md)

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run build` to verify
4. Create a pull request
5. Deploy to preview for review

## 📄 License

Proprietary - Tesoro CRM © 2025

## 🔗 Links

- **Blueprint**: [tesoro-crm-website-blueprint.md](tesoro-crm-website-blueprint.md)
- **Project Tracker**: [project-tracker/README.md](project-tracker/README.md)
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **Astro Docs**: https://docs.astro.build/
- **Tailwind Docs**: https://tailwindcss.com/docs
