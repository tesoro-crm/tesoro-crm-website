# Contributing to Tesoro CRM Website

## Git Workflow

We follow a **Git Flow** branching strategy for structured development and releases.

### Branch Structure

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
- Only merges from `develop` or `hotfix/*`
- Every merge = new release
- Protected branch (requires PR + review)

#### 2. **develop**
- Integration branch for development
- Merges from `feature/*` and `bugfix/*`
- Always deployable to staging/preview

#### 3. **feature/***
- New features
- Branch from `develop`
- Merge back to `develop` via PR
- Naming: `feature/EPIC-XXX-short-description` or `feature/STORY-XXX-short-description`

#### 4. **bugfix/***
- Bug fixes (non-critical)
- Branch from `develop`
- Merge back to `develop` via PR
- Naming: `bugfix/ISSUE-XXX-short-description`

#### 5. **hotfix/***
- Critical production fixes
- Branch from `main`
- Merge to `main` AND `develop`
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

We use **Conventional Commits** for clear commit history.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```bash
# Feature commit
git commit -m "feat(pricing): Add 3-tier subscription plans

- Add starter, professional, enterprise tiers
- Include feature comparison table
- Update pricing page design

Closes STORY-123"

# Fix commit
git commit -m "fix(header): Resolve mobile navigation overlap

Fixes header menu not closing on mobile devices.
Root cause: Missing z-index on overlay.

Tested on iOS Safari and Chrome mobile."
```

## Code Style

### TypeScript/JavaScript

- Use TypeScript for all new code
- Strict type checking enabled
- ESLint configuration enforced
- Prettier for code formatting

### CSS/Tailwind

- Utility-first approach with Tailwind
- Custom components in `src/components/ui/`
- Design tokens in `tailwind.config.ts`
- Mobile-first responsive design

### Astro Components

- PascalCase for component files: `Button.astro`
- Props interface for all components
- Accessibility first (ARIA, focus management)
- Performance optimized (lazy loading, etc.)

## Testing

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### Visual Regression
```bash
npm run test:visual
```

### Accessibility
```bash
npm run test:a11y
```

## Documentation

### Code Comments

- Functions: JSDoc comments for complex logic
- Components: Props documentation
- Business logic: Explain "why" not just "what"

### Documentation Updates

- Update README.md for new features
- Update component docs for API changes
- Update deployment docs for infrastructure changes

## Pull Request Process

### Before Creating PR

- [ ] Branch up-to-date with develop
- [ ] All tests passing
- [ ] Code linted and formatted
- [ ] Self-review completed
- [ ] Documentation updated

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility tested

## Screenshots
If UI changes, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests added for new functionality
- [ ] All tests passing
```

## Code Review Guidelines

### For Reviewers

- **Functionality**: Does it work as expected?
- **Code Quality**: Clean, readable, maintainable?
- **Performance**: Any performance implications?
- **Security**: Any security concerns?
- **Testing**: Adequate test coverage?
- **Documentation**: Code and docs updated?

### For Contributors

- Address all review comments
- Don't take feedback personally
- Ask for clarification if needed
- Update PR description with changes

## Getting Help

### Communication Channels

- **Slack**: `#engineering` for technical discussions
- **GitHub Issues**: For bugs and feature requests
- **Documentation**: Check `docs/` folder first

### Escalation

1. Check existing documentation
2. Search GitHub issues
3. Ask in Slack channel
4. Create GitHub issue if needed

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.
