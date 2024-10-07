import { isSettingsStoreValid } from 'pages/playground/playground.utils';

describe('isSettingsStoreValid', () => {
  it('should be not valid # 1', () => {
    const init = { foo: 90, bar: { zoo: { value: 90 } } };
    const store = { foo: 90, bar: { zoo: 90 } };

    expect(isSettingsStoreValid(init, store)).toBe(false);
  });
  it('should be not valid # 2', () => {
    const init = { foo: 90, bar: { zoo: { value: 90 } }, zoo: '' };
    const store = { foo: 90, bar: { zoo: 90 } };

    expect(isSettingsStoreValid(init, store)).toBe(false);
  });
  it('should be not valid #3', () => {
    const init = {
      beep: {
        volume: 1,
        heightFor3: { enable: true, value: 350 },
        heightFor2: { enable: true, value: 200 },
        heightFor1: { enable: true, value: 150 },
        heightForLong: { enable: true, value: 110 },
      },
      canopy: { verticalSpeed: 5, maxSpeed: 10, minSpeed: 1, inertiaFactor: 3 },
      currentTargetId: '1',
      helpers: { isVisibleCircles: true, isVisibleCross: true, isVisibleShadow: true, isVisibleTrack: true, allowToggleReleasing: false },
      playerPositionHeight: 800,
      winds: [{ minHeight: 0, angel: 6.021_385_919_380_437, speed: 2, hasGusts: false }],
    };
    const store = {
      beep: {
        volume: 1,
        heightFor3: { enable: true, value: 350 },
        heightFor2: { enable: true, value: 200 },
        heightFor1: { enable: true, value: 150 },
        heightForLong: { enable: true, value: 110 },
      },
      canopy: { verticalSpeed: 5, maxSpeed: 10, minSpeed: 1, inertiaFactor: 3 },
      currentTargetId: '3',
      helpers: { isVisibleCircles: true, isVisibleCross: true, isVisibleShadow: true, isVisibleTrack: true, allowToggleReleasing: false },
      playerPositionHeight: 800,
      winds: [{ minHeight: 0, angel: 6.021_385_919_380_437, speed: 2, hasGusts: false }],
    };

    expect(isSettingsStoreValid(init, store)).toBe(true);
  });
  it('should be valid #1', () => {
    const init = { foo: 90, bar: { zoo: { value: 90 } } };
    const store = { foo: 90, bar: { zoo: { value: 90 } } };

    expect(isSettingsStoreValid(init, store)).toBe(true);
  });
});
