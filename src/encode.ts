export function base64EncodeFromUint8Array(buffer: Uint8Array): string {
  return btoa(String.fromCodePoint(...buffer));
}

export function base64DecodeToUint8Array(data: string): Uint8Array {
  const string = atob(data);
  let array: number[] = [];

  for (let index = 0; index < string.length; index++) {
    const value = string.codePointAt(index);

    if (value !== undefined) {
      array = [...array, value];
    }
  }

  return new Uint8Array(array);
}
