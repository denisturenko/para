import { remote } from 'webdriverio';
import type { Capabilities } from '@wdio/types';
import fs from 'node:fs';

const { BASE_URL = '' } = process.env;

const resultFilePath = __dirname + '/info.txt';

// fs.writeFileSync(resultFilePath, '[]');

describe('Landing', () => {
  it('should be landed in target', async () => {
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

    await browser.url(BASE_URL + '/');

    await browser.execute(() => window.localStorage.setItem('gameSettings', '{"USER_SETTINGS":{"nickName":"John Connor","isAgree":true}}'));

    await browser.refresh();

    const playBtn = browser.$('button[data-testid="btn-play-top-section"]');

    await playBtn.click();

    const $altitude = browser.$('div[data-testid=block-altitude-game-control]');

    await $altitude.waitForExist();

    await browser.execute(() => window.game.wind.setIgnoreGusts(true));

    const $angel = browser.$('div[data-testid=block-angel-game-control]');

    await turnOn('left', 0);
    await turnOn('right', 0);

    // await changeSpeed(10, 15_000);

    await turnOn('left', 90);
    await waitForConditionText($angel, (val: string) => parseFloat(val) < 105);
    await turnOn('left', 10);
    await waitForConditionText($angel, (val: string) => parseFloat(val) < 90);
    await turnOn('left', 0);

    await changeSpeed(100, 220);

    await turnOn('right', 90);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 165);
    await turnOn('right', 10);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 180);
    await turnOn('right', 0);

    await changeSpeed(100, 320);

    await turnOn('right', 90);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 255);
    await turnOn('right', 10);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 270);
    await turnOn('right', 0);

    await changeSpeed(100, 210);

    await turnOn('right', 50);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 350);
    await turnOn('right', 15);
    await waitForConditionText($angel, (val: string) => parseFloat(val) > 0 && parseFloat(val) < 350);
    await turnOn('right', 10);

    await turnOn('left', 41);
    await turnOn('right', 43);
    await turnOn('left', 43);

    await changeSpeed(100, 350);

    const $result = browser.$('[data-testid=modal-body-finish]');

    await $result.waitForExist({ timeout: 30_000 });
    // await browser.saveScreenshot('./screenshot.png');

    const result = await $result.getText();

    // const results = JSON.parse(fs.readFileSync(resultFilePath, { encoding: 'utf8', flag: 'r' }));
    //
    // results.push(result);
    // fs.writeFileSync(resultFilePath, JSON.stringify(results, null, 2));

    expect(parseFloat(result) < 50).toBe(true);

    await browser.deleteSession();
  });
});
