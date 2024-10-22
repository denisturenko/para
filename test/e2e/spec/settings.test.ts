import { appNavigator } from '../../pageobjects/navigator';
import { homePage } from '../../pageobjects/home.page';
import { greetingsPage } from '../../pageobjects/greetings.page';
import { gamePage } from '../../pageobjects/game.page';
import { settingsIntro } from '../../pageobjects/settings-intro.page';
import { setUserSettings } from '../../utils/set-user-settings';
import { settings } from '../../pageobjects/settings.page';
import { browser } from '@wdio/globals';

describe('Settings', () => {
  it('should save settings', async () => {
    await appNavigator.goToGame(true);
    await gamePage.waitFor();
    await gamePage.toSettingsIntro();

    await settingsIntro.waitFor();
    await settingsIntro.toSettings();

    await settings.waitFor();
    await settings.heightSlider.setValueByInput('500');
    await settings.targetRadioGroup.toSelect('3');
    await settings.toSave();

    await settingsIntro.waitFor();
    await settingsIntro.toSettings();

    await settings.waitFor();

    const height = await settings.heightSlider.getValueByInput();

    expect(height).toBe('500');
    await settings.targetRadioGroup.isSelected('3');
  });
});
