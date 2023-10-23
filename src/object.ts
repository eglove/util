import { isNil } from './data';

type ObjectType = Record<string, unknown>;

type ComplexIntersection<A, B> = (A & B)[keyof A] & (A & B)[keyof B];

export function isObject(item: unknown): item is ObjectType {
  return !isNil(item) && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge<T, U>(
  target: T,
  ...sources: Array<U | undefined>
): T & U {
  const output = { ...target } as Partial<T & U>;

  for (const source of sources) {
    if (isNil(source)) {
      continue;
    }

    for (const key in source) {
      if (!isNil(source[key])) {
        const value = source[key as keyof typeof source];

        if (isObject(value) && isObject(target[key as unknown as keyof T])) {
          // eslint-disable-next-line functional/immutable-data
          output[key as unknown as keyof T] = deepMerge(
            target[key as unknown as keyof T] as ObjectType,
            value as ObjectType,
          ) as ComplexIntersection<T, U>;
        } else {
          // eslint-disable-next-line functional/immutable-data
          output[key as keyof typeof output] = value as ComplexIntersection<
            T,
            U
          >;
        }
      }
    }
  }

  return output as T & U;
}
