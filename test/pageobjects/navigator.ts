import { homePage } from './home.page';
import { gamePage } from './game.page';
import { setUserSettings } from '../utils/set-user-settings';

class AppNavigator {
  async goToHomePage() {
    await homePage.open();
  }

  async goToGame(withUserSettings: boolean) {
    await this.goToHomePage();
    await setUserSettings(withUserSettings);
    await homePage.play();
    await gamePage.waitForAltitudeBlock();
  }
}

export const appNavigator = new AppNavigator();
