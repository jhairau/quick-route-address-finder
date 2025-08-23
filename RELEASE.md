# Release Process

This document describes how to release new versions of the `quick-route-address-finder` package.

## Prerequisites

Before releasing, ensure you have:

1. **NPM Account**: Access to publish to the `quick-route-address-finder` package
2. **NPM Token**: Set up `NPM_TOKEN` secret in GitHub repository settings
3. **GitHub Permissions**: Write access to create releases and tags

## Setting up NPM Token

1. Create an NPM access token:

   ```bash
   npm login
   npm token create --type=automation
   ```

2. Add the token to GitHub Secrets:
   - Go to repository Settings → Secrets and variables → Actions
   - Add new secret: `NPM_TOKEN` with your token value

## Release Methods

### Method 1: Automatic Release (Recommended)

1. **Prepare your changes**:

   ```bash
   # Make sure all changes are committed
   git status

   # Run local checks
   npm run release patch  # or minor, major
   ```

2. **Review and commit version bump**:

   ```bash
   git add package.json package-lock.json
   git commit -m "chore: bump version to X.Y.Z"
   ```

3. **Create and push tag**:

   ```bash
   git tag vX.Y.Z
   git push origin main
   git push origin vX.Y.Z
   ```

4. **Automatic workflow**:
   - GitHub Actions will automatically:
     - Run tests and build
     - Create GitHub release
     - Publish to NPM
     - Generate changelog

### Method 2: Manual GitHub Workflow

1. Go to GitHub Actions → "Manual Release"
2. Click "Run workflow"
3. Fill in the form:
   - **Version**: `1.2.3` (without 'v' prefix)
   - **Release Type**: patch/minor/major/prerelease
   - **Prerelease Tag**: alpha/beta/rc (optional)
   - **Dry Run**: Check this to test without publishing

4. The workflow will:
   - Update package.json
   - Create and push tag
   - Create GitHub release
   - Publish to NPM

### Method 3: Local Release Script

Use the built-in release helper:

```bash
# Patch version (1.0.0 → 1.0.1)
npm run release patch

# Minor version (1.0.0 → 1.1.0)
npm run release minor

# Major version (1.0.0 → 2.0.0)
npm run release major

# Prerelease version (1.0.0 → 1.0.1-0)
npm run release prerelease
```

The script will:

- Run all tests and checks
- Bump version in package.json
- Show you the next steps

## Release Types

### Semantic Versioning

- **Patch** (`1.0.0 → 1.0.1`): Bug fixes, documentation updates
- **Minor** (`1.0.0 → 1.1.0`): New features (backwards compatible)
- **Major** (`1.0.0 → 2.0.0`): Breaking changes

### Prerelease Versions

- **Alpha** (`1.0.0-alpha.1`): Early development, unstable
- **Beta** (`1.0.0-beta.1`): Feature complete, testing phase
- **RC** (`1.0.0-rc.1`): Release candidate, nearly ready

## NPM Distribution Tags

- **latest**: Stable releases (default install)
- **alpha**: Alpha prereleases (`npm install package@alpha`)
- **beta**: Beta prereleases (`npm install package@beta`)
- **next**: Release candidates (`npm install package@next`)

## Workflow Details

### Automatic Release Workflow (`.github/workflows/release.yml`)

Triggers on: Git tag push (`v*`)

Steps:

1. **Test**: Run full test suite
2. **Release**: Create GitHub release with changelog
3. **Publish**: Publish to NPM with appropriate tag
4. **Notify**: Summary of release status

### Manual Release Workflow (`.github/workflows/manual-release.yml`)

Triggers: Manual dispatch from GitHub UI

Features:

- Interactive form for version/type selection
- Dry run mode for testing
- Automatic version bumping
- Tag creation and pushing

## Troubleshooting

### NPM Publish Fails

1. **Check NPM Token**: Ensure `NPM_TOKEN` secret is set correctly
2. **Check Package Name**: Verify the package name isn't taken
3. **Check Version**: Ensure version doesn't already exist

### GitHub Release Fails

1. **Check Permissions**: Ensure workflow has `contents: write` permission
2. **Check Tag Format**: Tags must start with 'v' (e.g., `v1.0.0`)

### Build Fails

1. **Check Dependencies**: Ensure all dependencies are properly listed
2. **Check TypeScript**: Verify TypeScript configuration
3. **Check Tests**: Ensure all tests pass locally

## Best Practices

1. **Always test before releasing**: Run the full test suite
2. **Use semantic versioning**: Follow semver principles
3. **Write good commit messages**: Use conventional commits
4. **Update documentation**: Keep README and docs current
5. **Use prerelease for testing**: Test alpha/beta versions before stable
6. **Review before releasing**: Check the generated changelog

## Release Checklist

- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation is updated
- [ ] CHANGELOG updated (if manual)
- [ ] Version follows semantic versioning
- [ ] NPM token is valid
- [ ] GitHub permissions are correct

## Examples

### Patch Release

```bash
npm run release patch
git add package.json package-lock.json
git commit -m "chore: bump version to 1.0.1"
git tag v1.0.1
git push origin main && git push origin v1.0.1
```

### Beta Release

Use the manual workflow with:

- Version: `1.1.0-beta.1`
- Release Type: `prerelease`
- Prerelease Tag: `beta`

### Major Release

```bash
npm run release major
# Review breaking changes
git add package.json package-lock.json
git commit -m "chore: bump version to 2.0.0

BREAKING CHANGE: Updated API interface"
git tag v2.0.0
git push origin main && git push origin v2.0.0
```
