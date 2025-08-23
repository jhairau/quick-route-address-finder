# Semantic Release Guide

This project uses [semantic-release](https://semantic-release.gitbook.io/) for automated versioning and publishing.

## Branch Strategy

- **`main`**: Stable releases (published with `@latest` tag)
- **`next`**: Alpha/prerelease versions (published with `@next` tag)

## Commit Message Format

We use [Conventional Commits](https://conventionalcommits.org/) format:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- **feat**: A new feature (triggers **minor** release)
- **fix**: A bug fix (triggers **patch** release)
- **perf**: Performance improvement (triggers **patch** release)
- **refactor**: Code refactoring (triggers **patch** release)
- **revert**: Revert a previous commit (triggers **patch** release)
- **docs**: Documentation changes (no release)
- **style**: Code formatting (no release)
- **test**: Adding tests (no release)
- **chore**: Maintenance tasks (no release)
- **ci**: CI/CD changes (no release)
- **build**: Build system changes (no release)

### Breaking Changes

Add `BREAKING CHANGE:` in the commit footer to trigger a **major** release:

```text
feat: new API endpoint

BREAKING CHANGE: The old endpoint `/v1/search` has been removed.
```

## Making Commits

### Option 1: Interactive Commits (Recommended)

```bash
npm run commit
```

This opens an interactive prompt to help you write conventional commits.

### Option 2: Manual Commits

```bash
git commit -m "feat: add address validation"
git commit -m "fix(api): resolve timeout issue"
git commit -m "docs: update installation guide"
```

## Release Process

### Stable Release (main branch)

1. Ensure your changes are tested and ready
2. Make conventional commits
3. Push to `main` branch:

   ```bash
   git checkout main
   git pull origin main
   git merge your-feature-branch
   git push origin main
   ```

4. 🎉 Semantic-release automatically:
   - Analyzes commits since last release
   - Determines next version number
   - Generates changelog
   - Creates GitHub release
   - Publishes to NPM with `@latest` tag

### Alpha Release (next branch)

1. Push to `next` branch:

   ```bash
   git checkout next
   git merge your-feature-branch
   git push origin next
   ```

2. 🎉 Semantic-release automatically:
   - Creates alpha version (e.g., `1.2.0-alpha.1`)
   - Publishes to NPM with `@next` tag

## Local Testing

Test what semantic-release would do without actually releasing:

```bash
npm run release:dry
```

## Examples

### Version Bumps

Given current version `1.0.0`:

- `fix: resolve bug` → `1.0.1`
- `feat: add new feature` → `1.1.0`
- `feat: major change\n\nBREAKING CHANGE: API changed` → `2.0.0`

### Alpha Releases

On `next` branch with version `1.0.0`:

- `feat: experimental feature` → `1.1.0-alpha.1`
- Another `fix: small bug` → `1.1.0-alpha.2`

## GitHub Actions

The release process runs automatically on:

- Push to `main` → stable release
- Push to `next` → alpha release

Required GitHub secrets:

- `GITHUB_TOKEN`: Automatically provided
- `NPM_TOKEN`: Your NPM authentication token

## Manual Override

If you need to skip CI for a commit:

```bash
git commit -m "docs: update README [skip ci]"
```

This prevents semantic-release from running.
