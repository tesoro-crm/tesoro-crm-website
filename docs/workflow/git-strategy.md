## Branching Model

- **Main branch**: always deployable, protected; requires green CI and ≥1 approval.
- **Develop branch**: integration branch for upcoming release; receives feature merges.
- **Feature branches**: `feature/ISSUE-xxx-short-description`; start from `develop`, rebase before PR.
- **Release branches**: `release/v<major>.<minor>.<patch>`; only bug fixes/docs; merge into both `main` and `develop`.
- **Hotfix branches**: `hotfix/v<major>.<minor>.<patch>`; branch from `main`, merge into `main` and `develop`.

## Commit Conventions

- Format `type(scope): short summary`; allowed types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `build`.
- Reference the related issue ID in the commit body.
- Keep commits scoped; avoid unrelated changes.

## Merge Policy

- Rebase onto `develop` prior to merge.
- Use squash merge to maintain clean history.
- Resolve conflicts locally; never merge with unresolved conflicts.

## Release Procedure

1. Cut release branch from `develop`.
2. Run full CI + manual QA; update version metadata/changelog.
3. Merge into `main`; tag `v<major>.<minor>.<patch>`.
4. Back-merge `main` into `develop` after release.

## Environment Alignment

- `main` → production Cloudflare Pages/Workers.
- `develop` → staging environment.
- Feature branches → preview builds for PR validation.
