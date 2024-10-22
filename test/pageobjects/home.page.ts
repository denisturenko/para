import Page from './page.js';
import { $, browser } from '@wdio/globals';

class HomePage extends Page {
  async open() {
    return super.open('/');
  }

  async waitFor() {
    const $el = $('*[data-testid="hp"]');

    await $el.waitForExist();
  }

  async play() {
    const $playBtn = $('*[data-testid="btn-play-top-section"]');

    await $playBtn.waitForExist();

    await $playBtn.click();
  }

  async about() {
    const $link = $('*[data-testid="link-about-hp"]');

    await $link.waitForExist();

    await $link.click();
  }

  async isVisibleAboutBlock() {
    return browser.execute(() => document.querySelector('[data-testid=section-about]').getBoundingClientRect().top === 0);
  }

  async install() {
    const $link = $('*[data-testid="link-install-hp"]');

    await $link.waitForExist();

    await $link.click();
  }

  async isVisibleInstallBlock() {
    return browser.execute(() => document.querySelector('[data-testid=section-install]').getBoundingClientRect().top < 100);
  }

  async toTelegramInTop() {
    const $playBtn = $('*[data-testid="top-section_tg-link"]');

    await $playBtn.waitForExist();

    await $playBtn.click();
  }
}

export const homePage = new HomePage();
