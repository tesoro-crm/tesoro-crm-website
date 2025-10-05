# Contributing to Tesoro CRM Website

## Git Workflow

We volgen een **Git Flow** branching strategie voor gestructureerde development en releases.

### Branch Structuur

```
main (production)
  └── develop (integration)
      ├── feature/EPIC-XXX-feature-name
      ├── feature/STORY-XXX-story-name
      ├── bugfix/ISSUE-XXX-bug-description
      └── hotfix/critical-fix-description
```

### Branch Types

#### 1. **main**
- Production-ready code
- Alleen merges van `develop` of `hotfix/*`
- Elke merge = nieuwe release
- Protected branch (requires PR + review)

#### 2. **develop**
- Integration branch voor development
- Merges van `feature/*` en `bugfix/*`
- Altijd deployable naar staging/preview

#### 3. **feature/***
- Nieuwe features
- Branch van `develop`
- Merge terug naar `develop` via PR
- Naming: `feature/EPIC-XXX-short-description` of `feature/STORY-XXX-short-description`

#### 4. **bugfix/***
- Bug fixes (non-critical)
- Branch van `develop`
- Merge terug naar `develop` via PR
- Naming: `bugfix/ISSUE-XXX-short-description`

#### 5. **hotfix/***
- Critical production fixes
- Branch van `main`
- Merge naar `main` EN `develop`
- Naming: `hotfix/critical-issue-description`

## Workflow Steps

### Starting New Feature

```bash
# Update develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/EPIC-004-pricing-page

# Work on feature
git add .
git commit -m "feat: Add pricing tiers"

# Push to remote
git push origin feature/EPIC-004-pricing-page
```

### Completing Feature

```bash
# Update from develop
git checkout develop
git pull origin develop

# Merge develop into feature (resolve conflicts)
git checkout feature/EPIC-004-pricing-page
git merge develop

# Create Pull Request
# - Title: "feat: Add pricing page with 3 tiers"
# - Description: Link to EPIC-004, list changes
# - Assign reviewers
# - Link to deployment preview

# After approval, merge to develop
git checkout develop
git merge --no-ff feature/EPIC-004-pricing-page
git push origin develop

# Delete feature branch
git branch -d feature/EPIC-004-pricing-page
git push origin --delete feature/EPIC-004-pricing-page
```

### Creating Release

```bash
# Ensure develop is stable
git checkout develop
npm run build
npm run test

# Merge to main
git checkout main
git merge --no-ff develop
git tag -a v1.0.0 -m "Release v1.0.0: Initial MVP"
git push origin main --tags

# Deploy to production
npm run deploy:production
```

### Hotfix Workflow

```bash
# Branch from main
git checkout main
git checkout -b hotfix/critical-security-fix

# Fix and test
git add .
git commit -m "fix: Patch security vulnerability"

# Merge to main
git checkout main
git merge --no-ff hotfix/critical-security-fix
git tag -a v1.0.1 -m "Hotfix v1.0.1: Security patch"

# Merge to develop
git checkout develop
git merge --no-ff hotfix/critical-security-fix

# Push everything
git push origin main develop --tags

# Delete hotfix branch
git branch -d hotfix/critical-security-fix
```

## Commit Message Convention

We gebruiken **Conventional Commits** voor duidelijke commit history.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: Nieuwe feature
- **fix**: Bug fix
- **docs**: Documentatie wijzigingen
- **style**: Code formatting (geen functionaliteit wijziging)
- **refactor**: Code refactoring
- **perf**: Performance verbetering
- **test**: Tests toevoegen/wijzigen
- **chore**: Build process, dependencies

### Examples

```bash
# Feature
git commit -m "feat(pricing): Add enterprise tier with custom pricing"

# Bug fix
git commit -m "fix(header): Resolve mobile menu toggle issue"

# Documentation
git commit -m "docs(readme): Update deployment instructions"

# Breaking change
git commit -m "feat(api)!: Change authentication to OAuth2

BREAKING CHANGE: API now requires OAuth2 tokens instead of API keys"
```

## Pull Request Guidelines

### PR Title
- Volg commit message convention
- Duidelijk en beschrijvend
- Voorbeelden:
  - `feat: Add pricing page with 3 tiers`
  - `fix: Resolve navigation menu mobile bug`
  - `docs: Update contributing guidelines`

### PR Description Template

```markdown
## Description
Brief description of changes

## Related Issues
- Closes #123
- Related to EPIC-004

## Changes Made
- Added pricing page with 3 tiers
- Implemented ROI calculator
- Added 6 pricing FAQs

## Testing
- [ ] Local build successful
- [ ] All pages render correctly
- [ ] Mobile responsive
- [ ] Browser tested (Chrome, Firefox, Safari)

## Deployment
Preview URL: https://preview-xyz.tesoro-crm-website.pages.dev

## Screenshots
[Add screenshots if UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested on mobile
```

### Review Process

1. **Self-review**: Review your own PR first
2. **Automated checks**: Ensure build passes
3. **Peer review**: At least 1 approval required
4. **Address feedback**: Make requested changes
5. **Final approval**: Merge when approved

## Code Review Checklist

### Reviewer Responsibilities

- [ ] Code is readable and maintainable
- [ ] No obvious bugs or issues
- [ ] Follows project conventions
- [ ] Tests are adequate
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Mobile responsive (if UI)

## Branch Protection Rules

### main
- Require pull request reviews (1 approval)
- Require status checks to pass
- Require branches to be up to date
- No force pushes
- No deletions

### develop
- Require pull request reviews (1 approval)
- Require status checks to pass
- No force pushes

## Deployment Strategy

### Environments

1. **Development** (feature branches)
   - Auto-deploy to temporary preview URLs
   - For testing individual features

2. **Preview** (develop branch)
   - https://preview.tesoro-crm-website.pages.dev
   - Integration testing environment
   - Deploy on every push to develop

3. **Production** (main branch)
   - https://tesoro-crm-website.pages.dev
   - Deploy only from main
   - Tagged releases only

### Deployment Commands

```bash
# Preview (from develop)
npm run deploy:preview

# Production (from main)
npm run deploy:production
```

## Versioning

We volgen **Semantic Versioning** (SemVer): `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

### Examples

- `1.0.0` - Initial release
- `1.1.0` - Added pricing page
- `1.1.1` - Fixed mobile menu bug
- `2.0.0` - Changed API authentication (breaking)

## Questions?

Check documentation in `/docs` or contact the team.
