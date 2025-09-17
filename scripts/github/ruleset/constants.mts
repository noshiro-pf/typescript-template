import {
  type CreateRulesetRequest,
  type RepositoryRuleset,
  type UpdateRulesetRequest,
} from 'octokit-safe-types';
import { expectType } from 'ts-data-forge';

const keysToPickBase = [
  'id',
  'name',
  'target',
  'enforcement',
  'bypass_actors',
  'conditions',
  'rules',
] as const satisfies readonly (keyof RepositoryRuleset)[];

const keysToDrop: ReadonlySet<(typeof keysToPickBase)[number]> = new Set(
  [] as const,
);

export const rulesetKeysToPick = keysToPickBase.filter(
  (k) => !keysToDrop.has(k),
);

type KeysToPick = (typeof keysToPickBase)[number];

expectType<keyof UpdateRulesetRequest | 'id', KeysToPick>('=');
expectType<keyof CreateRulesetRequest, keyof UpdateRulesetRequest>('=');
