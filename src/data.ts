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
