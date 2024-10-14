import { dynamicValue, mapValueToPercentage } from '../math';

describe('extractIndex', () => {
  it.each([
    [0, 100, 0, 0],
    [0, 100, 25, 0.25],
    [0, 100, 50, 0.5],
    [0, 100, 75, 0.75],
    [0, 100, 100, 1],

    [100, 200, 100, 0],
    [100, 200, 125, 0.25],
    [100, 200, 150, 0.5],
    [100, 200, 175, 0.75],
    [100, 200, 200, 1],

    [17_000, 19_000, 18_000, 0.5],
  ])('mapValueToPercentage(%s,%s,%s)=%s', (min, max, param, expected) => {
    expect(Number(mapValueToPercentage(min, max, param))).toBe(expected);
  });
});

describe.skip('dynamicValue', () => {
  const matrix = [
    [70, 10 * 1000, 0.25],
    [80, 8 * 1000, 2],
    [90, 5 * 1000, 3],
    [95, 2 * 1000, 4],
    [100, 2 * 1000, 5],
  ];
  const fn = dynamicValue(matrix);

  it.each([
    [71, 4, 0, 4],
    [72, 4, 2 * 1000, 4],
    [72, 4, 9 * 1000, 4],
    [72, 4, 10 * 1000, 4],
    [72, 4, 11 * 1000, 4],
    [72, 4, 12 * 1000, 4.4],
    [72, 4, 13 * 1000, 4.5],
    [72, 4, 14 * 1000, 4.666_666_666_666_667],
    [72, 4, 15 * 1000, 5],
    [72, 4, 16 * 1000, 5],
    [72, 4, 17 * 1000, 5],

    [83, 5, 18 * 1000, 5],
  ])('dynamicValue(matrix)(%s,%s,%s)=%s', (min, max, param, expected) => {
    expect(Number(fn(min, max, param))).toBe(expected);
  });
});
