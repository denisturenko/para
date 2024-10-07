import { useCallback, useMemo, useState } from 'react';
import type { GameProps } from 'entities/r3f/game';
import type { GameSettings, GameSettingsBase } from 'shared/lib/types';
import type { GameControlsProps } from 'shared/ui/game-controls';
import type { SettingsProps } from 'features/ui/settings';
import { initialState, storageKey } from './playground.constants';
import type { PlayerProps } from 'shared/r3f/player';
import { adjustInitialState, prepareForStorage } from 'pages/playground/playground.utils';
import { settingsStorage } from 'shared/lib/utils/storage/settings-storage';

interface UsePlaygroundResult {
  meta: {
    isFinish: boolean;
    isNotStarted: boolean;
    withOrbitControls: boolean;
  };
  ui: {
    game: GameProps;
    gameControls: GameControlsProps;
    player: PlayerProps;
    settings: SettingsProps;
  };
}

export const usePlayground = (): UsePlaygroundResult => {
  /** State stuff. */
  const storageInst = useMemo(() => settingsStorage<GameSettingsBase>(storageKey), []);

  const initialStateFromStorage = useMemo(() => storageInst.get(prepareForStorage(initialState)), [storageInst]);

  const getInitialStateFromStorage = useCallback(
    () =>
      adjustInitialState({
        ...initialState,
        ...initialStateFromStorage,
      }),
    [initialStateFromStorage]
  );

  const [state, setState] = useState<GameSettings>(getInitialStateFromStorage);

  /** Game settings stuff. */
  const onSettingsIntroHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: true, isRestart: false })), []);

  const onRestartHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: false, isRestart: true, isFinish: false })), []);

  const onStartHandler = useCallback(
    () => setState(prev => ({ ...prev, isNotStarted: false, isPaused: false, isFinish: false, isRestart: true })),
    []
  );

  const onResumeHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: false })), []);

  const onFinishHandler = useCallback(() => setState(prev => ({ ...prev, isFinish: true })), []);

  const onSaveSettingsHandle = useCallback(
    values =>
      setState(prev => {
        const next = adjustInitialState({ ...prev, ...values });

        storageInst.set(prepareForStorage(next));

        return next;
      }),
    [storageInst]
  );

  const onResetSettingsHandle = useCallback(
    () =>
      setState(() => {
        storageInst.reset();

        return getInitialStateFromStorage();
      }),
    [getInitialStateFromStorage, storageInst]
  );

  const onReadyHandler = useCallback(() => setState(prev => ({ ...prev, isReady: true })), []);

  return {
    meta: {
      isFinish: state.isFinish,
      isNotStarted: state.isNotStarted,
      withOrbitControls: state.withOrbitControls,
    },
    ui: {
      game: {
        ...state,
        onReady: onReadyHandler,
      },
      gameControls: {
        onSettings: onSettingsIntroHandler,
        allowTouchEndHandler: state.helpers.allowToggleReleasing,
      },
      player: {
        angelCorrection: state.angelCorrection,
        azimuth: state.playerAzimuth,
        canopy: state.canopy,
        ignoreHeadCamera: state.withOrbitControls,
        isPaused: state.isPaused,
        isRestart: state.isRestart,
        playerBodyHeight: state.playerBodyHeight,
        position: state.playerPosition,
        winds: state.winds,
        helpers: state.helpers,
        beep: state.beep,
        onFinish: onFinishHandler,
      },
      settings: {
        isNotStarted: state.isNotStarted,
        isOpen: state.isPaused || state.isNotStarted,
        values: {
          canopy: state.canopy,
          winds: state.winds,
          helpers: state.helpers,
          playerPositionHeight: state.playerPositionHeight,
          beep: state.beep,
          targets: state.targets,
          currentTargetId: state.currentTargetId,
        },
        onRestart: onRestartHandler,
        onResume: onResumeHandler,
        onSaveSettings: onSaveSettingsHandle,
        onStart: onStartHandler,
        onResetSettings: onResetSettingsHandle,
      },
    },
  };
};
