import type { ICustomStorage } from './storage.type';
import { KEYS } from './constants';
import { get, set, reset } from './utils';

export const userStorage = <T>(pageName?: string): ICustomStorage<T> => ({
  get: (defaultValue): T => (pageName ? get(pageName, KEYS.USER_SETTINGS, defaultValue) : defaultValue),
  reset: () => {
    pageName && reset(pageName, KEYS.USER_SETTINGS);
  },
  set: value => (pageName ? set(pageName, KEYS.USER_SETTINGS, value) : undefined),
});
