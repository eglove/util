export function isEmpty(value: unknown): boolean {
  if (isNil(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'string') {
    return value === '';
  }

  return true;
}

export function isNil<Type>(
  value: Type | null | undefined,
): value is null | undefined {
  return value === null || value === undefined;
}
