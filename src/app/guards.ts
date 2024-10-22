import { getUserSettings } from 'shared/lib/hooks/use-user-settings';
import { urls } from 'entities/lib/config';

export const playgroundGuard = () => {
  const { isAgree, nickName } = getUserSettings();

  return isAgree && nickName ? undefined : urls.GAME_GREETING;
};
