import { describe, expect, it } from 'vitest';

import { betterNumber } from '../src/better-number';

describe('BetterNumber', () => {
  it('should format correctly', () => {
    const englishUs = betterNumber(1000, 'en-US', {
      style: 'unit',
      unit: 'inch',
    });

    expect(englishUs.number).toBe(1000);
    expect(englishUs.locale).toBe('en-US');
    expect(englishUs.format()).toBe('1,000 in');

    const portugueseBrazil = betterNumber(1000, 'pt-BR', {
      style: 'unit',
      unit: 'inch',
    });

    expect(portugueseBrazil.locale).toBe('pt-BR');
    expect(portugueseBrazil.format()).toBe('1.000 pol.');
  });

  it('should return undefined if number is NaN', () => {
    const length = betterNumber(undefined, 'en-US');

    expect(length.number).toBe(undefined);
    expect(length.format()).toBe(undefined);
  });

  it('should return undefined when number is null', () => {
    const height = betterNumber(null, 'en-US');

    expect(height.number).toBe(undefined);
    expect(height.format()).toBe(undefined);
  });
});
