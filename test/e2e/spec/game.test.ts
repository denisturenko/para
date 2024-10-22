import { appNavigator } from '../../pageobjects/navigator';
import { gamePage } from '../../pageobjects/game.page';

describe('Game', () => {
  afterEach(async () => {
    // await browser.deleteSession();
  });

  it('should be landed in target', async () => {
    await appNavigator.goToGame(true);
    await gamePage.ignoreGusts();

    await gamePage.toggle('left', 0);
    await gamePage.toggle('right', 0);

    await gamePage.turnOn('left', 90);
    await gamePage.changeSpeed(100, 220);

    await gamePage.turnOn('right', 180);
    await gamePage.changeSpeed(100, 320);

    await gamePage.turnOn('right', 270);
    await gamePage.changeSpeed(100, 210);

    await gamePage.turnOn('right', 0);
    await gamePage.toggle('left', 41);
    await gamePage.toggle('right', 43);
    await gamePage.toggle('left', 43);
    await gamePage.changeSpeed(100, 350);

    const result = await gamePage.getResult();

    expect(parseFloat(result) < 50).toBe(true);
  });
});
