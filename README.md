# typescript-template

Template Repository for TypeScript

## Local Setup

```sh
git clone https://github.com/{owner}/{repo}.git
git submodule update --init --recursive
pnpm i
```

- Rename the part that says "typescript-template".
- Remove `--dry-run` from `.github/workflows/release.yml`

## Github Setup

1. Copy `.env.example` to `.env` and set Personal Access Token with `repo` access.
2. Run `npm run gh:apply-all` to update GitHub Repository Settings.
3. Set Actions secrets on the GUI settings page (<https://github.com/{owner}/{repo}/settings/secrets/actions>).
    - `NPM_TOKEN`
        - Open <https://www.npmjs.com/settings/{your-user-id}/tokens> -> Generate New Token -> Classic Token -> Select `Automation` and generate.
        - Required for semantic-release to run npm publish
    - `SEMANTIC_RELEASE_GIT_PERMISSION_BOT_PRIVATE_KEY`
        - <https://github.com/apps/semantic-release-git-permission> -> App settings -> Generate a private key
        - Required for `@semantic-release/git` to perform a git commit to the main branch
    - `PERSONAL_ACCESS_TOKEN`
        - The same value as `1.`
        - Required for `.github/workflows/backup-repository-settings.yml` to run
4. Set Dependabot secrets on the GUI settings page (<https://github.com/{owner}/{repo}/settings/secrets/dependabot>).
    - `DEPENDABOT_AUTO_MERGE_BOT_PRIVATE_KEY`
        - <https://github.com/apps/dependabot-auto-merge-permissions> -> App settings -> Generate a private key
    - `PERSONAL_ACCESS_TOKEN`
        - The same value as `1.`
        - Required for `.github/workflows/backup-repository-settings.yml` to run

## Syncing AGENTS.md Updates

1. Update `AGENTS.md` in the common repository (`common-agent-config`)
2. Update the submodule in each project

```bash
git submodule update --remote --merge
git add agents/common
git commit -m "Update AGENTS.md"
```
