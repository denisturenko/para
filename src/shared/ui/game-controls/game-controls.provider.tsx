import type { FC } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { initialPlayerControls } from './game-controls.constants';
import type { PlayerControls } from 'shared/lib/types';

export interface GameControlsContextValues extends PlayerControls {
  onChangeCameraTheta(value: number): void;
  onLeftControlChange(value: number): void;
  onRightControlChange(value: number): void;
}

const GameControlsContext = createContext<GameControlsContextValues>({} as GameControlsContextValues);

export const useGameControlsContext = () => useContext<GameControlsContextValues>(GameControlsContext);

export const GameControlsProvider: FC = ({ children }) => {
  const [state, setState] = useState<PlayerControls>(initialPlayerControls);

  const onLeftControlChangeHandler = useCallback((leftControlValue: number) => setState(prev => ({ ...prev, leftControlValue })), []);

  const onRightControlChangeHandler = useCallback((rightControlValue: number) => setState(prev => ({ ...prev, rightControlValue })), []);

  const onChangeCameraThetaHandler = useCallback((cameraTheta: number) => setState(prev => ({ ...prev, cameraTheta })), []);

  const contextValue = useMemo<GameControlsContextValues>(
    () => ({
      ...state,
      onLeftControlChange: onLeftControlChangeHandler,
      onRightControlChange: onRightControlChangeHandler,
      onChangeCameraTheta: onChangeCameraThetaHandler,
    }),
    [onChangeCameraThetaHandler, onLeftControlChangeHandler, onRightControlChangeHandler, state]
  );

  return <GameControlsContext.Provider value={contextValue}>{children}</GameControlsContext.Provider>;
};
