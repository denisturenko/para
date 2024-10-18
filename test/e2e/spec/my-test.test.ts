import { remote } from 'webdriverio';
import type { Capabilities } from '@wdio/types';

describe('foo', () => {
  it('should bar', async () => {
    const browser = await remote({
      capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: process.env.CI ? ['headless', 'disable-gpu'] : [],
        },
      },
    } as Capabilities.WebdriverIOConfig);

    const turnOn = async (type: 'left' | 'right', controlValue: number) => {
      const $touchBar = browser.$(`div[data-testid="touch-bar-${type}"]`);

      await $touchBar.waitForExist();

      const height = await browser.execute(() => document.querySelector('[data-testid=touch-bar-right]').getBoundingClientRect().height);

      const y = ((height * controlValue) / 100 - height / 2).toFixed(0);

      console.log('***', y);
      await $touchBar.click({ x: 0, y: Number(y) });
    };

    const waitForConditionText = async ($el, cb: (value: string) => boolean, timeout = 50_000) =>
      browser.waitUntil(
        async () => {
          const text = await $el.getText();

          console.log('***', text);

          // return parseFloat(text) > 170;
          return cb(text);
        },
        {
          timeout,
        }
      );

    const changeSpeed = async (speed: number, timeout = 1000, oldSpeed = 1) => {
      await browser.execute((value: number) => window.game.speed.set(value), speed);
      await browser.pause(timeout);
      await browser.execute((value: number) => window.game.speed.set(value), oldSpeed);
    };

    await browser.url('https://192.168.98.19:8080/');

    await browser.execute(() => window.localStorage.setItem('gameSettings', '{"USER_SETTINGS":{"nickName":"John Connor","isAgree":true}}'));

    await browser.refresh();

    const playBtn = browser.$('button[data-testid="btn-play-top-section"]');

    await playBtn.click();

    const $altitude = browser.$('div[data-testid=block-altitude-game-control]');

    await $altitude.waitForExist();

    // await browser.execute(() => window.game.speed.set(10));
    //
    // await browser.pause(2000);
    //
    // await browser.execute(() => window.game.speed.set(1));
    //
    // await browser.waitUntil(
    //   async () => {
    //     const text = await $altitude.getText();
    //
    //     console.log('***', text);
    //
    //     return Math.abs(parseInt(text) - 650) < 2;
    //   },
    //   {
    //     timeout: 50_000,
    //   }
    // );
    //
    // await browser.execute(() => window.game.speed.set(1));

    const $angel = browser.$('div[data-testid=block-angel-game-control]');

    await turnOn('left', 50);
    await waitForConditionText($angel, (val: string) => parseFloat(val) < 190);
    await turnOn('left', 15);
    await waitForConditionText($angel, (val: string) => parseFloat(val) < 180);
    await turnOn('left', 10);

    await changeSpeed(10, 2000);

    await turnOn('right', 50);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 260);
    await turnOn('right', 15);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 270);
    await turnOn('right', 10);

    await changeSpeed(10, 2000);

    await turnOn('right', 50);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 350);
    await turnOn('right', 15);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 0 && parseFloat(val) < 350);
    await turnOn('right', 10);

    await changeSpeed(10, 2000);

    await turnOn('right', 50);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 80);
    await turnOn('right', 15);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 90);
    await turnOn('right', 10);

    await turnOn('left', 43);
    await turnOn('right', 45);
    await turnOn('left', 45);

    await changeSpeed(10, 3000);

    // await browser.execute(() => window.game.speed.set(10));

    const $result = browser.$('[data-testid=modal-body-finish]');

    await $result.waitForExist({ timeout: 30_000 });
    await browser.saveScreenshot('./screenshot.png');

    const result = await $result.getText();

    expect(parseFloat(result) < 50).toBe(true);

    await browser.deleteSession();
  });
});
