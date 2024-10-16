import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GameProps } from 'entities/r3f/game';
import type { GameSettings, GameSettingsBase, UserSettings } from 'shared/lib/types';
import type { GameControlsProps } from 'shared/ui/game-controls';
import type { SettingsProps } from 'features/ui/settings';
import { initialSettings, initialState, initialUserSettings, storageKey } from './playground.constants';
import type { PlayerProps } from 'shared/r3f/player';
import { adjustInitialState, isSettingsStoreValid, prepareForStorage } from 'pages/playground/playground.utils';
import { settingsStorage } from 'shared/lib/utils/storage/settings-storage';
import { getWindByHeight } from 'shared/r3f/player';
import type { HomePageTopSectionProps } from 'entities/ui/home-page-top-section';
import type { GreetingsProps } from 'features/ui/greetings';
import { userStorage } from 'shared/lib/utils/storage/user-storage';
import ym from 'react-yandex-metrika';

interface UsePlaygroundResult {
  meta: {
    isFinish: boolean;
    isHomePageVisible: boolean;
    isNotStarted: boolean;
    userSettings: UserSettings;
    withOrbitControls: boolean;
  };
  ui: {
    game: GameProps;
    gameControls: GameControlsProps;
    greetings: GreetingsProps;
    homePage: HomePageTopSectionProps;
    player: PlayerProps;
    settings: SettingsProps;
  };
}

export const usePlayground = (): UsePlaygroundResult => {
  /** State stuff. */
  const storageInst = useMemo(() => settingsStorage<GameSettingsBase>(storageKey), []);

  const settingsFromStorage = useMemo(() => {
    const fromStore = storageInst.get(prepareForStorage(initialSettings));

    const isValid = isSettingsStoreValid(fromStore, initialSettings);

    if (!isValid) {
      storageInst.reset();
    }

    return isValid ? fromStore : initialSettings;
  }, [storageInst]);

  /** User stuff. */
  const userStorageInst = useMemo(() => userStorage<UserSettings>(storageKey), []);

  const [userSettings, setUserSettings] = useState<UserSettings>(userStorageInst.get(initialUserSettings));

  useEffect(() => {
    if (userSettings.nickName) {
      ym('userParams', {
        UserID: userSettings.nickName,
      });
      ym('setUserID', userSettings.nickName);
    }
  }, [userSettings]);

  const setUserSettingsToStorage = useCallback(
    values => {
      setUserSettings(prev => {
        const next = { ...prev, ...values };

        userStorageInst.set(next);

        return next;
      });
    },
    [userStorageInst]
  );

  const reachGoalClickPlayButton = useCallback(
    () =>
      ym('reachGoal', 'btn-click-play', { userId: userSettings.nickName }, res => {
        console.log('***', res);
      }),
    [userSettings.nickName]
  );

  /** Game settings stuff. */

  const [settings, setSettings] = useState<GameSettingsBase>(settingsFromStorage);

  const onSaveSettingsHandle = useCallback(
    values => {
      setSettings(prev => {
        const next = { ...prev, ...values };

        storageInst.set(prepareForStorage(next));

        return next;
      });
    },
    [storageInst]
  );

  const onResetSettingsHandle = useCallback(
    () =>
      setSettings(() => {
        storageInst.reset();

        return initialSettings;
      }),
    [storageInst]
  );

  /** Game state stuff. */
  const [state, setState] = useState<GameSettings>(adjustInitialState(initialState, settingsFromStorage));

  useEffect(() => setState(prev => adjustInitialState(prev, settings)), [settings]);

  const onSettingsIntroHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: true, isRestart: false })), []);

  const onRestartHandler = useCallback(() => {
    reachGoalClickPlayButton();
    setState(prev => ({ ...prev, isPaused: false, isRestart: true, isFinish: false }));
  }, [reachGoalClickPlayButton]);

  const onStartHandler = useCallback(() => {
    reachGoalClickPlayButton();
    setState(prev => ({
      ...prev,
      isNotStarted: false,
      isPaused: false,
      isFinish: false,
      isRestart: true,
      isHomePageVisible: false,
      isGreetingsVisible: false,
    }));
  }, [reachGoalClickPlayButton]);

  const onResumeHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: false })), []);

  const onFinishHandler = useCallback(() => setState(prev => ({ ...prev, isFinish: true })), []);

  const onReadyHandler = useCallback(() => setState(prev => ({ ...prev, isReady: true })), []);

  const onArrowShowToggleHandler = useCallback(() => setState(prev => ({ ...prev, isPlayerArrowVisible: !prev.isPlayerArrowVisible })), []);

  const onGotoHomePageClickHandler = useCallback(() => setState(prev => ({ ...prev, isHomePageVisible: true })), []);

  const onStartGreetingsHandler = useCallback(() => setState(prev => ({ ...prev, isGreetingsVisible: true })), []);

  const onStartGameOrGreetingsHandler = useCallback(() => {
    console.log('***', userSettings);
    userSettings.nickName && userSettings.isAgree ? onStartHandler() : onStartGreetingsHandler();
  }, [onStartGreetingsHandler, onStartHandler, userSettings]);

  const onCancelGreetingsHandler = useCallback(() => setState(prev => ({ ...prev, isGreetingsVisible: false })), []);

  const onSaveGreetingsHandle = useCallback(
    (values: UserSettings) => {
      setUserSettingsToStorage(values);
      onStartHandler();
    },
    [onStartHandler, setUserSettingsToStorage]
  );

  const arrowAngel = useMemo(() => {
    const windAngel = getWindByHeight(settings.winds, 0)?.angel || 0;

    return (state.angelCorrection || 0) - windAngel;
  }, [settings.winds, state.angelCorrection]);

  return {
    meta: {
      userSettings,
      isHomePageVisible: state.isHomePageVisible,
      isFinish: state.isFinish,
      isNotStarted: state.isNotStarted,
      withOrbitControls: state.withOrbitControls,
    },
    ui: {
      game: {
        ...state,
        ...settings,
        arrowAngel,
        onReady: onReadyHandler,
      },
      gameControls: {
        onArrowShowToggle: onArrowShowToggleHandler,
        onSettings: onSettingsIntroHandler,
        allowTouchEndHandler: settings.helpers.allowToggleReleasing,
      },
      player: {
        arrowAngel,
        angelCorrection: state.angelCorrection,
        azimuth: state.playerAzimuth,
        canopy: settings.canopy,
        ignoreHeadCamera: state.withOrbitControls,
        isPaused: state.isPaused,
        isRestart: state.isRestart,
        isPlayerArrowVisible: state.isPlayerArrowVisible,
        playerBodyHeight: state.playerBodyHeight,
        position: state.playerPosition,
        winds: settings.winds,
        helpers: settings.helpers,
        beep: settings.beep,
        onFinish: onFinishHandler,
      },
      settings: {
        isNotStarted: state.isNotStarted,
        isOpen: state.isPaused || state.isNotStarted,
        values: {
          canopy: settings.canopy,
          winds: settings.winds,
          helpers: settings.helpers,
          playerPositionHeight: settings.playerPositionHeight,
          beep: settings.beep,
          targets: state.targets,
          currentTargetId: settings.currentTargetId,
        },
        onRestart: onRestartHandler,
        onResume: onResumeHandler,
        onSaveSettings: onSaveSettingsHandle,
        onStart: onStartHandler,
        onResetSettings: onResetSettingsHandle,
        onGotoHomePageClick: onGotoHomePageClickHandler,
      },
      homePage: {
        onClickStart: onStartGameOrGreetingsHandler,
      },
      greetings: {
        isOpen: state.isGreetingsVisible,
        values: userSettings,
        onCancel: onCancelGreetingsHandler,
        onSave: onSaveGreetingsHandle,
      },
    },
  };
};
