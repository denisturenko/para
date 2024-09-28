import { useCallback, useState } from 'react';
import type { GameProps } from 'entities/r3f/game';
import type { GameSettings } from 'shared/lib/types';
import type { GameControlsProps } from 'shared/ui/game-controls';
import type { SettingsProps } from 'features/ui/settings';
import { initialPlayerControls, initialState } from './playground.constants';
import type { PlayerProps } from 'shared/r3f/player';
import type { PlayerControls } from 'shared/lib/types/player-controls.type';

interface UsePlaygroundResult {
  meta: {
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
  const [state, setState] = useState<GameSettings>(initialState);
  const [playerControls, setPlayerControls] = useState<PlayerControls>(initialPlayerControls);

  /** Game settings stuff. */
  const onSettingsIntroHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: true, isRestart: false })), []);

  const onRestartHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: false, isRestart: true })), []);

  const onStartHandler = useCallback(() => setState(prev => ({ ...prev, isNotStarted: false, isPaused: false, isRestart: true })), []);

  const onResumeHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: false })), []);

  const onSaveSettingsHandle = useCallback(values => setState(prev => ({ ...prev, ...values })), []);

  /** Player controls stuff. */
  const onLeftControlChangeHandler = useCallback(
    (leftControlValue: number) => setPlayerControls(prev => ({ ...prev, leftControlValue })),
    []
  );

  const onRightControlChangeHandler = useCallback(
    (rightControlValue: number) => setPlayerControls(prev => ({ ...prev, rightControlValue })),
    []
  );

  const onChangeCameraThetaHandler = useCallback((cameraTheta: number) => setPlayerControls(prev => ({ ...prev, cameraTheta })), []);

  return {
    meta: {
      isNotStarted: state.isNotStarted,
      withOrbitControls: state.withOrbitControls,
    },
    ui: {
      game: {
        ...state,
      },
      gameControls: {
        cameraTheta: playerControls.cameraTheta,
        leftControlValue: playerControls.leftControlValue,
        rightControlValue: playerControls.rightControlValue,
        onChangeCameraTheta: onChangeCameraThetaHandler,
        onLeftControlChange: onLeftControlChangeHandler,
        onRightControlChange: onRightControlChangeHandler,
        onSettings: onSettingsIntroHandler,
      },
      player: {
        cameraTheta: playerControls.cameraTheta,
        angelCorrection: state.angelCorrection,
        azimuth: state.playerAzimuth,
        canopy: state.canopy,
        ignoreHeadCamera: state.withOrbitControls,
        isPaused: state.isPaused,
        isRestart: state.isRestart,
        leftControlValue: playerControls.leftControlValue,
        playerBodyHeight: state.playerBodyHeight,
        position: state.playerPosition,
        rightControlValue: playerControls.rightControlValue,
        winds: state.winds,
      },
      settings: {
        isNotStarted: state.isNotStarted,
        isOpen: state.isPaused || state.isNotStarted,
        values: {
          canopy: state.canopy,
          winds: state.winds,
          helper: state.helpers,
        },
        onRestart: onRestartHandler,
        onResume: onResumeHandler,
        onSaveSettings: onSaveSettingsHandle,
        onStart: onStartHandler,
      },
    },
  };
};
