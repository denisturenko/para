import { $ } from '@wdio/globals';

import Page from './page.js';

class GreetingsPage extends Page {
  async open() {
    return super.open('/game/greetings');
  }

  async fillGreeting(nickName: string, isAgree: boolean) {
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

export const greetingsPage = new GreetingsPage();
