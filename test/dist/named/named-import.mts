// Verifies that the built `dist/` output works through the real
// `package.json` `exports` map via named imports. This file is
// self-contained (no test-library imports) so any TypeScript version in the
// compatibility matrix can type-check it.

import { add } from 'typescript-template';

type TypeEq<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

type ExpectTrue<B extends true> = B;

type _Cases = readonly [
  ExpectTrue<TypeEq<typeof add, (x: number, y: number) => number>>,
];

export type { _Cases };
