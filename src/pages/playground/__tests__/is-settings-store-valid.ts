import { isSettingsStoreValid } from 'pages/playground/playground.utils';

describe('isSettingsStoreValid', () => {
  it('should be not valid', () => {
    const init = { foo: 90, bar: { zoo: { value: 90 } } };
    const store = { foo: 90, bar: { zoo: 90 } };

    expect(isSettingsStoreValid(init, store)).toBe(false);
  });
  it('should be valid', () => {
    const init = { foo: 90, bar: { zoo: { value: 90 } } };
    const store = { foo: 90, bar: { zoo: { value: 90 } } };

    expect(isSettingsStoreValid(init, store)).toBe(true);
  });
});
