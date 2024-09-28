import { useCallback, useState } from 'react';
import type { GameProps } from 'entities/r3f/game';
import type { GameSettings } from 'shared/lib/types';
import type { GameControlsProps } from 'shared/ui/game-controls';
import type { SettingsProps } from 'features/ui/settings';
import { initialState } from './playground.constants';
import type { PlayerProps } from 'shared/r3f/player';

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

  /** Game settings stuff. */
  const onSettingsIntroHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: true, isRestart: false })), []);

  const onRestartHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: false, isRestart: true })), []);

  const onStartHandler = useCallback(() => setState(prev => ({ ...prev, isNotStarted: false, isPaused: false, isRestart: true })), []);

  const onResumeHandler = useCallback(() => setState(prev => ({ ...prev, isPaused: false })), []);

  const onSaveSettingsHandle = useCallback(values => setState(prev => ({ ...prev, ...values })), []);

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
        onSettings: onSettingsIntroHandler,
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
