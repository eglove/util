import { isEmpty } from './data.ts';

type UrlDetail = {
  pathLabel: string;
  pathUrl: URL;
};

export function urlDetails(url: URL): UrlDetail[] {
  const paths = url.pathname.split('/').filter(item => {
    return !isEmpty(item);
  });

  let words: UrlDetail[] = [];
  let seenPaths: string[] = [];
  let urlBuilder = new URL(url.origin);

  for (const path of paths) {
    seenPaths = [...seenPaths, path];
    urlBuilder = new URL(seenPaths.join('/'), url.origin);

    words = [
      ...words,
      {
        pathLabel: path
          .split(/\W/g)
          .map(word => {
            return `${word.charAt(0).toUpperCase()}${word
              .slice(1)
              .toLowerCase()}`;
          })
          .join(' '),
        pathUrl: urlBuilder,
      },
    ];
  }

  return words;
}
