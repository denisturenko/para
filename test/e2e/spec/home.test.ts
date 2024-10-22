import { appNavigator } from '../../pageobjects/navigator';
import { homePage } from '../../pageobjects/home.page';
import { greetingsPage } from '../../pageobjects/greetings.page';
import { gamePage } from '../../pageobjects/game.page';
import { settingsIntro } from '../../pageobjects/settings-intro.page';
import { setUserSettings } from '../../utils/set-user-settings';

describe('Home', () => {
  afterEach(async () => {
    // await browser.deleteSession();
  });

  it('should show home page sections', async () => {
    await appNavigator.goToHomePage();
    await setUserSettings(true);
    await homePage.about();
    await homePage.isVisibleAboutBlock();
    await homePage.install();
    await homePage.isVisibleInstallBlock();
    await homePage.play();
    await gamePage.waitFor();
    await gamePage.toSettingsIntro();
    await settingsIntro.waitFor();
    await settingsIntro.toHomePage();
    await homePage.waitFor();
  });
});
