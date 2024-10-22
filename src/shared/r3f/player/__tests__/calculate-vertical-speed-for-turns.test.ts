import { calculateVerticalSpeedForTurns } from '../player.utils';

const middleSpeed = 5;
const minSpeed = 0;

describe('calculateVerticalSpeed', () => {
  it.each([
    [0, 0, 5],
    [0, 20, 6],
    [0, 40, 7],
    [0, 60, 8],
    [0, 80, 9],
    [0, 100, 10],
  ])('calculateVerticalSpeedForTurns(%s)=%s', (leftControlValue, rightControlValue, expected) => {
    expect(Number(calculateVerticalSpeedForTurns({ leftControlValue, rightControlValue, minSpeed, middleSpeed }))).toBe(expected);
  });
});
