import { isNil } from './data';

type ObjectType = Record<string, unknown>;

type ComplexIntersection<A, B> = (A & B)[keyof A] & (A & B)[keyof B];

export function isObject(item: unknown): item is ObjectType {
  return !isNil(item) && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge<T extends ObjectType, U extends ObjectType>(
  target: T,
  ...sources: U[]
): T & U {
  const output = { ...target } as Partial<T & U>;

  for (const source of sources) {
    for (const key in source) {
      if (!isNil(source[key])) {
        const value = source[key as keyof typeof source];

        if (isObject(value) && isObject(target[key])) {
          // eslint-disable-next-line functional/immutable-data
          output[key as keyof typeof output] = deepMerge(
            target[key] as ObjectType,
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
