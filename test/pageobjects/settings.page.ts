import Page from './page.js';
import { $, browser } from '@wdio/globals';
import { RadioGroupComponent } from '../components/radio-group';
import { SliderComponent } from '../components/slider';

class SettingsPage extends Page {
  public heightSlider = new SliderComponent('playerPositionHeight');
  public targetRadioGroup = new RadioGroupComponent('radio-group_target_settings-form');

  async open() {
    return Promise.reject('Not implemented');
  }

  async waitFor() {
    const $el = $('*[data-testid=drawer-settings]');

    await $el.waitForExist();
  }

  async toSave() {
    const $el = $('*[data-testid=submit]');

    await $el.waitForExist();

    await $el.click();
  }

  async toCancel() {
    const $el = $('*[data-testid=cancel]');

    await $el.waitForExist();

    await $el.click();
  }

  async toReset() {
    const $el = $('*[data-testid=btn-reset-settings-form]');

    await $el.waitForExist();

    await $el.click();

    await browser.pause(500);
  }
}

export const settings = new SettingsPage();
