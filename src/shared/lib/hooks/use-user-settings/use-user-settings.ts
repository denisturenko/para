import { useCallback, useEffect, useState } from 'react';
import type { UserSettings } from 'shared/lib/types';
import ym from 'react-yandex-metrika';
import { getUserSettings, setUserSettings } from './use-user-settings.utils';

export const useUserSettings = () => {
  /** User stuff. */

  const [state, setState] = useState<UserSettings>(getUserSettings());

  useEffect(() => {
    if (state.nickName) {
      ym('userParams', {
        UserID: state.nickName,
      });
      ym('setUserID', state.nickName);
    }
  }, [state]);

  const setUserSettingsHandler = useCallback(values => {
    setState(prev => {
      const next = { ...prev, ...values };

      setUserSettings(next);

      return next;
    });
  }, []);

  return {
    userSettings: state,
    setUserSettings: setUserSettingsHandler,
  };
};
