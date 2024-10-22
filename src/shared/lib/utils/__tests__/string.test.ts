import { extractIndex } from '../string';

describe('extractIndex', () => {
  it.each([
    ['path[0]', 0],
    ['path[10]', 10],
    ['path[11]foo[10]', 10],
    ['winds[10].minHeight', 10],
  ])('extractIndex(%s)=%s', (param, expected) => {
    expect(Number(extractIndex(String(param)))).toBe(expected);
  });
});
