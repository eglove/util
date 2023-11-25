import { isNil } from './data';

type FormatOptions = Intl.NumberFormatOptions & BigIntToLocaleStringOptions;

type NumberType = Omit<number | bigint, 'toLocaleString'> | undefined;

class BetterNumber {
  private _locale?: Intl.LocalesArgument;
  private _number?: NumberType;
  private readonly _formatOptions?: FormatOptions;

  public constructor(
    number: number,
    locale?: string,
    formatOptions?: FormatOptions,
  ) {
    this._formatOptions = formatOptions;
    this._number =
      isNil(number) || Number.isNaN(Number(number))
        ? undefined
        : Number(number);

    if (isNil(locale) && typeof navigator !== 'undefined') {
      this._locale = navigator.language;
    } else if (!isNil(locale)) {
      this._locale = locale;
    }
  }

  public get locale(): Intl.LocalesArgument {
    return this._locale;
  }

  public setLocale(value: Intl.LocalesArgument): void {
    this._locale = value;
  }

  public get number(): NumberType {
    return this._number;
  }

  public setNumber(number: NumberType): void {
    this._number = number;
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
  number: number,
  locale?: string,
  formatOptions?: FormatOptions,
): BetterNumber => {
  return new BetterNumber(number, locale, formatOptions);
};
