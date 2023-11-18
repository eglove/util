import { isEmpty } from './data';

type UrlDetail = {
  pathLabel: string;
  pathUrl: URL;
};

export function urlDetails(url: URL): UrlDetail[] {
  const paths = url.pathname.split('/').filter(item => {
    return !isEmpty(item);
  });

  let words: UrlDetail[] = [];
  const urlBuilder = new URL(url.origin);

  for (const path of paths) {
    const url = `${urlBuilder.toString()}/${path}`;

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
        pathUrl: new URL(url),
      },
    ];
  }

  return words;
}
