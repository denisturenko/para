import Page from './page.js';
import { $, browser } from '@wdio/globals';
import { waitForConditionText } from '../utils/wait-for-condition-text';
import { isFinalAngleReach, normalizeAngle } from 'shared/lib/utils';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';

class SettingsIntroPage extends Page {
  async open() {
    return Promise.reject('Not implemented');
  }

  async waitFor() {
    const $el = $('*[data-testid=drawer-settings-intro]');

    await $el.waitForExist();
  }

  async toResume() {
    const $el = $('*[data-testid=btn-resume-settings-intro]');

    await $el.waitForExist();

    await $el.click();
  }

  async toRestart() {
    const $el = $('*[data-testid=btn-restart-settings-intro]');

    await $el.waitForExist();

    await $el.click();
  }

  async toHomePage() {
    const $el = $('*[data-testid=btn-home-page-settings-intro]');

    await $el.waitForExist();

    await $el.click();
  }

  async toSettings() {
    const $el = $('*[data-testid=btn-settings-settings-intro]');

    await $el.waitForExist();

    await $el.click();
  }
}

export const settingsIntro = new SettingsIntroPage();
