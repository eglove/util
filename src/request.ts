import { isNil } from './data.ts';

export function getCookieValue(
  cookieName: string,
  requestHeaders: Headers,
): string | null {
  const cookies = requestHeaders.get('Cookie');

  if (isNil(cookies)) {
    return null;
  }

  const cookieArray = cookies.split(';');
  for (const cookie of cookieArray) {
    const [name, value] = cookie.split('=');

    if (name.trim() === cookieName.trim()) {
      return value.trim();
    }
  }

  return null;
}
