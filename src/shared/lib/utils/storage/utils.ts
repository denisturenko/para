/**
 * Reading from store
 */
export const get = <T>(storageKey: string, settingsKey: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(storageKey);

    if (!stored) {
      return defaultValue;
    }

    const res = JSON.parse(stored)[settingsKey];

    if (!res) {
      return defaultValue;
    }

    return res;
  } catch (e) {
    console.error(e);

    return defaultValue;
  }
};
/**
 * Writing to store
 */
export const set = <T>(storageKey: string, settingsKey: string, value: T) => {
  let res;

  try {
    const stored = localStorage.getItem(storageKey);

    res = stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error(e);
    res = {};
  }

  res[settingsKey] = value;

  localStorage.setItem(storageKey, JSON.stringify(res));
};

/**
 * Reset to store
 */
export const reset = (storageKey: string, settingsKey: string) => {
  let res;

  try {
    const stored = localStorage.getItem(storageKey);

    res = stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error(e);
    res = {};
  }

  res[settingsKey] = undefined;

  localStorage.setItem(storageKey, JSON.stringify(res));
};
