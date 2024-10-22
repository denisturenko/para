import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { initialPlayerControls } from './game-controls.constants';
import type { PlayerControls } from 'shared/lib/types';

export interface GameControlsContextValues extends PlayerControls {
  onChangeCameraTheta(value?: number): void;
  onLeftControlChange(value?: number): void;
  onRightControlChange(value?: number): void;
}

const GameControlsContext = createContext<GameControlsContextValues>({} as GameControlsContextValues);

export const useGameControlsContext = () => useContext<GameControlsContextValues>(GameControlsContext);

interface GameControlsProviderProps {}

export const GameControlsProvider: GameControlsProviderProps = ({ children }: PropsWithChildren<GameControlsProviderProps>) => {
  const [state, setState] = useState<PlayerControls>(initialPlayerControls);

  const onLeftControlChangeHandler = useCallback(
    (leftControlValue: number = initialPlayerControls.leftControlValue) => setState(prev => ({ ...prev, leftControlValue })),
    []
  );

  const onRightControlChangeHandler = useCallback(
    (rightControlValue: number = initialPlayerControls.rightControlValue) => setState(prev => ({ ...prev, rightControlValue })),
    []
  );

  const onChangeCameraThetaHandler = useCallback(
    (cameraTheta: number = initialPlayerControls.cameraTheta) => setState(prev => ({ ...prev, cameraTheta })),
    []
  );

  /** Selenium tests stuff */
  /* useEffect(() => {
    set(window, 'game.controls.onLeftControlChange', onLeftControlChangeHandler);
    set(window, 'game.controls.onRightControlChange', onRightControlChangeHandler);
    set(window, 'game.controls.onChangeCameraTheta', onChangeCameraThetaHandler);
  }, [onChangeCameraThetaHandler, onLeftControlChangeHandler, onRightControlChangeHandler]); */

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
