#!/usr/bin/env node

/**
 * Release Branch Helper
 * Creates a release branch with proper versioning and pushes it
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
    const output = execSync(command, { encoding: 'utf8' });
    console.log(`✅ ${description} completed`);
    return output.trim();
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

  const command = `npm version ${type} --no-git-tag-version`;
  execCommand(command, `Bumping ${type} version`);

  const newVersion = getCurrentVersion();
  console.log(`🎉 New version: ${newVersion}`);
  return newVersion;
}

function createReleaseBranch(version) {
  const branchName = `release/${version}`;

  try {
    execCommand(
      `git checkout -b ${branchName}`,
      `Creating release branch: ${branchName}`
    );
    return branchName;
  } catch (error) {
    // Branch might already exist, try to switch to it
    try {
      execCommand(
        `git checkout ${branchName}`,
        `Switching to existing branch: ${branchName}`
      );
      return branchName;
    } catch (switchError) {
      console.error('❌ Could not create or switch to release branch');
      process.exit(1);
    }
  }
}

function commitAndPush(version, branchName) {
  execCommand(
    'git add package.json package-lock.json',
    'Staging version files'
  );
  execCommand(
    `git commit -m "chore: release ${version}"`,
    'Committing release'
  );
  execCommand(
    `git push -u origin ${branchName}`,
    `Pushing ${branchName} to remote`
  );
}

function main() {
  const args = process.argv.slice(2);
  const releaseType = args[0] || 'patch';

  console.log('🚀 Release Branch Helper');
  console.log('========================');

  // Validate release type
  const validTypes = [
    'patch',
    'minor',
    'major',
    'prerelease',
    'prepatch',
    'preminor',
    'premajor',
  ];
  if (!validTypes.includes(releaseType)) {
    console.error(`❌ Invalid release type: ${releaseType}`);
    console.error(`Valid types: ${validTypes.join(', ')}`);
    process.exit(1);
  }

  try {
    // Check if we're on main branch
    const currentBranch = execCommand(
      'git rev-parse --abbrev-ref HEAD',
      'Checking current branch'
    );
    if (currentBranch !== 'main') {
      console.warn(`⚠️  You're on branch '${currentBranch}', not 'main'`);
      console.warn(
        'Consider switching to main first: git checkout main && git pull'
      );
    }

    // Check for uncommitted changes
    const status = execCommand('git status --porcelain', 'Checking git status');
    if (status.trim()) {
      console.warn('⚠️  You have uncommitted changes:');
      console.log(status);
      console.log('Consider committing or stashing them first.');
      process.exit(1);
    }

    // Pull latest changes if on main
    if (currentBranch === 'main') {
      execCommand('git pull origin main', 'Pulling latest changes from main');
    }

    // Run tests and checks
    execCommand('npm run lint', 'Running linter');
    execCommand('npm test', 'Running tests');
    execCommand('npm run build', 'Building package');

    // Bump version
    const newVersion = bumpVersion(releaseType);

    // Create release branch
    const branchName = createReleaseBranch(newVersion);

    // Commit and push
    commitAndPush(newVersion, branchName);

    // Show success message
    console.log('\n� Release Branch Created Successfully!');
    console.log('======================================');
    console.log(`✅ Branch: ${branchName}`);
    console.log(`✅ Version: ${newVersion}`);
    console.log(`✅ Type: ${releaseType}`);
    console.log('');
    console.log('� What happens next:');
    console.log('1. Push to release branch triggers automatic workflow');
    console.log('2. Workflow runs tests and creates GitHub release');
    console.log('3. Package is published to NPM automatically');
    console.log('4. Release branch is cleaned up');
    console.log('');
    console.log(
      '🌐 View workflow: https://github.com/jhairau/quick-route-address-finder/actions'
    );
    console.log(
      `📦 Release will be available at: https://github.com/jhairau/quick-route-address-finder/releases/tag/v${newVersion}`
    );
  } catch (error) {
    console.error('❌ Release branch creation failed:', error.message);
    process.exit(1);
  }
}

// Show usage if no args provided
if (process.argv.length === 2) {
  console.log('Usage: npm run release:branch [patch|minor|major|prerelease]');
  console.log('');
  console.log('This will:');
  console.log('1. Bump the version in package.json');
  console.log('2. Create a release/X.Y.Z branch');
  console.log('3. Commit the version bump');
  console.log('4. Push the branch to GitHub');
  console.log('5. Trigger automatic release workflow');
  console.log('');
  console.log('Examples:');
  console.log('  npm run release:branch patch     # 0.0.3 -> 0.0.4');
  console.log('  npm run release:branch minor     # 0.0.3 -> 0.1.0');
  console.log('  npm run release:branch major     # 0.0.3 -> 1.0.0');
  console.log('  npm run release:branch prerelease # 0.0.3 -> 0.0.4-0');
  process.exit(0);
}

main();
