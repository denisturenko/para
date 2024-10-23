import Page from './page.js';
import { $, browser } from '@wdio/globals';
import { waitForConditionText } from '../utils/wait-for-condition-text';
import { isFinalAngleReach, normalizeAngle } from 'shared/lib/utils';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';

class GamePage extends Page {
  async open() {
    return super.open('/game');
  }

  async waitFor() {
    await this.waitForAltitudeBlock();
  }

  async waitForAltitudeBlock() {
    const $block = $('div[data-testid=block-altitude-game-control]');

    await $block.waitForExist({ timeout: 20_000 });
  }

  async toSettingsIntro() {
    const $el = $('*[data-testid=btn-settings-game-control]');

    await $el.waitForExist();

    await $el.click();
  }

  async toggle(type: 'left' | 'right', controlValue: number) {
    const $touchBar = $(`div[data-testid="touch-bar-${type}"]`);

    await $touchBar.waitForExist();

    const height = await browser.execute(() => document.querySelector('[data-testid=touch-bar-right]').getBoundingClientRect().height);

    const y = ((height * controlValue) / 100 - height / 2).toFixed(0);

    await $touchBar.click({ x: 0, y: Number(y) });
  }

  async changeSpeed(speed: number, timeout = 1000, oldSpeed = 1) {
    await browser.execute((value: number) => window.game.speed.set(value), speed);
    await browser.pause(timeout);
    await browser.execute((value: number) => window.game.speed.set(value), oldSpeed);
  }

  async ignoreGusts() {
    await browser.execute(() => window.game.wind.setIgnoreGusts(true));
  }

  async turnOn(type: 'left' | 'right', finalDegreeOfAngle: number) {
    const $angel = browser.$('div[data-testid=block-angel-game-control]');
    const startAngle = parseFloat(await $angel.getHTML({ includeSelectorTag: false }));

    const isLeft = type === 'left';
    const multi = isLeft ? -1 : 1;
    const preFinal = radToDeg(normalizeAngle(degToRad(finalDegreeOfAngle - multi * 15)));

    await this.toggle(type, 90);
    await waitForConditionText($angel, (val: string) =>
      isFinalAngleReach(type, degToRad(parseFloat(val)), degToRad(startAngle), degToRad(preFinal))
    );
    await this.toggle(type, 10);
    await waitForConditionText($angel, (val: string) =>
      isFinalAngleReach(type, degToRad(parseFloat(val)), degToRad(startAngle), degToRad(finalDegreeOfAngle))
    );
    await this.toggle(type, 0);
  }

  async getResult() {
    const $result = browser.$('[data-testid=modal-body-finish]');

    await $result.waitForExist({ timeout: 30_000 });

    return $result.getText();
  }
}

export const gamePage = new GamePage();
