import { browser } from '@wdio/globals';

export const setUserSettings = async (withUserSettings: boolean) => {
  const userSettings = withUserSettings ? '{"USER_SETTINGS":{"nickName":"John Connor","isAgree":true}}' : '';

  await browser.execute((str: string) => window.localStorage.setItem('global', str), userSettings);
  await browser.refresh();
};
