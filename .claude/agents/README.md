# Tesoro CRM - Claude Agent Workflows

This directory contains GitHub Actions workflows for automated code review using Claude Code.

## 🤖 Available Workflows

### 1. [claude-code-review-optimized.yml](claude-code-review-optimized.yml)
**Comprehensive Code Review for All PRs**

**Triggers:**
- All non-draft PRs (except dependabot)
- Analyzes PR scope and adjusts review focus accordingly

**Focus Areas:**
- ✅ Astro v5.14.1 architecture and best practices
- ✅ Design system compliance and brand guidelines
- ✅ Multilingual implementation (es/en/nl)
- ✅ Content management and JSON schema validation
- ✅ Product-specific logic and accuracy
- ✅ Performance, accessibility, and security

**Smart Scope Detection:**
- Documentation-only changes
- Content-only changes (blog/KB)
- Design system modifications
- Component updates
- Configuration changes

---

### 2. [design-review.yml](design-review.yml)
**Specialized Design & UI Review**

**Triggers:**
- PRs affecting components, styles, layouts, or design system
- Paths: `src/components/**`, `src/styles/**`, `tailwind.config.ts`

**Focus Areas:**
- ✅ Brand compliance (colors, typography, spacing)
- ✅ Component library consistency
- ✅ Responsive design and accessibility
- ✅ Design token usage
- ✅ Performance optimization
- ✅ Visual quality assessment

**Design Quality Checklist:**
- Visual hierarchy and white space
- Interaction patterns and user flows
- Technical implementation quality
- Cross-browser compatibility

---

### 3. [content-review.yml](content-review.yml)
**Content Quality & Brand Compliance**

**Triggers:**
- PRs affecting content, documentation, or page copy
- Paths: `src/content/**`, `docs/**/*.md`, page templates

**Focus Areas:**
- ✅ Brand voice and messaging consistency
- ✅ Product information accuracy
- ✅ Content structure and quality
- ✅ Multilingual implementation
- ✅ SEO optimization
- ✅ User experience and value

**Content Types:**
- Blog posts (AI-generated or manual)
- Knowledge base articles
- Documentation updates
- Marketing page copy
- Author data and metadata

---

## 🎯 Workflow Benefits

### Intelligent Scope Detection
Each workflow analyzes changed files to determine review focus:
- **Documentation changes** → Lighter review focusing on accuracy
- **Design changes** → Deep design system compliance check
- **Content changes** → Brand voice and quality validation
- **Full features** → Comprehensive review across all areas

### Tesoro-Specific Guidelines
All workflows reference your organized documentation:
- **Brand identity**: `docs/product/brand-identity.md`
- **Product specs**: `docs/product/product-specs.md`
- **Design system**: `docs/design-system/overview.md`
- **Content guidelines**: `docs/content/blog/ai-guidelines.md`
- **Architecture**: `CLAUDE.md`

### Performance Optimized
- Skips draft PRs and dependency updates
- Targeted reviews based on file changes
- Progress tracking for transparency
- Efficient tool usage

## 🔧 Setup Instructions

### 1. Prerequisites
```bash
# Ensure GitHub Actions enabled in repository
# Add Claude Code OAuth token to repository secrets
```

### 2. Add Secret
Go to **Repository Settings** → **Secrets and variables** → **Actions**

Add secret:
- **Name**: `CLAUDE_CODE_OAUTH_TOKEN`
- **Value**: Your Claude Code OAuth token

### 3. Enable Workflows
Move desired workflow files to `.github/workflows/`:

```bash
# For comprehensive review (recommended)
cp .claude/agents/claude-code-review-optimized.yml .github/workflows/

# For specialized design reviews
cp .claude/agents/design-review.yml .github/workflows/

# For content quality reviews  
cp .claude/agents/content-review.yml .github/workflows/
```

### 4. Customize (Optional)
Edit workflow files to adjust:
- Trigger conditions
- Review focus areas
- Model selection
- Tool permissions

## 📊 Workflow Comparison

| Feature | Comprehensive | Design | Content |
|---------|---------------|---------|---------|
| **Scope** | All changes | UI/Design | Content/Copy |
| **Depth** | Full review | Design-focused | Quality-focused |
| **Speed** | Thorough | Fast | Fast |
| **Best For** | Feature PRs | Component updates | Blog/docs |

## 🎨 Review Quality

### What Makes These Workflows Special

**1. Context-Aware**
- Understands Tesoro CRM's specific needs
- References your actual documentation
- Adapts review depth to change scope

**2. Brand-Focused**
- Validates against your brand guidelines
- Checks product information accuracy
- Ensures consistent messaging

**3. Quality-Driven**
- Comprehensive accessibility checks
- Performance optimization review
- Security best practices validation

**4. Educational**
- Teaches team your conventions
- References specific documentation
- Provides constructive feedback

## 🚀 Getting Started

**Recommended Setup:**
1. Start with `claude-code-review-optimized.yml` for comprehensive coverage
2. Add `design-review.yml` if you have frequent UI changes
3. Add `content-review.yml` for content-heavy projects

**Test Run:**
1. Create a small test PR
2. Observe review quality and feedback
3. Adjust workflows based on team needs
4. Roll out to all PRs

## 📚 References

- **[Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)**
- **[GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)**
- **[Tesoro CRM Documentation Hub](../docs/README.md)**

---

**These workflows are specifically designed for Tesoro CRM and leverage your organized documentation structure for maximum effectiveness.**