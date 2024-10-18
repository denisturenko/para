import { dynamicValue, getResultVectorLength, mapValueToPercentage } from '../math';
import * as THREE from 'three';

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

describe('dynamicValue', () => {
  const matrix = [
    [70, 10 * 1000, 0.25],
    [80, 8 * 1000, 1],
    [90, 5 * 1000, 2],
    [95, 2 * 1000, 3],
    [100, 2 * 1000, 75],
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

    [83, 3, 18 * 1000, 5],

    [96, 2, 19 * 1000, 5],

    [40, 5, 20 * 1000, 5],

    [96, 2, 21 * 1000, 2],
    [96, 2, 22 * 1000, 2],
    [96, 2, 23 * 1000, 7.25],
    [96, 2, 24 * 1000, 7.478_260_869_565_217],
    [96, 2, 25 * 1000, 7.727_272_727_272_727_5],

    [40, 5, 26 * 1000, 5],

    [100, 0.1, 27 * 1000, 0.1],
    [100, 0.1, 28 * 1000, 0.1],
    [100, 0.1, 29 * 1000, 6.85],
    [100, 0.1, 30 * 1000, 7.082_758_620_689_654_4],
    [100, 0.1, 31 * 1000, 7.332_142_857_142_857],
    [100, 0.1, 32 * 1000, 7.6],
    [100, 0.1, 33 * 1000, 7.6],
    [100, 0.1, 34 * 1000, 7.6],

    [40, 5, 35 * 1000, 5],
  ])('dynamicValue(matrix)(%s,%s,%s)=%s', (min, max, param, expected) => {
    expect(Number(fn(min, max, param))).toBe(expected);
  });
});

describe('getResultVectorLength', () => {
  it('should calculate #1', () => {
    const a = new THREE.Vector3(10, 0, 10);
    const b = new THREE.Vector3(20, 0, 10);

    expect(getResultVectorLength(a, b)).toBe(10);
  });
  it('should calculate #2', () => {
    const a = new THREE.Vector3(10, 0, 10);
    const b = new THREE.Vector3(20, 0, 20);

    expect(getResultVectorLength(a, b)).toBe(14.142_135_623_730_951);
  });
});
