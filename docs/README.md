# Tesoro CRM - Documentation Hub

**Central documentation index for all project information**

---

## 🚀 Quick Start

### For New Team Members
1. **[Getting Started](development/setup.md)** - Set up your development environment
2. **[Product Overview](product/product-specs.md)** - Understand what we're building
3. **[Brand Guidelines](product/brand-identity.md)** - Learn our brand and voice
4. **[Architecture Overview](../CLAUDE.md)** - Technical architecture and patterns

### For Developers
1. **[Development Setup](development/setup.md)** - Local environment configuration
2. **[Git Workflow](workflow/git-strategy.md)** - Branching strategy and process
3. **[Code Standards](../CLAUDE.md)** - Coding conventions and best practices
4. **[Deployment Guide](workflow/deployment.md)** - How to deploy changes

### For Designers
1. **[Design System Overview](design-system/overview.md)** - Complete design system
2. **[Brand Identity](product/brand-identity.md)** - Colors, typography, voice
3. **[Component Library](design-system/components.md)** - UI components and usage
4. **[Design Tokens](design-system/tokens.md)** - Technical implementation values

### For Content Creators
1. **[Content Strategy](product/content-strategy.md)** - Overall content approach
2. **[Blog Guidelines](content/blog/ai-guidelines.md)** - Blog writing standards
3. **[Knowledge Base Instructions](content/knowledge-base/ai-instructions.md)** - KB article creation
4. **[SEO Guidelines](operations/seo.md)** - Search optimization standards

---

## 📁 Documentation Structure

### 🎯 [Product](product/)
Core product information and strategy
- **[Product Specifications](product/product-specs.md)** - Features, pricing, positioning
- **[Brand Identity](product/brand-identity.md)** - Complete brand guidelines (Single Source of Truth)
- **[Content Strategy](product/content-strategy.md)** - Marketing content approach

#### [Concepts](product/concepts/)
Design concepts and planning documents
- **[Hero Concepts](product/concepts/hero-concepts.md)** - Homepage hero design ideas
- **[Lead Workflow Design](product/concepts/lead-workflow-design.md)** - User workflow sketches
- **[Website Blueprint](product/concepts/website-blueprint.md)** - Complete website architecture

### 💻 [Development](development/)
Technical setup and development guidelines
- **[Setup Guide](development/setup.md)** - Local development environment
- **[Forms Setup](development/forms-setup.md)** - Form configuration and handling
- **[Deployment Status](development/deployment-status.md)** - Current deployment information

#### [Performance](development/performance/)
Performance monitoring and optimization
- **[Baseline](development/performance/baseline.md)** - Performance benchmarks
- **[Reports](development/performance/performance-reports/)** - Historical performance data

### ⚙️ [Workflow](workflow/)
Process and procedures for development
- **[Git Strategy](workflow/git-strategy.md)** - Branching model and conventions
- **[PR Checklist](workflow/pr-checklist.md)** - Pull request guidelines
- **[Contributing](workflow/contributing.md)** - Contribution guidelines and standards
- **[Deployment Guide](workflow/deployment.md)** - Technical deployment procedures
- **[QA Checklist](workflow/qa-checklist.md)** - Quality assurance procedures

### 🎨 [Design System](design-system/)
Design guidelines and component library
- **[Overview](design-system/overview.md)** - Design system introduction
- **[Components](design-system/components.md)** - UI component library
- **[Typography](design-system/typography.md)** - Font system and text styles
- **[Design Tokens](design-system/design-tokens.md)** - Technical design values
- **[Styling](design-system/styling.md)** - CSS and styling guidelines
- **[Motion Guidelines](design-system/motion.md)** - Animation principles
- **[Responsive Design](design-system/responsive.md)** - Mobile-first guidelines

### ✍️ [Content](content/)
Content creation guidelines and processes

#### [Blog](content/blog/)
- **[AI Guidelines](content/blog/ai-guidelines.md)** - AI-generated blog standards
- **[AI Quick Start](content/blog/ai-quick-start.md)** - Fast blog creation guide
- **[System Overview](content/blog/system-overview.md)** - Blog system architecture
- **[Sections Guide](content/blog/sections-guide.md)** - Blog section types
- **[Images Guide](content/blog/images-guide.md)** - Blog image specifications

#### [Knowledge Base](content/knowledge-base/)
- **[AI Instructions](content/knowledge-base/ai-instructions.md)** - AI-generated KB standards
- **[Writing Guidelines](content/knowledge-base/)** - KB article standards

#### [Copywriting](content/copywriting/)
- Marketing copy guidelines (to be created)
- Tone of voice guides (to be created)

### 🔧 [Operations](operations/)
Operational guidelines and monitoring
- **[Analytics](operations/analytics.md)** - Analytics setup and monitoring
- **[SEO Guidelines](operations/seo.md)** - Search optimization standards
- **[Accessibility](operations/accessibility.md)** - WCAG compliance checklist
- **[Security](operations/security.md)** - Security and compliance guidelines

#### [Cloudflare](operations/cloudflare/)
Cloudflare-specific configurations and features
- **[AI Search](operations/cloudflare/ai-search.md)** - AI search implementation
- **[Stream](operations/cloudflare/stream.md)** - Video streaming setup

### 🔬 [Research](research/)
Market research and competitive analysis
- **[Knowledge Base Research](research/knowledge-base-research.md)** - KB content strategy research
- **[Lessons Learned](research/lessons-learned.md)** - Project insights and learnings

#### [Competitor Analysis](research/competitor-analysis/)
Competitive landscape and market research
- **[Pipedrive Analysis](research/competitor-analysis/pipedrive-analysis.md)** - Pipedrive website analysis
- **[Spain Market Research](research/competitor-analysis/spain-market-research.md)** - Spanish real estate market analysis

### 📋 [Planning](planning/)
Project planning and case studies

#### [Cases](planning/cases/)
Case studies and client examples
- Case study files and analysis

#### [Data](planning/data/)
Raw data files and research materials
- LLM training data and other research files

### 📚 [Archive](archive/)
Legacy documents and outdated files
- **[Brand Info Legacy](archive/brand-info-legacy.md)** - Superseded by product/brand-identity.md
- **[Brand Kit Legacy](archive/brand-kit-legacy.md)** - Superseded by product/brand-identity.md
- **[Typography Legacy](archive/typography-legacy.md)** - Superseded by design-system/typography.md
- **[Tailwind Refactor Plan](archive/tailwind-refactor-plan.md)** - Completed refactor documentation
- **[Tesoro Brand Style Guide](archive/tesoro-brand-style-guide.md)** - Superseded by product/brand-identity.md

---

## 📋 Quick Reference

### Brand Colors
- **Primary Blue**: `#003366` - Hero sections, primary CTAs
- **Primary Accent**: `#4BA3FF` - Hover states, highlights
- **Secondary Gold**: `#F5B400` - Secondary CTAs, badges

### Typography
- **Display**: Poppins (600, 700) - Headings and brand elements
- **Body**: Inter (400, 500, 600) - Body text and UI elements
- **Monospace**: JetBrains Mono (400) - Code snippets

### Key Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run code linting

# Deployment
npm run deploy:preview    # Deploy to preview environment
npm run deploy:production # Deploy to production
```

### Important Links
- **Live Site**: https://tesoro-crm-website.pages.dev
- **Preview Environment**: https://preview.tesoro-crm-website.pages.dev
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **GitHub Repository**: https://github.com/tesoro-crm/tesoro-crm-website

---

## 🔄 Maintenance

### Regular Updates
- **Weekly**: Review and update todo lists in project tracker
- **Monthly**: Audit documentation for outdated information
- **Quarterly**: Comprehensive documentation review and cleanup

### Contributing to Documentation
1. **Before writing**: Check if documentation already exists
2. **Follow structure**: Use the established folder organization
3. **Single source of truth**: Avoid duplicating information
4. **Link references**: Cross-reference related documentation
5. **Update this index**: Add new documents to the appropriate section

### Documentation Standards
- **Language**: English for technical docs, multilingual for content
- **Format**: Markdown with consistent formatting
- **Links**: Use relative paths for internal links
- **Images**: Optimize for web, include alt text
- **Headings**: Use semantic heading hierarchy (H1 → H2 → H3)

---

## ❓ Need Help?

### Can't Find What You're Looking For?
1. **Search**: Use Cmd/Ctrl + F to search this page
2. **Check CLAUDE.md**: Technical architecture and development info
3. **Ask the team**: Create a GitHub issue or ask in Slack
4. **Update docs**: If information is missing, add it and update this index

### Documentation Issues
- **Outdated information**: Create a GitHub issue
- **Missing documentation**: Follow the contribution guidelines above
- **Broken links**: Check the file paths and update accordingly

---

**This documentation hub is maintained by the Tesoro CRM team. Last updated: October 2024**