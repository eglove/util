import { describe, expect, it } from 'vitest';

import { betterNumber } from '../src/better-number';

describe('BetterNumber', () => {
  it('should return undefined if number is NaN', () => {
    // @ts-expect-error allow bad param
    const length = betterNumber(undefined, 'en-US');

    expect(length.number).toBe(undefined);
    expect(length.format()).toBe(undefined);

    length.setNumber(1000);

    expect(length.number).toBe(1000);
    expect(length.locale).toBe('en-US');
    expect(length.format()).toBe('1,000');

    length.setLocale('pt-BR');

    expect(length.locale).toBe('pt-BR');
    expect(length.format()).toBe('1.000');
  });

  it('should return undefined when number is null', () => {
    // @ts-expect-error allow bad param
    const height = betterNumber(null, 'en-US');

    expect(height.number).toBe(undefined);
  });
});
