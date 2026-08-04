export default {
  branches: ['main'],
  plugins: [
    // 1. Determine the next version number from commit history.
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          // Standard rules
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },

          // Custom rules for BREAKING CHANGE variations
          { breaking: true, release: 'major' },

          // Additional patterns for major version bumps
          { type: 'feat', scope: 'breaking', release: 'major' },
          { type: 'fix', scope: 'breaking', release: 'major' },
          { type: 'refactor', scope: 'breaking', release: 'major' },

          // Custom notes patterns that should trigger major release
          { type: '*', notes: { breaking: true }, release: 'major' },
        ],
        parserOpts: {
          noteKeywords: [
            'BREAKING CHANGE',
            'BREAKING CHANGES', // Allow plural
            'BREAKING-CHANGE', // Allow hyphen
            'BREAKING_CHANGE', // Allow underscore
          ],
        },
      },
    ],

    // 2. Generate release notes content (text).
    '@semantic-release/release-notes-generator',

    // 3. Write the release notes content generated in step 2 to the Changelog file.
    '@semantic-release/changelog',

    // 4. Run prettier and build before committing.
    [
      '@semantic-release/exec',
      { prepareCmd: 'pnpm run fmt && pnpm run build && pnpm run test' },
    ],

    // 4-a. Update the version field in package.json with the next version number.
    //
    // NOTE: npmPublish: false にしている。このリポジトリはテンプレートで、
    // release workflow も `--dry-run` 固定のため npm へ publish する運用になっていない。
    //
    // npmPublish: true のままだと verifyConditions が npm 認証を要求する。
    // npm 側にこのパッケージの trusted publisher が構成されていないため OIDC の
    // token exchange が 404 になり、NPM_TOKEN も無いため "No npm token specified." で落ちる。
    { path: '@semantic-release/npm', npmPublish: false },

    // 5. Commit the changes of assets generated during the release flow to the repository.
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'pnpm-lock.yaml'],
        message:
          // eslint-disable-next-line no-template-curly-in-string
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],

    // 6. Create a GitHub Release using the release notes content generated in step 2.
    '@semantic-release/github',
  ],
};
