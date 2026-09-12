import { defineConfig } from 'vitest/config';
import { projectRootPath } from '../scripts/project-root-path.mjs';

/**
 * The Vitest project for the repository-level scripts under `scripts/`.
 *
 * Separate from `vitest.config.mts` on purpose: `test` runs across the Node
 * compatibility matrix, while a script that only ever runs in a workflow needs
 * the Node `volta.node` names (`Temporal`, in `mature-updates.mts`). So these
 * run from `test:scripts`, on that Node alone.
 */
export default defineConfig({
  test: {
    dir: projectRootPath,
    globals: true,
    environment: 'node',
    include: ['scripts/**/*.test.mts'],
    passWithNoTests: true,
  },
});
