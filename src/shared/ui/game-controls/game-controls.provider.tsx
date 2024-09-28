import type { FC } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { MIN_VERTICAL_ANGEL } from './game-controls.constants';

interface State {
  leftControlValue: number;
  rightControlValue: number;
  cameraTheta: number;
}

export interface GameControlsContextValues extends State {
  onLeftControlChange(value: number): void;
  onRightControlChange(value: number): void;
  onChangeCameraTheta(value: number): void;
}

const GameControlsContext = createContext<GameControlsContextValues>({} as GameControlsContextValues);

export const useGameControlsContext = () => useContext<GameControlsContextValues>(GameControlsContext);

export const GameControlsProvider: FC = ({ children }) => {
  const [state, setState] = useState<State>({
    leftControlValue: 0,
    rightControlValue: 0,
    cameraTheta: MIN_VERTICAL_ANGEL,
  });

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
