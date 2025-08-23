---
name: Release
about: Create a new release
title: 'Release: vX.Y.Z'
labels: 'release'
assignees: ''
---

## Release Information

**Version:** vX.Y.Z
**Release Type:** [ ] patch [ ] minor [ ] major [ ] prerelease
**NPM Tag:** [ ] latest [ ] alpha [ ] beta [ ] rc

## What's Changed

<!-- Describe the key changes in this release -->

### ✨ New Features

-

### 🐛 Bug Fixes

-

### 📚 Documentation

-

### 🔧 Internal/Technical

-

## Breaking Changes

<!-- List any breaking changes. If none, write "None" -->

None

## Migration Guide

<!-- If there are breaking changes, provide migration instructions -->

No migration needed.

## Checklist

**Before Creating PR:**

- [ ] Version bumped in `package.json`
- [ ] Tests pass locally (`npm test`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Dependencies updated if needed

**Before Merging:**

- [ ] CI checks pass
- [ ] Code review completed
- [ ] Release notes are complete
- [ ] Version number is correct

**After Merging:**

- [ ] GitHub release will be created automatically
- [ ] NPM package will be published automatically
- [ ] Release notes will be generated from this PR

## Testing Instructions

<!-- How can reviewers test this release? -->

1. Install the package: `npm install quick-route-address-finder@vX.Y.Z`
2. Test basic functionality:
   ```javascript
   import { addressFinder } from 'quick-route-address-finder';
   // Test your key use cases
   ```

## Additional Notes

<!-- Any additional context, screenshots, or information -->

---

**🚀 This PR will automatically trigger a release when merged!**
