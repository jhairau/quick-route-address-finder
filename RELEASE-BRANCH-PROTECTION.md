# Release Process with Branch Protection

Since your repository has branch protection rules enabled, the release process is slightly different.

## 🔒 **Branch Protection Impact**

Your repository requires:

- ✅ Changes through pull requests
- ✅ Status checks to pass (CI/CD)

This means **direct pushes to `main` are blocked** (which is good security!).

## 🚀 **Updated Release Methods**

### Method 1: Tag-Only Release (Recommended)

Since you can't push to `main` directly, create tags from your current branch:

1. **Create a release branch**:

   ```bash
   git checkout -b release/v0.0.4
   ```

2. **Update version and commit**:

   ```bash
   npm run release patch
   git add package.json package-lock.json
   git commit -m "chore: bump version to 0.0.4"
   git push origin release/v0.0.4
   ```

3. **Create PR to main**:
   - Create PR from `release/v0.0.4` to `main`
   - Wait for CI checks to pass
   - Merge the PR

4. **Create tag from main**:

   ```bash
   git checkout main
   git pull origin main
   git tag v0.0.4
   git push origin v0.0.4
   ```

5. **Automatic release**:
   - Tag push triggers the release workflow
   - Creates GitHub release
   - Publishes to NPM

### Method 2: Manual GitHub Workflow (Updated)

The manual release workflow now works differently:

1. Go to GitHub Actions → "Manual Release"
2. Run with your desired version
3. It will:
   - Create the version commit
   - Create and push **only the tag** (not to main)
   - Trigger the release from the tag

### Method 3: Direct Tag Creation (Quick)

If you don't need to update `package.json` in main:

```bash
git tag v0.0.4
git push origin v0.0.4
```

This triggers the release workflow immediately.

## 📋 **Recommended Workflow**

For clean version management:

```bash
# 1. Create release branch
git checkout -b release/v0.0.4

# 2. Update version
npm run release patch

# 3. Commit changes
git add package.json package-lock.json
git commit -m "chore: bump version to 0.0.4"
git push origin release/v0.0.4

# 4. Create PR and merge to main

# 5. Tag the merged commit
git checkout main
git pull
git tag v0.0.4
git push origin v0.0.4

# 6. Release happens automatically! 🎉
```

## ⚡ **Quick Release (No package.json update)**

If you just want to release the current state:

```bash
git tag v0.0.4
git push origin v0.0.4
```

The tag will trigger the release workflow and publish to NPM with the current `package.json` version.

## 🔄 **Alternative: Disable Branch Protection for Releases**

If you prefer the old workflow, you can:

1. Go to repository Settings → Rules
2. Add an exception for `github-actions[bot]`
3. Or temporarily disable rules for releases

But the PR-based approach is more secure! 🛡️

---

**Your current setup works perfectly with branch protection - just use the tag-only approach!** ✨
