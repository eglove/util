import { describe, expect, it } from 'vitest';

import { urlDetails } from '../src/string';

describe('string', () => {
  it('should return path details for a url', () => {
    const url = new URL('one/two/three-four-five', 'https://example.com');

    const details = urlDetails(url);

    expect(details).toEqual([
      {
        pathLabel: 'One',
        pathUrl: new URL('https://example.com/one'),
      },
      {
        pathLabel: 'Two',
        pathUrl: new URL('https://example.com/one/two'),
      },
      {
        pathLabel: 'Three Four Five',
        pathUrl: new URL('https://example.com/one/two/three-four-five'),
      },
    ]);
  });
});
