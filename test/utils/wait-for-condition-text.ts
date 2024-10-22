import { browser } from '@wdio/globals';

export const waitForConditionText = async ($el, cb: (value: string) => boolean, timeout = 50_000) =>
  browser.waitUntil(
    async () => {
      const text = await $el.getHTML({ includeSelectorTag: false });

      // console.log('***', text);

      return cb(text);
    },
    {
      timeout,
    }
  );
