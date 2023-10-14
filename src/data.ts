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

export function tryCatch<FunctionType extends () => ReturnType<FunctionType>>(
  function_: FunctionType,
):
  | TryCatchResult<ReturnType<FunctionType>>
  | Promise<TryCatchResult<Awaited<ReturnType<FunctionType>>>> {
  try {
    const data = function_();

    if (data instanceof Promise) {
      return data
        .then(resolved => {
          return { data: resolved, isSuccess: true as const };
        })
        .catch(error => {
          return { error, isSuccess: false as const };
        });
    }

    return { data: function_(), isSuccess: true };
  } catch (error) {
    return { error, isSuccess: false };
  }
}
