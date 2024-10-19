import { remote } from 'webdriverio';
import type { Capabilities } from '@wdio/types';

const { BASE_URL = '' } = process.env;

describe('Greeting', () => {
  it('should show greeting first time and skip after submit and page refresh', async () => {
    const browser = await remote({
      capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: process.env.CI ? ['headless', 'disable-gpu'] : [],
        },
      },
    } as Capabilities.WebdriverIOConfig);

    /**
     * Open page and setup localstorage
     */
    await browser.url(BASE_URL + '/');

    await browser.execute(() => window.localStorage.setItem('gameSettings', '{}'));

    await browser.refresh();

    /**
     * Click play button and open greetings
     */
    const $playBtn = browser.$('button[data-testid="btn-play-top-section"]');

    await $playBtn.click();

    const $greetingDrawer = browser.$('*[data-testid=drawer-greetings]');

    await $greetingDrawer.waitForExist();

    /**
     * Submit and checking error block
     */

    const $btnSubmit = browser.$('button[data-testid=submit]');

    await $btnSubmit.click();

    const $errorBlock = browser.$('div[data-testid=alert-error-block]');

    await $errorBlock.waitForExist();

    /**
     * Filling form and submit
     */
    const $input = browser.$('*[data-testid=input-nickName]');

    await $input.setValue('John Connor');

    const $isAgreeCheckbox = browser.$('*[data-testid="switch-isAgree"] + div');

    await $isAgreeCheckbox.click();

    await $btnSubmit.click();

    /**
     * Game block checking
     */

    const $game = browser.$('*[data-testid=canvas-game]');

    await $game.waitForExist();

    /**
     * Reload page, click play and wait for game (skip greetings)
     */

    await browser.refresh();

    await $playBtn.click();

    await $game.waitForExist();

    await browser.deleteSession();
  });
});
