import { isNil } from './data.ts';

export function debounce<T extends (...parameters: Parameters<T>) => void>(
  callback: T,
  delay: number,
) {
  let timeoutId: number | undefined;

  return (...parameters: Parameters<T>) => {
    if (!isNil(timeoutId)) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...parameters);
    }, delay);
  };
}
