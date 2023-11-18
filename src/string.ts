import { isEmpty } from './data';

export function urlToCapitalizedWords(url: URL): string[] {
  const paths = url.pathname.split('/').filter(item => {
    return !isEmpty(item);
  });

  let words: string[] = [];

  for (const path of paths) {
    words = [
      ...words,
      path
        .split(/\W/g)
        .map(word => {
          return `${word.charAt(0).toUpperCase()}${word
            .slice(1)
            .toLowerCase()}`;
        })
        .join(' '),
    ];
  }

  return words;
}
