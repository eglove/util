export function isEmpty(value: string): value is '' {
  return value === '';
}

export function isNil<Type>(
  value: Type | null | undefined,
): value is null | undefined {
  return value === null || value === undefined;
}
