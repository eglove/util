import { describe, expect, it } from 'vitest';

import { deepMerge } from '../src/object.ts';

describe('object', () => {
  it('should deep merge objects', () => {
    const tsConfig = {
      compilerOptions: { emitDeclarationOnly: false, someOption: true },
    };
    const newObject = {
      compilerOptions: {
        emitDeclarationOnly: true,
      },
      include: ['src'],
    };

    const merged = deepMerge(tsConfig, newObject);
    expect(merged).toStrictEqual({
      compilerOptions: {
        emitDeclarationOnly: true,
        someOption: true,
      },
      include: ['src'],
    });
  });
});
