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
): TryCatchResult<ReturnType<FunctionType>> {
  try {
    return { data: function_(), isSuccess: true };
  } catch (error) {
    return { error, isSuccess: false };
  }
}

export async function tryCatchAsync<
  FunctionType extends () => Promise<ReturnType<FunctionType>>,
>(function_: FunctionType): Promise<TryCatchResult<ReturnType<FunctionType>>> {
  try {
    return { data: await function_(), isSuccess: true };
  } catch (error) {
    return { error, isSuccess: false };
  }
}
