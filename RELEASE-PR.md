# PR-Based Release Process

Perfect choice! PR-based releases provide better security, review process, and integration with your branch protection rules.

## 🎯 How It Works

1. **Create release PR** → **Merge to main** → **Automatic release**
2. The workflow detects release PRs by title or branch name
3. Creates GitHub release and publishes to NPM automatically

## 🚀 Quick Start

### Method 1: Automated Release PR Creation (Recommended)

```bash
# Create release PR with one command
npm run release:pr patch    # Creates release/v1.0.1 branch + PR
npm run release:pr minor    # Creates release/v1.1.0 branch + PR
npm run release:pr major    # Creates release/v2.0.0 branch + PR
```

This will:
✅ Bump version in package.json  
✅ Create `release/vX.Y.Z` branch  
✅ Commit version change  
✅ Push branch to GitHub  
✅ Show PR creation instructions

### Method 2: Manual Release PR Creation

```bash
# 1. Create release branch
git checkout -b release/v0.0.4

# 2. Update version
npm version patch --no-git-tag-version

# 3. Commit and push
git add package.json package-lock.json
git commit -m "chore: bump version to 0.0.4"
git push origin release/v0.0.4

# 4. Create PR via GitHub UI
```

## 📋 PR Requirements

### PR Title Formats (any of these work):

- `Release: v1.0.0`
- `release: v1.0.0`
- `Release v1.0.0`
- `release v1.0.0`

### Branch Name Formats (any of these work):

- `release/v1.0.0`
- `release/1.0.0`

### What Happens When You Merge:

1. **Workflow detects** release PR by title/branch
2. **Validates** version in package.json matches PR
3. **Runs final checks** (lint, test, build)
4. **Creates git tag** (v1.0.0)
5. **Creates GitHub release** with changelog
6. **Publishes to NPM** with correct tag

## 🏷️ Release Types

### Stable Releases

- **Title**: `Release: v1.0.0`
- **NPM Tag**: `latest`
- **Install**: `npm install quick-route-address-finder`

### Prerelease Versions

- **Alpha**: `Release: v1.0.0-alpha.1` → NPM tag `alpha`
- **Beta**: `Release: v1.0.0-beta.1` → NPM tag `beta`
- **RC**: `Release: v1.0.0-rc.1` → NPM tag `rc`

Install prereleases:

```bash
npm install quick-route-address-finder@alpha
npm install quick-route-address-finder@beta
npm install quick-route-address-finder@rc
```

## 📝 PR Template

When creating release PRs, use the release template:

- Go to GitHub → New Pull Request
- Select "Release" template
- Fill out the sections

The template includes:

- ✨ What's changed
- 🐛 Bug fixes
- 📚 Documentation updates
- 🔧 Internal changes
- ⚠️ Breaking changes
- 📋 Pre-merge checklist

## 🔍 Review Process

### Before Creating PR:

- [ ] Tests pass (`npm test`)
- [ ] Build works (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Version bumped correctly

### Before Merging:

- [ ] CI checks green ✅
- [ ] Code review approved 👍
- [ ] Release notes complete 📝
- [ ] Version number correct 🔢

### After Merging:

- [ ] Tag created automatically 🏷️
- [ ] GitHub release published 📦
- [ ] NPM package published 🚀

## 🎉 Example Workflow

```bash
# 1. Start from main branch
git checkout main
git pull origin main

# 2. Create release PR
npm run release:pr minor

# 3. Script output shows:
✅ Branch: release/v1.1.0
✅ Version: 1.1.0
✅ Type: minor
🔗 Create PR: https://github.com/your-repo/compare/main...release/v1.1.0

# 4. Create PR on GitHub with title "Release: v1.1.0"

# 5. Wait for CI checks ✅

# 6. Get review and merge

# 7. Automatic release happens! 🎉
```

## 🔧 Advanced Usage

### Hotfix Releases

```bash
# Create from main
git checkout main
npm run release:pr patch

# Emergency patch - skip some checks if needed
git checkout release/v1.0.1
# Make hotfix
git commit -m "fix: critical bug"
git push
# Merge PR
```

### Prerelease Workflow

```bash
# Create alpha
git checkout -b release/v2.0.0-alpha.1
npm version prerelease --preid=alpha --no-git-tag-version
git add package.json && git commit -m "chore: bump to 2.0.0-alpha.1"
git push origin release/v2.0.0-alpha.1

# PR title: "Release: v2.0.0-alpha.1"
# Merging publishes to NPM with "alpha" tag
```

## 🛡️ Security Benefits

- ✅ **All releases reviewed** via PR process
- ✅ **CI checks required** before release
- ✅ **Branch protection** enforced
- ✅ **Audit trail** via PR comments
- ✅ **Rollback capability** via git history

## 🎯 Best Practices

1. **Always create from main** for clean history
2. **Use semantic versioning** (patch/minor/major)
3. **Write good release notes** in PR description
4. **Test locally** before creating PR
5. **Get reviews** even for simple releases
6. **Monitor release** after merging

---

**Your PR-based release system is now ready! 🚀**

Just run `npm run release:pr patch` to get started!
