import { $, browser } from '@wdio/globals';

export class SliderComponent {
  dataTestId: string;

  constructor(dataTestId: string) {
    this.dataTestId = dataTestId;
  }

  async waitFor() {
    const $el = $('*[data-testid=' + this.dataTestId + ']');

    await $el.waitForExist({ reverse: true });
  }

  async setValueByInput(value: string) {
    const $el = $('*[data-testid=' + this.dataTestId + '-input]');

    await $el.waitForExist();

    await $el.setValue('');
    await $el.setValue(value);
  }

  async getValueByInput() {
    const $el = $('*[data-testid=' + this.dataTestId + '-input]');

    await $el.waitForExist();

    return $el.getValue();
  }
}
