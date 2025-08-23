/**
 * Semantic Release Configuration
 * 
 * Branch Strategy:
 * - main: stable releases (latest tag)
 * - next: alpha/prerelease versions (next tag)
 */

module.exports = {
  branches: [
    // Main branch for stable releases
    'main',
    // Next branch for alpha releases
    {
      name: 'next',
      prerelease: 'alpha'
    }
  ],
  
  plugins: [
    // Analyze commits to determine release type
    '@semantic-release/commit-analyzer',
    
    // Generate release notes
    '@semantic-release/release-notes-generator',
    
    // Generate CHANGELOG.md
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    
    // Update package.json version and publish to NPM
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: 'dist'
      }
    ],
    
    // Create GitHub release
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/*.tgz',
            label: 'Distribution package'
          }
        ]
      }
    ],
    
    // Commit updated files back to repo
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ],
  
  // Preset for conventional commits
  preset: 'angular',
  
  // Release rules for different commit types
  releaseRules: [
    { type: 'feat', release: 'minor' },
    { type: 'fix', release: 'patch' },
    { type: 'perf', release: 'patch' },
    { type: 'revert', release: 'patch' },
    { type: 'docs', release: false },
    { type: 'style', release: false },
    { type: 'chore', release: false },
    { type: 'refactor', release: 'patch' },
    { type: 'test', release: false },
    { type: 'build', release: false },
    { type: 'ci', release: false },
    // Breaking changes always trigger major release
    { breaking: true, release: 'major' }
  ],
  
  // What to include in release notes
  parserOpts: {
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING']
  },
  
  // Writer options for changelog
  writerOpts: {
    commitsSort: ['subject', 'scope']
  }
};
