import { calculateVerticalSpeedDuringLanding } from '../player.utils';

const currentSpeed = 6;
const minSpeed = 0;

describe('calculateVerticalSpeedDuringLanding', () => {
  it.each([
    [0, 0, 6],
    [20, 20, 5.6],
    [40, 40, 5.2],
    [50, 50, 5],
    [60, 60, 4],
    [70, 70, 3],
    [80, 80, 2],
    [90, 90, 1],
    [100, 100, 0],
  ])('calculateVerticalSpeedDuringLanding(%s, %s)=%s', (leftControlValue, rightControlValue, expected) => {
    expect(Number(calculateVerticalSpeedDuringLanding({ leftControlValue, rightControlValue, minSpeed, currentSpeed }))).toBe(expected);
  });
});
