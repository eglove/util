import { isNil } from './data';

type BetterNumberProperties = {
  locale: string;
  number: number | bigint;
};

class BetterNumber {
  private _locale: Intl.LocalesArgument;
  private _number?: Omit<number | bigint, 'toLocaleString'>;

  public constructor({ locale, number }: BetterNumberProperties) {
    this._locale = locale;
    this._number = Number.isNaN(Number(number)) ? undefined : number;
  }

  public getLocale(): Intl.LocalesArgument {
    return this._locale;
  }

  public setLocale(value: Intl.LocalesArgument): void {
    this._locale = value;
  }

  public getNumber(): typeof this._number {
    return this._number;
  }

  public setNumber(number: typeof this._number): void {
    this._number = number;
  }

  public format(
    options?:
      | (Intl.NumberFormatOptions & BigIntToLocaleStringOptions)
      | undefined,
  ): string | undefined {
    if (isNil(this._number)) {
      return undefined;
    }

    return Number(this._number).toLocaleString(this._locale, options);
  }
}

export const betterNumber = (
  properties: BetterNumberProperties,
): BetterNumber => {
  return new BetterNumber(properties);
};
