import type { ICustomStorage } from './storage.type';
import { KEYS } from './constants';
import { get, set, reset } from './utils';

/**
 * Helper for working with setting
 */
export const settingsStorage = <T>(pageName?: string): ICustomStorage<T> => ({
  get: (defaultValue): T => (pageName ? get(pageName, KEYS.SETTINGS, defaultValue) : defaultValue),
  reset: () => {
    pageName && reset(pageName, KEYS.SETTINGS);
  },
  set: value => (pageName ? set(pageName, KEYS.SETTINGS, value) : undefined),
});
