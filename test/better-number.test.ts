import { describe, expect, it } from 'vitest';

import { betterNumber } from '../src/better-number';

describe('BetterNumber', () => {
  it('should return undefined if number is NaN', () => {
    const length = betterNumber({
      locale: 'en-US',
      // @ts-expect-error allow bad params
      number: undefined,
    });

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
});
