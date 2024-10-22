import { $ } from '@wdio/globals';

export class RadioGroupComponent {
  dataTestId: string;

  constructor(dataTestId: string) {
    this.dataTestId = dataTestId;
  }

  async waitFor() {
    const $el = $('*[data-testid=' + this.dataTestId + ']');

    await $el.waitForExist();
  }

  async isSelected(id: string) {
    const $el = $('*[data-checked=true] *[data-testid=' + this.dataTestId + '_radio-' + id + ']');

    await $el.waitForExist();
  }

  async isNotSelected(id: string) {
    const $el = $('*[data-checked=true] *[data-testid=' + this.dataTestId + '_radio-' + id + ']');

    await $el.waitForExist({ reverse: true });
  }

  async toSelect(id: string) {
    const $el = $('*[data-testid=' + this.dataTestId + '_radio-' + id + ']');

    await $el.click();
  }
}
