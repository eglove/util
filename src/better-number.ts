import { isNil } from './data';
import { isBigIntOrNumber } from './number';

type FormatOptions = Intl.NumberFormatOptions & BigIntToLocaleStringOptions;

type NumberType = Omit<number | bigint, 'toLocaleString'> | undefined;

class BetterNumber {
  private readonly _locale?: Intl.LocalesArgument;
  private readonly _number?: NumberType;
  private readonly _formatOptions?: FormatOptions;

  public constructor(
    number: unknown,
    locale?: string,
    formatOptions?: FormatOptions,
  ) {
    this._formatOptions = formatOptions;

    if (typeof number === 'bigint' || typeof number === 'number') {
      this._number = number;
    } else if (typeof number === 'string' && isBigIntOrNumber(number)) {
      this._number =
        Number(number) > Number.MAX_SAFE_INTEGER
          ? BigInt(number)
          : Number(number);
    }

    if (isNil(locale) && typeof navigator !== 'undefined') {
      this._locale = navigator.language;
    } else if (!isNil(locale)) {
      this._locale = locale;
    }
  }

  public get locale(): Intl.LocalesArgument {
    return this._locale;
  }

  public get number(): NumberType {
    return this._number;
  }

  public format(options?: FormatOptions): string | undefined {
    if (isNil(this._number)) {
      return undefined;
    }

    return Number(this._number).toLocaleString(
      this._locale,
      options ?? this._formatOptions,
    );
  }
}

export const betterNumber = (
  number: unknown,
  locale?: string,
  formatOptions?: FormatOptions,
): BetterNumber => {
  return new BetterNumber(number, locale, formatOptions);
};
