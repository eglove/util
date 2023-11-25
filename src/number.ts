export function isBigIntOrNumber(value: unknown): boolean {
  if (typeof value === 'number' || typeof value === 'bigint') {
    return true;
  }

  if (typeof value === 'string') {
    return /^-?\d+$/.test(value);
  }

  return false;
}
