import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GameProps } from 'entities/r3f/game';
import type { GameSettings, GameSettingsBase, UserSettings } from 'shared/lib/types';
import type { GameControlsProps } from 'shared/ui/game-controls';
import type { SettingsProps } from 'features/ui/settings';
import { initialSettings, initialState, storageKey } from './playground.constants';
import type { PlayerProps } from 'shared/r3f/player';
import { adjustInitialState, isSettingsStoreValid, prepareForStorage } from 'pages/playground/playground.utils';
import { settingsStorage } from 'shared/lib/utils/storage/settings-storage';
import { getWindByHeight } from 'shared/r3f/player';
import type * as THREE from 'three';
import { getResultVectorLength } from 'shared/lib/utils';
import { modals } from '@mantine/modals';
import { useUserSettings } from 'shared/lib/hooks/use-user-settings';
import { useYandexMetricGoals } from 'entities/lib/hooks/use-yandex-metric-goals';
import { useHistory } from 'react-router-dom';
import { urls } from 'entities/lib/config';

interface UsePlaygroundResult {
  meta: {
    isFinish: boolean;
    isNotStarted: boolean;
    userSettings: UserSettings;
    withOrbitControls: boolean;
  };
  ui: {
    game: GameProps;
    gameControls: GameControlsProps;
    player: PlayerProps;
    settings: SettingsProps;
  };
}

/** Need for selenium tests . */
const toDebug = (str: string = '') => {
  const el = document.getElementById('debug');

  if (el) {
    el.innerHTML = str;
  }
};

export const usePlayground = (): UsePlaygroundResult => {
  const { clickPlayButton } = useYandexMetricGoals();

  const history = useHistory();

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
  const { userSettings } = useUserSettings();

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
    toDebug();
    clickPlayButton();
    setState(prev => ({ ...prev, isPaused: false, isRestart: true, isFinish: false }));
  }, [clickPlayButton]);

  const onStartHandler = useCallback(() => {
    toDebug();
    clickPlayButton();
    setState(prev => ({
      ...prev,
      isNotStarted: false,
      isPaused: false,
      isFinish: false,
      isRestart: true,
    }));
  }, [clickPlayButton]);

  const onResumeHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: false })), []);

  const onFinishHandler = useCallback(
    (playerPosition: THREE.Vector3) => {
      setState(prev => ({ ...prev, isFinish: true }));

      const res = getResultVectorLength(playerPosition, state.targetPosition);

      modals.openContextModal({
        modal: 'ModalAlert',
        title: 'Ваш результат:',
        innerProps: {
          dataTestId: 'finish',
          modalBody: `${res.toFixed(2)} м.`,
        },
      });
    },
    [state.targetPosition]
  );

  const onReadyHandler = useCallback(() => setState(prev => ({ ...prev, isReady: true })), []);

  const onArrowShowToggleHandler = useCallback(() => setState(prev => ({ ...prev, isPlayerArrowVisible: !prev.isPlayerArrowVisible })), []);

  const onGotoHomePageClickHandler = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false, isSettingsIntroVisible: false, isRestart: true }));
    history.push(urls.ROOT);
  }, [history]);

  const arrowAngel = useMemo(() => {
    const windAngel = getWindByHeight(settings.winds, 0)?.angel || 0;

    return (state.angelCorrection || 0) - windAngel;
  }, [settings.winds, state.angelCorrection]);

  return {
    meta: {
      userSettings,
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
    },
  };
};
