#!/usr/bin/env node

/**
 * Release Helper Script
 * Helps prepare releases locally before pushing to GitHub
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(__dirname, '..', 'package.json');

function execCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

function getCurrentVersion() {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
}

function bumpVersion(type = 'patch') {
  console.log(`📦 Current version: ${getCurrentVersion()}`);
  
  // Use npm version to bump
  const command = `npm version ${type} --no-git-tag-version`;
  execCommand(command, `Bumping ${type} version`);
  
  const newVersion = getCurrentVersion();
  console.log(`🎉 New version: ${newVersion}`);
  return newVersion;
}

function main() {
  const args = process.argv.slice(2);
  const releaseType = args[0] || 'patch';
  
  console.log('🚀 Release Helper');
  console.log('================');
  
  // Validate release type
  const validTypes = ['patch', 'minor', 'major', 'prerelease', 'prepatch', 'preminor', 'premajor'];
  if (!validTypes.includes(releaseType)) {
    console.error(`❌ Invalid release type: ${releaseType}`);
    console.error(`Valid types: ${validTypes.join(', ')}`);
    process.exit(1);
  }
  
  try {
    // Check git status
    execCommand('git status --porcelain', 'Checking git status');
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.warn('⚠️  You have uncommitted changes. Consider committing them first.');
      console.log('Uncommitted changes:');
      console.log(status);
    }
    
    // Run tests and build
    execCommand('npm run lint', 'Running linter');
    execCommand('npm test', 'Running tests');
    execCommand('npm run build', 'Building package');
    
    // Bump version
    const newVersion = bumpVersion(releaseType);
    
    // Show next steps
    console.log('\n🎯 Next Steps:');
    console.log('==============');
    console.log('1. Review the changes:');
    console.log('   git diff');
    console.log('');
    console.log('2. Commit the version bump:');
    console.log(`   git add package.json package-lock.json`);
    console.log(`   git commit -m "chore: bump version to ${newVersion}"`);
    console.log('');
    console.log('3. Create and push tag:');
    console.log(`   git tag v${newVersion}`);
    console.log(`   git push origin main`);
    console.log(`   git push origin v${newVersion}`);
    console.log('');
    console.log('4. Or use the manual release workflow in GitHub Actions');
    console.log('');
    console.log('The tag push will automatically trigger the release workflow! 🚀');
    
  } catch (error) {
    console.error('❌ Release preparation failed:', error.message);
    process.exit(1);
  }
}

// Show usage if no args provided
if (process.argv.length === 2) {
  console.log('Usage: npm run release [patch|minor|major|prerelease]');
  console.log('');
  console.log('Examples:');
  console.log('  npm run release patch     # 1.0.0 -> 1.0.1');
  console.log('  npm run release minor     # 1.0.0 -> 1.1.0');
  console.log('  npm run release major     # 1.0.0 -> 2.0.0');
  console.log('  npm run release prerelease # 1.0.0 -> 1.0.1-0');
  process.exit(0);
}

main();
