export function isEmpty(value: unknown): boolean {
  if (isNil(value)) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0;
    }

    return Object.keys(value as object).length === 0;
  }

  return true;
}

export function isNil<Type>(
  value: Type | null | undefined,
): value is null | undefined {
  return value === null || value === undefined;
}

type TryCatchResult<Type> =
  | { data: Type; isSuccess: true }
  | { error: unknown; isSuccess: false };

export function tryCatch<T extends () => ReturnType<T>>(
  function_: T,
): TryCatchResult<ReturnType<T>> {
  try {
    return { data: function_(), isSuccess: true };
  } catch (error) {
    return { error, isSuccess: false };
  }
}

export async function tryCatchAsync<
  T extends () => Promise<Awaited<ReturnType<T>>>,
>(function_: T): Promise<TryCatchResult<Awaited<ReturnType<T>>>> {
  try {
    const data = await function_();
    return { data, isSuccess: true };
  } catch (error) {
    return { error, isSuccess: false };
  }
}
