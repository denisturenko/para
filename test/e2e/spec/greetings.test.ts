import { appNavigator } from '../../pageobjects/navigator';
import { homePage } from '../../pageobjects/home.page';
import { greetingsPage } from '../../pageobjects/greetings.page';
import { gamePage } from '../../pageobjects/game.page';

describe('Greeting', () => {
  afterEach(async () => {
    // await browser.deleteSession();
  });

  it('should show greeting first time and skip after submit and page refresh', async () => {
    await appNavigator.goToHomePage();
    await homePage.play();

    await greetingsPage.fillGreeting('', false);
    await greetingsPage.waitForGreetingError();
    await greetingsPage.fillGreeting('John Connor', true);
    await gamePage.waitForAltitudeBlock();

    await appNavigator.goToHomePage();
    await homePage.play();
    await gamePage.waitForAltitudeBlock();
  });
});
