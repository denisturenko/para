import { useUserSettings } from 'shared/lib/hooks/use-user-settings';
import { useCallback } from 'react';
import ym from 'react-yandex-metrika';

export const useYandexMetricGoals = () => {
  const { userSettings } = useUserSettings();

  const clickPlayButtonHandler = useCallback(
    () => ym('reachGoal', 'btn-click-play', { userId: userSettings.nickName }),
    [userSettings.nickName]
  );

  return {
    clickPlayButton: clickPlayButtonHandler,
  };
};
