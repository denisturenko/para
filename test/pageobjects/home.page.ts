import { $ } from '@wdio/globals';

import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  async open() {
    return super.open('/');
  }

  async play() {
    const $playBtn = $('button[data-testid="btn-play-top-section"]');

    await $playBtn.waitForExist();

    await $playBtn.click();
  }

  async greeting(nickName = '', isAgree = false) {
    const $greetingDrawer = $('*[data-testid=drawer-greetings]');

    await $greetingDrawer.waitForExist();

    const $input = $('*[data-testid=input-nickName]');

    await $input.setValue(nickName);

    const $isAgreeCheckbox = $('*[data-testid="switch-isAgree"] + div');

    if (isAgree) {
      await $isAgreeCheckbox.click();
    }

    const $btnSubmit = $('button[data-testid=submit]');

    await $btnSubmit.click();
  }

  async waitForGreetingError() {
    const $errorBlock = $('div[data-testid=alert-error-block]');

    await $errorBlock.waitForExist();
  }
}

const page = new HomePage();

export default page;
