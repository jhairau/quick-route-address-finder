# Husky Setup Documentation

## What's Configured

Your project now has Husky configured with the following git hooks:

### Pre-commit Hook

Runs before each commit and includes:

- ✅ Node.js engine compatibility check
- ✅ Lint-staged (ESLint + Prettier on staged files only)
- ✅ Jest tests

### Pre-push Hook

Runs before pushing and includes:

- ✅ Test coverage generation
- ✅ Node.js compatibility testing

### Commit Message Hook

Enforces conventional commit format:

- `feat: add new feature`
- `fix: bug fix`
- `docs: documentation update`
- `test: add tests`
- etc.

## Available Commands

```bash
npm run format          # Format all files with Prettier
npm run format:check    # Check if files are formatted
npm run lint           # Lint all files
npm run lint:fix       # Fix linting issues
```

## Testing Hooks

To test the commit hook:

```bash
git add .
git commit -m "test: invalid message format"  # This will fail
git commit -m "test: testing husky setup"     # This will pass
```

Lint-staged will automatically:

- Run ESLint with --fix on staged .ts/.js/.mts files
- Run Prettier on staged .json/.md/.yml/.yaml files
