import { remote } from 'webdriverio';
import type { Capabilities } from '@wdio/types';

const { BASE_URL = '' } = process.env;

export default class Page {
  public open = async (path: string) => {
    const browser = await remote({
      capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: process.env.CI ? ['headless', 'disable-gpu'] : [],
        },
      },
    } as Capabilities.WebdriverIOConfig);

    return browser.url(`${BASE_URL}${path}`);
  };
}
