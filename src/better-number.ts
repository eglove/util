import { isNil } from './data';

type FormatOptions = Intl.NumberFormatOptions & BigIntToLocaleStringOptions;

type BetterNumberProperties = {
  formatOptions?: FormatOptions;
  locale: string;
  number: unknown;
};

type NumberType = Omit<number | bigint, 'toLocaleString'> | undefined;

class BetterNumber {
  private _locale: Intl.LocalesArgument;
  private _number?: NumberType;
  private readonly _formatOptions?: FormatOptions;

  public constructor({
    formatOptions,
    locale,
    number,
  }: BetterNumberProperties) {
    this._formatOptions = formatOptions;
    this._locale = locale;
    this._number = Number.isNaN(Number(number)) ? undefined : Number(number);
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
  properties: BetterNumberProperties,
): BetterNumber => {
  return new BetterNumber(properties);
};
