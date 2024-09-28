import { useCallback, useState } from 'react';
import type { GameProps } from 'entities/r3f/game';
import type { GameSettings } from 'shared/lib/types';
import type { GameControlsProps } from 'shared/ui/game-controls';
import type { SettingsProps } from 'features/ui/settings';
import { initialState } from './playground.constants';

interface UsePlaygroundResult {
  meta: {
    isNotStarted: boolean;
    withOrbitControls: boolean;
  };
  ui: {
    game: GameProps;
    gameControls: GameControlsProps;
    settings: SettingsProps;
  };
}

export const usePlayground = (): UsePlaygroundResult => {
  const [state, setState] = useState<GameSettings>(initialState);

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
        angelCorrection: Math.PI,
        ...state,
      },
      gameControls: {
        onSettings: onSettingsIntroHandler,
      },
      settings: {
        isNotStarted: state.isNotStarted,
        isOpen: state.isPaused || state.isNotStarted,
        values: state,
        onRestart: onRestartHandler,
        onResume: onResumeHandler,
        onSaveSettings: onSaveSettingsHandle,
        onStart: onStartHandler,
      },
    },
  };
};
