# typescript-template

<!--
[![npm version](https://img.shields.io/npm/v/typescript-template.svg)](https://www.npmjs.com/package/typescript-template)
[![npm downloads](https://img.shields.io/npm/dm/typescript-template.svg)](https://www.npmjs.com/package/typescript-template)
[![License](https://img.shields.io/npm/l/typescript-template.svg)](./LICENSE)
[![codecov](https://codecov.io/gh/noshiro-pf/typescript-template/branch/main/graph/badge.svg?token=********)](https://codecov.io/gh/noshiro-pf/typescript-template)
 -->

Template Repository for TypeScript

## Key Features

- 🛡️ Strict ESLint setup via [eslint-config-typed](https://github.com/noshiro-pf/eslint-config-typed), with `jiti` enabling a TypeScript `eslint.config.mts`.
- 📝 Built-in spelling and formatting checks with cspell / markdownlint / Prettier.
- 🧪 Vitest for unit testing with coverage; workflows included to upload results to [codecov.io](https://about.codecov.io/).
- 🔄 CI runs lint / type-check / test, enforces no post-Prettier diffs, and sends coverage to Codecov.
- 🏗️ `build` generates per-directory `index.mts`, removes unused runtime code with Rollup, and runs type checking.
- 🚀 [semantic-release](https://github.com/semantic-release/semantic-release) triggers on merges to `main`, handling versioning, changelog updates, npm publish, and GitHub Releases.
- 📚 [TypeDoc](https://typedoc.org/index.html) generates docs and auto-deploys them to GitHub Pages.
- 📦 `pnpm` provides strict dependency management (`pnpm-lock.yaml` included).
- 📦 Dependabot auto-creates PRs for npm dependencies and GitHub Actions updates.
- 🔐 [github-settings-as-code](https://github.com/noshiro-pf/github-settings-as-code) tracks repository settings and rulesets as code, detecting changes via diffs.
- 🔄 `AGENTS.md` is shared via submodule to sync operational rules across repositories.

<!--
## Documentation

- API reference: <https://noshiro-pf.github.io/typescript-template/>
-->

## Local Setup

```sh
git clone https://github.com/{owner}/{repo}.git
git submodule update --init --recursive
pnpm i
```

- Rename the part that says "typescript-template".
- Remove `--dry-run` from `.github/workflows/release.yml`
- Update README.md
- Run `pnpm run check-all` and fix errors if exist.

## GitHub Setup

1. Copy `.env.example` to `.env` and set Personal Access Token with `repo` access.
2. Run `pnpm run gh:apply-all` to update GitHub Repository Settings.
3. Set Actions secrets on the GUI settings page (<https://github.com/{owner}/{repo}/settings/secrets/actions>).
    - `SEMANTIC_RELEASE_BOT_PRIVATE_KEY`
        - <https://github.com/apps/noshiro-semantic-release-bot> -> App settings -> Generate a private key
        - Required for `@semantic-release/git` to perform a git commit to the main branch
    - `PERSONAL_ACCESS_TOKEN`
        - The same value as `1.`
        - Required for `.github/workflows/backup-repository-settings.yml` to run
4. Set Dependabot secrets on the GUI settings page (<https://github.com/{owner}/{repo}/settings/secrets/dependabot>).
    - `DEPENDABOT_AUTO_MERGE_BOT_PRIVATE_KEY`
        - <https://github.com/apps/noshiro-dependabot-auto-merge-bot> -> App settings -> Generate a private key
    - `PERSONAL_ACCESS_TOKEN`
        - The same value as `1.`
        - Required for `.github/workflows/backup-repository-settings.yml` to run
5. Go to [Pages](https://github.com/{owner}/{repo}/settings/pages) and change Build and deployment > Source to be "Github Actions".
