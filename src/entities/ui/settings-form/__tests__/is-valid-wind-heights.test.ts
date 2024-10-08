import { isValidWindHeights } from '../settings-form.utils';

const arr = [
  { minHeight: 0, angel: 345, speed: 2, hasGusts: false },
  { minHeight: 100, angel: 345, speed: 2, hasGusts: false },
  { minHeight: 100, angel: 345, speed: 2, hasGusts: false },
];

const arr2 = [
  { minHeight: 0, angel: 345, speed: 2, hasGusts: false },
  { minHeight: 100, angel: 345, speed: 2, hasGusts: false },
  { minHeight: 90, angel: 345, speed: 2, hasGusts: false },
];

describe('isValidWindHeights', () => {
  it('should return true', () => {
    expect(isValidWindHeights(arr, 0)).toBe(true);
    expect(isValidWindHeights(arr, 1)).toBe(true);
  });
  it('should return false #1', () => {
    expect(isValidWindHeights(arr, 2)).toBe(false);
    expect(isValidWindHeights(arr2, 2)).toBe(false);
  });
});
