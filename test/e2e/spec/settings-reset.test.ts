import { appNavigator } from '../../pageobjects/navigator';
import { homePage } from '../../pageobjects/home.page';
import { greetingsPage } from '../../pageobjects/greetings.page';
import { gamePage } from '../../pageobjects/game.page';
import { settingsIntro } from '../../pageobjects/settings-intro.page';
import { setUserSettings } from '../../utils/set-user-settings';
import { settings } from '../../pageobjects/settings.page';

describe('Settings reset', () => {
  it('should reset settings', async () => {
    await appNavigator.goToGame(true);
    await gamePage.waitFor();
    await gamePage.toSettingsIntro();

    await settingsIntro.waitFor();
    await settingsIntro.toSettings();

    await settings.waitFor();
    await settings.targetRadioGroup.isNotSelected('3');
    await settings.targetRadioGroup.toSelect('3');
    await settings.toSave();

    await settingsIntro.waitFor();
    await settingsIntro.toSettings();

    await settings.waitFor();
    await settings.targetRadioGroup.isSelected('3');
    await settings.toReset();

    await settingsIntro.waitFor();
    await settingsIntro.toSettings();
    await settings.targetRadioGroup.isNotSelected('3');
  });
});
